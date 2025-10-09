import { Test, TestingModule } from '@nestjs/testing';
import { ApplicationTypeService } from './application-type.service';

describe('ApplicationTypeService', () => {
  let service: ApplicationTypeService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [ApplicationTypeService],
    }).compile();

    service = module.get<ApplicationTypeService>(ApplicationTypeService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
