import { Controller, UseInterceptors } from '@nestjs/common';
import { ItemService } from './item.service';
import { TransformInterceptor } from '../interceptors/transform.interceptor';
import { ItemDto } from './dto/readItem.dto';

@Controller({
  path: 'item',
  version: '1',
})
@UseInterceptors(new TransformInterceptor(ItemDto))
export class ItemController {
  constructor(private readonly itemService: ItemService) {}
}
