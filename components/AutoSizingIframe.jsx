// based on https://github.com/zeroasterisk/react-iframe-resizer-super/blob/master/src/index.js

import React from 'react'
import { iframeResizer as iframeResizerLib } from 'iframe-resizer'

class AutoSizingIframe extends React.Component {
  componentDidMount () {
    // can't update until we have a mounted iframe
    this.resizeIframe(this.props)
  }
  componentWillUnmount () {
    // React will remove the iframe, however we need to manually
    // call iframe-resizer to stop its listeners
    const iframeResizer = this.refs.frame.iFrameResizer
    iframeResizer && iframeResizer.removeListeners()
  }
  componentWillReceiveProps (nextProps) {
    // can replace content if we got new props
    this.resizeIframe(nextProps)
  }
  resizeIframe = props => {
    const frame = this.refs.frame
    if (!frame) return
    iframeResizerLib(props.iframeResizerOptions, frame)
  }
  render () {
    const { src, id, title = 'external-content', frameBorder = 0, className } = this.props
    const style = Object.assign(
      { border: 0, width: 1, minWidth: '100%' },
      this.props.style
    )
    return (
      <iframe
        ref='frame'
        src={src}
        id={id}
        title={title}
        frameBorder={frameBorder}
        className={className}
        style={style}
      />
    )
  }
}

export default AutoSizingIframe
