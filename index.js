const express = require("express");
const morgan = require("morgan");
const bodyParser = require("body-parser");
const cookieParser = require("cookie-parser");
const cors = require("cors");
require("dotenv").config();
const tareaRoutes = require("./routes/tareaRoutes");
const usuarioRoutes = require("./routes/usuarioRoutes");

//creamos el servidor con express
const app = express();

//middleware    man in the middle
app.use(morgan("dev"));
app.use(bodyParser.json());
app.use(cookieParser());
app.use(cors());

// colocar rutas
app.use("/api", tareaRoutes, usuarioRoutes);

// levantar el servidor en un puerto
const port = process.env.PORT || 8001;
app.listen(port, () => {
    console.log(`Servidor levantado en el puerto ${port}`);
});
