import { endOfMonth, startOfMonth } from "date-fns";

export const getNumbersByMonth = () => {
  const start = startOfMonth(new Date());
  let end = endOfMonth(new Date());
  
  let numberOfMonth = []
  for(let i = 1; i <= end.getDate(); i++) {
    numberOfMonth.push(i)
  }

  console.log(numberOfMonth)

  return numberOfMonth;
}
