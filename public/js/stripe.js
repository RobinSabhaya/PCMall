import axios from "https://cdn.jsdelivr.net/npm/axios@1.3.5/+esm";
import { loadStripe } from "https://cdn.jsdelivr.net/npm/@stripe/stripe-js@1.54.1/+esm";
export async function stripeIntegration() {
  const stripe = await loadStripe(
    "pk_test_51MwfAySCJZNefNodu7gQNShrHTd0JpLVguI18ZA8cKAR6jvlkT339fgkezuyGxb6C2m9w0iVu34OzyKNo1MNDas500qMy411KA"
  );
  const paymentType = document.getElementById("paymentType");
  let card = null;
  function mountWidget() {
    const elements = stripe.elements();
    let card = elements.create("card", { style: {}, hidePostalCode: true });
    card.mount("#card");
    const paymentForm = document.getElementById("paymentForm");
    if (paymentForm) {
      paymentForm.addEventListener("submit", (e) => {
        e.preventDefault();
        stripe.createToken(card).then((res) => {
          const formObj = {};
          formObj.phone = document.getElementById("phone").value;
          formObj.address = document.getElementById("address").value;
          formObj.token = res.token.id;
          formObj.paymentType = "card";
          axios.post("/customer/order", formObj).then((res) => {
            location.href = '/customer/order';
          });
        });
      });
    }
  }
  paymentType.addEventListener("change", (e) => {
    if ("card" === e.target.value) {
      mountWidget();
    } else {
      card.destroy();
    }
  });
}
