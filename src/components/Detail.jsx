import React from "react";
import { Button } from "react-bootstrap";

class Detail extends React.Component {
  state = {
    products: {},
  };

  AddToCart = async (productID) => {
    let response = await fetch(
      "http://localhost:3077/carts/59dtt24kkiohwgwi/add-to-cart/" + productID,
      {
        method: "PUT",
      }
    );
    if (response.ok) {
      console.log(response);
    } else {
      console.log(response);
    }
  };

  async componentDidMount() {
    await fetch(
      "http://localhost:3077/products/" + this.props.match.params.id,
      {
        Methot: "GET",
      }
    )
      .then((response) => {
        return response.json();
      })
      .then((data) => {
        console.log(data[0]);
        this.setState({ products: data[0] });
      })
      .catch((errors) => console.log(errors));
  }

  render() {
    return (
      <div>
        {this.state.products && (
          <div className="col my-3">
            <div className="card" style={{ height: "100%", width: "50rem;" }}>
              <img
                src={this.state.products.image}
                className="card-img-top"
                alt="..."
                style={{ maxWidth: "300px" }}
              />
              <div className="card-body">
                <h5 className="card-title">{this.state.products.name}</h5>
                <h5 className="card-title">{this.state.products.brand}</h5>
                <p className="card-text">
                  <b>Description:</b> <br />
                  <small>{this.state.products.description}</small>
                </p>
                <p className="card-text">
                  <b>Price:</b> $ {this.state.products.price}$
                </p>
                <a onclick="handleEdit()" className="btn btn-primary mr-5">
                  Edit product
                </a>
                <a onclick="handleDelete()" className="btn btn-primary ml-5">
                  Delete product
                </a>
                <Button onClick={() => this.AddToCart(this.state.products._id)}>
                  Add To Cart
                </Button>
              </div>
            </div>
          </div>
        )}
      </div>
    );
  }
}

export default Detail;
