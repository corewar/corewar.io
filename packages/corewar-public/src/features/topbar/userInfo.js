import React from 'react'
import PropTypes from 'prop-types'

const UserInfo = ({ username }) => <div className="user">{username}</div>

UserInfo.propTypes = {
  username: PropTypes.string.isRequired
}

UserInfo.defaultProps = {
  username: ''
}

export default UserInfo
