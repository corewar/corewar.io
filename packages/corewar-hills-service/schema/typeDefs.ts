import { gql } from 'apollo-server-azure-functions'

export default gql`
    enum ModeType {
        # #
        Immediate
        # $
        Direct
        # *
        AIndirect
        # @
        BIndirect
        # {
        APreDecrement
        # <
        BPreDecrement
        # }
        APostIncrement
        # >
        BPostIncrement
    }

    type Operand {
        mode: ModeType!
        address: Int!
    }

    type OperandInput {
        mode: ModeType!
        address: Int!
    }

    enum OpcodeType {
        DAT
        MOV
        ADD
        SUB
        MUL
        DIV
        MOD
        JMP
        JMZ
        JMN
        DJN
        CMP
        SEQ
        SNE
        SLT
        SPL
        NOP
    }

    enum ModifierType {
        A
        B
        AB
        BA
        F
        X
        I
    }

    type Instruction {
        address: Int!
        opcode: OpcodeType!
        modifier: ModifierType!
        aOperand: Operand!
        bOperand: Operand!
    }

    type InstructionInput {
        address: Int!
        opcode: OpcodeType!
        modifier: ModifierType!
        aOperand: OperandInput!
        bOperand: OperandInput!
    }

    enum Standard {
        ICWS86
        ICWS88
        ICWS94
    }

    type Options {
        coresize: Int
        maximumCycles: Int
        initialInstruction: Instruction
        instructionLimit: Int
        maxTasks: Int
        minSeparation: Int
        standard: Standard
    }

    type OptionsInput {
        coresize: Int
        maximumCycles: Int
        initialInstruction: InstructionInput
        instructionLimit: Int
        maxTasks: Int
        minSeparation: Int
        standard: Standard
    }

    type Rules {
        rounds: Int!
        size: Int!
        options: Options!
    }

    type RulesInput {
        rounds: Int!
        size: Int!
        options: OptionsInput!
    }

    type Warrior {
        id: String!
        redcode: String
    }

    type Hill {
        id: String!
        rules: Rules!
        warriors: [Warrior!]!
    }

    type Query {
        hills(id: String): [Hill!]!
    }
`
