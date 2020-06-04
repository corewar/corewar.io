import { InputType, Field } from 'type-graphql'
import Rules from '@/schema/types/Rules'
import OptionsInput from './OptionsInput'

@InputType()
export default class RulesInput implements Partial<Rules> {
    @Field()
    rounds!: number
    @Field()
    size!: number
    @Field()
    options!: OptionsInput
}
