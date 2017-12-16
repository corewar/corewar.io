import * as chai from "chai";
import * as sinon from "sinon";
import * as sinonChai from "sinon-chai";
var expect = chai.expect;
chai.use(sinonChai);

import { ICore, ICoreAccessEventArgs, CoreAccessType } from "../interface/ICore";
import { IRandom } from "../interface/IRandom";
import { IWarriorLoader } from "../interface/IWarriorLoader";
import { IParseResult } from "../../parser/interface/IParseResult";
import { Warrior } from "../Warrior";
import { Loader } from "../Loader";
import Defaults from "../Defaults";
import DataHelper from "./DataHelper";

describe("Loader",() => {

    var random: IRandom;
    var randomIndex: number;
    var randoms: number[];

    var warriorLoader: IWarriorLoader;
    var core: ICore;

    beforeEach(() => {

        randomIndex = 0;
        randoms = [1000, 2000, 3000, 4000, 5000, 6000, 7000];

        random = {
            get: (max: number) => {
                return randoms[randomIndex++];
            }
        };

        warriorLoader = {
            load: (address: number, result: IParseResult) => {
                var warrior = new Warrior();
                warrior.startAddress = address;
                return warrior;
            }
        };

        core = {
            getSize: () => { return 0; },
            executeAt: sinon.stub(),
            readAt: sinon.stub(),
            getAt: sinon.stub(),
            setAt: sinon.stub(),
            initialise: sinon.stub(),
            wrap: sinon.stub()
        };
    });

    it("Loads each warrior specified into core",() => {

        var warriors = [
            DataHelper.buildParseResult([]),
            DataHelper.buildParseResult([]),
            DataHelper.buildParseResult([])
        ];

        var loadSpy = sinon.stub();
        loadSpy.returns(new Warrior());

        warriorLoader = {
            load: loadSpy
        };

        var loader = new Loader(random, core, warriorLoader);

        loader.load(warriors, Defaults);

        expect(warriorLoader.load).to.have.been.calledWith(sinon.match.number, warriors[0], sinon.match.number);
        expect(warriorLoader.load).to.have.been.calledWith(sinon.match.number, warriors[1], sinon.match.number);
        expect(warriorLoader.load).to.have.been.calledWith(sinon.match.number, warriors[2], sinon.match.number);
    });

    it("Returns the warriors which have been loaded into core",() => {

        var warriorsIn = [
            DataHelper.buildParseResult([]),
            DataHelper.buildParseResult([]),
            DataHelper.buildParseResult([])
        ];

        var warriorsOut = [
            new Warrior(),
            new Warrior(),
            new Warrior()
        ];

        warriorLoader.load = (address: number, result: IParseResult) => {
            return warriorsOut[warriorsIn.indexOf(result)];
        };

        var loader = new Loader(random, core, warriorLoader);

        var actual = loader.load(warriorsIn, Defaults);

        expect(actual[0]).to.be.equal(warriorsOut[0]);
        expect(actual[1]).to.be.equal(warriorsOut[1]);
        expect(actual[2]).to.be.equal(warriorsOut[2]);
    });

    function wrapTo(max: number): (address: number) => number {

        return (address: number) => {
            address = address % max;
            address = address >= 0 ? address : address + max;

            return address;
        };
    }

    it("Does not place warriors at the same address",() => {

        randoms = [10, 10, 10, 20];

        var options = Object.assign({},
            Defaults,
            {
                coresize: 30,
                instructionLimit: 1,
                minSeparation: 1
            });

        var warriors = [
            DataHelper.buildParseResult([]),
            DataHelper.buildParseResult([])
        ];

        core.wrap = wrapTo(30);

        var loader = new Loader(random, core, warriorLoader);

        var actual = loader.load(warriors, options);

        expect(actual[0].startAddress).to.be.equal(10);
        expect(actual[1].startAddress).to.be.equal(20);
    });

    it("Does not place warriors so they overlap",() => {

        randoms = [10, 8, 12, 15, 6, 5];

        var options = Object.assign({},
            Defaults,
            {
                coresize: 30,
                instructionLimit: 5,
                minSeparation: 1
            });

        var warriors = [
            DataHelper.buildParseResult([]),
            DataHelper.buildParseResult([]),
            DataHelper.buildParseResult([])
        ];

        core.wrap = wrapTo(30);

        var loader = new Loader(random, core, warriorLoader);

        var actual = loader.load(warriors, options);

        expect(actual[0].startAddress).to.be.equal(10);
        expect(actual[1].startAddress).to.be.equal(15);
        expect(actual[2].startAddress).to.be.equal(5);
    });

    it("Does not place warriors so they are within the minimum separation distance",() => {

        randoms = [10, 12, 18, 19, 4, 1];

        var options = Object.assign({},
            Defaults, 
            {
                coresize: 30,
                instructionLimit: 5,
                minSeparation: 5
            });

        var warriors = [
            DataHelper.buildParseResult([]),
            DataHelper.buildParseResult([]),
            DataHelper.buildParseResult([])
        ];

        core.wrap = wrapTo(30);

        var loader = new Loader(random, core, warriorLoader);

        var actual = loader.load(warriors, options);

        expect(actual[0].startAddress).to.be.equal(10);
        expect(actual[1].startAddress).to.be.equal(19);
        expect(actual[2].startAddress).to.be.equal(1);
    });

    it("Correctly accounts for edge case where first warrior wraps round from high address to low address",() => {

        randoms = [28, 20, 19, 6, 7];

        var options = Object.assign({},
            Defaults,
            {
                coresize: 30,
                instructionLimit: 5,
                minSeparation: 5
            });

        var warriors = [
            DataHelper.buildParseResult([]),
            DataHelper.buildParseResult([]),
            DataHelper.buildParseResult([])
        ];

        core.wrap = wrapTo(30);

        var loader = new Loader(random, core, warriorLoader);

        var actual = loader.load(warriors, options);

        expect(actual[0].startAddress).to.be.equal(28);
        expect(actual[1].startAddress).to.be.equal(19);
        expect(actual[2].startAddress).to.be.equal(7);
    });

    it("Correctly accounts for edge case where second warrior wraps round from high address to low address",() => {

        randoms = [19, 27, 28, 6, 7];

        var options = Object.assign({},
            Defaults,
            {
                coresize: 30,
                instructionLimit: 5,
                minSeparation: 5
            });

        var warriors = [
            DataHelper.buildParseResult([]),
            DataHelper.buildParseResult([]),
            DataHelper.buildParseResult([])
        ];

        core.wrap = wrapTo(30);

        var loader = new Loader(random, core, warriorLoader);

        var actual = loader.load(warriors, options);

        expect(actual[0].startAddress).to.be.equal(19);
        expect(actual[1].startAddress).to.be.equal(28);
        expect(actual[2].startAddress).to.be.equal(7);
    });

    it("Assigns a unique id to each warrior", () => {

        var warriors = [
            DataHelper.buildParseResult([]),
            DataHelper.buildParseResult([]),
            DataHelper.buildParseResult([])
        ];

        var loadSpy = sinon.stub();
        loadSpy.returns(new Warrior());

        warriorLoader = {
            load: loadSpy
        };

        var loader = new Loader(random, core, warriorLoader);

        loader.load(warriors, Defaults);

        expect(warriorLoader.load).to.have.been.calledWith(sinon.match.any, sinon.match.any, 0);
        expect(warriorLoader.load).to.have.been.calledWith(sinon.match.any, sinon.match.any, 1);
        expect(warriorLoader.load).to.have.been.calledWith(sinon.match.any, sinon.match.any, 2);
    });
});