import React from 'react'
import Configuration from '../features/configuration/configuration'
import Simulator from '../features/simulator/simulator'
import MatchResults from '../features/results/match-results'
import OverallResults from '../features/results/overall-results'

const Player = () => (
  <>
    <div className="w-1/5 h-full mr-2">
      <Configuration></Configuration>
    </div>
    <div className="flex flex-col flex-1 justify-start px-4">
      <MatchResults></MatchResults>
      <OverallResults></OverallResults>
    </div>
    <div className="ml-2 flex">
      <Simulator></Simulator>
    </div>
  </>
)

export default Player
