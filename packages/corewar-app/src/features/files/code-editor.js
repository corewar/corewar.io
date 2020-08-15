import React, { useEffect } from 'react'
import { useDispatch } from 'react-redux'
import { parse } from './actions'
import FileStatusBar from './file-status-bar'
import { ControlledEditor, monaco } from '@monaco-editor/react'
import { redcodeLanguageDefinition, redcodeTheme } from '../../services/monaco'

const options = {
  minimap: {
    enabled: false
  }
}

const CodeEditor = ({ currentFile }) => {
  const dispatch = useDispatch()

  useEffect(() => {
    monaco
      .init()
      .then(monaco => {
        monaco.languages.register({ id: 'redcode' })
        monaco.languages.setMonarchTokensProvider('redcode', redcodeLanguageDefinition)
        monaco.editor.defineTheme('redcode', redcodeTheme)
      })
      .catch(error => console.error('An error occurred during initialization of Monaco: ', error))
  }, [])

  useEffect(() => {
    currentFile && dispatch(parse(currentFile.source))
  }, [])

  return (
    <section className="flex flex-col w-full p-2 rounded-lg rounded-tl-none bg-gray-700 text-gray-100">
      <FileStatusBar />
      <ControlledEditor
        language="redcode"
        theme="redcode"
        value={currentFile ? currentFile.source : ''}
        onChange={(event, value) => dispatch(parse(value))}
        options={options}
      />
    </section>
  )
}

export default CodeEditor
