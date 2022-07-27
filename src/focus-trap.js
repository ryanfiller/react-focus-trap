import React from 'react'
import FocalPoint from './focal-point'

export default function FocusTrap(props) {
  const {
    active = true,
    className = 'focus-trap',
    children,
    element,
    onExit = () => {}
  } = props

  if (!active) return null

  const onKeyUp = event => {
    if (event.key === 'Escape') {
      onExit()
    }
  }

  return (
    <div className={`${className}-wrapper`} onKeyUp={onKeyUp}>
      <div
        aria-hidden="true"
        className={`${className}-backdrop`}
        onClick={onExit}
      />
      <FocalPoint className={className} element={element}>
        {children}
      </FocalPoint>
    </div>
  )
}
