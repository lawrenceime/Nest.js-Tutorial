import { Test, TestingModule } from '@nestjs/testing';
import { EmoloyeesController } from './employees.controller';
import { EmoloyeesService } from './employees.service';

describe('EmoloyeesController', () => {
  let controller: EmoloyeesController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [EmoloyeesController],
      providers: [EmoloyeesService],
    }).compile();

    controller = module.get<EmoloyeesController>(EmoloyeesController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
