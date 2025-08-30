﻿import { TestHelper } from '../integration/TestHelper'
import { Standard } from '@parser/interface/IParseOptions'
'use strict'

describe("ICWS'88", () => {
    it('aisr, cancer, cleaner, cowboy, death', () => {
        return TestHelper.testWarriorList(
            'test/parser/integration/warriors/ICWS-88/',
            ['aisr', 'cancer', 'cleaner', 'cowboy', 'death'],
            Standard.ICWS88
        )
    })

    it('dracula, drdeath, drfrog, dude, dwomp', () => {
        return TestHelper.testWarriorList(
            'test/parser/integration/warriors/ICWS-88/',
            ['dracula', 'drdeath', 'drfrog', 'dude', 'dwomp'],
            Standard.ICWS88
        )
    })

    it('fairy1, ferret, fydgitr, hithard2, immobilizer', () => {
        return TestHelper.testWarriorList(
            'test/parser/integration/warriors/ICWS-88/',
            ['fairy1', 'ferret', 'fydgitr', 'hithard2', 'immobilizer'],
            Standard.ICWS88
        )
    })

    it('imp, imps, jumper, kirin, kwc72c', () => {
        return TestHelper.testWarriorList(
            'test/parser/integration/warriors/ICWS-88/',
            ['imp', 'imps', 'jumper', 'kirin', 'kwc72c'],
            Standard.ICWS88
        )
    })

    it('lincogs, minidpls, minidspr, mousetrap, muledna2', () => {
        return TestHelper.testWarriorList(
            'test/parser/integration/warriors/ICWS-88/',
            ['lincogs', 'minidpls', 'minidspr', 'mousetrap', 'muledna2'],
            Standard.ICWS88
        )
    })

    it('nfluenza, ogre, parasite6, phage, phage2', () => {
        return TestHelper.testWarriorList(
            'test/parser/integration/warriors/ICWS-88/',
            ['nfluenza', 'ogre', 'parasite6', 'phage', 'phage2'],
            Standard.ICWS88
        )
    })

    it('pinup, piper, plague, pmjump, roller', () => {
        return TestHelper.testWarriorList(
            'test/parser/integration/warriors/ICWS-88/',
            ['pinup', 'piper', 'plague', 'pmjump', 'roller'],
            Standard.ICWS88
        )
    })

    it('schindler, sieve, slaver, splat, sud', () => {
        return TestHelper.testWarriorList(
            'test/parser/integration/warriors/ICWS-88/',
            ['schindler', 'sieve', 'slaver', 'splat', 'sud'],
            Standard.ICWS88
        )
    })

    it('trapper, ultima, vampsprd, virusold, w2', () => {
        return TestHelper.testWarriorList(
            'test/parser/integration/warriors/ICWS-88/',
            ['trapper', 'ultima', 'vampsprd', 'virusold', 'w2'],
            Standard.ICWS88
        )
    })

    it('wally, waspnest, wipe5, zamzow', () => {
        return TestHelper.testWarriorList(
            'test/parser/integration/warriors/ICWS-88/',
            ['wally', 'waspnest', 'wipe5', 'zamzow'],
            Standard.ICWS88
        )
    })
})
