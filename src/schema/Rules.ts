import { IRules } from 'corewar'
import { ObjectType, Field } from 'type-graphql'
import Options from '@/schema/Options'

@ObjectType()
export default class Rules implements IRules {
    @Field()
    rounds!: number
    @Field()
    options!: Options;
}
