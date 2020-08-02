import React from 'react'
import { useSelector } from 'react-redux'
import ParseResult from './parse-result'

const FileStatusBar = () => {
  const { currentFile } = useSelector(state => state.file)
  return currentFile ? (
    <div className="flex items-center m-2 mt-0 p-2 rounded-full text-xs font-bold text-gray-300">
      <ParseResult />
    </div>
  ) : null
}

export default FileStatusBar
