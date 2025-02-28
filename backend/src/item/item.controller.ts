import { Controller } from '@nestjs/common';
import { ItemService } from './item.service';

@Controller({
  path: 'item',
  version: '1',
})
export class ItemController {
  constructor(private readonly itemService: ItemService) {}
}
