import React from 'react'
import { connect } from 'react-redux'
import styled from 'styled-components'
import transition from 'styled-transition-group'
import { TransitionGroup } from 'react-transition-group'

import { space, colour } from '../common/theme'
import { media } from '../common/mediaQuery'

const SlideInOut = transition.div`
  ${props => `bottom: calc(${space.controls} + ${space.s} + (${props.index} * 50px));`}

  position: absolute;

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
  transition: 500ms;

  &:enter {
    ${props => media.tablet && `right: -300px;`};
    ${props => media.designer && `right: -316px;`};
    transition: 500ms;
  }
  &:enter-active {
    ${props => media.tablet && `right: 0;`};
    ${props => media.designer && `right: -${space.m};`};
    transition: 500ms;
  }
  &:exit {
    ${props => media.tablet && `right: 0;`};
    ${props => media.designer && `right: -${space.m};`};
    transition: 500ms;
  }
  &:exit-active {
    ${props => media.tablet && `right: -300px;`};
    ${props => media.designer && `right: -316px;`};
    transition: 500ms;
  }

`

const NotificationItem = styled.div`
  margin-bottom: ${space.s};
  margin-top: ${space.s};
  line-height: ${space.m};
  height: ${space.m};
`

const NotificationContainer = ({ notifications }) => (
  <TransitionGroup>
    {notifications && notifications.map((content, i) => (
      <SlideInOut
        key={`${content}_${i}`}
        index={i}
        in={true}
        timeout={2000}
        unmountOnExit>
          <NotificationItem>
            {content}
          </NotificationItem>
        </SlideInOut>
    ))}
  </TransitionGroup>
)

const mapStateToProps = state => ({
  notifications: state.notification.notifications
})

export default connect(
  mapStateToProps,
  {}
)(NotificationContainer)

export { NotificationContainer as PureNotificationContainer }