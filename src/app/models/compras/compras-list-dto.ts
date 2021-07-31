import { SuplidoresCreateDto } from "../suplidores/suplidores-create-dto";
import { ComprasDetailDto } from "./compras-detail-dto";

export class ComprasListDto {
    constructor(){
        this.supplier = new SuplidoresCreateDto();
        this.billDetails = [];
    }
    supplierID: number;
    description: string;
    discount: number;
    total: number;
    supplier: SuplidoresCreateDto;
    billDetails: ComprasDetailDto[];
    id: number;
    active: boolean;
}
