import { SortOrder } from "./SortOrder";

export interface FetchArticlesParams {
  searchTerm: string;
  fromDate: string;
  toDate: string;
  category: string;
  source: string;
  page: number;
  sortOrder: SortOrder;
}
