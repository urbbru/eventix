import { Entity, PrimaryGeneratedColumn, Column, OneToMany, ManyToOne } from 'typeorm'
import { BaseEntity } from 'typeorm/repository/BaseEntity'
import { IsString, IsNumber, Length } from 'class-validator'
import User from '../users/entity';
import Ticket from '../tickets/entity'

@Entity()
export default class Event extends BaseEntity {

  @PrimaryGeneratedColumn()
  id?: number

  @IsString()
  @Column('text', {nullable:false})
  name: string

  @IsString()
  @Length(5, 25)
  @Column('text', {nullable:false})
  description: string

  @Column('text', {nullable:false})
  picture: string
  
  @IsNumber()
  @Column('int', {nullable:false})
  price: number

  @Column('timestamp', {nullable:false})
  startDate: string

  @Column('timestamp', {nullable:true})
  endDate: string

  @OneToMany(_ => Ticket, ticket => ticket.event)
  tickets: Ticket[]

  @ManyToOne(_ => User, user => user.events)
  user: User
}