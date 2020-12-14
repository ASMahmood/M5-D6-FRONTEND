import React, { Component } from "react";
import { Card, Button, Col } from "react-bootstrap";
import { withRouter } from "react-router-dom";

class SingleCard extends React.Component {
  render() {
    return (
      <div>
        <Col
          xs={12}
          className="my-3"
          onClick={() =>
            this.props.history.push("/detail/" + this.props.item._id)
          }
        >
          <Card style={{ width: "18rem" }}>
            <Card.Img variant="top" src={this.props.item.image} />
            <Card.Body>
              <Card.Title>{this.props.item.name}</Card.Title>
              <Card.Text>{this.props.item.description}</Card.Text>
              <Card.Text>{this.props.item.price}</Card.Text>
              {/* <Button variant="primary">Go somewhere</Button> */}
            </Card.Body>
          </Card>
        </Col>
      </div>
    );
  }
}

export default withRouter(SingleCard);
