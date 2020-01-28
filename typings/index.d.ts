declare module "corewar" {
    enum ModeType {
        Immediate,      // #
        Direct,         // $
        AIndirect,      // *
        BIndirect,      // @
        APreDecrement,  // {
        BPreDecrement,  // <
        APostIncrement, // }
        BPostIncrement, // >
        Count
    }

    interface IOperand {

        mode: ModeType;
        address: number;
    }

    enum OpcodeType {
        DAT = 0,
        MOV,
        ADD,
        SUB,
        MUL,
        DIV,
        MOD,
        JMP,
        JMZ,
        JMN,
        DJN,
        CMP,
        SEQ,
        SNE,
        SLT,
        SPL,
        NOP,
        Count
    }

    enum ModifierType {
        A = 0,
        B,
        AB,
        BA,
        F,
        X,
        I,
        Count
    }

    interface IInstruction {

        address: number;
        opcode: OpcodeType;
        modifier: ModifierType;
        aOperand: IOperand;
        bOperand: IOperand;
    }

    interface IOptions {

        coresize?: number;
        maximumCycles?: number;
        initialInstruction?: IInstruction;
        instructionLimit?: number;
        maxTasks?: number;
        minSeparation?: number;
        standard?: number;
        // TODO readDistance?: number;
        // TODO separation?: number;
        // TODO writeDistance?: number;
    }

    interface IMetaData {

        name: string;
        author: string;
        strategy: string;
    }

    enum MessageType {
        Error,
        Warning,
        Info
    }

    enum TokenCategory {
        Label,
        Opcode,
        Preprocessor,
        Modifier,
        Mode,
        Number,
        Comma,
        Maths,
        EOL,
        Comment,
        Unknown
    }

    interface IPosition {

        line: number;
        char: number;
    }

    interface IMessage {

        type: MessageType;
        position: IPosition;
        text: string;
    }

    interface IToken {

        position: IPosition;
        lexeme: string;
        category: TokenCategory;
    }

    interface IParseResult {

        metaData: IMetaData;
        tokens: IToken[];
        messages: IMessage[];
        /* eslint-disable-next-line */
        data?: any;
    }

    interface IPublishProvider {

        /* eslint-disable-next-line */
        publishSync(type: string, payload: any): void;
    }

    enum CoreAccessType {
        read,
        write,
        execute
    }

    interface ICoreAccessEventArgs {
        warriorId?: number;
        address: number;
        accessType: CoreAccessType;
    }

    interface ICoreLocation {

        instruction: IInstruction;
        access: ICoreAccessEventArgs;
    }

    interface IRules {

        rounds: number;
        options: IOptions;
    }

    interface IMatchWarrior {

        warriorMatchId?: number;
        source: IParseResult;
        wins?: number;
    }

    interface IMatch {

        rules: IRules;
        warriors: IMatchWarrior[];
    }

    export namespace corewar {
        function initialiseSimulator(options: IOptions, parseResults: IParseResult[], messageProvider: IPublishProvider): void;
        function step(steps?: number): void;
        function run(): void;
        function parse(redcode: string): IParseResult;
        function serialise(tokens: IToken[]): string;
        function getWithInfoAt(address: number): ICoreLocation;
        function republish(): void;
        function runMatch(match: IMatch): void;
    }
}