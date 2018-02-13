import React from 'react'
import styled from 'styled-components'

import { space } from '../common/theme'

const NotificationWrapper = styled.div`

  ${props => props.notifications && props.notifications.length > 0 ? `display: block;` : `display: none;`}

  position: absolute;
  bottom: ${space.controls};
  right: 0;
  width: 50%;
  min-height: 30px;
  line-height: 30px;
  height: auto;

  background-color: #fff;
  color: #000;
  text-align: center;
  padding: ${space.s};
  margin-bottom: ${space.s};
`

const NotficationItem = styled.div`
  margin-bottom: ${space.s};
  margin-top: ${space.s};
`

const Notification = ({ notifications }) => (

  <NotificationWrapper notifications={notifications}>
    {notifications && notifications.map((msg, i) => (
      <NotficationItem key={`${msg}_${i}`}>{msg}</NotficationItem>
    ))}
  </NotificationWrapper>

)

export default Notification