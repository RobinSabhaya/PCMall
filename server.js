require('dotenv').config();
const express = require("express");
const path = require("path");
const cookieparser = require('cookie-parser');
const expressLayout = require('express-ejs-layouts');
const session = require('express-session');
const MongoStore = require('connect-mongo');
const flash = require('express-flash');
const Emmiter = require('events');
const PORT = process.env.PORT || 8000;
require('./db/conn');
const loginController = require('./controllers/customer/loginController');
const logoutController = require('./controllers/customer/logoutController');
const registerController = require('./controllers/customer/registerController');
const homeController = require('./controllers/customer/homeController');
const policyController = require('./controllers/customer/policyController');
const productController = require('./controllers/admin/productController');
const orderController = require('./controllers/customer/orderController');
const cartController = require('./controllers/customer/cartController');
const adminController = require('./controllers/admin/adminController');
const {validator,validation} = require('./middlewares/validation');
const auth = require('./middlewares/auth');
//Express App Specific Stuffs
const app = express();
const store =  MongoStore.create({
    mongoUrl : process.env.MONGODB_URL,
    collectionName : "session"
})
app.use(session({
    secret : process.env.SESSION_SECRET,
    saveUninitialized : true,
    resave : true,
    store,
    cookie : {
        maxAge : 1000*60 * 60 * 24
    },
}));
app.use(flash())
app.use(express.urlencoded({extended: true}));
app.use((req,res,next)=>{
    res.locals.session = req.session;
    next();
})
app.use(express.json());
app.use(cookieparser());
app.use(expressLayout);
app.use(express.static(path.join(__dirname, "/public")));
app.use(express.static(path.join(__dirname, "/public/css")));
app.use(express.static(path.join(__dirname, "/public/js")));
app.use(express.static(path.join(__dirname, "/public/image")));
app.set("view engine", "ejs");

app.get('/',homeController().getHome);
app.get("/register", registerController().getRegister);
app.post('/register',[validator(),validation],registerController().postRegister)
app.get("/login",loginController().getLogin);
app.post("/login",[auth],loginController().postLogin);
app.post('/product',productController().postProduct);
app.get("/termcondition", policyController().term);
app.get("/returnpolicy",policyController().return );
app.get("/supportpolicy",policyController().support);
app.get("/privacypolicy",policyController().privacy);
app.post("/logout",logoutController().postLogout);
app.post('/updatecart',cartController().updateCart);
app.get('/cart',cartController().getCart);
// app.post('/cart',cartController().postCart);
app.post('/additem',cartController().addItem);
app.get('/customer/order',orderController().getOrder)
app.post('/customer/order',orderController().postOrder)
app.get('/admin/order',adminController().getAdmin)
app.post('/admin/order/status',adminController().orderStatus);
app.get('/customer/order/:id',orderController().singleOrder);
//Error handling Middleware
app.use((req,res)=>{
    return res.render('Error_Page');
})
//App Listen Specific Stuffs
const server = app.listen(PORT, () => {
    console.log(`Express App Is Now Running... on http://127.0.0.1:${PORT}/`);
});

const io = require('socket.io')(server);
const eventEmitter = new Emmiter();
app.set("eventEmitter",eventEmitter);
io.on("connection",(socket)=>{
    socket.on('join',(orderId)=>{
        socket.join(orderId);
    })
})

eventEmitter.on('orderUpdated',(data)=>{
    io.to(`order_${data.id}`).emit('orderUpdated',data);
})
