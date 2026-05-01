import { Injectable, NotFoundException, BadRequestException } from '@nestjs/common';
import { Prisma } from '../../generated/prisma/client';
import { DatabaseService } from 'src/database/database.service';

@Injectable()
export class EmployeesService {
  constructor(private readonly databaseService: DatabaseService) { }
  
  async create(createEmployeeDto: Prisma.EmployeeCreateInput) {
    try {
      return await this.databaseService.employee.create({ data: createEmployeeDto })
    } catch (error) {
      if (error instanceof Prisma.PrismaClientValidationError) {
        throw new BadRequestException('Invalid input. Make sure all fields match their expected types (e.g., role must be INTERN, ENGINEER, or ADMIN).');
      }
      throw error;
    }
  }

  async findAll(role?: 'INTERN' | 'ENGINEER' | 'ADMIN') {
    if (role) {
      return this.databaseService.employee.findMany({ where: { role } })
    }
    return this.databaseService.employee.findMany()
  }

  async findOne(id: number) {
    return this.databaseService.employee.findUnique({ where: { id, } })
  }

  async update(id: number, updateEmployeeDto: Prisma.EmployeeUpdateInput) {
    try {
      return await this.databaseService.employee.update({
        where: { id, },
        data: updateEmployeeDto
      })
    } catch (error) {
      if (error instanceof Prisma.PrismaClientValidationError) {
        throw new BadRequestException('Invalid input. Make sure all fields match their expected types (e.g., role must be INTERN, ENGINEER, or ADMIN).');
      }
      throw error;
    }
  }

  async remove(id: number) {
    return this.databaseService.employee.delete({ where: { id, } })
  }
}
