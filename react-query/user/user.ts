import { IUser } from './../../models/user/index';
export const GET_ALL_USERS = () =>
fetch(`/api/user/get-all-users`, {
  method: "GET",
  cache: "no-store",
}).then((response) => response.json())

export const GET_USER_INFO = (): Promise<{data: Partial<IUser>}> =>
fetch(`/api/user/get-user-info`, {
  method: "GET",
  cache: "no-store",
}).then((response) => response.json())

export const UPDATE_USER = (updateInfo: Partial<IUser>) => {
  return fetch("/api/user/update-user", {
    method: "POST",
    body: JSON.stringify(updateInfo)
  })
}