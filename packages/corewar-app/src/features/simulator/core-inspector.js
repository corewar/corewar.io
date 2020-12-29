import React from 'react'
import SectionHeader from '../../app-chrome/section-header'

const data = [
  {
    address: 386,
    instruction: 'MOV.I',
    aOperand: '>1185',
    bOperand: '$-1184'
  },
  {
    address: 387,
    instruction: 'MOV.I',
    aOperand: '>1186',
    bOperand: '$-1185'
  }
]

const MemoryAddress = ({ command }) => (
  <tr className="font-code h-8">
    <td>{command.address}</td>
    <td>{command.instruction}</td>
    <td>{command.aOperand}</td>
    <td>{command.bOperand}</td>
  </tr>
)

const CoreInspector = () => (
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
        {data.map(d => (
          <MemoryAddress command={d} key={d.address} />
        ))}
      </tbody>
    </table>
  </div>
)

export default CoreInspector
