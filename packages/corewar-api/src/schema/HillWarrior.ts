import { ObjectType, Field } from 'type-graphql'
import HillWarriorResult from './HillWarriorResult'

@ObjectType()
export default class HillWarrior {
    @Field()
    warriorId!: string
    @Field()
    age!: number
    @Field()
    rank!: number
    @Field()
    result!: HillWarriorResult
}
