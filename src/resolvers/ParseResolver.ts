import { Resolver, Query, Arg } from 'type-graphql'
import ParseResult from '@/schema/ParseResult'
import { corewar } from 'corewar'

@Resolver(ParseResult)
export default class ParseResolver {
    @Query(returns => ParseResult)
    async parse(@Arg('redcode') redcode: string) {
        return corewar.parse(redcode)
    }
}
