export interface Service {
  id: string;
  basicPrice: number;
  basicServiceCategoryId: string;
  description: string;
  duration: number;
  name: string;
  companyId?: string;
}
