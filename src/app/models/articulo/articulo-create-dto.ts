import { UnidadesCreate } from "../unidades/unidades-create";

export class ArticuloCreateDto {
    id:number;
    name: string;
    stock: number;
    salePrice: number;
    purchasePrice: number;
    type:number;
    unitID:number
    unit: UnidadesCreate;
    active:boolean;
}
