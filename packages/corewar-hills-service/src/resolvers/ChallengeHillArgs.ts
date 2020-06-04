import { ArgsType, Field } from 'type-graphql'

@ArgsType()
export default class ChallengeHillArgs {
    @Field()
    hillId!: string
    @Field()
    warriorRedcode!: string
}
