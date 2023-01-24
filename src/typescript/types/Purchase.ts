import { IItemCard } from "components//../typescript/types/Item";
import { Client } from "./Client";

export interface Purchase {
  buyer: Omit<Client, "likes">;
  items: (Pick<IItemCard, "id" | "title" | "price" | "quantity"> & {
    subtotal: number;
  })[];
  total: number;
  date: Date;
  id: string;
}
