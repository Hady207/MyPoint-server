import { Injectable, UnauthorizedException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model, Types } from 'mongoose';
import { Booking } from 'src/models/bookings.model';
import { StoresService } from 'src/stores/stores.service';
import { HttpService } from '@nestjs/axios';
import { User } from 'src/models/users.model';
import { firstValueFrom } from 'rxjs';

@Injectable()
export class BookingsService {
  constructor(
    @InjectModel('Booking') private readonly bookingModel: Model<Booking>,
    private storeService: StoresService,
    private httpService: HttpService,
  ) {}
  // creates a booking ticket should be used by (USER)
  async createBookingTicket(storeId, user, bookingObj) {
    const bookDoc = {
      bookingDate: bookingObj?.date,
      bookingTime: bookingObj?.time,
      user: user?.userId,
      store: storeId,
    };

    const bookedTicket = await this.bookingModel.create(bookDoc);
    if (!bookedTicket) {
      throw new UnauthorizedException('booking failed');
    }
    await this.storeService.addToBookings(storeId, bookedTicket?._id);

    if (user?.fcmToken) {
      const notificationBody = {
        to: user?.fcmToken,
        notification: {
          body: 'Thank you for booking',
          title: 'Booked',
        },
      };
      const headers = {
        'Content-Type': 'application/json',
        Authorization: `key=${process.env.LEGACY_TOKEN}`,
      };
      await firstValueFrom(
        this.httpService.post(
          `https://fcm.googleapis.com/fcm/send`,
          notificationBody,
          { headers },
        ),
      );
    }

    return bookedTicket;
  }

  getUserAllBookedTickets(user) {
    return this.bookingModel
      .find({ user: user?.userId })
      .populate('store', 'name');
  }

  getOneBookedTicketForUser(bookingId, user) {
    return this.bookingModel
      .findOne({ _id: bookingId, user: user?.userId })
      .populate('store user');
  }

  updateBookedTicketTimings(bookingId, user, bookingObj) {
    return this.bookingModel.findOneAndUpdate(
      { _id: bookingId, user: user?.userId },
      { bookingDate: bookingObj?.date },
      { new: true },
    );
  }

  deleteBookedTicket(bookingId, user) {
    return this.bookingModel.findOneAndDelete({
      _id: bookingId,
      user: user?.userId,
    });
  }

  // scans the booked ticket and change it's value (For Admin)
  async scanBookedTicket(bookingBody: any, storeId: string) {
    const scannedQr = await this.bookingModel
      .findOneAndUpdate(
        { _id: bookingBody.id, store: storeId },
        { scanned: true },
        { new: true },
      )
      .populate<{ user: User }>('user');

    if (!scannedQr) {
      throw new UnauthorizedException('scan failed');
    }

    if (scannedQr?.user?.fcmToken) {
      const notificationBody = {
        to: scannedQr?.user?.fcmToken,
        notification: {
          body: 'QR Scan Compelete',
          title: 'QR Scanned',
        },
      };
      const headers = {
        'Content-Type': 'application/json',
        Authorization: `key=${process.env.LEGACY_TOKEN}`,
      };
      await firstValueFrom(
        this.httpService.post(
          `https://fcm.googleapis.com/fcm/send`,
          notificationBody,
          { headers },
        ),
      );
    }
    return scannedQr;
  }

  // get All Booked Tickets for specific store (For Admin)
  getAllBookedTicketsForStore(storeId) {
    return this.bookingModel.find({ store: storeId });
  }

  async getBookingsYearly(id: string): Promise<Booking[]> {
    return await this.bookingModel.aggregate([
      {
        $match: { store: new Types.ObjectId(id) },
      },
      {
        $group: {
          _id: {
            year: { $year: '$bookingDate' },
            month: { $month: '$bookingDate' },
          },
          total: { $sum: 1 },
        },
      },

      { $sort: { '_id.month': 1 } },
      { $project: { _id: 0, date: '$_id', total: 1 } },
    ]);
  }

  async getBookingByHours(id: string): Promise<Booking[]> {
    return await this.bookingModel.aggregate([
      {
        $match: { store: new Types.ObjectId(id) },
      },
      {
        $group: {
          _id: {
            $cond: [
              {
                $lte: [
                  { $hour: { date: '$bookingTime', timezone: 'Asia/Kuwait' } },
                  12,
                ],
              },
              'morning',
              'evening',
            ],
          },
          total: { $sum: 1 },
        },
      },
      { $sort: { _id: 1 } },
      { $project: { _id: 0, hours: '$_id', total: 1 } },
    ]);
  }

  // get the number of people scanned and didn't scan this month
  async getScannedRatio(id: string): Promise<Booking[]> {
    return await this.bookingModel.aggregate([
      {
        $match: { store: new Types.ObjectId(id) },
      },
      {
        $group: {
          _id: null,
          scannedTotal: { $sum: { $cond: ['$scanned', 1, 0] } },
          unscannedTotal: { $sum: { $cond: ['$scanned', 0, 1] } },
        },
      },
    ]);
  }
}
