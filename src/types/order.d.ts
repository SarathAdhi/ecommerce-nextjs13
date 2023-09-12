type Order<T = DocumentReference<DocumentData>> = {
  id: T;
  userId: string;
  session_id: string;
};
