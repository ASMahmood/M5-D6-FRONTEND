import React, { Component } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import SingleCard from "./SingleCard";
import { Row, Button, Col } from "react-bootstrap";

export default class CardsList extends Component {
  state = {
    products: [],
  };

  async componentDidMount() {
    await fetch("http://localhost:3077/products", {
      Methot: "GET",
    })
      .then((response) => {
        return response.json();
      })
      .then((data) => {
        this.setState({ products: data });
      })
      .catch((errors) => console.log(errors));
  }

  render() {
    return (
      <div>
        <Row>
          {this.state.products.map((item) => (
            <SingleCard item={item} />
          ))}
        </Row>
      </div>
    );
  }
}
