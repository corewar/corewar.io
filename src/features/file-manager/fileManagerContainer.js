import React from 'react'
import { connect } from 'react-redux'
import styled from 'styled-components'

import { space } from '../common/theme'

import FileManager from './fileManager'

const FileManagerContainer = ({ displayFileManager }) => (
  <FileManager show={displayFileManager} />
)

const mapStateToProps = state => ({
  displayFileManager: state.parser.displayFileManager
})

export default connect(
  mapStateToProps,
  {

  }
)(FileManagerContainer)

export { FileManagerContainer as PureFileManagerContainer }