import React, { useState } from 'react';
import Alert from 'react-bootstrap/Alert';

function Error({message}) {
    const [show, setShow] = useState(true);

    if (show) {
        return (
            <Alert variant="danger" onClose={() => setShow(false)} dismissible>
                <Alert.Heading> {message}</Alert.Heading>

            </Alert>
        );
    }
    return <></>
}

export default Error
