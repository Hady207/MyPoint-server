import { Injectable, Param, Body } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';

import { Booking } from 'src/models/bookings.model';

@Injectable()
export class BookingsService {
  constructor(
    @InjectModel('Booking') private readonly bookingModel: Model<Booking>,
  ) {}
  // creates a booking ticket should be used by (USER)
  createBookingTicket(storeId, user, bookingObj) {
    const bookDoc = {
      bookingDate: bookingObj?.date,
      user: user?.userId,
      store: storeId,
    };
    return this.bookingModel.create(bookDoc);
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
  scanBookedTicket(bookingId: string, storeId: string) {
    return this.bookingModel.findByIdAndUpdate(
      { _id: bookingId, store: storeId },
      { scanned: true },
      { new: true },
    );
  }

  // get All Booked Tickets for specific store (For Admin)
  getAllBookedTicketsForStore(storeId) {
    return this.bookingModel.find({ store: storeId });
  }
}
