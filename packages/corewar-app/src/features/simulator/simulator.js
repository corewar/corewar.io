import React from 'react'
import SimulatorControls from './simulator-controls'
import Core from './core'
import Progress from './progress'
import SectionHeader from '../../app-chrome/section-header'

const Simulator = () => (
  <section className="max-w-core flex flex-col flex-initial justify-between">
    <SectionHeader>Simulator</SectionHeader>
    <Progress></Progress>
    <SimulatorControls></SimulatorControls>
    <Core></Core>
  </section>
)

export default Simulator
