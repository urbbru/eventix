// src/users/entity.ts
import { Entity, PrimaryGeneratedColumn, Column, OneToMany } from 'typeorm';
import { BaseEntity } from 'typeorm/repository/BaseEntity';
import { IsString, MinLength, IsEmail } from 'class-validator';
import { Exclude } from 'class-transformer';
import Event from '../events/entity';
import Ticket from '../events/entity';
import Comment from '../events/entity';
// import * as bcrypt from 'bcrypt' <-- not working giving weird error
const bcrypt = require('bcryptjs');

@Entity()
export default class User extends BaseEntity {

  @PrimaryGeneratedColumn()
  id?: number

  @IsString()
  @MinLength(2, {
    message: "name is too short"
  })
  @Column('text', {nullable:false})
  name: string

  @IsEmail()
  @Column('text', {nullable:false})
  email: string

  @IsString()
  @MinLength(8)
  @Column('text', { nullable:true })
  @Exclude({toPlainOnly:true})
  password: string

  async setPassword(rawPassword: string) {
    const hash = bcrypt.hashSync(rawPassword, 10)
    this.password = hash
  }

  checkPassword(rawPassword: string): Promise<boolean> {
    return bcrypt.compareSync(rawPassword, this.password)
  }

  @OneToMany(_ => Event, event => event.user)
  events: Event[];

  @OneToMany(_ => Ticket, ticket => ticket.user)
  tickets: Ticket[];

  @OneToMany(_ => Comment, comment => comment.user)
  comments: Comment[];
}