import React from 'react'
import { Link } from 'react-router-dom'

const ModalLink = ({ id, children, className }) => (
  <Link
    className={className}
    to={{
      pathname: `/modal/${id}`,
      state: { modal: true }
    }}
  >
    {children}
  </Link>
)

export default ModalLink
