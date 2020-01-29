import Rules from '@/hills/Rules'
import { InputType, Field } from 'type-graphql'
import OptionsInput from '@/hills/OptionsInput'

@InputType()
export default class RulesInput implements Partial<Rules> {
    @Field()
    rounds!: number
    @Field()
    options!: OptionsInput
}
