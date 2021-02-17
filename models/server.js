const express = require('express');
const cors = require('cors');

class Server {
    constructor() {
        this.app = express();
        this.port = process.env.PORT;
        this.usuariosPath = '/api/users';

        //Middlewares
        this.middlewares();
        //rutas de mi app

        this.routes();
    }

    middlewares() {
        // CORS
        this.app.use(cors());

        //Lectura y parseo del body
        this.app.use(express.json()); // serializando informacion que venga del frotend a formato JSON para recibirla en el back

        //Publicar mi directorio public
        this.app.use(express.static('public'));
    }

    routes() {
        this.app.use(this.usuariosPath, require('../routes/usuarios'));
    }

    listen() {
        this.app.listen(this.port, () => {
            console.log(' Server corriendo en Port', this.port)
        });
    }
}
module.exports = Server;