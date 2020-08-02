import React from 'react'
import { useDispatch } from 'react-redux'
import { parse } from './actions'
import FileStatusBar from './file-status-bar'
//import Editor from '@monaco-editor/react'

// const options = {
//   minimap: {
//     enabled: false
//   }
// }

const CodeEditor = ({ currentFile }) => {
  const dispatch = useDispatch()
  // const [isEditorReady, setIsEditorReady] = useState(false)
  // const valueGetter = useRef()

  // function handleEditorDidMount(_valueGetter) {
  //   setIsEditorReady(true)
  //   valueGetter.current = _valueGetter
  // }

  // function handleShowValue() {
  //   alert(valueGetter.current())
  // }

  return (
    <section className="flex flex-col w-full p-2 rounded-lg rounded-tl-none bg-gray-700 text-gray-100">
      <FileStatusBar />
      {/* <Editor
        height="100%"
        language="javascript"
        theme="dark"
        value={'// write your code here'}
        editorDidMount={handleEditorDidMount}
        options={options}
      /> */}
      <textarea
        className="flex self-stretch h-full bg-transparent font-code resize-none overflow-auto whitespace-pre-wrap mx-4"
        auto-complete="off"
        auto-correct="off"
        auto-capitalize="off"
        spellCheck="false"
        value={currentFile ? currentFile.source : ''}
        onChange={e => dispatch(parse(e.target.value))}
      ></textarea>
    </section>
  )
}

export default CodeEditor
