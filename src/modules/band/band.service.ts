import { HttpService } from '@nestjs/axios';
import {
  ForbiddenException,
  forwardRef,
  Inject,
  Injectable,
} from '@nestjs/common';
import { stringify } from 'qs';
import { ReferenceService } from 'src/reference/reference.service';
import { Path } from 'src/urls/urls';
import { GetBandArg } from './DTO/get-bandarg';
import { CreateInputBand } from './input/create-bandinput';
import { DeleteBandInput } from './input/delete-bandinput';
import { UpdateInputBand } from './input/update-bandinput';
import { Band } from './models/band';

@Injectable()
export class BandService {
  constructor(
    private readonly httpService: HttpService,
    @Inject(forwardRef(() => ReferenceService))
    private refSer: ReferenceService,
  ) {}

  async createBand(body: CreateInputBand, token: string): Promise<Band> {
    if (!token) throw new ForbiddenException();
    const bandmRen = await this.refSer.renameField(body);
    const data = await this.httpService.axiosRef.post(Path.band, bandmRen, {
      headers: {
        Authorization: `${token}`,
      },
    });

    return this.getBand({ id: data.data._id });
  }
  async updateBand(body: UpdateInputBand, token: string): Promise<Band> {
    if (!token) throw new ForbiddenException();
    const bandRen = await this.refSer.renameField(body);

    const data = await this.httpService.axiosRef.put(
      Path.band + body.id,
      bandRen,
      {
        headers: {
          Authorization: `${token}`,
        },
      },
    );

    return this.getBand({ id: data.data._id });
  }
  async getBand(id: GetBandArg): Promise<Band> {
    const data = await this.httpService.axiosRef.get(Path.band + id.id);
    const props = await this.refSer.getByids(data.data);

    return { ...props };
  }

  async getBands(getBands): Promise<Band[]> {
    const data = await this.httpService.axiosRef.get(
      `${Path.band}?limit=${getBands.limit}&offset=${
        getBands.offset
      }&${stringify(getBands.filter)}`,
    );

    const ans = await Promise.all(
      data.data.items.map(async (item) => {
        const props = await this.refSer.getByids(item);

        return {
          ...props,
        };
      }),
    );
    return ans;
  }

  async removeBands(
    id: DeleteBandInput,
    token: string,
  ): Promise<DeleteBandInput> {
    if (!token) throw new ForbiddenException();
    const data = await this.httpService.axiosRef.delete(Path.band + id.id, {
      headers: {
        Authorization: `${token}`,
      },
    });
    return id;
  }
}
