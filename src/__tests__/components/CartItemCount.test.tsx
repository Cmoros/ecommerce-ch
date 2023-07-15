import { render, fireEvent } from "@testing-library/react";
import CartItemCount from "components/CartItemCount";

describe("CartItemCount", () => {
  const onChange = jest.fn();
  it("'s minus button disabled when quantity is 1", async () => {
    const onChange = jest.fn();
    const { getByTestId } = render(
      <CartItemCount stock={5} quantity={1} onChange={onChange} />
    );

    const subtractButton = getByTestId("minus-1");
    const quantityText = getByTestId("quantity");
    const addButton = getByTestId("add-1");

    expect(subtractButton).toBeDisabled();
    expect(quantityText).toHaveTextContent(`1`);
    expect(addButton).not.toBeDisabled();

    fireEvent.click(subtractButton);

    expect(onChange).not.toHaveBeenCalled();
    fireEvent.click(subtractButton);
    expect(onChange).not.toHaveBeenCalled();
    fireEvent.click(subtractButton);
    fireEvent.click(subtractButton);
    expect(onChange).not.toHaveBeenCalled();
  });

  it("'s add button disabled when quantity is stock", async () => {
    let quantity: number;
    const stock = (quantity = 5);
    const onChange = jest.fn();
    const { getByTestId } = render(
      <CartItemCount stock={stock} quantity={quantity} onChange={onChange} />
    );

    const subtractButton = getByTestId("minus-1");
    const quantityText = getByTestId("quantity");
    const addButton = getByTestId("add-1");

    expect(quantityText).toHaveTextContent(`${quantity}`);
    expect(addButton).toBeDisabled();
    expect(subtractButton).not.toBeDisabled();

    fireEvent.click(addButton);
    expect(onChange).not.toHaveBeenCalled();
    fireEvent.click(addButton);
    expect(onChange).not.toHaveBeenCalled();
    fireEvent.click(addButton);
    fireEvent.click(addButton);
    expect(onChange).not.toHaveBeenCalled();
  });

  it("'s both buttons work in normal cases", () => {
    const quantity = 5;
    const stock = 10;
    const { getByTestId } = render(
      <CartItemCount stock={stock} quantity={quantity} onChange={onChange} />
    );

    const subtractButton = getByTestId("minus-1");
    const quantityText = getByTestId("quantity");
    const addButton = getByTestId("add-1");

    expect(quantityText).toHaveTextContent(`${quantity}`);
    expect(addButton).not.toBeDisabled();
    expect(subtractButton).not.toBeDisabled();
  });

  it("can call onChange fn when btns are pressed", () => {
    const onChange = jest.fn();
    const { getByTestId } = render(
      <CartItemCount stock={10} quantity={5} onChange={onChange} />
    );

    const subtractButton = getByTestId("minus-1");
    const addButton = getByTestId("add-1");

    fireEvent.click(addButton);
    expect(onChange).toHaveBeenCalledTimes(1);

    fireEvent.click(subtractButton);
    fireEvent.click(subtractButton);

    expect(onChange).toHaveBeenCalledTimes(3);

    fireEvent.click(addButton);
    fireEvent.click(addButton);
    expect(onChange).toHaveBeenCalledTimes(5);

    fireEvent.click(subtractButton);
    expect(onChange).toHaveBeenCalledTimes(6);
  });
});
