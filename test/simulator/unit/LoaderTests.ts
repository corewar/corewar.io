import * as chai from "chai";
import * as sinon from "sinon";
import * as sinonChai from "sinon-chai";
const expect = chai.expect;
chai.use(sinonChai);

import { IWarrior } from "@simulator/interface/IWarrior";
import { ICore } from "@simulator/interface/ICore";
import { IRandom } from "@simulator/interface/IRandom";
import { IWarriorLoader } from "@simulator/interface/IWarriorLoader";
import { IParseResult } from "@parser/interface/IParseResult";
import { Warrior } from "@simulator/Warrior";
import { Loader } from "@simulator/Loader";
import Defaults from "@simulator/Defaults";
import TestHelper from "@simulator/tests/unit/TestHelper";

describe("Loader",() => {

    let random: IRandom;
    let randomIndex: number;
    let randoms: number[];

    let warriorLoader: IWarriorLoader;
    let core: ICore;

    beforeEach(() => {

        randomIndex = 0;
        randoms = [1000, 2000, 3000, 4000, 5000, 6000, 7000];

        random = {
            get: (_: number): number => {
                return randoms[randomIndex++];
            }
        };

        warriorLoader = {
            load: (address: number, _: IParseResult): IWarrior => {
                const warrior = new Warrior();
                warrior.startAddress = address;
                return warrior;
            }
        };

        core = {
            getSize: (): number => { return 0; },
            executeAt: sinon.stub(),
            readAt: sinon.stub(),
            getAt: sinon.stub(),
            getWithInfoAt: sinon.stub(),
            setAt: sinon.stub(),
            initialise: sinon.stub(),
            wrap: sinon.stub()
        };
    });

    it("Loads each warrior specified into core",() => {

        const warriors = [
            TestHelper.buildParseResult([]),
            TestHelper.buildParseResult([]),
            TestHelper.buildParseResult([])
        ];

        const loadSpy = sinon.stub();
        loadSpy.returns(new Warrior());

        warriorLoader = {
            load: loadSpy
        };

        const loader = new Loader(random, core, warriorLoader);

        loader.load(warriors, Defaults);

        expect(warriorLoader.load).to.have.been.calledWith(sinon.match.number, warriors[0], sinon.match.number);
        expect(warriorLoader.load).to.have.been.calledWith(sinon.match.number, warriors[1], sinon.match.number);
        expect(warriorLoader.load).to.have.been.calledWith(sinon.match.number, warriors[2], sinon.match.number);
    });

    it("Returns the warriors which have been loaded into core",() => {

        const warriorsIn = [
            TestHelper.buildParseResult([]),
            TestHelper.buildParseResult([]),
            TestHelper.buildParseResult([])
        ];

        const warriorsOut = [
            new Warrior(),
            new Warrior(),
            new Warrior()
        ];

        warriorLoader.load = (_: number, result: IParseResult): IWarrior => {
            return warriorsOut[warriorsIn.indexOf(result)];
        };

        const loader = new Loader(random, core, warriorLoader);

        const actual = loader.load(warriorsIn, Defaults);

        expect(actual[0]).to.be.equal(warriorsOut[0]);
        expect(actual[1]).to.be.equal(warriorsOut[1]);
        expect(actual[2]).to.be.equal(warriorsOut[2]);
    });

    function wrapTo(max: number): (address: number) => number {

        return (address: number): number => {
            address = address % max;
            address = address >= 0 ? address : address + max;

            return address;
        };
    }

    it("Does not place warriors at the same address",() => {

        randoms = [10, 10, 10, 20];

        const options = Object.assign({},
            Defaults,
            {
                coresize: 30,
                instructionLimit: 1,
                minSeparation: 1
            });

        const warriors = [
            TestHelper.buildParseResult([]),
            TestHelper.buildParseResult([])
        ];

        core.wrap = wrapTo(30);

        const loader = new Loader(random, core, warriorLoader);

        const actual = loader.load(warriors, options);

        expect(actual[0].startAddress).to.be.equal(10);
        expect(actual[1].startAddress).to.be.equal(20);
    });

    it("Does not place warriors so they overlap",() => {

        randoms = [10, 8, 12, 15, 6, 5];

        const options = Object.assign({},
            Defaults,
            {
                coresize: 30,
                instructionLimit: 5,
                minSeparation: 1
            });

        const warriors = [
            TestHelper.buildParseResult([]),
            TestHelper.buildParseResult([]),
            TestHelper.buildParseResult([])
        ];

        core.wrap = wrapTo(30);

        const loader = new Loader(random, core, warriorLoader);

        const actual = loader.load(warriors, options);

        expect(actual[0].startAddress).to.be.equal(10);
        expect(actual[1].startAddress).to.be.equal(15);
        expect(actual[2].startAddress).to.be.equal(5);
    });

    it("Does not place warriors so they are within the minimum separation distance",() => {

        randoms = [10, 12, 18, 19, 4, 1];

        const options = Object.assign({},
            Defaults, 
            {
                coresize: 30,
                instructionLimit: 5,
                minSeparation: 5
            });

        const warriors = [
            TestHelper.buildParseResult([]),
            TestHelper.buildParseResult([]),
            TestHelper.buildParseResult([])
        ];

        core.wrap = wrapTo(30);

        const loader = new Loader(random, core, warriorLoader);

        const actual = loader.load(warriors, options);

        expect(actual[0].startAddress).to.be.equal(10);
        expect(actual[1].startAddress).to.be.equal(19);
        expect(actual[2].startAddress).to.be.equal(1);
    });

    it("Correctly accounts for edge case where first warrior wraps round from high address to low address",() => {

        randoms = [28, 20, 19, 6, 7];

        const options = Object.assign({},
            Defaults,
            {
                coresize: 30,
                instructionLimit: 5,
                minSeparation: 5
            });

        const warriors = [
            TestHelper.buildParseResult([]),
            TestHelper.buildParseResult([]),
            TestHelper.buildParseResult([])
        ];

        core.wrap = wrapTo(30);

        const loader = new Loader(random, core, warriorLoader);

        const actual = loader.load(warriors, options);

        expect(actual[0].startAddress).to.be.equal(28);
        expect(actual[1].startAddress).to.be.equal(19);
        expect(actual[2].startAddress).to.be.equal(7);
    });

    it("Correctly accounts for edge case where second warrior wraps round from high address to low address",() => {

        randoms = [19, 27, 28, 6, 7];

        const options = Object.assign({},
            Defaults,
            {
                coresize: 30,
                instructionLimit: 5,
                minSeparation: 5
            });

        const warriors = [
            TestHelper.buildParseResult([]),
            TestHelper.buildParseResult([]),
            TestHelper.buildParseResult([])
        ];

        core.wrap = wrapTo(30);

        const loader = new Loader(random, core, warriorLoader);

        const actual = loader.load(warriors, options);

        expect(actual[0].startAddress).to.be.equal(19);
        expect(actual[1].startAddress).to.be.equal(28);
        expect(actual[2].startAddress).to.be.equal(7);
    });

    it("Assigns a unique id to each warrior", () => {

        const warriors = [
            TestHelper.buildParseResult([]),
            TestHelper.buildParseResult([]),
            TestHelper.buildParseResult([])
        ];

        const loadSpy = sinon.stub();
        loadSpy.returns(new Warrior());

        warriorLoader = {
            load: loadSpy
        };

        const loader = new Loader(random, core, warriorLoader);

        loader.load(warriors, Defaults);

        expect(warriorLoader.load).to.have.been.calledWith(sinon.match.any, sinon.match.any, 0);
        expect(warriorLoader.load).to.have.been.calledWith(sinon.match.any, sinon.match.any, 1);
        expect(warriorLoader.load).to.have.been.calledWith(sinon.match.any, sinon.match.any, 2);
    });
});