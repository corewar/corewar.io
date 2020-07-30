import React from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { loadFile, toggleFile } from './actions'

const File = ({ file }) => {
  const { currentFile } = useSelector(state => state.file)
  const dispatch = useDispatch()
  return (
    <li
      className={`min-h-16 flex flex-row items-center text-gray-100 rounded-l-full text-sm p-2 ${currentFile
        .data.id === file.data.id && 'bg-gray-700 '}`}
    >
      <div
        className="w-8 h-8 mx-2 flex items-center hover:underline cursor-pointer"
        onClick={() => dispatch(loadFile(file.data.id))}
      >
        {file.data.icon && (
          <img
            src={`data:image/svg+xml;base64,${file.data.icon}`}
            alt={`${file.metaData.name} avatar`}
          />
        )}
      </div>
      <span
        className="flex-1 hover:underline cursor-pointer"
        onClick={() => dispatch(loadFile(file.data.id))}
      >
        {file.metaData.name}
      </span>
      <input
        type="checkbox"
        checked={file.data.loaded}
        onChange={() => dispatch(toggleFile(file.data.id))}
        className="h-4 w-4 ml-2 border border-gray-700"
      ></input>
    </li>
  )
}

const FileSelector = ({ files }) => (
  <ul className="w-84">
    {files.map(file => (
      <File file={file} key={file.data.id}></File>
    ))}
  </ul>
)

export default FileSelector
