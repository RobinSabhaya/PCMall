import axios from "https://cdn.jsdelivr.net/npm/axios@1.3.5/+esm";
import moment from "https://cdn.jsdelivr.net/npm/@esm-bundle/moment@2.29.4/+esm";
import {initAdmin} from './admin.js'
import  {stripeIntegration} from './stripe.js';
const socket = io();

const btns = document.querySelectorAll('.btn');
btns.forEach((btn)=>{
  btn.addEventListener('click',()=>{
    let order = JSON.parse(btn.dataset.order)
    axios.post('/updatecart',order).then(res=>{
      const notyf = new Notyf({
        duration : 2000,
        position : {
          x:"right",
          y : "top",
        },
        ripple : true,
      });
      notyf.success(res.data.msg);
      cart.innerText = res.data.totalQty;
    });
  });
});



const btnAdd = document.getElementById('btnAdd');
if(btnAdd){
let i =0;
btnAdd.addEventListener("click",(e)=>{
    i++;
    axios.post('/additem',{
      "add" : i
    }).then(res =>{
      // console.log(res);
    })
});
}
const btnRemove = document.getElementById('btnRemove');
if(btnRemove){
  let j =0;
btnRemove.addEventListener("click",(e)=>{
    j++;
    axios.post('/additem',{
      "remove" : j
    }).then(res =>{
      // console.log(res);
    });
});
}


initAdmin();

const hiddenInp = document.getElementById('hiddenInp');
let order = hiddenInp ? hiddenInp.value : null;
order = JSON.parse(order);
function updateStatus(order){
const statuses = document.querySelectorAll('.status');
statuses.forEach((status)=>{
 status.classList.remove('order_current');
})
statuses.forEach(status =>{
  if(status.dataset.status === order.status){
    status.classList.add('order_placed');
    const time  = document.createElement('small');
      status.appendChild(time);
      time.innerText = moment(order.updatedAt).format('hh : mm A');
      time.classList.add('time')
      if(status.nextElementSibling){
        status.nextElementSibling.classList.add('order_current');
      }
      else{
        status.classList.add('order_current')
      }
    }
  
})
}
updateStatus(order);

if(order){
socket.emit('join',`order_${order._id}`)
}
socket.on('orderUpdated',(data)=>{
  const updateOrder = {...order}
 updateOrder.status = data.status;
 updateOrder.updatedAt = moment().format()
 updateStatus(updateOrder);
 location.reload();
})



stripeIntegration();
