import React from "react";
import { Button, Container, Row } from "react-bootstrap";

class Cart extends React.Component {
  state = {
    cart: {},
  };

  componentDidMount = () => {
    this.fetchCart();
  };

  fetchCart = async () => {
    await fetch("http://localhost:3077/carts/59dtt24kkiohwgwi", {
      Methot: "GET",
    })
      .then((response) => {
        return response.json();
      })
      .then((data) => {
        console.log(data);
        this.setState({ cart: data });
      })
      .catch((errors) => console.log(errors));
  };

  handleSumbit = async (e, productID) => {
    e.preventDefault();
    await this.RemoveFromCart(productID);
  };

  RemoveFromCart = async (productID) => {
    let response = await fetch(
      "http://localhost:3077/carts/59dtt24kkiohwgwi/remove-from-cart/" +
        productID,
      {
        method: "DELETE",
      }
    );
    if (response.ok) {
      console.log(response);
      this.fetchCart();
    } else {
    }
  };

  render() {
    return (
      <Container>
        <Row>Cart:</Row>
        <Row>
          {this.state.cart.hasOwnProperty("products") &&
            this.state.cart.products.map((product) => (
              <div className="col my-3">
                <div className="card">
                  <img
                    src={product.image}
                    className="card-img-top"
                    alt="..."
                    style={{ maxWidth: "300px" }}
                  />
                  <div className="card-body">
                    <h5 className="card-title">{product.name}</h5>
                    <h5 className="card-title">{product.brand}</h5>
                    <p className="card-text">
                      <b>Description:</b> <br />
                      <small>{product.description}</small>
                    </p>
                    <p className="card-text">
                      <b>Price:</b> $ {product.price}$
                    </p>
                    <Button onClick={(e) => this.handleSumbit(e, product._id)}>
                      Remove From Cart
                    </Button>
                  </div>
                </div>
              </div>
            ))}
        </Row>
        <Row>
          <h5>Total Price: {this.state.cart.total}</h5>
        </Row>
      </Container>
    );
  }
}

export default Cart;
