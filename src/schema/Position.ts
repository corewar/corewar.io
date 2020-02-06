import { ObjectType, Field, Int } from 'type-graphql'
import { IPosition } from 'corewar'

@ObjectType()
export default class Position implements IPosition {
    @Field(type => Int)
    char!: number
    @Field(type => Int)
    line!: number
}
