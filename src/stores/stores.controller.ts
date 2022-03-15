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
  UseGuards,
} from '@nestjs/common';
import { Response } from 'express';
import { CreateStoreDTO } from './dto/create-store-dto';
import { StoresService } from './stores.service';
import { JwtAuthGuard } from '../auth/jwt-auth.guard';
import { GetUser } from '../utils';

// TODO: Need to create express response for delete
// NOTE: Doing this will change the default handling to express

@Controller('stores')
export class StoresController {
  constructor(private storesService: StoresService) {}

  @Post()
  create(@Body() createStoreBody: CreateStoreDTO) {
    return this.storesService.createStore(createStoreBody);
  }

  @UseGuards(JwtAuthGuard)
  @Get()
  findAll(@GetUser() user: any) {
    console.log(user);
    return this.storesService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.storesService.findOne(id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateStoreBody: CreateStoreDTO) {
    return this.storesService.updateOne(id, updateStoreBody);
  }

  @Delete(':id')
  remove(@Res() res: Response, @Param('id') id: string) {
    this.storesService.deleteOne(id);
    res.status(204).json({
      status: 'success',
      result: `store with id ${id} got deleted successfully`,
    });
  }
}
