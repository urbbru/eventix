import {JsonController, Get, Post, Put, Body, Param, HttpCode, NotFoundError} from 'routing-controllers'
import Event from './entity';
// import Ticket from '../tickets/entity';

@JsonController()
export default class EventController {

    // @Authorized()
    @Get('/events')
    allEvents = async () => {
       const events = await Event.find()
       return { events }
    }

    // @Authorized()
    @Get('/events/:id')
    async getEvent(
      @Param('id') id: number
    ) {
      const event = await Event.findOne(id, {relations: ['tickets']})
      return event
    }

    // @Authorized()
    @Post('/events')
    @HttpCode(201)
    createEvent(
      @Body() event: Event
    ) {
      return event.save()
    }

    // @Authorized()
    @Put('/events/:id')
    async updateEvent(
      @Param('id') id: number,
      @Body() update: Partial<Event>
    ) {
      const event = await Event.findOne(id)
      if(!event) throw new NotFoundError('Page not found djais')

      return Event.merge(event, update).save()
    }

}