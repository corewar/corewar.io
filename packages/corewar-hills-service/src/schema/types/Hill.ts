import { ObjectType, Field } from 'type-graphql'
import IId from './IId'
import Rules from './Rules'
import Warrior from './Warrior'

@ObjectType()
export default class Hill implements IId {
    @Field()
    id!: string
    @Field()
    rules!: Rules
    @Field(_ => [Warrior])
    warriors!: Warrior[]
}
