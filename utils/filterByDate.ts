import { formatISO } from "date-fns";

export const filterByDate = (currentUser, end, start) => {
  const prodByWeek = currentUser.products.filter((item) => {
    if (
      formatISO(item.createdAt) < formatISO(end) &&
      formatISO(item.createdAt) > formatISO(start)
    ) {
      return item;
    }
  });

  return prodByWeek;
};
