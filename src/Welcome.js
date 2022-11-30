import React from "react";
import { Card } from "react-bootstrap";

class Welcome extends React.Component {
  render() {
    return(
      <>
        <Card style={{ width: '18rem' }}>
      <Card.Body>
        <Card.Title>Welcome</Card.Title>
        <Card.Text>
          Please login using the button in the top left corner of the page.
        </Card.Text>
      </Card.Body>
    </Card>
      </>
    )
  }
}

export default Welcome;