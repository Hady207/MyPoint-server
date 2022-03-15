import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Post,
  HttpCode,
  Res,
  HttpStatus,
} from '@nestjs/common';
import { Response } from 'express';
import { UserService } from './users.service';

@Controller('users')
export class UsersController {
  constructor(private userService: UserService) {}

  @Get()
  findAll() {
    return this.userService.getAllUsers();
  }
  // @Get(':id')
  // findOne(@Param('id') id: string) {
  //   return this.storesService.findOne(id);
  // }
  // @Patch(':id')
  // update(@Param('id') id: string, @Body() updateStoreBody: CreateStoreDTO) {
  //   return this.storesService.updateOne(id, updateStoreBody);
  // }
  // @Delete(':id')
  // remove(@Res() res: Response, @Param('id') id: string) {
  //   this.storesService.deleteOne(id);
  //   res.status(204).json({
  //     status: 'success',
  //     result: `store with id ${id} got deleted successfully`,
  //   });
  // }
}
