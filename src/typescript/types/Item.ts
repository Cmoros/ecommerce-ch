export type Category = "grain" | "vegetable" | "fruit";

export type Nutritions = {
  carbohydrates: number;
  protein: number;
  fat: number;
  calories: number;
  sugar: number;
};

export default interface IItem {
  name: string;
  title: string;
  price: number;
  stock: number;
  pictureUrl: string;
  category: Category;
  id: string;
  description: string;
  nutritions: Nutritions;
}

export interface IItemCard extends IItem {
  quantity: number;
}
