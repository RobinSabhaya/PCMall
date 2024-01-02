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

// if (productImg) {
//   productImg.addEventListener("mousemove", (e) => {
//     // magnifierLens.style.left = e.clientX - magnifierLens.offsetWidth / 2 + "px";
//     // magnifierLens.style.top = e.clientY - magnifierLens.offsetHeight / 2 + "px";
//     productImg.style.transform =
//       "scale(" +
//       (e.clientX - productImg.offsetLeft) / productImg.offsetWidth +
//       ")";
//   });
// }

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
          notyf.error("Login Required");
          product.classList.remove("las");
        });
    });
  });
} catch (err) {
  console.log(err);
}

// For search product Logic
const searchProduct = document.getElementById("Search");
if (searchProduct) {
  searchProduct.addEventListener("change", (e) => {
    const searchQuery = e.target.value;
    axios.get(`/search/?${searchQuery}`).then((res) => {
      console.log(res);
    });
  });
}

// For dashboard charts
const hiddenIp = document.getElementById("hiddenInp");
if (hiddenIp) {
  var xValues = [
    "Jan",
    "Feb",
    "Mar",
    "Apr",
    "May",
    "Jun",
    "Jul",
    "Aug",
    "Sep",
    "Oct",
    "Nov",
    "Dec",
  ];
  // const xValues = Utils.months({count: 7});
  var yValues = hiddenIp.value.split(",");

  var barColors = [
    "rgba(255, 99, 132, 0.2)",
    "rgba(255, 159, 64, 0.2)",
    "rgba(255, 205, 86, 0.2)",
    "rgba(75, 192, 192, 0.2)",
    "rgba(54, 162, 235, 0.2)",
    "rgba(153, 102, 255, 0.2)",
    "rgba(201, 203, 207, 0.2)",
    "rgba(233,114,77, 0.2)",
    "rgba(214,215,39, 0.2)",
    "rgba(146,202,209, 0.2)",
    "rgba(121,204,179, 0.2)",
    "rgba(134,134,134, 0.2)",
    "rgba(55,189,121, 0.2)",
  ];
  const borderColors = [
    "rgb(255, 99, 132)",
    "rgb(255, 159, 64)",
    "rgb(255, 205, 86)",
    "rgb(75, 192, 192)",
    "rgb(54, 162, 235)",
    "rgb(153, 102, 255)",
    "rgb(201, 203, 207)",
    "rgba(233,114,77)",
    "rgba(214,215,39)",
    "rgba(146,202,209)",
    "rgba(121,204,179)",
    "rgba(134,134,134)",
    "rgba(55,189,121)",
  ];

  new Chart("myChart", {
    type: "bar",
    data: {
      labels: xValues,
      datasets: [
        {
          data: yValues,
          backgroundColor: barColors,
          borderColor: borderColors,
          borderWidth: 1,
        },
      ],
    },
    options: {
      legend: { display: false },
      title: {
        display: true,
        text: "Order Details",
      },
    },
  });
}
// For whishlist
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
