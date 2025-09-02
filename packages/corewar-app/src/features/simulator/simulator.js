import React from 'react'
import SectionHeader from '../../app-chrome/section-header'
import Core from './core'
import SimulatorControls from './simulator-controls'

const Simulator = () => (
  <section className="w-full max-w-none flex flex-col flex-1 justify-start mt-4 min-h-0">
    <SectionHeader>Simulator</SectionHeader>
    <SimulatorControls></SimulatorControls>
    <Core></Core>
  </section>
)

export default Simulator
