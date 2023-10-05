const express = require('express');
const url = require('url');
const path = require('path');
const mongoose = require('mongoose');
const { Server } = require('socket.io');

const cartRouter = require('./routes/carts.routes.js');
const productRouter = require('./routes/products.routes.js');
const viewsRouter = require('./routes/views.routes.js');
const messageRouter = require('./routes/messages.routes.js');

const handlebars = require('express-handlebars');

const Message = require('./dao/dbManagers/messages.js');
const Product = require('./dao/dbManagers/products.js');
const mm = new Message();
const pm = new Product();

mongoose.set("strictQuery", false);

const app = express();
const port = 8080;

const currentDirname = path.dirname(require.main.filename);

const connection = mongoose.connect("mongodb+srv://andreapazvillarroel:MFVHdmwh0OoY0q2H@cluster0.jhe4dv1.mongodb.net/?retryWrites=true&w=majority");

app.engine('handlebars', handlebars.engine());
app.set("views", path.join(currentDirname, "/views"));
app.set("view engine", 'handlebars');
app.use('/', viewsRouter);

app.use(express.static(path.join(currentDirname, "/public")));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use('/api/carts', cartRouter);
app.use('/api/products', productRouter);
app.use('/api/messages', messageRouter);

const httpServer = app.listen(port, () => console.log(`Server started at http://localhost:${port} 🚀`));

const io = new Server(httpServer);

const init = async () => {
  let messages = await mm.getAll();
  let products = await pm.getAll();

  io.on('connection', socket => {
    console.log('🟢 Usuario conectado');

    socket.on('products', data => {
      io.emit(data);
    });

    socket.on("message", data => {
      mm.addMessage(data);
      messages.push(data);
      io.emit('Messages', messages);
    });

    socket.on('authenticated', data => {
      socket.broadcast.emit('newUserConnected', data);
      socket.emit('Messages', messages);
    });

    socket.emit('products', products);

    socket.on('products', data => {
      products.push(data);
      io.emit('products', products);
    });

    socket.on('disconnect', () => {
      console.log('🔴 Usuario desconectado');
    });
  });
};

init();
