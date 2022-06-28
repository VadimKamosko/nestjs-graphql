import { Module } from '@nestjs/common';
import { BandService } from './band.service';
import { BandResolver } from './band.resolver';
import { HttpModule } from '@nestjs/axios';

@Module({
  imports:[HttpModule],
  providers: [BandService, BandResolver]
})
export class BandModule {}
