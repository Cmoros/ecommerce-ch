import React from "react";

interface IProps {
  greeting: string;
}

const ItemListContainer = ({ greeting }: IProps) => {
  return <div>{greeting}</div>;
};

export default ItemListContainer;
