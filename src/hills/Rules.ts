import { IRules } from 'corewar'
import { ObjectType, Field } from 'type-graphql'
import Options from '@/hills/Options'

@ObjectType()
export default class Rules implements IRules {
    @Field()
    rounds!: number
    @Field()
    options!: Options;
}
