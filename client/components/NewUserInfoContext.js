import { createContext } from "react";

export const NewUserInfoContext = createContext({
  newUserInfo: {},
  setNewUserInfo: (info) => {},
});
