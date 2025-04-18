import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Put,
  UseGuards,
  UsePipes,
  ValidationPipe,
} from '@nestjs/common';
import { DepartmentService } from './department.service';
import { DepartmentData } from './dtos/create-department.dto';
import { JwtAuthGuard } from '../auth/jwt-auth-guard';
import { RolesGuard } from '../auth/roles.guard';
import { Roles } from '../decorators/roles.decorator';
import { ApiBearerAuth, ApiOperation, ApiTags } from '@nestjs/swagger';
import { Department } from './schema/deparment.schema';
@ApiTags('Departments')
@ApiBearerAuth()
@UseGuards(JwtAuthGuard, RolesGuard)
@Controller('departments')
export class DepartmentController {
  constructor(private readonly deptService: DepartmentService) {}

  @Post('create')
  @Roles('Admin')
  @ApiOperation({ summary: 'Create a new department (Admin only)' })
  @UsePipes(new ValidationPipe({ whitelist: true }))
  create(@Body() deptDto: DepartmentData): Promise<Department> {
    return this.deptService.create(deptDto);
  }

  @Get()
  @Roles('Admin', 'Instructor')
  @ApiOperation({ summary: 'Get all departments' })
  findAll(): Promise<Department[]> {
    return this.deptService.findAll();
  }

  @Get(':id')
  @Roles('Admin', 'Instructor')
  @ApiOperation({ summary: 'Get a department by ID' })
  findById(@Param('id') id: string): Promise<Department> {
    return this.deptService.findById(id);
  }

  @Put(':id')
  @Roles('Admin')
  @ApiOperation({ summary: 'Update a department (Admin only)' })
  update(
    @Param('id') id: string,
    @Body(new ValidationPipe({ whitelist: true }))
    updateData: Partial<DepartmentData>,
  ): Promise<Department> {
    return this.deptService.update(id, updateData);
  }

  @Delete(':id')
  @Roles('Admin')
  @ApiOperation({ summary: 'Delete a department (Admin only)' })
  delete(@Param('id') id: string): Promise<Department> {
    return this.deptService.delete(id);
  }
}
