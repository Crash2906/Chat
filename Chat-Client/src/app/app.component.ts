import { Component, OnInit } from '@angular/core';
import Ws from '@adonisjs/websocket-client';
import { CookieService } from 'ngx-cookie-service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {

  constructor(private Cook: CookieService) {
    this.CookiesGetSet();
    this.Eviarlocal();
    this.TraerLocal();

    // this.id = localStorage.getItem('IdChat');
  }

  title = 'Chat-Client';

  ws: any;
  chat: any;
  mensajes: string[] = [];
  Usuarios: string[] = [];
  msg: string;

  Nom = 'NoSe';
  i: any = 0;
  j: any = 0;
  unir: string;
  id: string;


  ngOnInit(): void {
    this.ws = Ws('ws://127.0.0.1:3333', {
      path: 'ws'
    });
    this.ws.connect();
    this.chat = this.ws.subscribe('chat');
    this.chat.on('message', (data: any) => {
      this.mensajes.push(data);
    });
  }

  TraerId() {

    if (this.j <= 0) {
      this.j++;
      localStorage.setItem('Nombre', this.Nom);
    }
    this.Nom = localStorage.getItem('Nombre');

    this.chat.on('id', (id: any) => {
      this.id = id;
      if (this.Usuarios !== id)// if
      {
        this.Usuarios.push(this.Nom + ' : ' + id);
        id = localStorage.setItem('usuarios', JSON.stringify(this.Usuarios));
      }
      id = localStorage.setItem('IdChat' + this.i, this.Nom + ' : ' + id);
    });

  }
  enviarMensage() {
    this.TraerId();

    this.unir = this.Nom + ' : ' + this.msg;
    this.chat.emit('message', this.unir);
    this.mensajes.push(this.unir);
    this.msg = '';
    console.log(this.mensajes);
    console.log(this.Usuarios);
    localStorage.setItem('chats', JSON.stringify(this.mensajes));

  }
  Eviarlocal() {
    let men: string = 'mensaje';

    let mens = {
      nombre: 'jose',
      mensaje: 'asdasdasd',
      etcejm: {
        ejem1: 10,
        ejmp2: -10
      }
    };

    localStorage.setItem('chat', men);
    localStorage.setItem('chats', JSON.stringify(this.mensajes));


  }
  TraerLocal() {
    let men = localStorage.getItem('chat');
    let mens = JSON.parse(localStorage.getItem('chats'));
    console.log(men);
    console.log(mens);
  }
  CookiesGetSet() {

    /// set
    this.Cook.set('id', this.id);
    this.Cook.set('nombre', this.Nom);

    // get
    console.log(this.Cook.get('id'));
  }

}
