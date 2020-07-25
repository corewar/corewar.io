import React, { useRef, useState } from 'react'
import Editor from '@monaco-editor/react'

const options = {
  minimap: {
    enabled: false
  }
}

const CodeEditor = () => {
  const [isEditorReady, setIsEditorReady] = useState(false)
  const valueGetter = useRef()

  function handleEditorDidMount(_valueGetter) {
    setIsEditorReady(true)
    valueGetter.current = _valueGetter
  }

  function handleShowValue() {
    alert(valueGetter.current())
  }

  return (
    <section className="flex w-full p-2 rounded-lg rounded-tl-none bg-gray-700 text-gray-100">
      {/* <Editor
        height="100%"
        language="javascript"
        theme="dark"
        value={'// write your code here'}
        editorDidMount={handleEditorDidMount}
        options={options}
      /> */}
      <textarea
        className="w-full h-full bg-transparent font-code resize-none overflow-auto whitespace-pre-wrap mx-4"
        auto-complete="off"
        auto-correct="off"
        auto-capitalize="off"
        spellCheck="false"
        defaultValue={`;name Transposition Stone 
step equ 1185; 
mod 5 inc spl #-step, 
<step stone mov >step,
1-step sub inc, 
stone djn.f stone, 
<5555`}
      ></textarea>
    </section>
  )
}

export default CodeEditor
