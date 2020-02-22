export const ModifierType = {
  A: 0,
  B: 1,
  AB: 2,
  BA: 3,
  F: 4,
  X: 5,
  I: 6,
  Count: 7
}

export const ModeType = {
  Immediate: 0, // #
  Direct: 1, // $
  AIndirect: 2, // *
  BIndirect: 3, // @
  APreDecrement: 4, // {
  BPreDecrement: 5, // <
  APostIncrement: 6, // }
  BPostIncrement: 7, // >
  Count: 8
}

export const OpcodeType = {
  DAT: 0,
  MOV: 1,
  ADD: 2,
  SUB: 3,
  MUL: 4,
  DIV: 5,
  MOD: 6,
  JMP: 7,
  JMZ: 8,
  JMN: 9,
  DJN: 10,
  CMP: 11,
  SEQ: 12,
  SNE: 13,
  SLT: 14,
  SPL: 15,
  NOP: 16,
  Count: 17
}
