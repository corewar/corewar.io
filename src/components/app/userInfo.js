import React from 'react'
import PropTypes from 'prop-types'

const UserInfo = ({ username }) => (
  <div className="user">
    {username}
  </div>
)

UserInfo.PropTypes = {
  username: PropTypes.string.isRequired
}

export default UserInfo