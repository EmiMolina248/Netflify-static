//Todo lo relacionado con express (módulos, middlewares, configuraciones etc)

const express = require("express");
const path = require("path");
const morgan = require("morgan");
const cloudinary = require("cloudinary").v2;
const app = express();
const myRouter = require("./API/routes/myRouter");
const cors = require("cors");
const session = require('express-session');
//Defino el motor de plantillas a utilizar
app.set("view engine", "ejs");
//Defino la localización de mis vistas
app.set("./public/views", path.join(__dirname, "views"));

app.use("./API/routes/myRouter", myRouter);
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


const { v4 } = require('uuid');

app.get('/api', (req, res) => {
  const path2 = `/api/item/${v4()}`;
  res.setHeader('Content-Type', 'text/html');
  res.setHeader('Cache-Control', 's-max-age=1, stale-while-revalidate');
  res.end(`Hello! Go to item: <a href="${path2}">${path2}</a>`);
});

app.get('/api/item/:slug', (req, res) => {
  const { slug } = req.params;
  res.end(`Item: ${slug}`);
});

//Agrego un enrutador compatible
app.use("/", myRouter);
module.exports = app;
