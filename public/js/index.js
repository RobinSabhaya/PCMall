import axios from "https://cdn.jsdelivr.net/npm/axios@1.3.5/+esm";
const pagination_counter = document.querySelector(".pagination_counter");
let allChildren = pagination_counter?.children;

const secondLastElement = allChildren[allChildren.length - 2];
let { page, limit } = JSON.parse(secondLastElement.dataset.pagination);
const Product_Container1 = document.querySelector(".Product_Container1");

// Toaster
const notyf = new Notyf({
  duration: 2000,
  position: {
    x: "right",
    y: "top",
  },
  ripple: true,
});
/**
 * Pagination functionality
 * @param {Number} page
 * @param {Number} limit
 */
function pagination(page, limit = 1) {
  axios
    .get(`/product?page=${page}&limit=${limit}`)
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
          product.classList.toggle("las");
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
              product.classList.remove("las");
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
        location.reload();
      }
    })
    .catch((err) => {
      notyf.error("Products have reached its limit!!");
      location.reload();
    });
}

/**
 * Pagination Next page
 */
const paginationNext = document.querySelector(".paginationNext");
paginationNext.addEventListener("click", () => {
  page++;
  secondLastElement.innerText = page;
  secondLastElement.setAttribute(
    "data-pagination",
    JSON.stringify({ page, limit })
  );
  pagination(page, limit);
});

/**
 * Pagination previous page
 */
const paginationPrev = document.querySelector(".paginationPrev");
paginationPrev.addEventListener("click", () => {
  if (page >= 6) {
    secondLastElement.innerText = page;
    page--;
    secondLastElement.setAttribute(
      "data-pagination",
      JSON.stringify({ page, limit })
    );
    pagination(page, limit);
  } else {
    secondLastElement.innerText = 5;
    secondLastElement.setAttribute(
      "data-pagination",
      JSON.stringify({ page: 5, limit })
    );
  }
});
