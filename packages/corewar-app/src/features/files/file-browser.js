import React from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useNavigate } from 'react-router-dom'
import { openFile } from './actions'

const FileBrowser = () => {
  const { warriorLibrary } = useSelector((state) => state.file)
  const dispatch = useDispatch()
  const navigate = useNavigate()

  return (
    <div className="bg-gray-700 p-4">
      <div className="">
        <h3 className="text-lg font-bold mt-2 mb-6 text-gray-500" id="modal-headline">
          File Browser
        </h3>
        <ul>
          {warriorLibrary.map((warrior) => (
            <li
              key={warrior.name}
              className="flex items-center my-4 p-4 w-full text-sm rounded-lg border border-gray-600 cursor-pointer hover:bg-gray-600"
              onClick={() => {
                dispatch(openFile(warrior.source))
                navigate(-1)
              }}
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
