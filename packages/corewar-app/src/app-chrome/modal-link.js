import React from 'react'
import { Link } from 'react-router-dom'

const ModalLink = ({ id, children }) => (
  <Link
    to={{
      pathname: `/modal/${id}`,
      state: { modal: true }
    }}
    className="py-2 px-8 rounded-full mr-4 bg-gray-700 border border-transparent hover:bg-gray-600 text-gray-100 font-semibold text-sm"
  >
    {children}
  </Link>
)

export default ModalLink
