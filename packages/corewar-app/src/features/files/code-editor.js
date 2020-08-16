import React, { useEffect } from 'react'
import { useDispatch } from 'react-redux'
import throttle from '../../services/throttle'
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
  })

  useEffect(() => {
    currentFile && !currentFile.compiled && dispatch(parse(currentFile.source))
  }, [currentFile, dispatch])

  const changeHandler = (event, value) => throttle(dispatch(parse(value)), 500)

  return (
    <section className="flex flex-col justify-between flex-initial w-full p-2 rounded-lg rounded-tl-none bg-gray-700 text-gray-100">
      <FileStatusBar />
      <ControlledEditor
        height="85%"
        language="redcode"
        theme="redcode"
        value={currentFile ? currentFile.source : ''}
        onChange={changeHandler}
        options={options}
      />
    </section>
  )
}

export default CodeEditor
