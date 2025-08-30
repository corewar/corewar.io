declare module 'corewar' {
    enum ModeType {
        Immediate = '#',
        Direct = '$',
        AIndirect = '*',
        BIndirect = '@',
        APreDecrement = '{',
        BPreDecrement = '<',
        APostIncrement = '}',
        BPostIncrement = '>'
    }

    interface IOperand {
        mode: ModeType
        address: number
    }

    enum OpcodeType {
        DAT = 'DAT',
        MOV = 'MOV',
        ADD = 'ADD',
        SUB = 'SUB',
        MUL = 'MUL',
        DIV = 'DIV',
        MOD = 'MOD',
        JMP = 'JMP',
        JMZ = 'JMZ',
        JMN = 'JMN',
        DJN = 'DJN',
        CMP = 'CMP',
        SEQ = 'SEQ',
        SNE = 'SNE',
        SLT = 'SLT',
        SPL = 'SPL',
        NOP = 'NOP'
    }

    enum ModifierType {
        A = 'A',
        B = 'B',
        AB = 'AB',
        BA = 'BA',
        F = 'F',
        X = 'X',
        I = 'I'
    }

    interface IInstruction {
        address: number
        opcode: OpcodeType
        modifier: ModifierType
        aOperand: IOperand
        bOperand: IOperand
    }

    interface IOptions {
        coresize?: number
        maximumCycles?: number
        initialInstruction?: IInstruction
        instructionLimit?: number
        maxTasks?: number
        minSeparation?: number
        standard?: number
        // TODO readDistance?: number;
        // TODO separation?: number;
        // TODO writeDistance?: number;
    }

    interface IMetaData {
        name: string
        author: string
        strategy: string
    }

    enum MessageType {
        Error = 'ERROR',
        Warning = 'WARNING',
        Info = 'INFO'
    }

    enum TokenCategory {
        Label = 'LABEL',
        Opcode = 'OPCODE',
        Preprocessor = 'PREPROCESSOR',
        Modifier = 'MODIFIER',
        Mode = 'MODE',
        Number = 'NUMBER',
        Comma = 'COMMA',
        Maths = 'MATHS',
        EOL = 'EOL',
        Comment = 'COMMENT'
    }

    interface IPosition {
        line: number
        char: number
    }

    interface IMessage {
        type: MessageType
        message: string
        position: IPosition
    }

    interface IToken {
        category: TokenCategory
        value: string
        position: IPosition
    }

    interface IParseResult {
        metaData: IMetaData
        tokens: IToken[]
        messages: IMessage[]
        success: boolean
    }

    interface IWarrior {
        source: IParseResult
        /* eslint-disable-next-line */
        data?: any;
    }

    interface IPublishProvider {
        /* eslint-disable-next-line */
        publishSync(type: string, payload: any): void;
    }

    interface IRoundResult {
        winnerId?: number
        /* eslint-disable-next-line */
        winnerData?: any;
        outcome: string
    }

    enum CoreAccessType {
        read = 'READ',
        write = 'WRITE',
        execute = 'EXECUTE'
    }

    interface ICoreAccessEventArgs {
        warriorId?: number
        address: number
        accessType: CoreAccessType
    }

    interface ICoreLocation {
        instruction: IInstruction
        access: ICoreAccessEventArgs
    }

    interface IRules {
        rounds: number
        options: IOptions
    }

    interface IMatchWarrior {
        warriorMatchId?: number
        source: IParseResult
        wins?: number
    }

    interface IMatchWarriorResult {
        warrior: IWarrior
        won: number
        drawn: number
        lost: number
        given: number
        taken: number
    }

    interface IMatchResult {
        rounds: number
        warriors: IMatchWarriorResult[]
    }

    interface IHillWarriorResult {
        warrior: IWarrior
        rank: number
        score: number
        won: number
        drawn: number
        lost: number
        matches: IMatchResult[]
    }

    interface IHillResult {
        warriors: IHillWarriorResult[]
    }

    interface IApi {
        initialiseSimulator(options: IOptions, warriors: IWarrior[], messageProvider?: IPublishProvider): void
        step(steps?: number): IRoundResult | null
        run(): IRoundResult
        parse(redcode: string): IParseResult
        serialise(tokens: IToken[]): string
        getWithInfoAt(address: number): ICoreLocation
        republish(): void
        runMatch(rules: IRules, warriors: IWarrior[], messageProvider?: IPublishProvider): IMatchResult
        runHill(rules: IRules, warriors: IWarrior[], messageProvider?: IPublishProvider): IHillResult
        runBenchmark(
            warrior: IWarrior,
            rules: IRules,
            warriors: IWarrior[],
            messageProvider: IPublishProvider
        ): IHillResult
    }

    export const corewar: IApi
}
