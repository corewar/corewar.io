import { ObjectType, Field, Int } from 'type-graphql'
import { IPosition } from 'corewar'

@ObjectType()
export default class Position implements IPosition {
    @Field(_ => Int)
    char!: number
    @Field(_ => Int)
    line!: number
}
