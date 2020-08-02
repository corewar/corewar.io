import React, { useState } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { ReactComponent as SuccessIcon } from '../../img/icons/checkmark-outline.svg'
import { ReactComponent as MenuIcon } from '../../img/icons/ellipsis-horizontal-outline.svg'
import { deleteFile } from './actions'

const FileSettings = ({ currentFileId }) => {
  const [menuOpen, toggleMenu] = useState(false)
  const dispatch = useDispatch()
  return (
    <div className="relative">
      <button className="mr-2" onClick={() => toggleMenu(!menuOpen)}>
        <MenuIcon />
      </button>
      {menuOpen ? (
        <ul className="absolute top-0 right-0 mt-8 w-40 p-2 text-base rounded-lg bg-gray-800">
          <li
            className="py-1 px-2 w-full cursor-pointer hover:bg-gray-700 hover:text-red-100 rounded-lg font-normal"
            onClick={() => {
              dispatch(deleteFile(currentFileId))
              toggleMenu(!menuOpen)
            }}
          >
            Delete file
          </li>
        </ul>
      ) : null}
    </div>
  )
}

const ParseResult = () => {
  const { currentFile } = useSelector(state => state.file)
  const errors =
    currentFile.messages && currentFile.messages.length ? currentFile.messages.length : 0
  return (
    <section className="flex flex-col flex-1">
      <div className="flex flex-row justify-between">
        <div className="flex items-center">
          {currentFile.data.hasErrors ? (
            <>
              <span className="h-6 w-6 mr-2 flex items-center justify-center rounded-full bg-red-500 text-gray-100">
                {errors}
              </span>
              <span>Parse failed</span>
            </>
          ) : (
            <>
              <span className="h-6 w-6 mr-2 flex items-center justify-center rounded-full bg-green-500">
                <SuccessIcon />
              </span>
              <span>Parsed successfully</span>
            </>
          )}
        </div>
        <FileSettings currentFileId={currentFile.data.id} />
      </div>
      <div>
        {currentFile.messages && currentFile.messages.length > 0 ? (
          <div className="flex flex-col p-2 text-gray-300 text-sm font-normal">
            {currentFile.messages.map(message => (
              <span
                key={`${message.position.line}-${message.position.char}`}
                className="my-1"
              >{`${message.position.line} , ${message.position.char} - ${message.text}`}</span>
            ))}
          </div>
        ) : null}
      </div>
    </section>
  )
}

const FileStatusBar = () => {
  const { currentFile } = useSelector(state => state.file)
  return currentFile ? (
    <div className="flex items-center m-2 mt-0 p-2 rounded-full text-xs font-bold text-gray-300">
      <ParseResult />
    </div>
  ) : null
}

export default FileStatusBar
