import React from 'react'
import { useSelector } from 'react-redux'

const File = ({ file }) => (
  <li
    className={`h-16 flex flex-row items-center text-gray-100 text-sm px-2 ${
      file.active && 'bg-gray-700 '
    }`}
  >
    <div className="w-8 h-8 mx-2 flex items-center">
      {file.data.icon && (
        <img
          src={`data:image/svg+xml;base64,${file.data.icon}`}
          alt={`${file.metaData.name} avatar`}
        />
      )}
    </div>
    <span className="flex-1">{file.metaData.name}</span>
    <input
      type="checkbox"
      checked={file.data.loaded}
      readOnly
      className="h-4 w-4 ml-2 border border-gray-700"
    />
  </li>
)

const ConfigurationFileSelector = () => {
  const { files } = useSelector((state) => state.file)
  return (
    <ul className="mb-12">
      {files.map((file, index) => (
        <File file={file} key={`${file.name}-${index}`} />
      ))}
    </ul>
  )
}

export default ConfigurationFileSelector
