import React, { useEffect, useState } from "react";
import { Alert, Button, ListGroup, Offcanvas } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { List } from "reactstrap";
import { getcartThunk, purchasesCartThunk } from "../store/slice/cart.slice";
import "../App.css";

const ProductsSidebar = ({ show, handleClose }) => {
  const [showAlert, setShowAlert] = useState(false);
  const dispatch = useDispatch();
  const cartProducts = useSelector((state) => state.cart);
  useEffect(() => {
    dispatch(getcartThunk());
  }, []);

  const prices = cartProducts.products?.map((product) => Number(product.price));
  const total = prices?.reduce((acc, actual) => {
    return acc + actual;
  }, 0);

  return (
    <Offcanvas placement={"end"} show={show} onHide={handleClose}>
      <Offcanvas.Header closeButton>
        <Offcanvas.Title>Cart</Offcanvas.Title>
      </Offcanvas.Header>
      <Offcanvas.Body className="">
        <ListGroup>
          {cartProducts.products?.map((product) => (
            <ListGroup.Item key={product.id}>
              producto: <br />
              <Link to={`/product/${product.id}`}>{product.title}</Link>
              <p>Cantidad: {product.productsInCart?.quantity}</p>
              <div className="data-product-cart">
                <p>precio: ${product.price} </p>
              </div>
            </ListGroup.Item>
          ))}
          {showAlert && (
            <Alert
              variant="success"
              onClose={() => setShowAlert(false)}
              dismissible
            >
              <p>Gracias por su compra!</p>
            </Alert>
          )}
        </ListGroup>

        <div
          className="content-total-button-cart"
          style={{
            visibility: `${cartProducts.length === 0 && "hidden"}
            `,
          }}
        >
          <p>total: ${total} </p>
          <Button
            onClick={() => (dispatch(purchasesCartThunk()), setShowAlert(true))}
          >
            comprar
          </Button>
        </div>
      </Offcanvas.Body>
    </Offcanvas>
  );
};

export default ProductsSidebar;
