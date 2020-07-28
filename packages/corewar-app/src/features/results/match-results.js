import React from 'react'
import ThreeWay from './three-way'
import SectionHeader from '../../app-chrome/section-header'

const scores = [{ colour: 'bg-warriors-0' }, { colour: 'bg-warriors-1' }]

const MatchResults = () => (
  <section className="h-48">
    <SectionHeader>Match Results</SectionHeader>
    <div className="flex justify-between mt-2">
      <img src="https://placekitten.com/32/32" alt="kitty" />
      <span>vs</span>
      <img src="https://placekitten.com/32/32" alt="kitty" />
    </div>
    <ThreeWay scores={scores}></ThreeWay>
  </section>
)

export default MatchResults
