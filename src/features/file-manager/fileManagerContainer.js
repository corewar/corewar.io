import React from 'react'
import { connect } from 'react-redux'

import FileManager from './fileManager'

const FileManagerContainer = ({ displayFileManager, warriors }) => (
  <FileManager
    show={displayFileManager}
    warriors={warriors}
    />
)

const mapStateToProps = state => ({
  displayFileManager: state.parser.displayFileManager,
  warriors: state.parser.warriors
})

export default connect(
  mapStateToProps,
  {

  }
)(FileManagerContainer)

export { FileManagerContainer as PureFileManagerContainer }