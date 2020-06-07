import { Field, ArgsType } from 'type-graphql'

@ArgsType()
export default class HillArgs {
    @Field()
    id!: string
}
