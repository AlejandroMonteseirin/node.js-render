const express = require('express');
const fs = require('fs');
const bodyParser = require('body-parser');
const app = express();
const { Sequelize, DataTypes } = require('sequelize');
const sequelize = new Sequelize({
  dialect: 'sqlite',          // Usamos SQLite
  storage: './database.sqlite' // Archivo donde se almacenará la base de datos
});

const port = process.env.PORT || 3001;
const couponsFile = './coupons.json';

app.use(bodyParser.json());

app.get("/", (req, res) => res.type('html').send(html));


// Definir el modelo del cupón
const Coupon = sequelize.define('Coupon', {
  titulo: {
    type: DataTypes.STRING,
    allowNull: false
  },
  empresa: {
    type: DataTypes.STRING,
    allowNull: false
  },
  descripcion: {
    type: DataTypes.STRING,
    allowNull: false
  },
  enlace: {
    type: DataTypes.STRING,
    allowNull: false
  },
  fecha_creacion: {
    type: DataTypes.DATE,
    allowNull: false
  }
}, {});

// Sincronizar la base de datos
sequelize.sync();

// Crear un nuevo cupón (POST)
app.post('/coupons', async (req, res) => {
  try {
    req.body.fecha_creacion = new Date();
    const coupon = await Coupon.create(req.body);
    res.status(201).send(coupon);
  } catch (error) {
    res.status(400).send(error);
  }
});

// Obtener todos los cupones (GET)
app.get('/coupons', async (req, res) => {
  const coupons = await Coupon.findAll();
  res.status(200).send(coupons);
});

// Obtener un cupón por título (GET)
app.get('/coupons/:title', async (req, res) => {
  const coupon = await Coupon.findOne({ where: { titulo: req.params.title } });
  if (coupon) {
    res.status(200).send(coupon);
  } else {
    res.status(404).send('Cupón no encontrado');
  }
});

// Actualizar un cupón por título (PUT)
app.put('/coupons/:title', async (req, res) => {
  req.body.fecha_creacion = new Date();
  const coupon = await Coupon.findOne({ where: { titulo: req.params.title } });
  if (coupon) {
    await coupon.update(req.body);
    res.status(200).send(coupon);
  } else {
    res.status(404).send('Cupón no encontrado');
  }
});

// Eliminar un cupón por título (DELETE)
app.delete('/coupons/:title', async (req, res) => {
  const coupon = await Coupon.findOne({ where: { titulo: req.params.title } });
  if (coupon) {
    await coupon.destroy();
    res.status(200).send('Cupón eliminado');
  } else {
    res.status(404).send('Cupón no encontrado');
  }
});


const server = app.listen(port, () => {
  console.log(`Servidor corriendo en http://localhost:${port}`);
});

server.keepAliveTimeout = 120 * 1000;
server.headersTimeout = 120 * 1000;
const html = `
<!DOCTYPE html>
<html>
  <head>
    <title>Hello from Render!</title>
    <script src="https://cdn.jsdelivr.net/npm/canvas-confetti@1.5.1/dist/confetti.browser.min.js"></script>
    <script>
      setTimeout(() => {
        confetti({
          particleCount: 100,
          spread: 70,
          origin: { y: 0.6 },
          disableForReducedMotion: true
        });
      }, 500);
    </script>
    <style>
      @import url("https://p.typekit.net/p.css?s=1&k=vnd5zic&ht=tk&f=39475.39476.39477.39478.39479.39480.39481.39482&a=18673890&app=typekit&e=css");
      @font-face {
        font-family: "neo-sans";
        src: url("https://use.typekit.net/af/00ac0a/00000000000000003b9b2033/27/l?primer=7cdcb44be4a7db8877ffa5c0007b8dd865b3bbc383831fe2ea177f62257a9191&fvd=n7&v=3") format("woff2"), url("https://use.typekit.net/af/00ac0a/00000000000000003b9b2033/27/d?primer=7cdcb44be4a7db8877ffa5c0007b8dd865b3bbc383831fe2ea177f62257a9191&fvd=n7&v=3") format("woff"), url("https://use.typekit.net/af/00ac0a/00000000000000003b9b2033/27/a?primer=7cdcb44be4a7db8877ffa5c0007b8dd865b3bbc383831fe2ea177f62257a9191&fvd=n7&v=3") format("opentype");
        font-style: normal;
        font-weight: 700;
      }
      html {
        font-family: neo-sans;
        font-weight: 700;
        font-size: calc(62rem / 16);
      }
      body {
        background: white;
      }
      section {
        border-radius: 1em;
        padding: 1em;
        position: absolute;
        top: 50%;
        left: 50%;
        margin-right: -50%;
        transform: translate(-50%, -50%);
      }
    </style>
  </head>
  <body>
    <section>
      Superjavi guapo
    </section>
  </body>
</html>
`
