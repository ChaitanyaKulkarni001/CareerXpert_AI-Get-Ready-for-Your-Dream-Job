import React from 'react'

const VideoCall = () => {
  return (
    <div>
      <iframe src="http://127.0.0.1:8000/"  allow="camera; microphone; display-capture" width="100%" height="800px"></iframe>

    </div>
  )
}

export default VideoCall
