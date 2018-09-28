import {JsonController, Get, Post, Put, Body, Param, Authorized, CurrentUser, HttpCode, BadRequestError, NotFoundError} from 'routing-controllers'
import Ticket from './entity';
import Comment from '../comments/entity';
import User from '../users/entity';

@JsonController()
export default class TicketController {

    @Get('/tickets')
    allTickets = async () => {
       const tickets = await Ticket.find()
       return { tickets }
    }

    @Get('/tickets/:id')
    async getTicket(
      @Param('id') id: number
    ) {
      const ticket = await Ticket.findOne(id, {relations: ['event', 'comments']})
      return ticket
    }

    @Authorized()
    @Post('/tickets/:id/comments')
    @HttpCode(201)
    async createTicket(
      @CurrentUser() user: User,
      @Param('id') ticketId: number,
      @Body() comment: Comment
    ) {
      const ticket = await Ticket.findOne(ticketId)
      if (!ticket) throw new BadRequestError(`Game does not exist`)

      const entity = await comment.save()
      entity.user = user
      entity.ticket = ticket
      return entity.save()
    }

    @Authorized()
    @Put('/tickets/:id')
    async updateTicket(
      @Param('id') id: number,
      @Body() update: Partial<Ticket>
    ) {
      const ticket = await Ticket.findOne(id)
      if(!ticket) throw new NotFoundError('Ticket not found djais')

      return Ticket.merge(ticket, update).save()
    }

}