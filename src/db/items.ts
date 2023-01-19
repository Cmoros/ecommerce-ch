import IItem from "typescript/types/Item";
import { searchObjEquality } from "utils";

const items: IItem[] = [
  {
    name: "Brown Rice",
    title: "Organic Brown Rice",
    price: 47,
    pictureUrl:
      "https://images.unsplash.com/photo-1610832958506-aa56368176cf?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1470&q=80",
    category: "grain",
    id: 1,
    description:
      "Whole grain brown rice, perfect for a healthy and satisfying meal.",
    nutritions: {
      carbohydrates: 45,
      protein: 5,
      fat: 1,
      calories: 210,
      sugar: 0,
    },
  },
  {
    name: "Quinoa",
    title: "Organic Quinoa",
    price: 67,
    pictureUrl:
      "https://images.unsplash.com/photo-1610832958506-aa56368176cf?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1470&q=80",
    category: "grain",
    id: 2,
    description:
      "Gluten-free quinoa, a superfood packed with protein and minerals.",
    nutritions: {
      carbohydrates: 40,
      protein: 8,
      fat: 3,
      calories: 222,
      sugar: 1,
    },
  },
  {
    name: "Broccoli",
    title: "Fresh Broccoli",
    price: 25,
    pictureUrl:
      "https://images.unsplash.com/photo-1610832958506-aa56368176cf?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1470&q=80",
    category: "vegetable",
    id: 3,
    description:
      "Crunchy and healthy broccoli, rich in vitamins and antioxidants.",
    nutritions: {
      carbohydrates: 6,
      protein: 2,
      fat: 0,
      calories: 55,
      sugar: 2,
    },
  },
  {
    name: "Carrots",
    title: "Organic Carrots",
    price: 32,
    pictureUrl:
      "https://images.unsplash.com/photo-1610832958506-aa56368176cf?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1470&q=80",
    category: "vegetable",
    id: 4,
    description: "Sweet and juicy carrots, a great source of beta-carotene.",
    nutritions: {
      carbohydrates: 10,
      protein: 1,
      fat: 0,
      calories: 41,
      sugar: 5,
    },
  },
  {
    name: "Apples",
    title: "Organic Apples",
    price: 25,
    pictureUrl:
      "https://images.unsplash.com/photo-1610832958506-aa56368176cf?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1470&q=80",
    category: "fruit",
    id: 5,
    description: "Crisp and delicious apples, perfect for snacking or baking.",
    nutritions: {
      carbohydrates: 25,
      protein: 1,
      fat: 0,
      calories: 95,
      sugar: 14,
    },
  },
  {
    name: "Bananas",
    title: "Organic Bananas",
    price: 14,
    pictureUrl:
      "https://images.unsplash.com/photo-1610832958506-aa56368176cf?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1470&q=80",
    category: "fruit",
    id: 6,
    description:
      "Ripe and sweet bananas, a great source of potassium and fiber.",
    nutritions: {
      carbohydrates: 27,
      protein: 1,
      fat: 0,
      calories: 105,
      sugar: 14,
    },
  },
  {
    name: "Spinach",
    title: "Organic Spinach",
    price: 33,
    pictureUrl:
      "https://images.unsplash.com/photo-1610832958506-aa56368176cf?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1470&q=80",
    category: "vegetable",
    id: 7,
    description:
      "Fresh and nutrient-rich spinach, a great addition to salads or smoothies.",
    nutritions: {
      carbohydrates: 3,
      protein: 2,
      fat: 0,
      calories: 7,
      sugar: 0,
    },
  },
  {
    name: "Sweet Potatoes",
    title: "Organic Sweet Potatoes",
    price: 49,
    pictureUrl:
      "https://images.unsplash.com/photo-1610832958506-aa56368176cf?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1470&q=80",
    category: "vegetable",
    id: 8,
    description:
      "Tender and flavorful sweet potatoes, a great source of vitamin A.",
    nutritions: {
      carbohydrates: 27,
      protein: 2,
      fat: 0,
      calories: 103,
      sugar: 6,
    },
  },
  {
    name: "Blueberries",
    title: "Organic Blueberries",
    price: 56,
    pictureUrl:
      "https://images.unsplash.com/photo-1610832958506-aa56368176cf?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1470&q=80",
    category: "fruit",
    id: 9,
    description:
      "Tasty and antioxidant-rich blueberries, perfect for snacking or baking.",
    nutritions: {
      carbohydrates: 14,
      protein: 1,
      fat: 0,
      calories: 57,
      sugar: 9,
    },
  },
  {
    name: "Strawberries",
    title: "Organic Strawberries",
    price: 34,
    pictureUrl:
      "https://images.unsplash.com/photo-1610832958506-aa56368176cf?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1470&q=80",
    category: "fruit",
    id: 10,
    description: "Juicy and sweet strawberries, a great source of vitamin C.",
    nutritions: {
      carbohydrates: 7,
      protein: 1,
      fat: 0,
      calories: 32,
      sugar: 4,
    },
  },
  {
    name: "Blackberries",
    title: "Organic Blackberries",
    price: 66,
    pictureUrl:
      "https://images.unsplash.com/photo-1610832958506-aa56368176cf?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1470&q=80",
    category: "fruit",
    id: 11,
    description:
      "Tart and flavorful blackberries, packed with antioxidants and phytochemicals.",
    nutritions: {
      carbohydrates: 14,
      protein: 2,
      fat: 1,
      calories: 62,
      sugar: 7,
    },
  },
  {
    name: "Cherries",
    title: "Organic Cherries",
    price: 85,
    pictureUrl:
      "https://images.unsplash.com/photo-1610832958506-aa56368176cf?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1470&q=80",
    category: "fruit",
    id: 12,
    description:
      "Juicy and sweet cherries, a great source of melatonin and anthocyanins.",
    nutritions: {
      carbohydrates: 12,
      protein: 1,
      fat: 0,
      calories: 48,
      sugar: 9,
    },
  },
  {
    name: "Oats",
    title: "Organic Rolled Oats",
    price: 29,
    pictureUrl:
      "https://images.unsplash.com/photo-1610832958506-aa56368176cf?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1470&q=80",
    category: "grain",
    id: 13,
    description:
      "Heart-healthy rolled oats, perfect for making oatmeal or granola.",
    nutritions: {
      carbohydrates: 27,
      protein: 5,
      fat: 3,
      calories: 150,
      sugar: 1,
    },
  },
  {
    name: "Lentils",
    title: "Organic Lentils",
    price: 38,
    pictureUrl:
      "https://images.unsplash.com/photo-1610832958506-aa56368176cf?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1470&q=80",
    category: "grain",
    id: 14,
    description:
      "Protein-packed lentils, a great addition to soups, salads, or curries.",
    nutritions: {
      carbohydrates: 20,
      protein: 9,
      fat: 0,
      calories: 115,
      sugar: 1,
    },
  },
  {
    name: "Cauliflower",
    title: "Fresh Cauliflower",
    price: 25,
    pictureUrl:
      "https://images.unsplash.com/photo-1610832958506-aa56368176cf?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1470&q=80",
    category: "vegetable",
    id: 15,
    description:
      "Versatile and healthy cauliflower, a great low-carb substitute for rice or potatoes.",
    nutritions: {
      carbohydrates: 5,
      protein: 2,
      fat: 0,
      calories: 25,
      sugar: 2,
    },
  },
  {
    name: "Kale",
    title: "Organic Kale",
    price: 31,
    pictureUrl:
      "https://images.unsplash.com/photo-1610832958506-aa56368176cf?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1470&q=80",
    category: "vegetable",
    id: 16,
    description:
      "Nutrient-dense kale, a great source of vitamins and minerals.",
    nutritions: {
      carbohydrates: 5,
      protein: 2,
      fat: 0,
      calories: 33,
      sugar: 1,
    },
  },
  {
    name: "Grapes",
    title: "Organic Grapes",
    price: 38,
    pictureUrl:
      "https://images.unsplash.com/photo-1610832958506-aa56368176cf?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1470&q=80",
    category: "fruit",
    id: 17,
    description:
      "Juicy and sweet grapes, a great source of resveratrol and antioxidants.",
    nutritions: {
      carbohydrates: 18,
      protein: 1,
      fat: 0,
      calories: 69,
      sugar: 16,
    },
  },
  {
    name: "Pears",
    title: "Organic Pears",
    price: 26,
    pictureUrl:
      "https://images.unsplash.com/photo-1610832958506-aa56368176cf?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1470&q=80",
    category: "fruit",
    id: 18,
    description:
      "Tender and flavorful pears, a great source of fiber and vitamin C.",
    nutritions: {
      carbohydrates: 15,
      protein: 1,
      fat: 0,
      calories: 57,
      sugar: 12,
    },
  },
  {
    name: "Barley",
    title: "Organic Barley",
    price: 38,
    pictureUrl:
      "https://images.unsplash.com/photo-1610832958506-aa56368176cf?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1470&q=80",
    category: "grain",
    id: 19,
    description: "Whole grain barley, a great source of fiber and minerals.",
    nutritions: {
      carbohydrates: 28,
      protein: 4,
      fat: 1,
      calories: 130,
      sugar: 1,
    },
  },
  {
    name: "Mushrooms",
    title: "Fresh Mushrooms",
    price: 49,
    pictureUrl:
      "https://images.unsplash.com/photo-1610832958506-aa56368176cf?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1470&q=80",
    category: "vegetable",
    id: 20,
    description:
      "Meaty and flavorful mushrooms, a great source of protein and B vitamins.",
    nutritions: {
      carbohydrates: 3,
      protein: 3,
      fat: 0,
      calories: 15,
      sugar: 1,
    },
  },
  {
    name: "Peaches",
    title: "Organic Peaches",
    price: 33,
    pictureUrl:
      "https://images.unsplash.com/photo-1610832958506-aa56368176cf?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1470&q=80",
    category: "fruit",
    id: 21,
    description:
      "Juicy and sweet peaches, a great source of vitamin A and antioxidants.",
    nutritions: {
      carbohydrates: 8,
      protein: 1,
      fat: 0,
      calories: 39,
      sugar: 7,
    },
  },
  {
    name: "Pineapple",
    title: "Organic Pineapple",
    price: 42,
    pictureUrl:
      "https://images.unsplash.com/photo-1610832958506-aa56368176cf?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1470&q=80",
    category: "fruit",
    id: 22,
    description:
      "Tropical and juicy pineapple, a great source of vitamin C and bromelain.",
    nutritions: {
      carbohydrates: 13,
      protein: 1,
      fat: 0,
      calories: 52,
      sugar: 9,
    },
  },
  {
    name: "Cucumbers",
    title: "Organic Cucumbers",
    price: 24,
    pictureUrl:
      "https://images.unsplash.com/photo-1610832958506-aa56368176cf?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1470&q=80",
    category: "vegetable",
    id: 23,
    description:
      "Refreshing and hydrating cucumbers, a great source of vitamin K and silica.",
    nutritions: {
      carbohydrates: 3,
      protein: 1,
      fat: 0,
      calories: 16,
      sugar: 1,
    },
  },
  {
    name: "Oranges",
    title: "Organic Oranges",
    price: 29,
    pictureUrl:
      "https://images.unsplash.com/photo-1610832958506-aa56368176cf?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1470&q=80",
    category: "fruit",
    id: 24,
    description:
      "Juicy and flavorful oranges, a great source of vitamin C and folate.",
    nutritions: {
      carbohydrates: 9,
      protein: 1,
      fat: 0,
      calories: 62,
      sugar: 6,
    },
  },
  {
    name: "Black Beans",
    title: "Organic Black Beans",
    price: 27,
    pictureUrl:
      "https://images.unsplash.com/photo-1610832958506-aa56368176cf?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1470&q=80",
    category: "grain",
    id: 25,
    description:
      "Protein-rich black beans, perfect for making chili or burritos.",
    nutritions: {
      carbohydrates: 20,
      protein: 8,
      fat: 0,
      calories: 114,
      sugar: 1,
    },
  },
  {
    name: "Bell Peppers",
    title: "Organic Bell Peppers",
    price: 33,
    pictureUrl:
      "https://images.unsplash.com/photo-1610832958506-aa56368176cf?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1470&q=80",
    category: "vegetable",
    id: 26,
    description:
      "Colorful and nutritious bell peppers, a great source of vitamin C and antioxidants.",
    nutritions: {
      carbohydrates: 6,
      protein: 1,
      fat: 0,
      calories: 31,
      sugar: 4,
    },
  },
  {
    name: "Plums",
    title: "Organic Plums",
    price: 38,
    pictureUrl:
      "https://images.unsplash.com/photo-1610832958506-aa56368176cf?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1470&q=80",
    category: "fruit",
    id: 27,
    description:
      "Tart and juicy plums, a great source of vitamin C and antioxidants.",
    nutritions: {
      carbohydrates: 9,
      protein: 1,
      fat: 0,
      calories: 39,
      sugar: 7,
    },
  },
  {
    name: "Eggplants",
    title: "Organic Eggplants",
    price: 33,
    pictureUrl:
      "https://images.unsplash.com/photo-1610832958506-aa56368176cf?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1470&q=80",
    category: "vegetable",
    id: 28,
    description:
      "Meaty and versatile eggplants, a great source of fiber and antioxidants.",
    nutritions: {
      carbohydrates: 6,
      protein: 1,
      fat: 0,
      calories: 25,
      sugar: 3,
    },
  },
  {
    name: "Watermelon",
    title: "Organic Watermelon",
    price: 36,
    pictureUrl:
      "https://images.unsplash.com/photo-1610832958506-aa56368176cf?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1470&q=80",
    category: "fruit",
    id: 29,
    description:
      "Refreshing and hydrating watermelon, a great source of vitamins and antioxidants.",
    nutritions: {
      carbohydrates: 8,
      protein: 1,
      fat: 0,
      calories: 30,
      sugar: 6,
    },
  },
  {
    name: "Cantaloupe",
    title: "Organic Cantaloupe",
    price: 36,

    pictureUrl:
      "https://images.unsplash.com/photo-1610832958506-aa56368176cf?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1470&q=80",
    category: "fruit",
    id: 30,
    description:
      "Sweet and juicy cantaloupe, a great source of vitamins and antioxidants.",
    nutritions: {
      carbohydrates: 8,
      protein: 1,
      fat: 0,
      calories: 34,
      sugar: 6,
    },
  },
];

const DELAY_TIME = 100;

export function fakeGet(q: Partial<IItem> = {}) {
  return new Promise<IItem[]>((res) => {
    setTimeout(() => {
      res(items.filter((item) => searchObjEquality<IItem>(item, q)));
    }, DELAY_TIME);
  });
}

export function getItem(
  id: number | string = Math.ceil(Math.random() * items.length)
) {
  const idNumber = +id;
  return new Promise<IItem>((res, rej) => {
    setTimeout(() => {
      if (idNumber <= 0 || idNumber > items.length)
        return rej(new Error("Product not found"));
      res(items[idNumber - 1]);
    }, DELAY_TIME);
  });
}

export default items;
