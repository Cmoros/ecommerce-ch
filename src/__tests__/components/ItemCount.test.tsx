import React from "react";
import { render, fireEvent, waitFor } from "@testing-library/react";
import ItemCount from "components/ItemCount";

describe("<ItemCount />", () => {
  it("increments and decrements the quantity correctly", async () => {
    const { getByTestId } = render(
      <ItemCount
        stock={5}
        initial={1}
        onAdd={() => console.log("not empty function")}
      />
    );

    const addButton = getByTestId("add-1");
    const subtractButton = getByTestId("minus-1");
    const quantityText = getByTestId("quantity");

    expect(subtractButton).toBeDisabled();

    fireEvent.click(addButton);
    expect(quantityText).toHaveTextContent("2");
    expect(subtractButton).not.toBeDisabled();

    fireEvent.click(subtractButton);
    expect(quantityText).toHaveTextContent("1");
    expect(subtractButton).toBeDisabled();

    fireEvent.click(addButton);
    fireEvent.click(addButton);
    fireEvent.click(addButton);
    fireEvent.click(addButton);
    expect(quantityText).toHaveTextContent("5");
    expect(addButton).toBeDisabled();

    fireEvent.click(subtractButton);
    expect(quantityText).toHaveTextContent("4");
    expect(addButton).not.toBeDisabled();

    fireEvent.click(subtractButton);
    fireEvent.click(subtractButton);
    fireEvent.click(subtractButton);
    expect(quantityText).toHaveTextContent("1");
    expect(subtractButton).toBeDisabled();
  });

  it("displays the correct button text and style", async () => {
    const { getByTestId } = render(
      <ItemCount
        stock={10}
        initial={5}
        onAdd={() => console.log("not empty function")}
      />
    );

    const addToCartButton = getByTestId("add-to-cart");

    fireEvent.click(addToCartButton);
    expect(addToCartButton).toHaveTextContent("Added to Cart");
    // expect(addToCartButton).toHaveProperty("colorScheme", "green");
    // expect(addToCartButton).toHaveStyle("color: ButtonText");
    // expect(addToCartButton).toHaveStyle("color: green");

    await waitFor(
      () => expect(addToCartButton).toHaveTextContent("Add to Cart"),
      { timeout: 2100 }
    );
    expect(addToCartButton).toHaveTextContent("Add to Cart");
    // expect(addToCartButton).toHaveStyle("color: red");
  });

  it("calls the onAdd prop with the correct quantity", () => {
    const onAdd = jest.fn();
    const { getByTestId } = render(
      <ItemCount stock={10} initial={5} onAdd={onAdd} />
    );

    const addButton = getByTestId("add-1");
    const addToCartButton = getByTestId("add-to-cart");

    fireEvent.click(addButton);
    fireEvent.click(addToCartButton);

    expect(onAdd).toHaveBeenCalledWith(6);
    expect(onAdd).toHaveBeenCalledTimes(1);
  });

  it("can't add product with 0 stock provided", async () => {
    const onAdd = jest.fn();
    const { getByTestId } = render(
      <ItemCount stock={0} initial={3} onAdd={onAdd} />
    );

    const addButton = getByTestId("add-1");
    const subtractButton = getByTestId("minus-1");
    const addToCartButton = getByTestId("add-to-cart");
    const quantityText = getByTestId("quantity");

    expect(addButton).toBeDisabled();
    expect(addToCartButton).toBeDisabled();
    expect(quantityText).toHaveTextContent("N/S");

    fireEvent.click(addToCartButton);
    expect(addToCartButton).toHaveTextContent("Add to Cart");
    expect(onAdd).not.toHaveBeenCalled();

    expect(subtractButton).toBeDisabled();

    fireEvent.click(addButton);
    expect(quantityText).toHaveTextContent("N/S");

    fireEvent.click(subtractButton);
    expect(quantityText).toHaveTextContent("N/S");
  });

  it("handles wrong values of props", () => {
    const onAdd = jest.fn();
    const { getByTestId } = render(
      <ItemCount stock={-1} initial={-1} onAdd={onAdd} />
    );

    const addButton = getByTestId("add-1");
    const subtractButton = getByTestId("minus-1");
    const addToCartButton = getByTestId("add-to-cart");
    const quantityText = getByTestId("quantity");

    expect(addToCartButton).toBeDisabled();
    expect(subtractButton).toBeDisabled();
    expect(addButton).toBeDisabled();
    expect(quantityText).toHaveTextContent("N/S");
  });

  it("can't go below 1 or higher than stock", async () => {
    const onAdd = jest.fn();
    const { getByTestId } = render(
      <ItemCount stock={4} initial={2} onAdd={onAdd} />
    );

    const addButton = getByTestId("add-1");
    const subtractButton = getByTestId("minus-1");
    const quantityText = getByTestId("quantity");

    fireEvent.click(addButton);
    fireEvent.click(addButton);
    fireEvent.click(addButton);
    fireEvent.click(addButton);
    fireEvent.click(addButton);
    expect(quantityText).toHaveTextContent("4");

    fireEvent.click(subtractButton);
    fireEvent.click(subtractButton);
    fireEvent.click(subtractButton);
    fireEvent.click(subtractButton);
    fireEvent.click(subtractButton);
    fireEvent.click(subtractButton);

    expect(quantityText).toHaveTextContent("1");
  });

  it("can't add more than the current stock", () => {
    const onAdd = jest.fn();
    const { getByTestId } = render(
      <ItemCount stock={2} initial={4} onAdd={onAdd} />
    );

    const addButton = getByTestId("add-1");
    const subtractButton = getByTestId("minus-1");
    const addToCartButton = getByTestId("add-to-cart");
    // const quantityText = getByTestId("quantity");

    fireEvent.click(addToCartButton);

    expect(onAdd).not.toHaveBeenCalled();

    fireEvent.click(subtractButton);
    fireEvent.click(addButton);

    fireEvent.click(addToCartButton);
    expect(onAdd).not.toHaveBeenCalled();

    fireEvent.click(addButton);

    fireEvent.click(subtractButton);
    fireEvent.click(subtractButton);
    fireEvent.click(addToCartButton);
    expect(onAdd).toHaveBeenCalled();
  });
});
