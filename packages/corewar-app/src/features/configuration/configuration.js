import React from 'react'
import FileButton from '../files/file-button'
import RadioToggle from './radio-toggle'
import NumberHotStepper from './number-hot-stepper'
import ConfigurationFileSelector from './configuration-file-selector'
import BigRedButton from './big-red-button'
import SectionHeaderUnderlined from '../../app-chrome/section-header-underlined'

const Configuration = () => (
  <>
    <FileButton>Open</FileButton>
    <div className="mt-8 p-4 bg-gray-700 rounded-lg">
      <div className="mt-2 mb-8">
        <SectionHeaderUnderlined>Configuration</SectionHeaderUnderlined>
        <RadioToggle></RadioToggle>
        <NumberHotStepper></NumberHotStepper>
      </div>
      <div className="mt-2">
        <SectionHeaderUnderlined>Warriors</SectionHeaderUnderlined>
        <ConfigurationFileSelector></ConfigurationFileSelector>
        <BigRedButton></BigRedButton>
      </div>
    </div>
  </>
)

export default Configuration
