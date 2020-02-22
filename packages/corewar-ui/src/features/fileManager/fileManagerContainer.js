import React from 'react'
import { connect } from 'react-redux'

import { loadFile } from '../parser/actions'

import FileManager from './fileManager'

const FileManagerContainer = ({ displayFileManager, warriorLibrary, loadFile }) => (
  <FileManager show={displayFileManager} files={warriorLibrary} handleClick={loadFile} />
)

const mapStateToProps = state => ({
  displayFileManager: state.parser.displayFileManager,
  warriorLibrary: state.parser.warriorLibrary
})

export default connect(mapStateToProps, {
  loadFile
})(FileManagerContainer)

export { FileManagerContainer as PureFileManagerContainer }
