import React from 'react'
import { connect } from 'react-redux'
import styled from 'styled-components'

import { space } from '../common/theme'

import FileManager from './fileManager'

const FileManagerContainer = ({ displayFileManager, files }) => (
  <FileManager
    show={displayFileManager}
    files={files}
    />
)

const mapStateToProps = state => ({
  displayFileManager: state.parser.displayFileManager,
  files: state.parser.files
})

export default connect(
  mapStateToProps,
  {

  }
)(FileManagerContainer)

export { FileManagerContainer as PureFileManagerContainer }