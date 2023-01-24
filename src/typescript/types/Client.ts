export interface Client {
  email: string;
  phone: string;
  id?: string;
  name: string;
}

export const defaultUser: Client = {
  email: "default",
  name: "default",
  phone: "default",
};
