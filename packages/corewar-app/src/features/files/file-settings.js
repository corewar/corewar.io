import React, { useState } from 'react'
import { useDispatch } from 'react-redux'
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
        <ul className="absolute z-10 top-0 right-0 mt-8 w-40 p-2 text-base rounded-lg bg-gray-800 shadow-md">
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

export default FileSettings
