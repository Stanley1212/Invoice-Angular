import { ArticuloCreateDto } from "../articulo/articulo-create-dto";


export class ProductionDetail {
    constructor() {
        this.item = new ArticuloCreateDto();
    }
    id: number;
    productionID: number;
    itemID: number;
    quantity: number;
    item: ArticuloCreateDto;
}

export class ProduccionCreateDto {
    constructor() {
        this.item = new ArticuloCreateDto();
        this.productionDetails = [];
    }
    itemID: number;
    quantity: number;
    item: ArticuloCreateDto;
    productionDetails: ProductionDetail[];
    id: number;
    userCreated: string;
    active: boolean;
}
