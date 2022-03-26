import { Injectable, UnauthorizedException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Booking } from 'src/models/bookings.model';
import { StoresService } from 'src/stores/stores.service';

@Injectable()
export class BookingsService {
  constructor(
    @InjectModel('Booking') private readonly bookingModel: Model<Booking>,
    private storeService: StoresService,
  ) {}
  // creates a booking ticket should be used by (USER)
  async createBookingTicket(storeId, user, bookingObj) {
    const bookDoc = {
      bookingDate: bookingObj?.date,
      user: user?.userId,
      store: storeId,
    };
    const bookedTicket = await this.bookingModel.create(bookDoc);
    await this.storeService.addToBookings(storeId, bookedTicket?._id);
    return bookedTicket;
  }

  getUserAllBookedTickets(user) {
    return this.bookingModel.find({ user: user?.userId });
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
    const re = await this.bookingModel.findOneAndUpdate(
      { _id: bookingBody.id, store: storeId },
      { scanned: true },
      { new: true },
    );
    if (!re) {
      throw new UnauthorizedException('credentials incorrect');
    }
    return re;
  }

  // get All Booked Tickets for specific store (For Admin)
  getAllBookedTicketsForStore(storeId) {
    return this.bookingModel.find({ store: storeId });
  }
}
