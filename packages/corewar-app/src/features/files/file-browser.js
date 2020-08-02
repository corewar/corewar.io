import React from 'react'
import { useSelector } from 'react-redux'

const FileBrowser = () => {
  const { warriorLibrary } = useSelector(state => state.file)

  return (
    <div className="bg-gray-700 p-4">
      <div className="text-center sm:mt-0 sm:text-left">
        <h3 className="text-lg my-2" id="modal-headline">
          File Browser
        </h3>
        <ul>
          {warriorLibrary.map(warrior => (
            <li
              key={warrior.name}
              className="flex items-center my-4 h-16 p-2 w-full rounded-lg border border-gray-800 cursor-pointer hover:bg-gray-800"
            >
              {warrior.name}
            </li>
          ))}
        </ul>
      </div>
    </div>
  )
}

export default FileBrowser
