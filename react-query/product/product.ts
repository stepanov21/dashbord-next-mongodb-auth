export const GET_ALL_PRODUCTS = (weekAgo = 0) =>
fetch(`/api/product/get-all-product/${weekAgo}`, {
  method: "GET",
  cache: "no-store",
}).then((response) => response.json())

export const DELETE_PRODUCT_BY_ID = (id: string) => {
  return fetch("/api/product/delete-product", {
    method: "POST",
    body: JSON.stringify({_id: id})
  })
}
export const ADD_PRODUCT = ({formData, email}) => {
  return fetch("/api/product/add-product", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ ...formData, email: email }),
  })
}