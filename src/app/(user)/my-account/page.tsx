import React from "react";
import LogoutButton from "@modules/user/my-account/LogoutButton";
import { getUserProfile } from "@utils/get-profile";

const MyAccount = async () => {
  const user = await getUserProfile("/?auth=login");

  return (
    <div>
      <LogoutButton />
    </div>
  );
};

export default MyAccount;
