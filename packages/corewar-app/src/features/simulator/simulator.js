import React from 'react'
import SimulatorControls from './simulator-controls'
import Core from './core'
import SectionHeader from '../../app-chrome/section-header'

const Simulator = () => (
  <section className="max-w-core flex flex-col flex-initial justify-start mt-4">
    <SectionHeader>Simulator</SectionHeader>
    <SimulatorControls></SimulatorControls>
    <Core></Core>
  </section>
)

export default Simulator
