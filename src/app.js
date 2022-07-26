//Todo lo relacionado con express (módulos, middlewares, configuraciones etc)

const express = require("express");
const path = require("path");
const morgan = require("morgan");
const cloudinary = require("cloudinary").v2;
const app = express();
const myRouter = express.Router;
const cors = require("cors");
const session = require('express-session');
const serverless = require("serverless-http");
//const port = 3500;


//Corremos el servidor en el puerto seleccionado
//app.listen(port, () => {
  //  console.log(`Servidor corriendo en el puerto ${port} correctamente`);
//});

//Defino el motor de plantillas a utilizar
app.set("view engine", "ejs");
//Defino la localización de mis vistas
app.set("./dist", path.join(__dirname, "dist"));



app.use(cors());
//Middlewares
app.use(session({ 		//Usuage
    secret: 'keyboard cat',
    resave: false,
    saveUninitialized: true,
    cookie: { secure: true }
}));
app.use(morgan("dev"));
//Middleware para poder obtener data de los requests con BodyParser
app.use(express.json());
//Configurando archivos estáticos
app.use(express.urlencoded({ extended: true }));
app.use(express.static(path.join(__dirname, "public")));

//const Admin = require("../models/myModel");
//const moment = require("moment");

//Ejemplo de respuesta a una petición de tipo GET
myRouter.use ("/" , (req, res) => {
res.status(200).render("index.ejs", { login:0, isLogin:false});
});

//const msg = new Admin({
    //nombre: "admin",
    //apellido: "1",
    //usuario: "Admin1",
    //contraseña: "administrador",
   // avatar: "...",
   // email: "adminhospital@gmail.com",
//});

//Agrego un enrutador compatible
app.use("/.netlify/functions/app", myRouter);

module.exports = app;
module.exports.handler = serverless(app);

