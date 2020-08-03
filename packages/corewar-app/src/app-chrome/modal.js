import React from 'react'
import { useHistory, useParams } from 'react-router-dom'
import FileBrowser from '../features/files/file-browser'

const getContent = ({ id }) => {
  switch (id) {
    case 'file-browser':
      return <FileBrowser />
    default:
      return null
  }
}

const Modal = () => {
  const history = useHistory()
  const content = getContent(useParams())
  return (
    <div
      className="fixed bottom-0 inset-x-0 z-20 px-4 pb-4 sm:inset-0 sm:flex sm:items-center sm:justify-center"
      onClick={() => history.goBack()}
    >
      <div className="fixed inset-0 transition-opacity">
        <div className="absolute inset-0 bg-gray-800 opacity-75"></div>
      </div>
      <div
        className="bg-gray-800 rounded-lg overflow-hidden shadow-xl transform transition-all sm:max-w-lg sm:w-full"
        role="dialog"
        aria-modal="true"
        aria-labelledby="modal-headline"
        onClick={e => e.stopPropagation()}
      >
        {content}
      </div>
    </div>
  )
}

export default Modal
