const mongoose = require("mongoose");
const app = require("./app");
const dotenv = require("dotenv");
const port = 3500;
const http = require("http");

http.createServer((req, res) => {
  // Homepage
  if (req.url === "/") {
    res.writeHead(200, { "Content-Type": "text/html" });
    res.end("Welcome to the homepage!");
    }
    else if (req.url === "/about") {
        res.writeHead(200, { "Content-Type": "text/html" });
        res.end("Welcome to the about page!");
      }
    
      // 404'd!
      else {
        res.writeHead(404, { "Content-Type": "text/plain" });
        res.end("404 error! File not found.");
      }
    }).listen(port, "localhost");



//Carga de variables de entorno
dotenv.config({ path: "./config.env" });
const DB = process.env.DATABASE.replace(
    "<PASSWORD>",
    process.env.DATABASE_PASSWORD
);

//Conexión al cloud de Mongodb Atlas ...
mongoose
    .connect(DB, {
        useNewUrlParser: true,
    })
    .then((con) => {
        //console.log(con.connections);
        console.log("Connected to database");
    });


// app.get("/test",(req,res) =>{
//  res.send("GENIOOOOO")
// });
// //Corremos el servidor en el puerto seleccionado
// app.listen(port, () => {
//     console.log(`Servidor corriendo en el puerto ${port} correctamente`);
// });
