export default interface IItem {
  genus: string;
  name: string;
  title: string;
  price: number;
  pictureUrl: string;
  id: number;
  family: string;
  order: string;
  description: string;
  nutritions: {
    carbohydrates: number;
    protein: number;
    fat: number;
    calories: number;
    sugar: number;
  };
}
