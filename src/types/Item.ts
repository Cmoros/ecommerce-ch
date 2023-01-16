export default interface IItem {
  name: string;
  title: string;
  price: number;
  pictureUrl: string;
  category: "grain" | "vegetable" | "fruit";
  id: number;
  description: string;
  nutritions: {
    carbohydrates: number;
    protein: number;
    fat: number;
    calories: number;
    sugar: number;
  };
}
