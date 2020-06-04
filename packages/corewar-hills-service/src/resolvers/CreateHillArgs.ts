import { ArgsType, Field } from 'type-graphql'
import RulesInput from '../schema/inputs/RulesInput'

@ArgsType()
export default class CreateHillArgs {
    @Field()
    rules!: RulesInput
}
