import React from 'react'
import { Link } from 'react-router-dom'

const ModalLink = ({ id, children }) => (
  <Link
    to={{
      pathname: `/modal/${id}`,
      state: { modal: true }
    }}
  >
    {children}
  </Link>
)

export default ModalLink
