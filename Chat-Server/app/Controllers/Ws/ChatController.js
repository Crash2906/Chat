'use strict'
const Packs = use('App/Models/hchat');
const Database = use('Database');

const socket = require("../../../config/socket");

class ChatController {
  constructor({ socket, request }) {
    this.socket = socket
    this.request = request
  }

  onMessage(data, id) {
    id = this.socket.id;
    this.socket.broadcast("message", data);
    this.socket.broadcast("id", id);

    // this.socket.broadcastToAll("message", data);
    // socket.emit('id', this.socket.id);
    console.log("id socket = " + this.socket.id);
    console.log("Data Socket = " + data);
  }

  ///////////////////////////////////////////////////////////////////////////
  async getAllPacks() //Traer todo
  {
    return await Database.select('*').from('hchat')
  }
  async Store({ request })//registrar
  {
    const { Historial } = request.all();
    console.log(Historial)
    const packs = await Packs.create({
      Historial
    });

    return await Database.select('*').from('hchat')
  }
}

/* 
Historial
{
  "t": 1,
  "d": {
    "topic": "chat"
  }
}


{
  "t": 7,
  "d": {
    "topic": "chat",
    "event": "message",
    "data": "hello world"
  }
}

*/

module.exports = ChatController
