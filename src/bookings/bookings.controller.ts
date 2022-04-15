import {
  Controller,
  Param,
  Body,
  UseGuards,
  Post,
  Get,
  Patch,
  Res,
} from '@nestjs/common';
import { Response } from 'express';
import { GetUser } from 'src/utils/decorators';
import { BookingsService } from './bookings.service';
import { JwtAuthGuard } from '../auth/jwt-auth.guard';
import { RolesGuard } from 'src/auth/roles.guard';
import { Roles } from '../utils/decorators';
import { Role } from 'src/utils/enums/role.enum';

@Controller('bookings')
@UseGuards(JwtAuthGuard, RolesGuard)
export class BookingsController {
  constructor(private bookingService: BookingsService) {}

  @Roles(Role.User)
  @Post('createTicket/:storeId')
  createBookingTicket(
    @Param('storeId') storeId: string,
    @GetUser() user: object,
    @Body() bookingData,
  ) {
    return this.bookingService.createBookingTicket(storeId, user, bookingData);
  }

  @Roles(Role.Admin)
  @Post('scan')
  async scanBookedTicket(@Body() scanBody, @GetUser() user: any) {
    return await this.bookingService.scanBookedTicket(scanBody, user?.storeId);
  }

  @Get(':storeId/yearly')
  findBookingNum(@Param('storeId') storeId: string) {
    return this.bookingService.getBookingsYearly(storeId);
  }

  @Get(':storeId/hourly')
  findBookingNumHours(@Param('storeId') storeId: string) {
    return this.bookingService.getBookingByHours(storeId);
  }

  @Get(':storeId/scan/ratio')
  findBookingScanRatio(@Param('storeId') storeId: string) {
    return this.bookingService.getScannedRatio(storeId);
  }

  @Roles(Role.User)
  @Get('myTickets')
  async getUserBookedTickets(@Res() res: Response, @GetUser() user: object) {
    const result = await this.bookingService.getUserAllBookedTickets(user);

    res.status(200).json({
      status: 'Success',
      result: result,
    });
  }

  @Roles(Role.User)
  @Get('myTickets/:id')
  getUserBookedTicket(@Param('id') bookingId, @GetUser() user: object) {
    return this.bookingService.getOneBookedTicketForUser(bookingId, user);
  }

  @Roles(Role.User)
  @Patch('myTickets/:id')
  async updateUserBookedTime(
    @Res() res: Response,
    @Param('id') bookingId,
    @GetUser() user: object,
    @Body() bookingBody,
  ) {
    const result = await this.bookingService.updateBookedTicketTimings(
      bookingId,
      user,
      bookingBody,
    );
    res.status(202).json({
      status: 'Success',
      result: result,
    });
  }
}
