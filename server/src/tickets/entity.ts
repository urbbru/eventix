// src/users/entity.ts
import { Entity, PrimaryGeneratedColumn, Column, OneToMany, ManyToOne } from 'typeorm'
import { BaseEntity } from 'typeorm/repository/BaseEntity'
import { IsString, IsNumber, Length } from 'class-validator'
import User from '../users/entity'
import Event from '../events/entity'
import Comment from '../comments/entity';

@Entity()
export default class Ticket extends BaseEntity {

  @PrimaryGeneratedColumn()
  id?: number

  @IsNumber()
  @Column('int', {nullable:false})
  price: number

  @IsString()
  @Length(5, 25)
  @Column('text', {nullable:false})
  description: string

  @Column('text', {nullable:true})
  picture: string

  @OneToMany(_ => Comment, comment => comment.ticket)
  comments: Comment[];

  @ManyToOne(_ => Event, event => event.tickets)
  event: Event;

  @ManyToOne(_ => User, user => user.tickets)
  user: User;
}