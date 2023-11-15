export const GET_ALL_USERS = () =>
fetch(`/api/user/get-all-users`, {
  method: "GET",
  cache: "no-store",
}).then((response) => response.json())