import React from 'react'

import MobilePage from '../common/mobilePage'
import InterfaceModeContainer from '../interfaceModeSelector/interfaceModeContainer'
import FileManagerContainer from '../fileManager/fileManagerContainer'

const ResultsContainer = () => (
  <MobilePage mobile>
    <h2>Results</h2>
    <InterfaceModeContainer />
    <FileManagerContainer />
  </MobilePage>
)

export default ResultsContainer
