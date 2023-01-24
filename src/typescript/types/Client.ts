export interface Client {
  email: string;
  phone: string;
  id?: string;
  name: string;
  token?: string;
  likes: string[];
}

export const defaultUser: Client = {
  email: "default",
  name: "default",
  phone: "default",
  likes: [],
};

export type ClientFull = Required<Client>;

export const defaultFullUser: ClientFull = {
  email: "default",
  name: "default",
  id: "default",
  token: "default",
  phone: "default",
  likes: [],
};
