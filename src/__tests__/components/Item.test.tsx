import { render, fireEvent } from "@testing-library/react";
import Item, { IPropsCard } from "components/Item";
import { MemoryRouter } from "react-router-dom";
import { IItemCard } from "typescript/types/Item";

const item: IItemCard = {
  id: "item1",
  name: "Test Item",
  title: "Test Title",
  quantity: 1,
  price: 10,
  stock: 5,
  pictureUrl: "test.jpg",
  category: "grain",
  description: "Test description",
  nutritions: {
    carbohydrates: 0,
    protein: 0,
    fat: 0,
    calories: 0,
    sugar: 0,
  },
};

const addItem = jest.fn();
const onLike = jest.fn();

const props: IPropsCard = {
  item,
  addItem,
  onLike,
  liked: false,
};
describe("Item", () => {
  it("Should render the item title", () => {
    const { getByTestId } = render(
      <MemoryRouter>
        <Item {...props} />
      </MemoryRouter>
    );

    expect(getByTestId("title")).toHaveTextContent(item.title);
  });

  it("shows the item count button if stock greater than 0", async () => {
    const { getByTestId, queryByTestId } = render(
      <MemoryRouter>
        <Item {...props} />
      </MemoryRouter>
    );

    expect(getByTestId("item-count")).toBeInTheDocument();
    expect(queryByTestId("no-stock")).not.toBeInTheDocument();
  });

  it("shows no stock badger if stock greater than 0", async () => {
    const { getByTestId, queryByTestId } = render(
      <MemoryRouter>
        <Item {...props} liked={true} item={{ ...item, stock: 0 }} />
      </MemoryRouter>
    );

    expect(getByTestId("no-stock")).toBeInTheDocument();
    expect(queryByTestId("item-count")).not.toBeInTheDocument();
  });
});

describe("Item with children", () => {
  test("Should call the onLike function when the like button is clicked", () => {
    const onLike = jest.fn();
    const { getByTestId } = render(
      <MemoryRouter>
        <Item {...props} onLike={onLike} />
      </MemoryRouter>
    );

    fireEvent.click(getByTestId("add-like"));

    expect(onLike).toHaveBeenCalled();
    expect(onLike).toHaveBeenCalledWith(item.id, true);
  });

  test("Should call the onLike function when the dislike button is clicked", () => {
    const onLike = jest.fn();
    const { getByTestId } = render(
      <MemoryRouter>
        <Item {...props} liked={true} onLike={onLike} />
      </MemoryRouter>
    );

    fireEvent.click(getByTestId("rm-like"));

    expect(onLike).toHaveBeenCalled();
    expect(onLike).toHaveBeenCalledWith(item.id, false);
  });

  test("Should call the addItem function when the add button is clicked", async () => {
    const addItem = jest.fn();
    const { getByTestId } = render(
      <MemoryRouter>
        <Item {...props} addItem={addItem} />
      </MemoryRouter>
    );

    fireEvent.click(getByTestId("add-to-cart"));

    expect(addItem).toHaveBeenCalled();
    expect(addItem).toHaveBeenCalledWith(item);
  });
});
