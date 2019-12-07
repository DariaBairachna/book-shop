export interface BookDataModel {
  cover?: string;
  title: string;
  description: string;
  category: string;
  price: number;
  currency: string;
  author: Array<number>;
}
