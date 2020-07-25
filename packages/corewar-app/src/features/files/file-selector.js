import React from 'react'

const files = [
  {
    name: 'Warrior 1 with a really long name',
    icon: <img src="https://placekitten.com/32/32" alt="kitty" className="rounded-full" />,
    active: true
  },
  {
    name: 'Looping paper',
    icon: <img src="https://placekitten.com/32/32" alt="kitty" className="rounded-full" />,
    active: false
  }
]

const File = ({ file }) => (
  <li
    className={`min-h-16 flex flex-row items-center text-gray-100 rounded-l-full text-sm p-2 ${file.active &&
      'bg-gray-700 '}`}
  >
    <div className="w-8 h-8 mx-2">{file.icon}</div>
    <span className="flex-1">{file.name}</span>
    <input type="checkbox" className="h-4 w-4 ml-2 border border-gray-700"></input>
  </li>
)

const FileSelector = () => (
  <ul className="w-84">
    {files.map(f => (
      <File file={f} key={f.name}></File>
    ))}
  </ul>
)

export default FileSelector
