export type Maybe<T> = T | null
/** All built-in and custom scalars, mapped to their actual values */
export type Scalars = {
    ID: string
    String: string
    Boolean: boolean
    Int: number
    Float: number
    MutationResultData: any
}

export enum ModeType {
    Immediate = 'Immediate',
    Direct = 'Direct',
    AIndirect = 'AIndirect',
    BIndirect = 'BIndirect',
    APreDecrement = 'APreDecrement',
    BPreDecrement = 'BPreDecrement',
    APostIncrement = 'APostIncrement',
    BPostIncrement = 'BPostIncrement'
}

export type Operand = {
    __typename?: 'Operand'
    mode: ModeType
    address: Scalars['Int']
}

export type OperandInput = {
    mode: ModeType
    address: Scalars['Int']
}

export enum OpcodeType {
    Dat = 'DAT',
    Mov = 'MOV',
    Add = 'ADD',
    Sub = 'SUB',
    Mul = 'MUL',
    Div = 'DIV',
    Mod = 'MOD',
    Jmp = 'JMP',
    Jmz = 'JMZ',
    Jmn = 'JMN',
    Djn = 'DJN',
    Cmp = 'CMP',
    Seq = 'SEQ',
    Sne = 'SNE',
    Slt = 'SLT',
    Spl = 'SPL',
    Nop = 'NOP'
}

export enum ModifierType {
    A = 'A',
    B = 'B',
    Ab = 'AB',
    Ba = 'BA',
    F = 'F',
    X = 'X',
    I = 'I'
}

export type Instruction = {
    __typename?: 'Instruction'
    address: Scalars['Int']
    opcode: OpcodeType
    modifier: ModifierType
    aOperand: Operand
    bOperand: Operand
}

export type InstructionInput = {
    address: Scalars['Int']
    opcode: OpcodeType
    modifier: ModifierType
    aOperand: OperandInput
    bOperand: OperandInput
}

export enum Standard {
    Icws86 = 'ICWS86',
    Icws88 = 'ICWS88',
    Icws94 = 'ICWS94'
}

export type Options = {
    __typename?: 'Options'
    coresize?: Maybe<Scalars['Int']>
    maximumCycles?: Maybe<Scalars['Int']>
    initialInstruction?: Maybe<Instruction>
    instructionLimit?: Maybe<Scalars['Int']>
    maxTasks?: Maybe<Scalars['Int']>
    minSeparation?: Maybe<Scalars['Int']>
    standard?: Maybe<Standard>
}

export type OptionsInput = {
    coresize?: Maybe<Scalars['Int']>
    maximumCycles?: Maybe<Scalars['Int']>
    initialInstruction?: Maybe<InstructionInput>
    instructionLimit?: Maybe<Scalars['Int']>
    maxTasks?: Maybe<Scalars['Int']>
    minSeparation?: Maybe<Scalars['Int']>
    standard?: Maybe<Standard>
}

export type Rules = {
    __typename?: 'Rules'
    rounds: Scalars['Int']
    size: Scalars['Int']
    options: Options
}

export type RulesInput = {
    rounds: Scalars['Int']
    size: Scalars['Int']
    options: OptionsInput
}

export type Warrior = {
    __typename?: 'Warrior'
    redcode: Scalars['String']
}

export type WarriorInput = {
    redcode: Scalars['String']
}

export type Hill = {
    __typename?: 'Hill'
    id: Scalars['String']
    rules: Rules
    warriors: Array<Warrior>
}

export type Query = {
    __typename?: 'Query'
    hills: Array<Hill>
}

export type QueryHillsArgs = {
    id?: Maybe<Scalars['String']>
}

export type MutationResult = {
    __typename?: 'MutationResult'
    success: Scalars['Boolean']
    message?: Maybe<Scalars['String']>
    data?: Maybe<Scalars['MutationResultData']>
}

export type Mutation = {
    __typename?: 'Mutation'
    createHill?: Maybe<MutationResult>
    updateHill?: Maybe<MutationResult>
    deleteHill?: Maybe<MutationResult>
    challengeHill?: Maybe<MutationResult>
}

export type MutationCreateHillArgs = {
    rules: RulesInput
}

export type MutationUpdateHillArgs = {
    id: Scalars['String']
    rules: RulesInput
    warriors?: Maybe<Array<WarriorInput>>
}

export type MutationDeleteHillArgs = {
    id: Scalars['String']
}

export type MutationChallengeHillArgs = {
    id: Scalars['String']
    redcode: Scalars['String']
}
