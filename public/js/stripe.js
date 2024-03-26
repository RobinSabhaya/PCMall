import axios from "https://cdn.jsdelivr.net/npm/axios@1.3.5/+esm";
import { loadStripe } from "https://cdn.jsdelivr.net/npm/@stripe/stripe-js@1.54.1/+esm";
export async function stripeIntegration() {
  const stripe = await loadStripe(
    "pk_test_51MwfAySCJZNefNodu7gQNShrHTd0JpLVguI18ZA8cKAR6jvlkT339fgkezuyGxb6C2m9w0iVu34OzyKNo1MNDas500qMy411KA"
  );
  const paymentType = document.getElementById("paymentType");
  const paymentForm = document.getElementById("paymentForm");
  let removeCard = document.getElementById("card"); //Remove the card element
  let phone;
  let address;
  let card = null;
  let formObj = {};
  removeCard.style.display = "none";
  function mountWidget() {
    const elements = stripe.elements();
    card = elements.create("card", { style: {}, hidePostalCode: true });
    card.mount("#card");
    removeCard.style.display = "inline";
    if (paymentForm) {
      paymentForm.addEventListener("submit", (e) => {
        e.preventDefault();
        stripe.createToken(card).then((res) => {
          phone = document.getElementById("phone").value;
          address = document.getElementById("address").value;
          formObj.phone = phone;
          formObj.address = address;
          formObj.token = res.token.id;
          formObj.paymentType = "card";
          axios.post("/customer/order", formObj).then((res) => {
            location.href = "/customer/order";
          });
        });
      });
    }
  }

  function codHandler() {
    if (paymentForm) {
      paymentForm.addEventListener("submit", (e) => {
        e.preventDefault();
        phone = document.getElementById("phone").value;
        address = document.getElementById("address").value;
        formObj.phone = phone;
        formObj.address = address;
        formObj.paymentType = "cash";
        axios.post("/customer/order", formObj).then((res) => {
          location.href = "/customer/order";
        });
      });
    }
  }
  if (paymentType) {
    paymentType.addEventListener("change", (e) => {
      if ("card" === e.target.value) {
        mountWidget();
      }
      if ("cash" === e.target.value) {
        codHandler();
        card.destroy();
        removeCard.style.display = "none";
      }
    });
  }
}
