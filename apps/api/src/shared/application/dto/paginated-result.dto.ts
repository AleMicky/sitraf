export class PaginatedResultDto<T> {
  data: T[];
  page: number;
  pageSize: number;
  total: number;
  totalPages: number;

  constructor(data: T[], page: number, pageSize: number, total: number) {
    this.data = data;
    this.page = page;
    this.pageSize = pageSize;
    this.total = total;
    this.totalPages = Math.ceil(total / pageSize);
  }
}
