import { InputType, Field } from 'type-graphql'

@InputType()
export default class WarriorInput {
    @Field({nullable: true})
    id?: string
    @Field()
    redcode!: string
}
