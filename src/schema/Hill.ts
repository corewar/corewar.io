import { ObjectType, Field } from 'type-graphql'
import Rules from '@/schema/HillRules'
import IId from '@/schema/IId'
import HillWarrior from '@/schema/HillWarrior'

@ObjectType()
export default class Hill implements IId {
    @Field()
    id!: string
    @Field()
    rules!: Rules
    @Field(_ => [HillWarrior])
    warriors!: HillWarrior[]
}
