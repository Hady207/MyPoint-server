import { Controller, Get, Param, UseGuards } from '@nestjs/common';
import { AnalyticsService } from './analytics.service';
import { JwtAuthGuard } from '../auth/jwt-auth.guard';
import { RolesGuard } from 'src/auth/roles.guard';
import { GetUser, Roles } from '../utils/decorators';
import { Role } from 'src/utils/enums/role.enum';
import { User } from 'src/models/users.model';

@Controller('analytics')
@UseGuards(JwtAuthGuard, RolesGuard)
export class AnalyticsController {
  constructor(private analyticService: AnalyticsService) {}

  @Get('/piechart')
  @Roles(Role.Admin)
  getPieChartData(@GetUser() user: User): string {
    return 'test';
  }

  @Get('/barChart')
  @Roles(Role.Admin)
  getBarChartData(@GetUser() user: User): string {
    return 'test';
  }

  @Get('/progressChart')
  @Roles(Role.Admin)
  getProgressChartData(@GetUser() user: User): string {
    return 'test';
  }
}
