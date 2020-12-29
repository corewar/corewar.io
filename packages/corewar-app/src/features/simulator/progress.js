import React from 'react'
import { useSelector } from 'react-redux'
import { getSimulatorState } from './reducer'
import SectionHeader from '../../app-chrome/section-header'

const Progress = () => {
  const { runProgress, roundResult } = useSelector(getSimulatorState)
  return (
    <div className="max-w-core w-full h-30 flex-initial my-2 p-2">
      <SectionHeader>Progress</SectionHeader>
      {!roundResult.outcome && (
        <div className="h-8 flex items-center justify-center relative">
          <span className="w-full h-4 flex justify-center items-center z-10"></span>
          <span
            className="absolute left-0 bg-gray-700 h-4 rounded"
            style={{ width: `${runProgress ? runProgress : 0}%` }}
          ></span>
        </div>
      )}
      <div className="w-8 h-8 mx-2 flex items-center">
        {roundResult.winnerData && `${roundResult.outcome} for`}
        {roundResult.winnerData && (
          <div>
            <img
              src={`data:image/svg+xml;base64,${roundResult.winnerData.icon}`}
              alt={`${roundResult.winnerData.name} avatar`}
            />
            <span className="flex-1 hover:underline">{roundResult.winnerData.name}</span>
          </div>
        )}
      </div>
    </div>
  )
}

export default Progress
