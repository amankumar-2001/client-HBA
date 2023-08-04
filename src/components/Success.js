import React from 'react'
import Alert from 'react-bootstrap/Alert';
function Success({ message }) {
  return (
    <div>
      <Alert variant="success">
        <Alert.Heading>{message}</Alert.Heading>
      </Alert>
    </div>
  )
}

export default Success
