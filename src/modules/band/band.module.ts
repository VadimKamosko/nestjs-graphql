import { Module } from '@nestjs/common';
import { BandService } from './band.service';
import { BandResolver } from './band.resolver';
import { HttpModule } from '@nestjs/axios';
import { ReferenceService } from 'src/reference/reference.service';

@Module({
  imports: [HttpModule],
  providers: [BandService, BandResolver, ReferenceService],
})
export class BandModule {}
