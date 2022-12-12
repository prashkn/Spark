import { createContext } from 'react';
import { SPARK_API } from '../screens/BackendURL';

export const UserContext = createContext({
  user: {},
  setUser: (user) => {},
});

export async function getUserInfoFromDatabase(user) {
  if (user === null) {
    return null;
  }

  const loginResponse = await fetch(
    `${SPARK_API}/users/getUser?email=${user.email}`
  );

  const body = await loginResponse.json();

  return body.data;
}
