import React from 'react'
import ReactDOM from 'react-dom'

const Loader: React.FC = () => {
  const gridContent =
    document && document.getElementsByClassName('accountgrid')[0]

  const loadingPanel = (
    <div
      className="k-loading-mask"
      style={{
        height: gridContent ? gridContent.clientHeight : 200,
        position: 'absolute',
        top: '30%',
      }}
    >
      <span className="k-loading-text">Loading</span>
      <div className="k-loading-image"></div>
      <div className="k-loading-color"></div>
    </div>
  )

  return gridContent
    ? ReactDOM.createPortal(loadingPanel, gridContent)
    : loadingPanel
}

export default Loader
