/**
 * FocalPoint
 * The container that will maintain focus
 */

import React, { useEffect, createElement } from 'react'

let timer = null
let isDOM = typeof document !== 'undefined'

let root
let anchor = null

export default function FocalPoint(props) {
  const { children, element = 'div', className } = props

  const contains = element => {
    return root.contains(element)
  }

  const focus = () => {
    if (contains(document.activeElement) === false) {
      root.focus()
    }
  }

  const trapFocus = e => {
    clearTimeout(timer)
    timer = setTimeout(focus, 10)
  }

  const returnFocus = () => {
    // When transitioning between pages using hash route state,
    // this anchor is some times lost. Do not attempt to focus
    // on a non-existent anchor.
    if (
      anchor &&
      typeof anchor === 'object' &&
      typeof anchor.focus === 'function'
    ) {
      anchor.focus()
    }
  }

  const setRoot = el => {
    root = el
  }

  const onBlur = event => {
    let current = anchor

    if (current && current.contains(event.target) === false) {
      event.preventDefault()
      trapFocus()
    }
  }

  useEffect(
    () => {
      if (isDOM) anchor = document.activeElement

      trapFocus()
      document.addEventListener('focus', onBlur, true)

      return () => {
        document.removeEventListener('focus', onBlur, true)
        clearTimeout(timer)
        returnFocus()
        anchor = null
      }
    },
    [trapFocus, onBlur, timer, returnFocus, anchor]
  )

  return createElement(element, {
    ref: setRoot,
    tabIndex: 0,
    className,
    children
  })
}
