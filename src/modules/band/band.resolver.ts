import { Args, Mutation, Query, Resolver } from '@nestjs/graphql';
import { BandService } from './band.service';
import { GetBandArg } from './DTO/get-bandarg';
import { GetGenresArgs } from './DTO/get-genresarg';
import { CreateInputBand } from './input/create-bandinput';
import { DeleteBandInput } from './input/delete-bandinput';
import { UpdateInputBand } from './input/update-bandinput';
import { Band } from './models/band';

@Resolver()
export class BandResolver {
  constructor(private readonly bandService: BandService) {}

  @Query(() => Band, { name: 'band', nullable: true })
  getBand(@Args() idBand: GetBandArg): Promise<Band> {
    return this.bandService.getBand(idBand);
  }


  @Query(() => [Band], { name: 'bands', nullable: true })
  getBands(@Args()bands:GetGenresArgs): Promise<Band[]> {
    return this.bandService.getBands(bands);
  }


  @Mutation(() => Band)
  createBand(@Args('createBand') createBandData: CreateInputBand): Promise<Band> {
    return this.bandService.createBand(createBandData);
  }

  @Mutation(() => Band)
  updateBand(@Args('updateBand') band: UpdateInputBand): Promise<Band> {
    return this.bandService.updateBand(band);
  }

  @Mutation(() => Band)
  removeBand(
    @Args('removeBand') idBand: DeleteBandInput,
  ): Promise<DeleteBandInput> {
    return this.bandService.removeBands(idBand);
  }
}
