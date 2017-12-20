import React from 'react'

import './coreLocation.css'

const CoreLocation = ({ instruction }) => (
  <div className={`coreLocation ${instruction.isCurrent ? `current` : ``}` }>
    <span>{serialise(instruction)}</span>
  </div>
)

const serialise = (instruction) => (
  `${serialiseOpcode(instruction)}.${serialiseModifier(instruction)}
  ${serialiseOperand(instruction.aOperand)},${serialiseOperand(instruction.bOperand)}`
)

const ModifierType = {
  A: 0,
  B: 1,
  AB: 2,
  BA: 3,
  F: 4,
  X: 5,
  I: 6,
  Count: 7
}

const ModeType = {
  Immediate : 0,     // #
  Direct: 1,         // $
  AIndirect: 2,      // *
  BIndirect: 3,      // @
  APreDecrement: 4,  // {
  BPreDecrement: 5,  // <
  APostIncrement: 6, // }
  BPostIncrement: 7, // >
  Count: 8
}

const OpcodeType = {
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

const serialiseOpcode = (instruction) => {

  switch (instruction.opcode) {
      case OpcodeType.ADD:
          return "ADD";
      case OpcodeType.CMP:
          return "CMP";
      case OpcodeType.DAT:
          return "DAT";
      case OpcodeType.DIV:
          return "DIV";
      case OpcodeType.DJN:
          return "DJN";
      case OpcodeType.JMN:
          return "JMN";
      case OpcodeType.JMP:
          return "JMP";
      case OpcodeType.JMZ:
          return "JMZ";
      case OpcodeType.MOD:
          return "MOD";
      case OpcodeType.MOV:
          return "MOV";
      case OpcodeType.MUL:
          return "MUL";
      case OpcodeType.NOP:
          return "NOP";
      case OpcodeType.SEQ:
          return "SEQ";
      case OpcodeType.SLT:
          return "SLT";
      case OpcodeType.SNE:
          return "SNE";
      case OpcodeType.SPL:
          return "SPL";
      case OpcodeType.SUB:
          return "SUB";
  }
}

const serialiseModifier = (instruction) => {

  switch (instruction.modifier) {
    case ModifierType.A:
      return "A"
    case ModifierType.B:
      return "B"
    case ModifierType.AB:
      return "AB"
    case ModifierType.BA:
      return "BA"
    case ModifierType.F:
      return "F"
    case ModifierType.I:
      return "I"
    case ModifierType.X:
      return "X"
  }
}

const serialiseOperand = (operand) => (
  serialiseMode(operand.mode) + serialiseAddress(operand.address)
)

const serialiseMode = (mode) => {

  switch (mode) {
    case ModeType.AIndirect:
      return "*"
    case ModeType.APostIncrement:
      return "}"
    case ModeType.APreDecrement:
      return "{"
    case ModeType.BIndirect:
      return "@"
    case ModeType.BPostIncrement:
      return ">"
    case ModeType.BPreDecrement:
      return "<"
    case ModeType.Direct:
      return "$"
    case ModeType.Immediate:
      return "#"
  }

  throw "Unknown Mode provided to InstructionSerialiser"
}

const serialiseAddress = (address) => (
  address.toString()
)

export default CoreLocation