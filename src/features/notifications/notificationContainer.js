import React from 'react'
import { connect } from 'react-redux'
import styled from 'styled-components'
import transition from 'styled-transition-group'
import { TransitionGroup } from 'react-transition-group'

import { space, colour } from '../common/theme'
import { media } from '../common/mediaQuery'

const SlideInOut = transition.div`
  // ${props => `top: calc(${space.controls} + ${space.controls} + ${space.s} + (${props.index} * 50px));`}

  position: relative;

  width: 300px;
  max-width: 300px;

  background-color: ${colour.notification};
  color: ${colour.white};
  text-align: center;
  padding: ${space.s};
  margin-bottom: ${space.s};
  z-index: 100;

  ${props => media.tablet && `right: -300px;`};
  ${props => media.designer && `right: -316px;`};
  transition: 1000ms;

  &:enter {
    ${props => media.tablet && `right: -300px;`};
    ${props => media.designer && `right: -316px;`};
    transition: 1000ms;
  }
  &:enter-active {
    ${props => media.tablet && `right: 0;`};
    ${props => media.designer && `right: -${space.m};`};
    transition: 1000ms;
  }
  &:exit {
    ${props => media.tablet && `right: 0;`};
    ${props => media.designer && `right: -${space.m};`};
    transition: 1000ms;
  }
  &:exit-active {
    ${props => media.tablet && `right: -300px;`};
    ${props => media.designer && `right: -316px;`};
    transition: 1000ms;
  }

`

const NotificationItem = styled.div`
  margin-bottom: ${space.s};
  margin-top: ${space.s};
  line-height: ${space.m};
  height: ${space.m};
`

const ToastWrapper = styled.div`
  position: fixed;
  z-index: 99999;
  ${props => `top: calc(${space.controls} + ${space.controls} + ${space.s});`}
  right: 0;
`

const NotificationContainer = ({ notifications }) => (
  <ToastWrapper>
    <TransitionGroup>
      {notifications && notifications.map((notification, i) => (
        notification.show &&
        <SlideInOut
          key={`${notification.id}`}
          index={i}
          in={true}
          timeout={2000}
          unmountOnExit>
            <NotificationItem>
              {i} - {notifications.length} - {notification.content}
            </NotificationItem>
          </SlideInOut>
      ))}
    </TransitionGroup>
  </ToastWrapper>
)

const mapStateToProps = state => ({
  notifications: state.notification.notifications
})

export default connect(
  mapStateToProps,
  {}
)(NotificationContainer)

export { NotificationContainer as PureNotificationContainer }