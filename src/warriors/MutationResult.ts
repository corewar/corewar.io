import { Field } from 'type-graphql'

export abstract class MutationResult<T> {
    @Field()
    success!: boolean
    @Field({ nullable: true })
    message?: string
    @Field({ nullable: true })
    result?: T
}
