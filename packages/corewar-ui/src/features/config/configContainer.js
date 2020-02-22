import React from 'react'

import MobilePage from '../common/mobilePage'
import InterfaceModeContainer from '../interfaceModeSelector/interfaceModeContainer'
import FileManagerContainer from '../fileManager/fileManagerContainer'

const ConfigContainer = () => (
  <MobilePage mobile>
    <h2>Config</h2>
    <InterfaceModeContainer />
    <FileManagerContainer />
  </MobilePage>
)

export default ConfigContainer
