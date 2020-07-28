export type Maybe<T> = T | null;
export type Exact<T extends { [key: string]: any }> = { [K in keyof T]: T[K] };
/** All built-in and custom scalars, mapped to their actual values */
export type Scalars = {
  ID: string;
  String: string;
  Boolean: boolean;
  Int: number;
  Float: number;
};

export type Challenge = {
  __typename?: 'Challenge';
  id: Scalars['String'];
  warriorId: Scalars['String'];
  hillId: Scalars['String'];
  status: ChallengeStatus;
  message?: Maybe<Scalars['String']>;
};

export enum ChallengeStatus {
  Queued = 'Queued',
  Running = 'Running',
  Complete = 'Complete',
  Failed = 'Failed'
}

export type CreateMutationResult = {
  __typename?: 'CreateMutationResult';
  id?: Maybe<Scalars['String']>;
  success: Scalars['Boolean'];
  message?: Maybe<Scalars['String']>;
};

export type Hill = {
  __typename?: 'Hill';
  id: Scalars['String'];
  rules: Rules;
  warriors: Array<Warrior>;
  results: Array<Result>;
};

export type Instruction = {
  __typename?: 'Instruction';
  address: Scalars['Int'];
  opcode: OpcodeType;
  modifier: ModifierType;
  aOperand: Operand;
  bOperand: Operand;
};

export type InstructionInput = {
  address: Scalars['Int'];
  opcode: OpcodeType;
  modifier: ModifierType;
  aOperand: OperandInput;
  bOperand: OperandInput;
};

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

export enum ModifierType {
  A = 'A',
  B = 'B',
  Ab = 'AB',
  Ba = 'BA',
  F = 'F',
  X = 'X',
  I = 'I'
}

export type Mutation = {
  __typename?: 'Mutation';
  createWarrior?: Maybe<CreateMutationResult>;
  createHill?: Maybe<CreateMutationResult>;
  renameHill?: Maybe<MutationResult>;
  deleteHill?: Maybe<MutationResult>;
  challengeHill?: Maybe<CreateMutationResult>;
  deleteChallenge?: Maybe<MutationResult>;
};


export type MutationCreateWarriorArgs = {
  redcode: Scalars['String'];
};


export type MutationCreateHillArgs = {
  name: Scalars['String'];
  rules: RulesInput;
};


export type MutationRenameHillArgs = {
  name: Scalars['String'];
};


export type MutationDeleteHillArgs = {
  id: Scalars['String'];
};


export type MutationChallengeHillArgs = {
  warriorId: Scalars['String'];
};


export type MutationDeleteChallengeArgs = {
  challengeId: Scalars['String'];
};

export type MutationResult = {
  __typename?: 'MutationResult';
  success: Scalars['Boolean'];
  message?: Maybe<Scalars['String']>;
};

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

export type Operand = {
  __typename?: 'Operand';
  mode: ModeType;
  address: Scalars['Int'];
};

export type OperandInput = {
  mode: ModeType;
  address: Scalars['Int'];
};

export type Options = {
  __typename?: 'Options';
  coresize?: Maybe<Scalars['Int']>;
  maximumCycles?: Maybe<Scalars['Int']>;
  initialInstruction?: Maybe<Instruction>;
  instructionLimit?: Maybe<Scalars['Int']>;
  maxTasks?: Maybe<Scalars['Int']>;
  minSeparation?: Maybe<Scalars['Int']>;
  standard?: Maybe<Standard>;
};

export type OptionsInput = {
  coresize?: Maybe<Scalars['Int']>;
  maximumCycles?: Maybe<Scalars['Int']>;
  initialInstruction?: Maybe<InstructionInput>;
  instructionLimit?: Maybe<Scalars['Int']>;
  maxTasks?: Maybe<Scalars['Int']>;
  minSeparation?: Maybe<Scalars['Int']>;
  standard?: Maybe<Standard>;
};

export type Query = {
  __typename?: 'Query';
  hills: Array<Hill>;
  challenges: Array<Challenge>;
};


export type QueryHillsArgs = {
  id?: Maybe<Scalars['String']>;
};


export type QueryChallengesArgs = {
  id?: Maybe<Scalars['String']>;
};

export type Result = {
  __typename?: 'Result';
  age: Scalars['Int'];
  timestamp: Scalars['String'];
  warriorResults: Array<WarriorResult>;
  challenge: Challenge;
};

export type Rules = {
  __typename?: 'Rules';
  rounds: Scalars['Int'];
  size: Scalars['Int'];
  options: Options;
};

export type RulesInput = {
  rounds: Scalars['Int'];
  size: Scalars['Int'];
  options: OptionsInput;
};

export enum Standard {
  Icws86 = 'ICWS86',
  Icws88 = 'ICWS88',
  Icws94 = 'ICWS94'
}

export type Subscription = {
  __typename?: 'Subscription';
  hillCreated?: Maybe<Hill>;
  hillRenamed?: Maybe<Hill>;
  hillDeleted?: Maybe<Scalars['String']>;
  hillChallenged?: Maybe<Challenge>;
  hillChallengeStatusChange?: Maybe<Challenge>;
  challengeDeleted?: Maybe<Challenge>;
};


export type SubscriptionHillChallengedArgs = {
  hillId?: Maybe<Scalars['String']>;
};


export type SubscriptionHillChallengeStatusChangeArgs = {
  hillId?: Maybe<Scalars['String']>;
  challengeId?: Maybe<Scalars['String']>;
};

export type Warrior = {
  __typename?: 'Warrior';
  id: Scalars['String'];
  redcode: Scalars['String'];
};

export type WarriorMatchResult = {
  __typename?: 'WarriorMatchResult';
  opponent: Warrior;
  won: Scalars['Float'];
  drawn: Scalars['Float'];
  lost: Scalars['Float'];
  given: Scalars['Float'];
  taken: Scalars['Float'];
};

export type WarriorResult = {
  __typename?: 'WarriorResult';
  warrior: Warrior;
  rank: Scalars['Int'];
  score: Scalars['Float'];
  won: Scalars['Float'];
  drawn: Scalars['Float'];
  lost: Scalars['Float'];
  results: Array<WarriorMatchResult>;
};
