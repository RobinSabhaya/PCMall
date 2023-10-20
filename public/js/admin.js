import axios from "https://cdn.jsdelivr.net/npm/axios@1.3.5/+esm";
import moment from "https://cdn.jsdelivr.net/npm/@esm-bundle/moment@2.29.4/+esm";
export function initAdmin() {
  var tBody = document.getElementById("tBody");
  let orders;
  axios
    .get("/admin/order", {
      headers: {
        "X-Requested-With": "XMLHttpRequest",
      },
    })
    .then((res) => {
      orders = res.data;
      if (tBody) {
        tBody.innerHTML = generateOrder(orders);
      }
      function renderItem(orders) {
        const orderData = Object.values(orders);
        return orderData.map((ele) => {
          return `<div> ${ele.item.name} - ${ele.qty}pcs </div>
        <div class='m-3'>
        ₹${ele.qty * ele.item.price}
        </div>
        `;
        });
      }

      function generateOrder(order) {
        return order
          .map((ele) => {
            return `
           <tr align="left">
           <td class="border border-slate-300 p-2 w-1/3">
           <span class="text-red-500">${ele._id}</span>
           <div>
           ${renderItem(ele.items)}
           </div>
           </td>
           <td class="border border-slate-300 p-2">${ele.phone}</td>
           <td class="border border-slate-300 p-2">${ele.address}</td>
           <td class="border border-slate-300 p-2">${ele.paymentType}</td>
           <td class="border border-slate-300 p-2">${ele.paymentStatus}</td>
           <td class="border border-slate-300 p-2">
           <form action="/admin/order/status" method="post" id="form"> 
           <input type="hidden" name="orderId" value="${ele._id}" />
          <select name="status" class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" onchange="this.form.submit()">
            <option  name= "status" value="order_placed" ${
              ele.status === "order_placed" ? "selected" : ""
            }>orderplaced</option>
            <option  name= "status" value="confirmed" ${
              ele.status === "confirmed" ? "selected" : ""
            }>confirmed</option>
            <option  name= "status" value="prepared" ${
              ele.status === "prepared" ? "selected" : ""
            }>prepared</option>
            <option  name= "status" value="delivered" ${
              ele.status === "delivered" ? "selected" : ""
            }>delivered</option>
            <option  name= "status" value="placed" ${
              ele.status === "placed" ? "selected" : ""
            }>placed</option>
          </select>
           </form>
           </td>
           <td class="border border-slate-300 p-2">${moment(
             ele.createdAt
           ).format("hh : mm A")}</td>
           </tr>
            `;
          })
          .join("");
      }
    });
}
