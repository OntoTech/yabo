import { Test, TestingModule } from '@nestjs/testing';
import { ApplicationTypeController } from './application-type.controller';
import { ApplicationTypeService } from './application-type.service';

describe('ApplicationTypeController', () => {
  let controller: ApplicationTypeController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [ApplicationTypeController],
      providers: [ApplicationTypeService],
    }).compile();

    controller = module.get<ApplicationTypeController>(ApplicationTypeController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
