import { Test, TestingModule } from '@nestjs/testing';
import { AttributeTypeController } from './attribute-type.controller';
import { AttributeTypeService } from './attribute-type.service';

describe('AttributeTypeController', () => {
  let controller: AttributeTypeController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [AttributeTypeController],
      providers: [AttributeTypeService],
    }).compile();

    controller = module.get<AttributeTypeController>(AttributeTypeController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
