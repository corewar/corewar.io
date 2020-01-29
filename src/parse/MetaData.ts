import { ObjectType, Field } from 'type-graphql'
import { IMetaData } from 'corewar'

@ObjectType()
export default class MetaData implements IMetaData {
    @Field()
    author!: string
    @Field()
    name!: string
    @Field()
    strategy!: string
}
