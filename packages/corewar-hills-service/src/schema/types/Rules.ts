import { IRules } from 'corewar'
import { ObjectType, Field } from 'type-graphql'
import Options from './Options'

@ObjectType()
export default class Rules implements IRules {
    @Field()
    rounds!: number
    @Field()
    size!: number
    @Field()
    options!: Options
}
