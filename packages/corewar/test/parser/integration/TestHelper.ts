import { expect } from 'chai'

import { DefaultPass } from '@parser/DefaultPass'
import { Expression } from '@parser/Expression'
import { Filter } from '@parser/Filter'
import { ForPass } from '@parser/ForPass'
import { IllegalCommandCheck } from '@parser/IllegalCommandCheck'
import { LabelCollector } from '@parser/LabelCollector'
import { LabelEmitter } from '@parser/LabelEmitter'
import { LoadFileSerialiser } from '@parser/LoadFileSerialiser'
import { MathsProcessor } from '@parser/MathsProcessor'
import { MetaDataCollector } from '@parser/MetaDataCollector'
import { MetaDataEmitter } from '@parser/MetaDataEmitter'
import { OrgPass } from '@parser/OrgPass'
import { Parser } from '@parser/Parser'
import { PreprocessAnalyser } from '@parser/PreprocessAnalyser'
import { PreprocessCollector } from '@parser/PreprocessCollector'
import { PreprocessEmitter } from '@parser/PreprocessEmitter'
import { Scanner } from '@parser/Scanner'
import { SyntaxCheck } from '@parser/SyntaxCheck'
import { Standard } from '@parser/interface/IParseOptions'
import { IParseResult } from '@parser/interface/IParseResult'
import { TestLoader } from '@parser/tests/integration/TestLoader'

export class TestHelper {
    private static failedIndex(name: string, a: string, b: string): void {
        for (let i = 0; i < a.length; i++) {
            const ac = a[i]
            const bc = b[i]

            if (ac !== bc) {
                console.log(name + ' Failed index ' + i.toString() + ', ' + ac + ' !== ' + bc)

                let si = i - 10
                if (si < 0) {
                    si = 0
                }

                let ei = i + 10
                if (ei >= a.length) {
                    ei = a.length - 1
                }

                let msg = ''
                for (let j = si; j <= ei; j++) {
                    msg += a[j]
                }
                console.log('Back ten forward ten: ' + msg)

                return
            }
        }
    }

    public static testWarriorParse(redcode: string, standard: Standard): IParseResult {
        const expression = new Expression()

        const parser = new Parser(
            new Scanner(),
            new Filter(),
            new MetaDataCollector(),
            new ForPass(expression),
            new PreprocessCollector(),
            new PreprocessAnalyser(),
            new PreprocessEmitter(),
            new LabelCollector(),
            new LabelEmitter(),
            new MathsProcessor(expression),
            new DefaultPass(),
            new OrgPass(),
            new SyntaxCheck(),
            new IllegalCommandCheck(),
            new MetaDataEmitter()
        )

        return parser.parse(
            redcode,
            Object.assign(Parser.DefaultOptions, {
                standard: standard
            })
        )
    }

    public static testWarriorList(
        path: string,
        names: string[],
        standard: Standard,
        allowMessages = false
    ): Promise<void> {
        const loader = new TestLoader()
        return loader.getWarriors(path, names).then(warriors => {
            return new Promise(resolve => {
                let remaining = warriors.length
                warriors.forEach(warrior => {
                    const result = TestHelper.testWarriorParse(warrior.redcode, standard)

                    const serialiser = new LoadFileSerialiser()

                    const loadfile = serialiser.serialise(result.tokens)

                    const actual = loadfile.trim()
                    const expected = warrior.loadfile.replace(/[\r]/g, '').trim()

                    if (actual !== expected) {
                        this.failedIndex(warrior.name, actual, expected)
                    }

                    expect(actual).to.be.equal(expected)

                    if (!allowMessages) {
                        expect(result.messages.length).to.be.equal(0)
                    }

                    if (--remaining == 0) {
                        resolve(undefined)
                    }
                })
            })
        })
    }
}
