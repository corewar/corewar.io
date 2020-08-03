import React, { useState, useRef, useEffect } from 'react'
import { useDispatch } from 'react-redux'
import { parse } from './actions'
import FileStatusBar from './file-status-bar'
import { ControlledEditor, monaco } from '@monaco-editor/react'

const redcodeDefinition = {
  // Set defaultToken to invalid to see what you do not tokenize yet
  defaultToken: 'invalid',

  opcodes: [
    'dat',
    'mov',
    'add',
    'sub',
    'mul',
    'div',
    'mod',
    'jmp',
    'jmz',
    'jmn',
    'djn',
    'cmp',
    'slt',
    'spl',
    'seq',
    'sne',
    'nop',
    'DAT',
    'MOV',
    'ADD',
    'SUB',
    'MUL',
    'DIV',
    'MOD',
    'JMP',
    'JMZ',
    'JMN',
    'DJN',
    'CMP',
    'SLT',
    'SPL',
    'SEQ',
    'SNE',
    'NOP'
  ],

  preprocessor: ['equ', 'end', 'org', 'for', 'rof', 'EQU', 'END', 'ORG', 'FOR', 'ROF'],

  addressingModes: ['#', '$', '@', '<', '>', '{', '}', '*'],

  // The main tokenizer for our languages
  tokenizer: {
    root: [
      // identifiers and keywords
      [
        /[a-zA-Z_$][\w$]*/,
        {
          cases: {
            '@opcodes': 'keyword',
            '@preprocessor': 'keyword',
            '@default': 'identifier'
          }
        }
      ],

      // meta
      [/;(name|author|strategy).*$/, 'meta'],
      [/;(redcode|redcode-.*)$/, 'meta'],
      [/;assert .+$/, 'meta'],

      // whitespace
      { include: '@whitespace' },

      // preprocessor maths <- THIS IS WRONG TROUbLE FINDING * (is it preprocessor?)
      [/(?<=equ.+)(\+|\-|\*|\/)/][
        // delimiters
        (/[:,.]/, 'delimiter')
      ],

      // numbers
      [/[0-9]+/, 'number'],

      // addressing mode
      [/(#|\$|@|<|>|{|}|\*)/, 'type']
    ],

    whitespace: [
      [/[ \t\r\n]+/, 'white'],
      [/;.*$/, 'comment']
    ]
  }
}

const options = {
  minimap: {
    enabled: false
  }
}

const CodeEditor = ({ currentFile }) => {
  const dispatch = useDispatch()
  const [isEditorReady, setIsEditorReady] = useState(false)
  const [value, setValue] = useState(currentFile ? currentFile.source : '')
  const valueGetter = useRef()

  useEffect(() => {
    monaco
      .init()
      .then(monaco => {
        /* here is the instance of monaco, so you can use the `monaco.languages` or whatever you want */
        monaco.languages.register({ id: 'redcode' })
        monaco.languages.setMonarchTokensProvider(
          'redcode', // The main tokenizer for our languages
          {
            defaultToken: '',
            tokenPostfix: '.red',
            ignoreCase: true,
            opcodes: [
              'DAT',
              'MOV',
              'ADD',
              'SUB',
              'MUL',
              'DIV',
              'MOD',
              'JMP',
              'JMZ',
              'JMN',
              'DJN',
              'CMP',
              'SLT',
              'SPL',
              'SEQ',
              'SNE',
              'NOP'
            ],
            preprocessor: ['EQU', 'END', 'ORG', 'FOR', 'ROF'],
            addressingModes: ['#', '$', '@', '<', '>', '{', '}', '*'],
            tokenizer: {
              root: [
                [
                  /[a-zA-Z_$][\w$]*/,
                  {
                    cases: {
                      '@opcodes': 'keyword',
                      '@preprocessor': 'keyword',
                      '@default': 'identifier'
                    }
                  }
                ],

                // meta
                [/;(name|author|strategy).*$/, 'meta'],
                [/;(redcode|redcode-.*)$/, 'meta'],
                [/;assert .+$/, 'meta'],

                // whitespace
                { include: '@whitespace' },

                // preprocessor maths <- THIS IS WRONG TROUbLE FINDING * (is it preprocessor?)
                // [/(?<=equ.+)(\+|\-|\*|\/)/][
                //   // delimiters
                //   (/[:,.]/, 'delimiter')
                // ],

                // numbers
                [/[0-9]+/, 'number'],

                // addressing mode
                [/(#|\$|@|<|>|{|}|\*)/, 'type']
              ],
              whitespace: [
                [/[ \t\r\n]+/, 'white'],
                [/;.*$/, 'comment']
              ]
            }
          }
        )
        monaco.editor.defineTheme('redcode', {
          base: 'vs-dark',
          inherit: true,
          rules: [
            // { token: 'custom-info', foreground: '808080' },
            // { token: 'custom-error', foreground: 'ff0000', fontStyle: 'bold' },
          ],
          colors: {
            'editor.background': '#353E4A',
            'editor.lineHighlightBackground': '#556477'
          }
        })
      })
      .catch(error => console.error('An error occurred during initialization of Monaco: ', error))
  })

  function handleEditorDidMount(_valueGetter) {
    setIsEditorReady(true)
    valueGetter.current = _valueGetter
  }

  function handleShowValue() {
    alert(valueGetter.current())
  }

  return (
    <section className="flex flex-col w-full p-2 rounded-lg rounded-tl-none bg-gray-700 text-gray-100">
      <FileStatusBar />
      <ControlledEditor
        language="redcode"
        theme="redcode"
        value={currentFile ? currentFile.source : ''}
        editorDidMount={handleEditorDidMount}
        onChange={(event, value) => dispatch(parse(value))}
        options={options}
      />
      {/* <textarea
        className="flex self-stretch h-full bg-transparent font-code resize-none overflow-auto whitespace-pre-wrap mx-4"
        auto-complete="off"
        auto-correct="off"
        auto-capitalize="off"
        spellCheck="false"
        value={currentFile ? currentFile.source : ''}
        onChange={e => dispatch(parse(e.target.value))}
      ></textarea> */}
    </section>
  )
}

export default CodeEditor
