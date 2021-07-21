# Conding Dojo Exchange

![screenShot02](https://user-images.githubusercontent.com/29648679/124052388-4e0e4780-d9ec-11eb-8adc-126bfbb30634.PNG)

Este proyecto permite realizar comprar de BTC, ETH y LTC de forma ficticia.
Al realizar un compra envia un email de comprobante con los datos de la compra realizada.
Las monedas compradas se almacenan en una billetera para cada moneda.
Tiene un darkmode que cambia la página por completa a color negro.
Además permite ver un historial de compras y tiene un gráfico diario del precio de cada moneda en CLP.

![screenShot01](https://user-images.githubusercontent.com/29648679/124051338-4fd70b80-d9ea-11eb-9a8a-896232a32e50.PNG)

## Como correr?

-   [ ]  En la base del proyecto crea un archivo .env con los siguiente:

```
DB_LINK = mongodb://localhost/yourdb
SECRET_KEY = YOURSECRET
API_KEY=YOURAPISECRET
EMAIL_USERNAME = youremail@example.com
EMAIL_PASS = YourPass
EMAIL_PORT = YourPort
EMAIL_HOST = smtp.example.com
EMAIL_FROM = yourEmail@example.com 
```
-   [ ]  En la carpeta base correspondiente al servidor corre:

```
npm i 
```

-   [ ] Luego ingresa a la carpeta cliente y corre
```
npm i
```

-   [ ] Iniciar el servidor con

```
nodemon server.js
```

-   [ ]  Iniciar el cliente desde su carpeta
```
npm run start 
``` 
