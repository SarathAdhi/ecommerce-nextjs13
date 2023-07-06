import { filterDocs } from "@backend/lib";
import { getDoc, where } from "firebase/firestore";
import { cookies } from "next/dist/client/components/headers";
import { redirect } from "next/navigation";

export const getUserProfile = async (redirectPath = "", _userId = "") => {
  const userId = _userId ? { value: _userId } : cookies().get("token-user");

  if (!userId?.value && redirectPath) redirect(redirectPath);

  if (!userId?.value) return null;

  const user = (await filterDocs(
    "users",
    where("uuid", "==", userId.value)
  )) as User[];

  const userDetails = user.length !== 0 ? user[0] : null;

  return userDetails;
};

export const getSellerProfile = async (redirectPath = "", _userId = "") => {
  const userId = _userId ? { value: _userId } : cookies().get("token-seller");

  if (!userId?.value && redirectPath) redirect(redirectPath);

  if (!userId?.value) return null;

  const user = (await filterDocs(
    "sellers",
    where("uuid", "==", userId.value)
  )) as Seller[];

  const sellerDetails = user.length !== 0 ? user[0] : null;

  return sellerDetails;
};
