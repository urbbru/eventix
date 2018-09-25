import {JsonController, Get, Post, Put, Body, Param, HttpCode, NotFoundError} from 'routing-controllers'
import Ticket from './entity';

@JsonController()
export default class TicketController {

    @Get('/tickets')
    allTickets = async () => {
       const tickets = await Ticket.find()
       return { tickets }
    }

    @Post('/tickets')
    @HttpCode(201)
    createTicket(
      @Body() ticket: Ticket
    ) {
      return ticket.save()
    }

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