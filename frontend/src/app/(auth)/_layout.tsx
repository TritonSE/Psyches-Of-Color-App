import { Redirect, Slot } from "expo-router";
import { useContext } from "react";

import { UserContext } from "@/contexts/userContext";

const AuthLayout = () => {
  const { firebaseUser } = useContext(UserContext);

  if (firebaseUser) {
    return <Redirect href="/" />;
  }

  return <Slot />;
};

export default AuthLayout;
