function removeItem (id) {
  const userObj = JSON.parse(localStorage.getItem("token"));
  const userId = userObj.id;
  const result = await fetch("/wishlist/deleteItem", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      userId,
      prodId,
    }),
  }).then((res) => res.json());
  alert("Item Removed");
  window.location.reload();
}
function moveToBag (id) {}
