import React from 'react'
import FileButton from './file-button'
import ModalLink from '../../app-chrome/modal-link'
import FileSelector from './file-selector'
import CodeEditor from './code-editor'
import { useSelector, useDispatch } from 'react-redux'
import { newFile } from './actions'

const FileManager = () => {
  const { files, currentFile } = useSelector(state => state.file)
  const dispatch = useDispatch()
  return (
    <>
      <div className="w-full">
        <FileButton clickHandler={() => dispatch(newFile())}>New</FileButton>
        <ModalLink id={1}>Open</ModalLink>
      </div>
      <section className="flex flex-row flex-1 mt-4 pr-8">
        <FileSelector files={files}></FileSelector>
        <CodeEditor currentFile={currentFile}></CodeEditor>
      </section>
    </>
  )
}

export default FileManager
