import React from 'react'
import { connect } from 'react-redux'
import styled from 'styled-components'

import { space, colour } from '../common/theme'

const NotificationWrapper = styled.div`

  ${props => props.notifications && props.notifications.length > 0 ? `display: block;` : `display: none;`}

  position: absolute;
  bottom: ${space.controls};
  right: 0;
  width: 50%;
  max-width: 300px;


  background-color: ${colour.lightbg};
  color: ${colour.blue};
  text-align: center;
  padding: ${space.s};
  margin-bottom: ${space.s};
  z-index: 100;
`

const NotficationItem = styled.div`
  margin-bottom: ${space.s};
  margin-top: ${space.s};
  line-height: ${space.m};
  height: ${space.m};
`

const NotificationContainer = ({ notifications }) => (

  <NotificationWrapper notifications={notifications}>
    {notifications && notifications.map((content, i) => (
      <NotficationItem key={`${content}_${i}`}>
        {content}
      </NotficationItem>
    ))}
  </NotificationWrapper>

)

const mapStateToProps = state => ({
  notifications: state.notification.notifications
})

export default connect(
  mapStateToProps,
  {}
)(NotificationContainer)

export { NotificationContainer as PureNotificationContainer }