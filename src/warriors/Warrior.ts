import ParseResult from "../parse/ParseResult";
import { Field, ObjectType, InputType } from "type-graphql";

@ObjectType()
export class Warrior {
    @Field()
    id!: string
    @Field()
    redcode!: string
    @Field()
    parseResult!: ParseResult
}

@InputType()
export class WarriorInput {
    @Field({nullable: true})
    id?: string
    @Field()
    redcode!: string
}
