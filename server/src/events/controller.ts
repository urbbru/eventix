import {JsonController, Get, Post, Put, Delete, Body, Param, Authorized, CurrentUser, HttpCode, BadRequestError, NotFoundError, QueryParams} from 'routing-controllers'
import Event from './entity';
import User from '../users/entity';
import Ticket from '../tickets/entity';
import { MoreThan } from 'typeorm';

const moment = require('moment')

@JsonController()
export default class EventController {

    @Get('/events')
    async allEvents (
      @QueryParams() paginate: any
    ) {
        const events = await Event.find({ where: {endDate: MoreThan(moment().format())}, skip: paginate.skip, take: paginate.take })
        return { events }
    }

    @Get('/events/:id')
    async getEvent(
      @Param('id') id: number
    ) {
      const event = await Event.findOne(id, {relations: ['tickets']})
      return event
    }

    @Authorized()
    @Post('/events')
    @HttpCode(201)
    async createEvent(
      @CurrentUser() user: User,
      @Body() event: Event
    ) {
      const entity = await event.save()
      entity.user = user
      return entity.save()
    }

    @Authorized()
    @Post('/events/:id/tickets')
    @HttpCode(201)
    async createTicket(
      @CurrentUser() user: User,
      @Param('id') eventId: number,
      @Body() ticket: Ticket
    ) {
      const event = await Event.findOne(eventId)
      if (!event) throw new BadRequestError(`Game does not exist`)

      const entity = await ticket.save()
      entity.user = user
      entity.event = event
      return entity.save()
    }

    // @Authorized()
    @Put('/events/:id')
    async updateEvent(
      @Param('id') id: number,
      @Body() update: Partial<Event>
    ) {
      const event = await Event.findOne(id)
      if(!event) throw new NotFoundError('Event not found djais')

      return Event.merge(event, update).save()
    }

    @Delete("/events/:id")
    async deleteEvent(
      @Param("id") id: number
    ) {
        const event = await Event.findOne(id, {relations: ['tickets']})
        if(!event) throw new NotFoundError('Event not found djais')
        
        return event.remove();
    }

}