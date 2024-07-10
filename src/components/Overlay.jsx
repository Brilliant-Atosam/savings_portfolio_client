import React from 'react'
import Subscription from './Subscription'

const Overlay = () => {
  return (
    <div className="overlay">
        <h1 className="overlay-text">
        Premium access required. Please subscribe to gain full access.
        </h1>
        <Subscription />
      </div>
  )
}

export default Overlay