import { IRules } from 'corewar'
import { ObjectType, Field } from 'type-graphql'
import Options from '@/schema/Options'

export interface IHillRules extends IRules {
    size: number
}

@ObjectType()
export default class HillRules implements IHillRules {
    @Field()
    rounds!: number
    @Field()
    size!: number
    @Field()
    options!: Options
}
