import React from 'react'
import { loadFile } from './actions'

const File = ({ file }) => (
  <li
    className={`min-h-16 flex flex-row items-center text-gray-100 rounded-l-full text-sm p-2 cursor-pointer hover:underline ${file
      .data.active && 'bg-gray-700 '}`}
  >
    <div className="w-8 h-8 mx-2 flex items-center">
      {file.data.icon && (
        <img
          onClick={() => loadFile(file.data.id)}
          src={`data:image/svg+xml;base64,${file.data.icon}`}
          alt={`${file.metaData.name} avatar`}
        />
      )}
    </div>
    <span className="flex-1">{file.metaData.name}</span>
    <input
      type="checkbox"
      checked={file.data.active}
      className="h-4 w-4 ml-2 border border-gray-700"
    ></input>
  </li>
)

const FileSelector = ({ files }) => (
  <ul className="w-84">
    {files.map(file => (
      <File file={file} key={file.metaData.name}></File>
    ))}
  </ul>
)

export default FileSelector
