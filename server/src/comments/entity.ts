// src/users/entity.ts
import { Entity, PrimaryGeneratedColumn, Column, ManyToOne } from 'typeorm'
import { BaseEntity } from 'typeorm/repository/BaseEntity'
import User from '../users/entity'

@Entity()
export default class Comment extends BaseEntity {

  @PrimaryGeneratedColumn()
  id?: number

  @Column('text', {nullable:false})
  content: string

  @Column('timestamp', {nullable:false})
  date: string

  @ManyToOne(_ => User, user => user.comments)
  user: User
}