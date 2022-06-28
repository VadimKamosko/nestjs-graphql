import { Test, TestingModule } from '@nestjs/testing';
import { FavouriteResolver } from './favourite.resolver';

describe('FavouriteResolver', () => {
  let resolver: FavouriteResolver;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [FavouriteResolver],
    }).compile();

    resolver = module.get<FavouriteResolver>(FavouriteResolver);
  });

  it('should be defined', () => {
    expect(resolver).toBeDefined();
  });
});
