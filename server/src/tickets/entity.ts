// src/users/entity.ts
import { Entity, PrimaryGeneratedColumn, Column, ManyToOne } from 'typeorm'
import { BaseEntity } from 'typeorm/repository/BaseEntity'
import User from '../users/entity'
import Event from '../events/entity'

@Entity()
export default class Ticket extends BaseEntity {

  @PrimaryGeneratedColumn()
  id?: number

  @Column('text', {nullable:false})
  price: string

  @Column('text', {nullable:false})
  description: string

  @Column('text', {nullable:true})
  picture: string

  @ManyToOne(_ => Event, event => event.tickets)
  event: Event;

  @ManyToOne(_ => User, user => user.tickets)
  user: User;
}