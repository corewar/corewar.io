import React from 'react'
import { connect } from 'react-redux'

import { parse } from '../parser/actions'

import FileManager from './fileManager'

const FileManagerContainer = ({ displayFileManager, warriorLibrary, parse }) => (
  <FileManager
    show={displayFileManager}
    files={warriorLibrary}
    handleClick={parse}
    />
)

const mapStateToProps = state => ({
  displayFileManager: state.parser.displayFileManager,
  warriorLibrary: state.parser.warriorLibrary
})

export default connect(
  mapStateToProps,
  {
    parse
  }
)(FileManagerContainer)

export { FileManagerContainer as PureFileManagerContainer }