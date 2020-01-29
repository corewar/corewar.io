import { InputType, Field } from 'type-graphql'

@InputType()
export class WarriorInput {
    @Field({nullable: true})
    id?: string
    @Field()
    redcode!: string
}
