import { Field } from 'type-graphql'

export default abstract class MutationResult<T> {
    @Field()
    success!: boolean
    @Field({ nullable: true })
    message?: string
    
    result?: T
}
