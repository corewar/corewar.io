import { expect } from 'chai'

import { IToken } from '@parser/interface/IToken'
import { JsonSerialiser } from '@parser/JsonSerialiser'
import { TestHelper } from '@parser/tests/unit/TestHelper'
'use strict'

describe('JsonSerialiser', () => {
    it('json serialises tokens in the order emitted', () => {
        const tokens: IToken[] = TestHelper.instruction(1, '', 'MOV', '.AB', '#', '23', ',', '$', '-45', '')

        const serialiser = new JsonSerialiser()

        const actual = serialiser.serialise(tokens)

        expect(actual).to.be.equal(JSON.stringify(tokens))
    })
})
