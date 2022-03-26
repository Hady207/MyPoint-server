import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Post,
  Res,
  UseGuards,
} from '@nestjs/common';
import { Response } from 'express';
import { CreateStoreDTO } from './dto/create-store-dto';
import { StoresService } from './stores.service';
import { JwtAuthGuard } from '../auth/jwt-auth.guard';
import { RolesGuard } from 'src/auth/roles.guard';
import { Roles } from '../utils/decorators';
import { Role } from 'src/utils/enums/role.enum';

@Controller('stores')
export class StoresController {
  constructor(private storesService: StoresService) {}

  @Post()
  create(@Body() createStoreBody: CreateStoreDTO) {
    return this.storesService.createStore(createStoreBody);
  }

  @Get()
  findAll() {
    return this.storesService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.storesService.findOne(id);
  }

  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles(Role.SuperAdmin)
  @Patch(':id')
  update(@Param('id') id: string, @Body() updateStoreBody: CreateStoreDTO) {
    return this.storesService.updateOne(id, updateStoreBody);
  }

  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles(Role.SuperAdmin)
  @Delete(':id')
  remove(@Res() res: Response, @Param('id') id: string) {
    this.storesService.deleteOne(id);
    res.status(204).json({
      status: 'success',
      result: `store with id ${id} got deleted successfully`,
    });
  }
}
