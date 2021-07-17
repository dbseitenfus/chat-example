import express from 'express';
import {Server} from 'socket.io';
import cors from 'cors';

const PORT = process.env.PORT || 3000;
const app = express();
app.use(cors());

const srv = app.listen(PORT, console.log(`Liste ning on port ${PORT}...`));
const io = new Server(srv, {
    cors: {
        origin: '*'
    }
});

io.on('connection', client => {
    console.log('new client connected');

    client.on('send', data => {
        client.broadcast.emit('res', {originId: client.id, content: data});
        client.emit('res', {originId: client.id, content: data});
    });
});
