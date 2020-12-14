import React from "react";
import { Col, Container, Row, Form, Button } from "react-bootstrap";

class BackOffice extends React.Component {
  state = {
    product: {
      name: "",
      description: "",
      brand: "",
      price: 0,
      category: "",
    },
    image: {},
  };

  updateFormField = (e) => {
    let product = { ...this.state.product };
    let currentId = e.currentTarget.id;
    product[currentId] = e.currentTarget.value;
    this.setState({ product });
  };

  submitForm = async (e) => {
    e.preventDefault();
    this.postProduct();
  };

  postProduct = async () => {
    try {
      let response = await fetch("http://localhost:3077/products/", {
        method: "POST",
        body: JSON.stringify(this.state.product),
        headers: {
          "Content-Type": "application/json",
        },
      });
      if (response.ok && this.state.image) {
        let hope = await response.json();
        this.postImage(hope._id);
      } else if (response.ok) {
        alert("Product Added!");
        this.setState({
          product: {
            name: "",
            description: "",
            brand: "",
            price: 0,
            category: "",
          },
        });
      } else {
        console.log("Somethings gone wrong!");
        let error = await response.json();
        console.log(error);
      }
    } catch (error) {
      console.log(error);
    }
  };

  postImage = async (productID) => {
    try {
      let productImg = new FormData();
      await productImg.append("productImg", this.state.image);
      if (productImg) {
        let response = await fetch(
          "http://localhost:3077/files/" + productID + "/upload",
          {
            method: "POST",
            body: productImg,
          }
        );
        if (response.ok) {
          alert("Post sent with image !");
          this.setState({
            image: {},
          });
          this.setState({
            product: {
              name: "",
              description: "",
              brand: "",
              price: 0,
              category: "",
            },
          });
        }
      }
    } catch (error) {
      console.log(error);
    }
  };

  render() {
    return (
      <Container className="mt-5">
        <Row>
          <Col xs={{ span: 6, offset: 3 }}>
            <h2>Back Office</h2>
          </Col>
        </Row>
        <Row>
          <Col xs={{ span: 6, offset: 3 }}>
            <Form onSubmit={this.submitForm}>
              <Form.Group>
                <Form.Label htmlFor="name">Name</Form.Label>
                <Form.Control
                  type="text"
                  id="name"
                  value={this.state.product.name}
                  onChange={this.updateFormField}
                  required
                />
              </Form.Group>
              <Form.Group>
                <Form.Label htmlFor="description">Description</Form.Label>
                <Form.Control
                  as="textarea"
                  id="description"
                  value={this.state.product.description}
                  onChange={this.updateFormField}
                  required
                />
              </Form.Group>
              <Form.Group>
                <Form.Label htmlFor="brand">Brand</Form.Label>
                <Form.Control
                  type="text"
                  id="brand"
                  value={this.state.product.brand}
                  onChange={this.updateFormField}
                  required
                />
              </Form.Group>
              <Form.Group>
                <Form.Label htmlFor="price">Price</Form.Label>
                <Form.Control
                  type="number"
                  min={0}
                  id="price"
                  value={this.state.product.price}
                  onChange={this.updateFormField}
                  required
                />
              </Form.Group>
              <Form.Group>
                <Form.Label htmlFor="category">Category</Form.Label>
                <Form.Control
                  type="text"
                  id="category"
                  value={this.state.product.category}
                  onChange={this.updateFormField}
                />
              </Form.Group>
              <Form.Group>
                <Form.Label htmlFor="image">Image</Form.Label>
                <Form.Control
                  type="file"
                  id="image"
                  onChange={(e) => this.setState({ image: e.target.files[0] })}
                  accept="image/*"
                />
              </Form.Group>
              <Button variant="warning" type="submit">
                SUBMIT PRODUCT
              </Button>
            </Form>
          </Col>
        </Row>
      </Container>
    );
  }
}

export default BackOffice;
