import 'reflect-metadata'
import {createKoaServer} from "routing-controllers"
import setupDb from './db'
import EventController from "./events/controller"
import UserController from "./users/controller"
import TicketController from "./tickets/controller"
import CommentController from "./comments/controller"
import LoginController from "./logins/controller"

const port = process.env.PORT || 4000

const app = createKoaServer({
    cors:true,
    controllers: [
      UserController,
      TicketController,
      EventController,
      CommentController,
      LoginController
    ]
})

setupDb()
  .then(_ =>
    app.listen(port, () => console.log('Listening on port 4000'))
  )
  .catch(err => console.error(err))