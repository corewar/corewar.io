import React from 'react'
import { useSelector } from 'react-redux'
import SectionHeader from '../../app-chrome/section-header'
import { getSimulatorState } from './reducer'

const MemoryAddress = ({ command, index }) => (
  <tr className={`font-code h-8 ${index === 5 ? 'border' : ''}`}>
    <td>{command.address}</td>
    <td>{`${command.opcode}.${command.modifier}`}</td>
    <td>{`${command.aOperand.mode}${command.aOperand.address}`}</td>
    <td>{`${command.bOperand.mode}${command.bOperand.address}`}</td>
  </tr>
)

const CoreInspector = () => {
  const { instructions } = useSelector(getSimulatorState)

  return (
    <div className="w-full flex flex-col flex-initial justify-start p-2 pb-0">
      <SectionHeader>Core Inspector</SectionHeader>
      <table className="text-sm text-right table-fixed mt-4">
        <thead className="font-semibold text-xs h-12">
          <tr>
            <td className="break-all lg:w-16">Address</td>
            <td className="break-all lg:w-20">Instruction</td>
            <td className="break-all lg:w-24">A Operand</td>
            <td className="break-all lg:w-24">B Operand</td>
          </tr>
        </thead>
        <tbody>
          {instructions &&
            instructions.map((instruction, i) => (
              <MemoryAddress
                command={instruction.instruction}
                key={instruction.instruction.address}
                index={i}
              />
            ))}
        </tbody>
      </table>
    </div>
  )
}

export default CoreInspector
