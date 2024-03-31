const BASE_URL = process.env.BASE_URL;
const cartController = () => {
  return {
    updateCart(req, res) {
      // const cart ={
      //     items : {
      //         productObject,
      //         qty
      //     }
      //     totalQty,
      //     totalPrice
      // }
      try {
        if (!req.session.cart) {
          req.session.cart = {
            items: {},
            totalQty: 0,
            totalPrice: 0,
          };
        }
        let cart = req.session.cart;
        if (!cart.items[req.body._id]) {
          cart.items[req.body._id] = {
            item: req.body,
            qty: 1,
          };
          cart.totalQty = cart.totalQty + 1;
          cart.totalPrice = cart.totalPrice + req.body.price;
        } else {
          cart.items[req.body._id].qty = cart.items[req.body._id].qty + 1;
          cart.totalQty = cart.totalQty + 1;
          cart.totalPrice = cart.totalPrice + req.body.price;
        }

        return res.json({
          msg: "successfully added into the cart",
          totalQty: cart.totalQty,
          totalPrice: cart.totalPrice,
        });
      } catch (err) {
        return res.json({
          status: 400,
          msg: "Login Required",
        });
      }
    },
    getCart(req, res) {
      if (req.session.cart) {
        const cartData = Object.values(req.session.cart.items);
        return res.status(200).render("cart", { cartData, BASE_URL });
      }
      return res.status(200).render("cart", { cartData: "" });
    },
    async addItem(req, res) {
      const { add, remove, productId, delId } = req.body;
      const itemsList = Object.values(req.session.cart.items);
      /**
       * Add count the item from the cart session
       */
      if (add) {
        let count = 0;
        let price = 0;
        for (const cart_item of itemsList) {
          if (cart_item.item._id == productId) {
            cart_item.qty = cart_item.qty + +add;
            count += cart_item.qty;
            price += cart_item.qty * cart_item.item.price;
          } else {
            count += cart_item.qty;
            price += cart_item.qty * cart_item.item.price;
          }
        }
        req.session.cart.totalQty = count;
        req.session.cart.totalPrice = price;
        req.session.save();
      }

      /**
       * Decrease count the item from the cart session
       */
      if (remove) {
        let count = 0;
        let price = 0;
        for (const cart_item of itemsList) {
          if (cart_item.item._id == productId) {
            cart_item.qty = cart_item.qty + remove;
            count += cart_item.qty;
            price += cart_item.qty * cart_item.item.price;
          } else {
            count += cart_item.qty;
            price += cart_item.qty * cart_item.item.price;
          }
        }
        req.session.cart.totalQty = count;
        req.session.cart.totalPrice = price;
        req.session.save();
      }

      /**
       * Delete a cart item from the cart session.
       */
      if (delId) {
        for (const cart_item of itemsList) {
          if (cart_item.item._id == delId) {
            delete cart_item.item;
            req.session.save();
          }
        }
      }

      return res.status(200).json();
    },
  };
};

module.exports = cartController;
