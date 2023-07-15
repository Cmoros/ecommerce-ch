import { fireEvent, render } from "@testing-library/react";
import CartItem, { IProps } from "components/CartItem";
import { MemoryRouter } from "react-router-dom";

describe("CartItem", () => {
  const renderCartItem = (
    item: IProps["item"],
    onUpdate: IProps["onUpdate"],
    onRemove: IProps["onRemove"]
  ) =>
    render(
      <MemoryRouter>
        <CartItem item={item} onUpdate={onUpdate} onRemove={onRemove} />
      </MemoryRouter>
    );

  const testItem1: IProps["item"] = {
    name: "Brown Rice",
    quantity: 5,
    title: "Organic Brown Rice",
    price: 47,
    stock: 20,
    pictureUrl:
      "https://cdn.mos.cms.futurecdn.net/WiB5sGgjBe5tcryxwdak8C-1200-80.jpg",
    category: "grain",
    id: "1",
    description:
      "Whole grain brown rice, perfect for a healthy and satisfying meal.",
    nutritions: {
      carbohydrates: 45,
      protein: 5,
      fat: 1,
      calories: 210,
      sugar: 0,
    },
  };

  const onUpdate = jest.fn();
  const onRemove = jest.fn();

  it("should render items properties correctly", async () => {
    const { getByTestId } = renderCartItem(testItem1, onUpdate, onRemove);

    const image = getByTestId("cartitem-image");
    const link = getByTestId("cartitem-link");
    const title = getByTestId("cartitem-title");
    const price = getByTestId("cartitem-price");
    const subtotal = getByTestId("cartitem-subtotal");

    expect(image).toHaveAttribute("src", testItem1.pictureUrl);
    expect(image).toHaveAttribute("alt", testItem1.title);
    expect(link.getAttribute("href")).toContain(`/item/${testItem1.id}`);
    expect(title).toHaveTextContent(testItem1.title);
    expect(price).toHaveTextContent(testItem1.price + "");
    expect(subtotal).toHaveTextContent(
      testItem1.price * testItem1.quantity + ""
    );
  });

  it("should call onRemove when clicking close button", async () => {
    const onRemove = jest.fn();
    const { getByTestId } = renderCartItem(testItem1, onUpdate, onRemove);

    const removeBtn = getByTestId("cartitem-remove");

    fireEvent.click(removeBtn);

    expect(onRemove).toHaveBeenCalled();
  });

  it("should call onUpdate when clicking in children", async () => {
    const onUpdate = jest.fn();
    const { getByTestId } = renderCartItem(testItem1, onUpdate, onRemove);

    const minusBtn = getByTestId("minus-1");
    const addBtn = getByTestId("add-1");

    fireEvent.click(addBtn);
    expect(onUpdate).toHaveBeenCalledTimes(1);
    fireEvent.click(minusBtn);
    expect(onUpdate).toHaveBeenCalledTimes(2);
  });
});
