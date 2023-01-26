import { fireEvent, render } from "@testing-library/react";
import FavoriteButton from "components/FavoriteButton";

describe("<FavoriteButton />", () => {
  it("renders a regular heart icon when active is false", async () => {
    const onLike = jest.fn();
    const { getByTestId, queryByTestId } = render(
      <FavoriteButton active={false} onLike={onLike} />
    );
    const likeBtn = getByTestId("add-like");
    const dislikeBtn = queryByTestId("rm-like");
    expect(likeBtn).toBeInTheDocument();
    expect(dislikeBtn).not.toBeInTheDocument();
  });

  it("renders a solid heart icon when active is false", async () => {
    const onLike = jest.fn();
    const { getByTestId, queryByTestId } = render(
      <FavoriteButton active={true} onLike={onLike} />
    );
    const likeBtn = queryByTestId("add-like");
    const dislikeBtn = getByTestId("rm-like");
    expect(likeBtn).not.toBeInTheDocument();
    expect(dislikeBtn).toBeInTheDocument();
  });

  it("calls onLike with true when the regular heart icon is clicked", () => {
    const onLike = jest.fn();
    const { getByTestId } = render(
      <FavoriteButton active={false} onLike={onLike} />
    );
    const likeBtn = getByTestId("add-like");
    fireEvent.click(likeBtn);
    expect(onLike).toHaveBeenCalledWith(true);
  });

  it("calls onLike with false when the solid heart icon is clicked", () => {
    const onLike = jest.fn();
    const { getByTestId } = render(
      <FavoriteButton active={true} onLike={onLike} />
    );
    const dislikeBtn = getByTestId("rm-like");
    fireEvent.click(dislikeBtn);
    expect(onLike).toHaveBeenCalledWith(false);
  });
});
