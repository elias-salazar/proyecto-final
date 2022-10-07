import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, useNavigate, useParams } from "react-router-dom";
import Carousel from "react-bootstrap/Carousel";
import { Button, Col, ListGroup, Row } from "react-bootstrap";
import { addProductThunk } from "../store/slice/cart.slice";
import "../styles/productDetail.css";

const ProductDetails = ({ validation }) => {
  const { id } = useParams();
  const dispatch = useDispatch();
  const productsList = useSelector((state) => state.products);
  const productDetail = productsList.find(
    (product) => product.id === Number(id)
  );
  const relateProducts = productsList.filter(
    (product) => product.category.id === productDetail.category.id
  );
  const [quantity, setQuantity] = useState(1);
  const [index, setIndex] = useState(0);
  const navigate = useNavigate();
  const handleSelect = (selectedIndex, e) => {
    setIndex(selectedIndex);
  };
  useEffect(() => {
    setQuantity(1);
  }, [id]);

  const addToCart = () => {
    const addProduct = {
      id: id,
      quantity: quantity,
    };
    validation ? dispatch(addProductThunk(addProduct)) : navigate("/login");
  };
  return (
    <Row className="g-1">
      <Col className="g-5">
        <Carousel fade variant="dark" interval={null}>
          {productDetail.productImgs?.map((img) => (
            <Carousel.Item key={img}>
              <div className="content-img-detail">
                <img className="d-block w-80" src={img} alt="First slide" />
              </div>
            </Carousel.Item>
          ))}
        </Carousel>
        <Row>
          <Row>
            {" "}
            <h4> {productDetail?.title}</h4>
            {productDetail?.description}
          </Row>
          <Row>
            <div className="content-quantity">
              <p
                style={{
                  margin: "8px 1px",
                  fontSize: "1.2rem",
                }}
              >
                price: ${productDetail?.price}
              </p>
              <div className="button-quantity">
                <Button
                  style={{ fontSize: "1.2rem" }}
                  variant="light"
                  className="me-3"
                  disable
                  onClick={() => setQuantity(quantity - 1)}
                  disabled={quantity === 0 && true}
                >
                  -
                </Button>
                <div className="cuantity">
                  <p style={{ margin: "8px 1px", fontSize: "1.2rem" }}>
                    {quantity}
                  </p>
                </div>
                <Button
                  style={{ fontSize: "1.2rem" }}
                  variant="light"
                  className="ms-3"
                  onClick={() => setQuantity(quantity + 1)}
                >
                  +
                </Button>
              </div>

              <Button disabled={quantity === 0 && true} onClick={addToCart}>
                add to cart
              </Button>
            </div>
          </Row>
        </Row>
      </Col>
      <Col lg={3} className="g-2">
        <ListGroup className="products-related">
          <div className="related-title">
            <h3>Productos relacionados</h3>
          </div>

          {relateProducts.map((product) => (
            <div className="margin-product-related" key={product.id}>
              <ListGroup.Item>
                <div className="content-img-related">
                  <img src={product.productImgs} alt="First slide" />
                </div>
                <h5>
                  <Link to={`/product/${product.id}`}>{product?.title}</Link>
                </h5>
              </ListGroup.Item>
            </div>
          ))}
        </ListGroup>
      </Col>
    </Row>
  );
};

export default ProductDetails;
