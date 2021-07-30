import { ArticuloCreateDto } from "../articulo/articulo-create-dto";

export class VentasDetailDto {

    constructor() {
        this.item = new ArticuloCreateDto();
    }
    id: number;
    invoiceID: number;
    itemID: number;
    quantity: number;
    price: number;
    discount: number;
    total: number;
    item: ArticuloCreateDto;
}