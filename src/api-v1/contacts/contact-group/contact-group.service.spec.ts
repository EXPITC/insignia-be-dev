import { Test, TestingModule } from '@nestjs/testing';
import { ContactGroupService } from './contact-group.service';

describe('ContactGroupService', () => {
  let service: ContactGroupService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [ContactGroupService],
    }).compile();

    service = module.get<ContactGroupService>(ContactGroupService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
