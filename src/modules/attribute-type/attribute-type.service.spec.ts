import { Test, TestingModule } from '@nestjs/testing';
import { AttributeTypeService } from './attribute-type.service';

describe('AttributeTypeService', () => {
  let service: AttributeTypeService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [AttributeTypeService],
    }).compile();

    service = module.get<AttributeTypeService>(AttributeTypeService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
