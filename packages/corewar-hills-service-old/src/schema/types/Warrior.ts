import { ObjectType, Field } from 'type-graphql'
import IId from './IId'

@ObjectType()
export default class Warrior implements IId {
    @Field()
    id!: string
    @Field()
    redcode!: string
}
