import { Resolver, Query, Arg } from 'type-graphql'
import ParseResult from '@/schema/ParseResult'
import { corewar } from 'corewar'

@Resolver(ParseResult)
export default class ParseResolver {
    @Query(_ => ParseResult)
    async parse(@Arg('redcode') redcode: string): Promise<ParseResult> {
        return corewar.parse(redcode)
    }
}
