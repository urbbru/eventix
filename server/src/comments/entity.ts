// src/users/entity.ts
import { Entity, PrimaryGeneratedColumn, Column, ManyToOne } from 'typeorm'
import { BaseEntity } from 'typeorm/repository/BaseEntity'
import User from '../users/entity'
import Ticket from '../tickets/entity'

@Entity()
export default class Comment extends BaseEntity {

  @PrimaryGeneratedColumn()
  id?: number

  @Column('text', {nullable:false})
  content: string

  @Column('timestamp', {nullable:false})
  date: string

  @ManyToOne(_ => Ticket, ticket => ticket.comments)
  ticket: Ticket

  @ManyToOne(_ => User, user => user.comments, {eager:true})
  user: User
}