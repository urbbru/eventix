import 'reflect-metadata'
import {createKoaServer} from "routing-controllers"
import setupDb from './db'
import EventController from "./events/controller"
import UserController from "./users/controller"
import TicketController from "./tickets/controller"
import CommentController from "./comments/controller"
import LoginController from "./logins/controller"
import {Action} from 'routing-controllers'
import { verify } from './jwt'

const port = process.env.PORT || 4000

const app = createKoaServer({
    cors:true,
    controllers: [
      UserController,
      TicketController,
      EventController,
      CommentController,
      LoginController
    ],
    authorizationChecker: (action: Action) => {
      const header: string = action.request.headers.authorization
    
      if (header && header.startsWith('Bearer ')) {
        const [ , token ] = header.split(' ')
        return !!(token && verify(token))
      }
      // ...
      return false
    }
})

setupDb()
  .then(_ =>
    app.listen(port, () => console.log('Listening on port 4000'))
  )
  .catch(err => console.error(err))