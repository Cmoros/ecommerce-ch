/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable @typescript-eslint/ban-ts-comment */
//@ts-nocheck
import IItem from "typescript/types/Item";
import { searchObjEquality } from "utils";

const DEFAULT_PICTURE_URL =
  "https://images.unsplash.com/photo-1610832958506-aa56368176cf?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1470&q=80";

const items: IItem[] = [
  {
    name: "Brown Rice",
    title: "Organic Brown Rice",
    price: 47,
    stock: 20,
    pictureUrl:
      "https://cdn.mos.cms.futurecdn.net/WiB5sGgjBe5tcryxwdak8C-1200-80.jpg",
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
    stock: 1,
    pictureUrl:
      "https://cdn.apartmenttherapy.info/image/upload/f_auto,q_auto:eco,c_fill,g_auto,w_1500,ar_3:2/k%2Farchive%2Fd4fc553aa34f8086392b5cd44695759b57b5795d",
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
    stock: 5,
    pictureUrl:
      "https://localfarmbox.co.uk/images/P/Broccoli-in-a-pile-593310638_3020x2000.jpeg",
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
    stock: 7,
    pictureUrl:
      "https://www.tasteofhome.com/wp-content/uploads/2019/01/carrots-shutterstock_789443206.jpg",
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
    stock: 2,
    pictureUrl:
      "https://parade.com/.image/t_share/MTkwNTgxNDY1MzcxMTkxMTY0/different-types-of-apples-jpg.jpg",
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
    stock: 4,
    pictureUrl:
      "https://www.mundodeportivo.com/files/article_main_microformat/uploads/2022/09/23/632d88443332c.jpeg",
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
    stock: 17,
    pictureUrl:
      "https://i0.wp.com/post.healthline.com/wp-content/uploads/2019/05/spinach-1296x728-header.jpg?w=1155&h=1528",
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
    stock: 18,
    pictureUrl:
      "https://upload.wikimedia.org/wikipedia/commons/thumb/5/58/Ipomoea_batatas_006.JPG/800px-Ipomoea_batatas_006.JPG",
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
    stock: 20,
    pictureUrl:
      "https://images-prod.healthline.com/hlcmsresource/images/AN_images/blueberries-1296x728-feature.jpg",
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
    stock: 5,
    pictureUrl: "https://ichef.bbci.co.uk/images/ic/1200xn/p0c9xp4y.jpg",
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
    stock: 14,
    pictureUrl:
      "https://hips.hearstapps.com/hmg-prod/images/766/everything-you-need-to-know-about-blackberries-main-1499890002.jpg?crop=1xw:0.884xh;center,top&resize=1200:*",
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
    stock: 12,
    pictureUrl:
      "https://www.tastingtable.com/img/gallery/how-to-pick-out-the-best-fresh-cherries/l-intro-1655490775.jpg",
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
    stock: 18,
    pictureUrl:
      "https://hips.hearstapps.com/hmg-prod/images/oats-1525899016.jpg?crop=1.00xw:0.753xh;0,0.117xh&resize=1200:*",
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
    stock: 10,
    pictureUrl:
      "https://imagesvc.meredithcorp.io/v3/mm/image?q=60&c=sc&poi=face&url=https%3A%2F%2Fimg1.cookinglight.timeinc.net%2Fsites%2Fdefault%2Ffiles%2Fstyles%2F4_3_horizontal_-_1200x900%2Fpublic%2F1561576233%2FGettyImages-689997322.jpg%3Fitok%3Dp0XFQUy-",
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
    stock: 4,
    pictureUrl:
      "https://post.healthline.com/wp-content/uploads/2020/09/cauliflower-thumb.jpg",
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
    stock: 1,
    pictureUrl:
      "https://healthyfamilyproject.com/wp-content/uploads/2020/05/Kale-background.jpg",
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
    stock: 20,
    pictureUrl:
      "https://www.thespruceeats.com/thmb/l1_lV7wgpqRArWBwpG3jzHih_e8=/1500x0/filters:no_upscale():max_bytes(150000):strip_icc()/what-are-grapes-5193263-hero-01-80564d77b6534aa8bfc34f378556e513.jpg",
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
    stock: 4,
    pictureUrl:
      "https://www.tastingtable.com/img/gallery/why-you-should-leave-the-skin-on-pears/intro-1653326060.jpg",
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
    stock: 17,
    pictureUrl:
      "https://cdn.cdnparenting.com/articles/2018/02/716619553-H.webp",
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
    stock: 14,
    pictureUrl:
      "https://www.lifeberrys.com/img/article/mushroom-1635005677-lb.jpg",
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
    stock: 1,
    pictureUrl:
      "https://extension.usu.edu/preserve-the-harvest/images/peaches.jpg",
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
    stock: 18,
    pictureUrl:
      "https://helios-i.mashable.com/imagery/articles/05W5DssM7oLPbBjiU4ZY6ob/hero-image.fill.size_1248x702.v1645798494.jpg",
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
    stock: 14,
    pictureUrl:
      "https://hosstools.com/wp-content/uploads/2020/10/national-pickling-cucumber.jpg",
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
    stock: 7,
    pictureUrl:
      "https://www.tastingtable.com/img/gallery/the-science-behind-seedless-oranges/intro-1655473463.jpg",
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
    stock: 18,
    pictureUrl:
      "https://cdn.shopify.com/s/files/1/0685/2511/products/IMG_4231_1024x1024@2x.jpg?v=1617834257",
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
    stock: 1,
    pictureUrl:
      "https://thecounter.org/wp-content/uploads/2018/05/organic-red-peppers-cost-washington.jpg",
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
    stock: 20,
    pictureUrl:
      "https://images.ctfassets.net/3s5io6mnxfqz/7sSxQtLd1GyJG5BzSzEmAM/aeae6aea4f279be19cca97331ad84ac5/AdobeStock_279894808.jpeg",
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
    stock: 14,
    pictureUrl:
      "https://cdn.britannica.com/64/143464-050-B0EC6714/Eggplant.jpg",
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
    stock: 10,
    pictureUrl:
      "https://www.thespruce.com/thmb/2IelqUnPOiA5BKn4T_qsRuhf8sc=/1500x0/filters:no_upscale():max_bytes(150000):strip_icc()/how-to-grow-watermelons-1403491-04-486c20b0c2a54ebe97b437d6707fff65.jpg",
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
    stock: 10,

    pictureUrl:
      "https://a-z-animals.com/media/2022/08/group-shoot-of-sliced-cantaloupe-melons-picture-id454265781-1024x614.jpg",
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

const DELAY_TIME = 500;

function fakeGet(q: Partial<IItem> = {}) {
  return new Promise<IItem[]>((res) => {
    setTimeout(() => {
      res(items.filter((item) => searchObjEquality<IItem>(item, q)));
    }, DELAY_TIME);
  });
}

function getItem(
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
