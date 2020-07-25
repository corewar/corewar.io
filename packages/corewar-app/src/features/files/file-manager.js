import React from 'react'
import FileButton from './file-button'
import FileSelector from './file-selector'
import CodeEditor from './code-editor'

const FileManager = () => (
  <>
    <div className="w-full">
      <FileButton>New</FileButton>
      <FileButton>Load</FileButton>
    </div>
    <section className="flex flex-row flex-1 mt-4 pr-8">
      <FileSelector></FileSelector>
      <CodeEditor></CodeEditor>
    </section>
  </>
)

export default FileManager
