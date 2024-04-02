import axios from "https://cdn.jsdelivr.net/npm/axios@1.3.5/+esm";
import moment from "https://cdn.jsdelivr.net/npm/@esm-bundle/moment@2.29.4/+esm";
import { initAdmin } from "./admin.js";
import { stripeIntegration } from "./stripe.js";
const socket = io();

// Toaster
const notyf = new Notyf({
  duration: 2000,
  position: {
    x: "right",
    y: "top",
  },
  ripple: true,
});
const btns = document.querySelectorAll(".btn");
if (btns) {
  btns.forEach((btn) => {
    btn.addEventListener("click", () => {
      let order = JSON.parse(btn.dataset.order);
      axios
        .post("/updatecart", order)
        .then((res) => {
          notyf.success(res.data.msg);
          cart.innerText = res.data.totalQty;
        })
        .catch((err) => {
          notyf.error("Login Required!");
        });
    });
  });
}
const btnAdd = document.querySelectorAll("#btnAdd");
if (btnAdd) {
  btnAdd.forEach((add_btn) => {
    const addProductId = add_btn.getAttribute("productId");
    // let i = 0;
    add_btn.addEventListener("click", (e) => {
      // i++;
      axios
        .post("/additem", {
          add: 1,
          productId: addProductId,
        })
        .then((res) => {
          // console.log(res);
          location.reload();
        });
    });
  });
}
const btnRemove = document.querySelectorAll("#btnRemove");
if (btnRemove) {
  btnRemove.forEach((remove_btn) => {
    const removeProductId = remove_btn.getAttribute("productId");
    // let j = 0;
    remove_btn.addEventListener("click", (e) => {
      // j++;
      axios
        .post("/additem", {
          remove: -1,
          productId: removeProductId,
        })
        .then((res) => {
          // console.log(res);
          location.reload();
        });
    });
  });
}

const binButtons = document.querySelectorAll("#bin-button");
if (binButtons) {
  binButtons.forEach((bin_btn) => {
    const productId = bin_btn.getAttribute("productId");
    bin_btn.addEventListener("click", () => {
      axios
        .post("/additem", {
          delId: productId,
        })
        .then((res) => {
          location.reload();
        });
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
      let wishProduct = JSON.parse(product.dataset.wishproduct);
      const productId = wishProduct._id;
      axios
        .post(
          "/customer/wishlist",
          { productId },
          {
            headers: {
              "X-Requested-With": "XMLHttpRequest",
            },
          }
        )
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
          product.checked = false; //Remove like
        });
    });
  });
} catch (err) {
  product.checked = false; //Remove like
  notyf.error("Login Required");
}

// For search product Logic
const searchProduct = document.getElementById("Search");

/**
 * Search click button
 * @param {*} searchQuery
 */
function searchproduct(searchQuery) {
  axios
    .get(`/search?q=${searchQuery}`)
    .then((res) => {
      if (res?.data) {
        window.location.href = `/search/${res.data.productData._id}`;
      }
    })
    .catch((err) => {
      window.location.href = "/";
    });
}
if (searchProduct) {
  searchProduct.addEventListener("change", (e) => {
    const searchQuery = e.target.value;
    searchproduct(searchQuery);
    axios
      .get(`/search?q=${searchQuery}`)
      .then((res) => {
        if (res?.data) {
          window.location.href = `/search/${res.data.productData._id}`;
        }
      })
      .catch((err) => {
        window.location.href = "/";
      });
  });
}

// For filter product with category
const category = document.getElementById("category");
const Product_Container1 = document.querySelector(".Product_Container1");
if (category) {
  category.addEventListener("change", (e) => {
    axios
      .get(`/product?category=${e.target.value}`, {
        headers: {
          "X-Requested-With": "XMLHttpRequest",
        },
      })
      .then((res) => {
        const productData = res?.data?.productData;
        const BASE_URL = res?.data?.url;
        //! issue :- Addtocart btn not working!!

        Product_Container1.innerHTML = productData
          .map((data) => {
            //! Solution:-  It's only applicable for the map method... (Rare case)
            const productdata = {
              _id: data._id,
              categoryId: data.categoryId,
              colors: data.colors,
              discount: data.discount,
              price: data.price,
              img: data.img,
              name: data.name,
              price: data.price,
              brand: data.brand,
            };
            return `
              <div class="product_bx">
                <a href="/singleproduct/${
                  data._id
                } " class="flex justify-center items-center flex-col">
                  <div>
                    <img src="${BASE_URL}/uploads/${
              data.img[0]
            }" alt="img" height="120px" width="120px" />
                  </div>
                  <div>
                    ${data.name}
                  </div>
                  <div class="text-red-700 text-xl font-bold m-2">₹${data.price}
                  </div>
                </a>
                <div class="flex gap-5">
                  <button class="bg-red-700 text-white text-sm px-5 py-3 rounded-full mt-2 btn"
                    data-order=${JSON.stringify(
                      productdata
                    )}>Add to Cart</button>
                  <div><i class="lar la-heart product_like" data-wishproduct=${JSON.stringify(
                    productdata
                  )}></i></div>
                </div>
              </div>`;
          })
          .join(" ");
        // Wishlist page
        const product_like = document.querySelectorAll(".product_like");
        product_like.forEach((product) => {
          product.addEventListener("click", () => {
            let wishProduct = JSON.parse(`${product.dataset.wishproduct}"}`);
            const productId = wishProduct._id;
            axios
              .post(
                "/customer/wishlist",
                { productId, isWishlist: true },
                {
                  headers: {
                    "X-Requested-With": "XMLHttpRequest",
                  },
                }
              )
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
                product.checked = false; //Remove Like
              });
          });
        });

        // Cart page
        const btns = document.querySelectorAll(".btn");
        if (btns) {
          btns.forEach((btn) => {
            btn.addEventListener("click", () => {
              //! Solution:- It's exceptional behavior of dataset (Rare case)
              const order = `${btn.dataset.order}"}`;
              axios
                .post("/updatecart", order)
                .then((res) => {
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
                })
                .catch((err) => {
                  notyf.error("Login Required!");
                });
            });
          });
        }
        if (productData.length == 0) {
          Product_Container1.innerHTML = `<div class=" h-[400px] flex justify-center items-center flex-row text-center w-[95vw] text-3xl font-bold">Product Not Found!! </div>`;
        }
      })
      .catch((err) => {
        Product_Container1.innerHTML = `<div class=" h-[400px] flex justify-center items-center flex-row text-center w-[95vw] text-3xl font-bold">Product Not Found!! </div>`;
      });
  });
}

// Pagination
const paginations = document.querySelectorAll(".pagination");
paginations.forEach((pagination) => {
  pagination.addEventListener("click", () => {
    const paginationQuery = JSON.parse(pagination?.dataset?.pagination);
    axios
      .get(
        `/product?page=${paginationQuery?.page || 1}&limit= ${
          paginationQuery?.limit || 10
        }`
      )
      .then((res) => {
        const productData = res?.data?.productData;
        const BASE_URL = res?.data?.url;
        //! issue :- Addtocart btn not working!!

        Product_Container1.innerHTML = productData
          .map((data) => {
            //! Solution:-  It's only applicable for the map method... (Rare case)
            const productdata = {
              _id: data._id,
              categoryId: data.categoryId,
              colors: data.colors,
              discount: data.discount,
              price: data.price,
              img: data.img,
              name: data.name,
              price: data.price,
              brand: data.brand,
            };
            return `
            <div class="product_bx">
              <a href="/singleproduct/${
                data._id
              } " class="flex justify-center items-center flex-col">
                <div>
                  <img src="${BASE_URL}/uploads/${
              data.img[0]
            }" alt="img" height="120px" width="120px" />
                </div>
                <div>
                  ${data.name}
                </div>
                <div class="text-red-700 text-xl font-bold m-2">₹${data.price}
                </div>
              </a>
              <div class="flex gap-5">
                <button class="bg-red-700 text-white text-sm px-5 py-3 rounded-full mt-2 btn"
                  data-order=${JSON.stringify(productdata)}>Add to Cart</button>
                <div><i class="lar la-heart product_like" data-wishproduct=${JSON.stringify(
                  productdata
                )}></i></div>
              </div>
            </div>`;
          })
          .join(" ");
        // Wishlist page
        const product_like = document.querySelectorAll(".product_like");
        product_like.forEach((product) => {
          product.addEventListener("click", () => {
            product.classList.toggle("filled");
            let wishProduct = JSON.parse(`${product.dataset.wishproduct}"}`);
            const productId = wishProduct._id;
            axios
              .post(
                "/customer/wishlist",
                { productId, isWishlist: true },
                {
                  headers: {
                    "X-Requested-With": "XMLHttpRequest",
                  },
                }
              )
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
                product.checked = false; //Remove Like
              });
          });
        });

        // Cart page
        const btns = document.querySelectorAll(".btn");
        if (btns) {
          btns.forEach((btn) => {
            btn.addEventListener("click", () => {
              //! Solution:- It's exceptional behavior of dataset (Rare case)
              const order = `${btn.dataset.order}"}`;
              axios
                .post("/updatecart", order)
                .then((res) => {
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
                })
                .catch((err) => {
                  // console.log(err);
                  notyf.error("Login Required!");
                });
            });
          });
        }

        if (productData.length === 0) {
          notyf.error("Products have reached its limit!!");
        }
      })
      .catch((err) => {
        notyf.error("Products have reached its limit!!");
      });
  });
});

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
// Wishlist page
const wishlistProduct = document.querySelectorAll(".wishlistProduct");
wishlistProduct.forEach((product) => {
  product.addEventListener("click", () => {
    let wishProduct = JSON.parse(product.dataset.wishproduct);
    const productId = wishProduct._id;
    axios
      .post(
        "/customer/wishlist",
        { productId },
        {
          headers: {
            "X-Requested-With": "XMLHttpRequest",
          },
        }
      )
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
        location.reload();
      })
      .catch((err) => {
        // console.log(err);
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
