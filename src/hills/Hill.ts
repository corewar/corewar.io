import { ObjectType, Field } from 'type-graphql'
import Rules from '@/hills/Rules'
import IId from '@/schema/IId'

@ObjectType()
export default class Hill implements IId {
    @Field()
    id!: string
    @Field()
    rules!: Rules
}
