export class Pagination<T> {
    currentPage:number;
    totalPages: number;
    pageSize: number;
    totalRecords: number;
    hasPrevious: boolean;
    hasNext: boolean;
    data: T;
}
