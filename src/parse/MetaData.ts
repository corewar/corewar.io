import { ObjectType, Field } from 'type-graphql'
import { IMetaData } from 'corewar'

@ObjectType()
export class MetaData implements IMetaData {
    @Field()
    author!: string
    @Field()
    name!: string
    @Field()
    strategy!: string
}
