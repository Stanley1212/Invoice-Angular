import { ClientesCreateDto } from "../clientes/clientes-create-dto";
import { VentasDetailDto } from "./ventas-detail-dto";


export class VentasCreateListDto {
    constructor(){
        this.customer = new ClientesCreateDto();
        this.invoiceDetails = [];
    }
    customerID: number;
    description: string;
    discount: number;
    total: number;
    customer: ClientesCreateDto;
    invoiceDetails: VentasDetailDto[];
    id: number;
    active: boolean;
}