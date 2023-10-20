import axios from "https://cdn.jsdelivr.net/npm/axios@1.3.5/+esm";
import moment from "https://cdn.jsdelivr.net/npm/@esm-bundle/moment@2.29.4/+esm";
import { initAdmin } from "./admin.js";
import { stripeIntegration } from "./stripe.js";
const socket = io();

const btns = document.querySelectorAll(".btn");
btns.forEach((btn) => {
  btn.addEventListener("click", () => {
    let order = JSON.parse(btn.dataset.order);
    axios.post("/updatecart", order).then((res) => {
      const notyf = new Notyf({
        duration: 2000,
        position: {
          x: "right",
          y: "top",
        },
        ripple: true,
      });
      notyf.success(res.data.msg);
      cart.innerText = res.data.totalQty;
    });
  });
});

const btnAdd = document.getElementById("btnAdd");
if (btnAdd) {
  let i = 0;
  btnAdd.addEventListener("click", (e) => {
    i++;
    axios
      .post("/additem", {
        add: i,
      })
      .then((res) => {
        // console.log(res);
      });
  });
}
const btnRemove = document.getElementById("btnRemove");
if (btnRemove) {
  let j = 0;
  btnRemove.addEventListener("click", (e) => {
    j++;
    axios
      .post("/additem", {
        remove: j,
      })
      .then((res) => {
        // console.log(res);
      });
  });
}

const productImg = document.getElementById("productImg");
const img_bx = document.querySelectorAll(".img_bx");
img_bx.forEach((prd) => {
  prd.addEventListener("click", (e) => {
    const productList = prd.dataset.product;
    productImg.src = productList;
  });
});

if (productImg) {
  productImg.addEventListener("mousemove", (e) => {
    // magnifierLens.style.left = e.clientX - magnifierLens.offsetWidth / 2 + "px";
    // magnifierLens.style.top = e.clientY - magnifierLens.offsetHeight / 2 + "px";
    productImg.style.transform =
      "scale(" +
      (e.clientX - productImg.offsetLeft) / productImg.offsetWidth +
      ")";
  });
}

// Wishlist page
try {
  const product_like = document.querySelectorAll(".product_like");
  product_like.forEach((product) => {
    product.addEventListener("click", () => {
      product.classList.toggle("las");
      let wishProduct = JSON.parse(product.dataset.wishproduct);
      wishProduct.wishlist = true;
      axios
        .post("/customer/wishlist", { wishProduct: wishProduct })
        .then((res) => {
          const notyf = new Notyf({
            duration: 2000,
            position: {
              x: "right",
              y: "top",
            },
            ripple: true,
          });
          notyf.success(res.data.message);
        })
        .catch((err) => {
          const notyf = new Notyf({
            duration: 2000,
            position: {
              x: "right",
              y: "top",
            },
            ripple: true,
          });
          notyf.error("Login failed");
          product.classList.remove("las");
        });
    });
  });
} catch (err) {
  console.log(err);
}

const wishlistProduct = document.querySelectorAll(".wishlistProduct");
wishlistProduct.forEach((wishproduct) => {
  wishproduct.addEventListener("click", () => {
    const wishProduct = JSON.parse(wishproduct.dataset.wishproduct);
    wishproduct.classList.remove("las");
    wishproduct.classList.add("lar");
    axios.delete(`/customer/wishlist/${wishProduct._id}`).then((res) => {
      const notyf = new Notyf({
        duration: 2000,
        position: {
          x: "right",
          y: "top",
        },
        ripple: true,
      });
      notyf.success(res.data.message);
      location.reload();
    });
  });
});

initAdmin();

const hiddenInp = document.getElementById("hiddenInp");
let order = hiddenInp ? hiddenInp.value : null;
order = JSON.parse(order);
function updateStatus(order) {
  const statuses = document.querySelectorAll(".status");
  statuses.forEach((status) => {
    status.classList.remove("order_current");
  });
  statuses.forEach((status) => {
    if (status.dataset.status === order.status) {
      status.classList.add("order_placed");
      const time = document.createElement("small");
      status.appendChild(time);
      time.innerText = moment(order.updatedAt).format("hh : mm A");
      time.classList.add("time");
      if (status.nextElementSibling) {
        status.nextElementSibling.classList.add("order_current");
      } else {
        status.classList.add("order_current");
      }
    }
  });
}
updateStatus(order);

if (order) {
  socket.emit("join", `order_${order._id}`);
}
socket.on("orderUpdated", (data) => {
  const updateOrder = { ...order };
  updateOrder.status = data.status;
  updateOrder.updatedAt = moment().format();
  updateStatus(updateOrder);
  location.reload();
});

stripeIntegration();
