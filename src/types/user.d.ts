interface User {
  id: string;
  uuid: string;
  name: string;
  email: string;
  password?: string;
  cartId: Cart<DocumentReference<DocumentData>>;
}
