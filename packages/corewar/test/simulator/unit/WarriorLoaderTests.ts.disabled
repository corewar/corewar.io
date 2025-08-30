import * as chai from 'chai'
import * as sinon from 'sinon'
import * as sinonChai from 'sinon-chai'
const expect = chai.expect
chai.use(sinonChai)

import { IToken, TokenCategory } from '@parser/interface/IToken'
import { WarriorLoader } from '@simulator/WarriorLoader'
import { ICore } from '@simulator/interface/ICore'
import { IInstruction, ModifierType, OpcodeType } from '@simulator/interface/IInstruction'
import { MessageType } from '@simulator/interface/IMessage'
import { ModeType } from '@simulator/interface/IOperand'
import { IOptions } from '@simulator/interface/IOptions'
import { ITask } from '@simulator/interface/ITask'
import IWarrior from '@simulator/interface/IWarrior'
import TestHelper from '@simulator/tests/unit/TestHelper'

describe('WarriorLoader', () => {
    const CORESIZE = 8000

    const instruction = TestHelper.instruction

    const testTokens = instruction('DAT', '.A', '$', 0, '$', 1)
        .concat(instruction('MOV', '.B', '#', 2, '#', 3))
        .concat(instruction('ADD', '.AB', '*', 4, '*', 5))
        .concat(instruction('SUB', '.BA', '@', 6, '@', 7))
        .concat(instruction('MUL', '.F', '{', 8, '{', 9))
        .concat(instruction('DIV', '.I', '<', 10, '<', 11))
        .concat(instruction('MOD', '.X', '}', 12, '}', 13))
        .concat(instruction('JMP', '.A', '>', 14, '>', 15))
        .concat(instruction('JMZ', '.B', '$', -1, '#', -2))
        .concat(instruction('JMN', '.AB', '#', -3, '*', -4))
        .concat(instruction('DJN', '.BA', '*', -5, '@', -6))
        .concat(instruction('CMP', '.F', '@', -7, '{', -8))
        .concat(instruction('SEQ', '.I', '{', -9, '<', -10))
        .concat(instruction('SNE', '.F', '<', -11, '}', -12))
        .concat(instruction('SLT', '.X', '}', -13, '>', -14))
        .concat(instruction('SPL', '.A', '$', -15, '#', -16))
        .concat(instruction('NOP', '.B', '#', 0, '#', 0))

    beforeEach(() => {
        this!.publisher = {
            queue: sinon.stub(),
            publish: sinon.stub()
        }
    })

    function buildCore(size: number): ICore {
        const core = {
            getSize: (): number => {
                return 0
            },
            instructions: [],
            initialise: (_: IOptions): void => {
                //
            },
            wrap: (address: number): number => {
                address = address % CORESIZE
                address = address >= 0 ? address : address + CORESIZE

                return address
            },
            executeAt: (_: ITask, index: number): IInstruction => {
                return core.instructions[index]
            },
            readAt: (_: ITask, index: number): IInstruction => {
                return core.instructions[index]
            },
            getAt: (index: number): IInstruction => {
                return core.instructions[index]
            },
            getWithInfoAt: sinon.stub(),
            setAt: sinon.stub().callsFake((_: ITask, index: number, instruction: IInstruction) => {
                core.instructions[index] = instruction
            }),
            publishCoreAccesses: sinon.stub()
        }
        for (let i = 0; i < size; i++) {
            core.instructions.push({
                address: i,
                opcode: OpcodeType.DAT,
                modifier: ModifierType.F,
                aOperand: {
                    mode: ModeType.Immediate,
                    address: 0
                },
                bOperand: {
                    mode: ModeType.Immediate,
                    address: 0
                }
            })
        }
        return core
    }

    it('Applies metadata to the warrior', () => {
        const warrior: IWarrior = {
            source: {
                tokens: [],
                messages: [],
                success: true,
                metaData: {
                    name: 'johnSmith',
                    author: 'Joe Bloggs',
                    strategy: 'This is a strategy\nit has two lines'
                }
            }
        }

        const core = buildCore(0)

        const loader = new WarriorLoader(core, this!.publisher)
        const actual = loader.load(0, warrior, 0)

        expect(actual.name).to.be.equal('johnSmith')
        expect(actual.author).to.be.equal('Joe Bloggs')
        expect(actual.strategy).to.be.equal('This is a strategy\nit has two lines')
    })

    it('Creates a single process for the warrior', () => {
        const warrior = TestHelper.buildWarrior()
        const core = buildCore(0)

        const loader = new WarriorLoader(core, this!.publisher)
        const actual = loader.load(0, warrior, 0)

        expect(actual.taskIndex).to.be.equal(0)
        expect(actual.tasks.length).to.be.equal(1)
        expect(actual.tasks[0].instance).to.be.equal(actual)
    })

    it('Sets the starting instruction pointer to the load address offset by the value indicated by the ORG instruction', () => {
        const tokens: IToken[] = [
            {
                category: TokenCategory.Preprocessor,
                lexeme: 'ORG',
                position: TestHelper.position
            },
            {
                category: TokenCategory.Number,
                lexeme: '4',
                position: TestHelper.position
            },
            {
                category: TokenCategory.EOL,
                lexeme: '\n',
                position: TestHelper.position
            }
        ]
        const warrior = { source: TestHelper.buildParseResult(tokens) }

        const core = buildCore(10)

        const loader = new WarriorLoader(core, this!.publisher)
        const actual = loader.load(3, warrior, 0)

        expect(actual.tasks[0].instructionPointer).to.be.equal(7)
    })

    it('Loads the warrior into the core at the specified address', () => {
        const warrior = { source: TestHelper.buildParseResult(instruction('MOV', '.I', '$', 0, '$', 1)) }
        const core = buildCore(30)

        const loader = new WarriorLoader(core, this!.publisher)
        loader.load(21, warrior, 0)

        for (let i = 0; i < 30; i++) {
            const instr = core.readAt(null, i)
            expect(instr.address).to.be.equal(i)

            if (i === 21) {
                expect(instr.opcode).to.be.equal(OpcodeType.MOV)
            } else {
                expect(instr.opcode).to.be.equal(OpcodeType.DAT)
            }
        }
    })

    it('applies wraps addresses so that they are in the range 0-(CORESIZE-1)', () => {
        const warrior = { source: TestHelper.buildParseResult(instruction('MOV', '.I', '$', -1, '$', 8001)) }
        const core = buildCore(30)

        const loader = new WarriorLoader(core, this!.publisher)

        loader.load(21, warrior, 0)

        const instr = core.readAt(null, 21)

        expect(instr.aOperand.address).to.be.equal(7999)
        expect(instr.bOperand.address).to.be.equal(1)
    })

    it('Correctly interprets token opcodes into simulator instructions', () => {
        const core = buildCore(20)
        const warrior = { source: TestHelper.buildParseResult(testTokens) }

        const loader = new WarriorLoader(core, this!.publisher)
        loader.load(0, warrior, 0)

        expect(core.readAt(null, 0).opcode).to.be.equal(OpcodeType.DAT)
        expect(core.readAt(null, 1).opcode).to.be.equal(OpcodeType.MOV)
        expect(core.readAt(null, 2).opcode).to.be.equal(OpcodeType.ADD)
        expect(core.readAt(null, 3).opcode).to.be.equal(OpcodeType.SUB)
        expect(core.readAt(null, 4).opcode).to.be.equal(OpcodeType.MUL)
        expect(core.readAt(null, 5).opcode).to.be.equal(OpcodeType.DIV)
        expect(core.readAt(null, 6).opcode).to.be.equal(OpcodeType.MOD)
        expect(core.readAt(null, 7).opcode).to.be.equal(OpcodeType.JMP)
        expect(core.readAt(null, 8).opcode).to.be.equal(OpcodeType.JMZ)
        expect(core.readAt(null, 9).opcode).to.be.equal(OpcodeType.JMN)
        expect(core.readAt(null, 10).opcode).to.be.equal(OpcodeType.DJN)
        expect(core.readAt(null, 11).opcode).to.be.equal(OpcodeType.CMP)
        expect(core.readAt(null, 12).opcode).to.be.equal(OpcodeType.SEQ)
        expect(core.readAt(null, 13).opcode).to.be.equal(OpcodeType.SNE)
        expect(core.readAt(null, 14).opcode).to.be.equal(OpcodeType.SLT)
        expect(core.readAt(null, 15).opcode).to.be.equal(OpcodeType.SPL)
        expect(core.readAt(null, 16).opcode).to.be.equal(OpcodeType.NOP)
    })

    it('Correctly interprets token modifiers into simulator instructions', () => {
        const core = buildCore(20)
        const warrior = { source: TestHelper.buildParseResult(testTokens) }

        const loader = new WarriorLoader(core, this!.publisher)
        loader.load(0, warrior, 0)

        expect(core.readAt(null, 0).modifier).to.be.equal(ModifierType.A)
        expect(core.readAt(null, 1).modifier).to.be.equal(ModifierType.B)
        expect(core.readAt(null, 2).modifier).to.be.equal(ModifierType.AB)
        expect(core.readAt(null, 3).modifier).to.be.equal(ModifierType.BA)
        expect(core.readAt(null, 4).modifier).to.be.equal(ModifierType.F)
        expect(core.readAt(null, 5).modifier).to.be.equal(ModifierType.I)
        expect(core.readAt(null, 6).modifier).to.be.equal(ModifierType.X)
        expect(core.readAt(null, 7).modifier).to.be.equal(ModifierType.A)
        expect(core.readAt(null, 8).modifier).to.be.equal(ModifierType.B)
        expect(core.readAt(null, 9).modifier).to.be.equal(ModifierType.AB)
        expect(core.readAt(null, 10).modifier).to.be.equal(ModifierType.BA)
        expect(core.readAt(null, 11).modifier).to.be.equal(ModifierType.F)
        expect(core.readAt(null, 12).modifier).to.be.equal(ModifierType.I)
        expect(core.readAt(null, 13).modifier).to.be.equal(ModifierType.F)
        expect(core.readAt(null, 14).modifier).to.be.equal(ModifierType.X)
        expect(core.readAt(null, 15).modifier).to.be.equal(ModifierType.A)
        expect(core.readAt(null, 16).modifier).to.be.equal(ModifierType.B)
    })

    it('Correctly interprets token a mode into simulator instructions', () => {
        const core = buildCore(20)
        const warrior = { source: TestHelper.buildParseResult(testTokens) }

        const loader = new WarriorLoader(core, this!.publisher)
        loader.load(0, warrior, 0)

        expect(core.readAt(null, 0).aOperand.mode).to.be.equal(ModeType.Direct)
        expect(core.readAt(null, 1).aOperand.mode).to.be.equal(ModeType.Immediate)
        expect(core.readAt(null, 2).aOperand.mode).to.be.equal(ModeType.AIndirect)
        expect(core.readAt(null, 3).aOperand.mode).to.be.equal(ModeType.BIndirect)
        expect(core.readAt(null, 4).aOperand.mode).to.be.equal(ModeType.APreDecrement)
        expect(core.readAt(null, 5).aOperand.mode).to.be.equal(ModeType.BPreDecrement)
        expect(core.readAt(null, 6).aOperand.mode).to.be.equal(ModeType.APostIncrement)
        expect(core.readAt(null, 7).aOperand.mode).to.be.equal(ModeType.BPostIncrement)
        expect(core.readAt(null, 8).aOperand.mode).to.be.equal(ModeType.Direct)
        expect(core.readAt(null, 9).aOperand.mode).to.be.equal(ModeType.Immediate)
        expect(core.readAt(null, 10).aOperand.mode).to.be.equal(ModeType.AIndirect)
        expect(core.readAt(null, 11).aOperand.mode).to.be.equal(ModeType.BIndirect)
        expect(core.readAt(null, 12).aOperand.mode).to.be.equal(ModeType.APreDecrement)
        expect(core.readAt(null, 13).aOperand.mode).to.be.equal(ModeType.BPreDecrement)
        expect(core.readAt(null, 14).aOperand.mode).to.be.equal(ModeType.APostIncrement)
        expect(core.readAt(null, 15).aOperand.mode).to.be.equal(ModeType.Direct)
        expect(core.readAt(null, 16).aOperand.mode).to.be.equal(ModeType.Immediate)
    })

    it('Correctly interprets token a number into simulator instructions', () => {
        const core = buildCore(20)
        const warrior = { source: TestHelper.buildParseResult(testTokens) }

        const loader = new WarriorLoader(core, this!.publisher)
        loader.load(0, warrior, 0)

        expect(core.readAt(null, 0).aOperand.address).to.be.equal(0)
        expect(core.readAt(null, 1).aOperand.address).to.be.equal(2)
        expect(core.readAt(null, 2).aOperand.address).to.be.equal(4)
        expect(core.readAt(null, 3).aOperand.address).to.be.equal(6)
        expect(core.readAt(null, 4).aOperand.address).to.be.equal(8)
        expect(core.readAt(null, 5).aOperand.address).to.be.equal(10)
        expect(core.readAt(null, 6).aOperand.address).to.be.equal(12)
        expect(core.readAt(null, 7).aOperand.address).to.be.equal(14)
        expect(core.readAt(null, 8).aOperand.address).to.be.equal(7999)
        expect(core.readAt(null, 9).aOperand.address).to.be.equal(7997)
        expect(core.readAt(null, 10).aOperand.address).to.be.equal(7995)
        expect(core.readAt(null, 11).aOperand.address).to.be.equal(7993)
        expect(core.readAt(null, 12).aOperand.address).to.be.equal(7991)
        expect(core.readAt(null, 13).aOperand.address).to.be.equal(7989)
        expect(core.readAt(null, 14).aOperand.address).to.be.equal(7987)
        expect(core.readAt(null, 15).aOperand.address).to.be.equal(7985)
        expect(core.readAt(null, 16).aOperand.address).to.be.equal(0)
    })

    it('Correctly interprets token b mode into simulator instructions', () => {
        const core = buildCore(20)
        const warrior = { source: TestHelper.buildParseResult(testTokens) }

        const loader = new WarriorLoader(core, this!.publisher)
        loader.load(0, warrior, 0)

        expect(core.readAt(null, 0).bOperand.mode).to.be.equal(ModeType.Direct)
        expect(core.readAt(null, 1).bOperand.mode).to.be.equal(ModeType.Immediate)
        expect(core.readAt(null, 2).bOperand.mode).to.be.equal(ModeType.AIndirect)
        expect(core.readAt(null, 3).bOperand.mode).to.be.equal(ModeType.BIndirect)
        expect(core.readAt(null, 4).bOperand.mode).to.be.equal(ModeType.APreDecrement)
        expect(core.readAt(null, 5).bOperand.mode).to.be.equal(ModeType.BPreDecrement)
        expect(core.readAt(null, 6).bOperand.mode).to.be.equal(ModeType.APostIncrement)
        expect(core.readAt(null, 7).bOperand.mode).to.be.equal(ModeType.BPostIncrement)
        expect(core.readAt(null, 8).bOperand.mode).to.be.equal(ModeType.Immediate)
        expect(core.readAt(null, 9).bOperand.mode).to.be.equal(ModeType.AIndirect)
        expect(core.readAt(null, 10).bOperand.mode).to.be.equal(ModeType.BIndirect)
        expect(core.readAt(null, 11).bOperand.mode).to.be.equal(ModeType.APreDecrement)
        expect(core.readAt(null, 12).bOperand.mode).to.be.equal(ModeType.BPreDecrement)
        expect(core.readAt(null, 13).bOperand.mode).to.be.equal(ModeType.APostIncrement)
        expect(core.readAt(null, 14).bOperand.mode).to.be.equal(ModeType.BPostIncrement)
        expect(core.readAt(null, 15).bOperand.mode).to.be.equal(ModeType.Immediate)
        expect(core.readAt(null, 16).bOperand.mode).to.be.equal(ModeType.Immediate)
    })

    it('Correctly interprets token b number into simulator instructions', () => {
        const core = buildCore(20)
        const warrior = { source: TestHelper.buildParseResult(testTokens) }

        const loader = new WarriorLoader(core, this!.publisher)
        loader.load(0, warrior, 0)

        expect(core.readAt(null, 0).bOperand.address).to.be.equal(1)
        expect(core.readAt(null, 1).bOperand.address).to.be.equal(3)
        expect(core.readAt(null, 2).bOperand.address).to.be.equal(5)
        expect(core.readAt(null, 3).bOperand.address).to.be.equal(7)
        expect(core.readAt(null, 4).bOperand.address).to.be.equal(9)
        expect(core.readAt(null, 5).bOperand.address).to.be.equal(11)
        expect(core.readAt(null, 6).bOperand.address).to.be.equal(13)
        expect(core.readAt(null, 7).bOperand.address).to.be.equal(15)
        expect(core.readAt(null, 8).bOperand.address).to.be.equal(7998)
        expect(core.readAt(null, 9).bOperand.address).to.be.equal(7996)
        expect(core.readAt(null, 10).bOperand.address).to.be.equal(7994)
        expect(core.readAt(null, 11).bOperand.address).to.be.equal(7992)
        expect(core.readAt(null, 12).bOperand.address).to.be.equal(7990)
        expect(core.readAt(null, 13).bOperand.address).to.be.equal(7988)
        expect(core.readAt(null, 14).bOperand.address).to.be.equal(7986)
        expect(core.readAt(null, 15).bOperand.address).to.be.equal(7984)
        expect(core.readAt(null, 16).bOperand.address).to.be.equal(0)
    })

    it('Correctly sets the startAddress property of the warrior', () => {
        const tokens = TestHelper.buildParseResult(instruction('MOV', '.I', '$', 0, '$', 1))
        const warrior = { source: tokens }

        const core = buildCore(5)

        const loader = new WarriorLoader(core, this!.publisher)
        const actual = loader.load(3, warrior, 0)

        expect(actual.startAddress).to.be.equal(3)
    })

    it('Correctly sets the unique id for the warrior', () => {
        const expected = 73

        const tokens = TestHelper.buildParseResult(instruction('MOV', '.I', '$', 0, '$', 1))
        const warrior = { source: tokens }

        const core = buildCore(5)

        const loader = new WarriorLoader(core, this!.publisher)
        const actual = loader.load(3, warrior, expected)

        expect(actual.warrior.internalId).to.be.equal(expected)
    })

    it('Does not set the unique id for the warrior if one is already present', () => {
        const expected = 73
        const unexpected = expected + 1

        const tokens = TestHelper.buildParseResult(instruction('MOV', '.I', '$', 0, '$', 1))
        const warrior = { source: tokens, internalId: expected }

        const core = buildCore(5)

        const loader = new WarriorLoader(core, this!.publisher)
        const actual = loader.load(3, warrior, unexpected)

        expect(actual.warrior.internalId).to.be.equal(expected)
    })

    it('Raises core access events for the newly created task', () => {
        const tokens = TestHelper.buildParseResult(instruction('MOV', '.I', '$', 0, '$', 1))
        const warrior = { source: tokens }
        const core = buildCore(0)

        const loader = new WarriorLoader(core, this!.publisher)
        const actual = loader.load(0, warrior, 0)

        expect(core.setAt).to.be.calledWith(actual.tasks[0], sinon.match.any, sinon.match.any)
    })

    it('Assigns warrior id before writing to core', () => {
        const expected = 8

        const tokens = TestHelper.buildParseResult(instruction('MOV', '.I', '$', 0, '$', 1))
        const warrior = { source: tokens }
        const core = buildCore(0)

        const loader = new WarriorLoader(core, this!.publisher)

        let actual = null
        ;(core.setAt as sinon.SinonStub).callsFake((task: ITask, _, __) => {
            actual = task.instance.warrior.internalId
        })

        loader.load(0, warrior, expected)

        expect(actual).to.be.equal(expected)
    })

    it("queues a task count of 1 for the warrior's id", () => {
        const expectedId = 5
        const core = buildCore(0)
        const tokens = TestHelper.buildParseResult(instruction('MOV', '.I', '$', 0, '$', 1))
        const warrior = { source: tokens }
        const loader = new WarriorLoader(core, this!.publisher)

        loader.load(0, warrior, expectedId)

        expect(this!.publisher.queue).to.have.been.calledWith({
            type: MessageType.TaskCount,
            payload: {
                warriorId: expectedId,
                taskCount: 1
            }
        })
    })

    it('includes warrior data when publishing initial task count of 1', () => {
        const expectedData = {
            foo: 'foo',
            array: [1, 2, 3]
        }
        const expectedId = 5
        const core = buildCore(0)
        const tokens = TestHelper.buildParseResult(instruction('MOV', '.I', '$', 0, '$', 1))
        const warrior = { source: tokens, data: expectedData }
        const loader = new WarriorLoader(core, this!.publisher)

        loader.load(0, warrior, expectedId)

        expect(this!.publisher.queue).to.have.been.calledWith({
            type: MessageType.TaskCount,
            payload: {
                warriorId: expectedId,
                warriorData: expectedData,
                taskCount: 1
            }
        })
    })

    it('clones and stores the IParseResult data against the new Warrior instance', () => {
        const expected = {
            foo: 'foo',
            /* eslint-disable-next-line */
            bar: (x: any): any => {
                return x
            }
        }

        const tokens = TestHelper.buildParseResult(instruction('MOV', '.I', '$', 0, '$', 1))
        const warrior = { source: tokens, data: expected }
        const core = buildCore(0)

        const loader = new WarriorLoader(core, this!.publisher)

        const actual = loader.load(0, warrior, 0)

        expect(actual.warrior.data).to.be.deep.equal(expected)
    })
})
