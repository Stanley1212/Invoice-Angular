import { ArticuloCreateDto } from '../articulo/articulo-create-dto';

export class ComprasDetailDto {
    constructor() {
    this.item = new ArticuloCreateDto();
    }
    id: number;
    billID: number;
    itemID: number;
    quantity: number;
    price: number;
    discount: number;
    total: number;
    item: ArticuloCreateDto;
}
