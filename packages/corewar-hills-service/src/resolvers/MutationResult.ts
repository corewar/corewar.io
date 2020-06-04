import { Field, ObjectType } from 'type-graphql'

@ObjectType()
export default abstract class MutationResult {
    @Field()
    success!: boolean
    @Field({ nullable: true })
    message?: string
}
