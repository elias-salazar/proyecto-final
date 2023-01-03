import axios from "axios";
import React, { useEffect, useState } from "react";
import { Button, Card, Col, ListGroup, Row } from "react-bootstrap";
import { useSelector } from "react-redux";
import "/src/styles/home.css";
import Form from "react-bootstrap/Form";
import InputGroup from "react-bootstrap/InputGroup";
import { useNavigate } from "react-router-dom";

const Home = () => {
  const productsList = useSelector((state) => state.products);
  const navigate = useNavigate();
  const [categories, setCategories] = useState([]);
  const [productFiltered, setProductFiltered] = useState([]);
  const [searchValue, setSearchValue] = useState("");
  useEffect(() => {
    axios
      .get("https://e-commerce-api.academlo.tech/api/v1/products/categories")
      .then((res) => setCategories(res.data.data.categories));
  }, []);

  /**sjsaasasASasAS */
  useEffect(() => {
    setProductFiltered(productsList);
  }, [productsList]);
  const filterCategory = (categoryId) => {
    const filtered = productsList.filter(
      (product) => product.category.id === categoryId
    );
    setProductFiltered(filtered);
  };
  const searchProduct = () => {
    const filtered = productsList.filter((product) =>
      product.title
        .toLocaleLowerCase()
        .includes(searchValue.toLocaleLowerCase())
    );
    setProductFiltered(filtered);
  };

  return (
    <Row>
      <Col lg={3}>
        <ListGroup style={{ marginBottom: "10px" }}>
          <ListGroup.Item
            onClick={() => setProductFiltered(productsList)}
            style={{ cursor: "pointer" }}
          >
            show all
          </ListGroup.Item>

          {categories.map((category) => (
            <ListGroup.Item
              key={category.id}
              onClick={() => filterCategory(category.id)}
              style={{ cursor: "pointer" }}
            >
              {category.name}
            </ListGroup.Item>
          ))}
        </ListGroup>
      </Col>
      <Col>
        <InputGroup
          className="mb-3 input-search"
          value={searchValue}
          onChange={(e) => setSearchValue(e.target.value)}
        >
          <Form.Control
            placeholder="search product"
            aria-label="Recipient's username"
            aria-describedby="basic-addon2"
          />
          <Button
            variant="outline-secondary"
            id="button-addon2"
            onClick={searchProduct}
          >
            search
          </Button>
        </InputGroup>
        <Row xs={1} md={2} lg={3} className="g-4">
          {productFiltered.map((product) => (
            <Col key={product.id}>
              <Card
                onClick={() => navigate(`/product/${product.id}`)}
                style={{
                  height: "100%",
                  border: "solid 2px rgb(170, 169, 169)",
                  cursor: "pointer",
                }}
              >
                <div className="content-img-cart">
                  <Card.Img
                    variant="top"
                    src={product.productImgs?.[2]}
                    className="img-cart"
                  />
                </div>
                <Card.Body className="text-cart">
                  <Card.Title>{product.title}</Card.Title>
                  <Card.Text></Card.Text>
                </Card.Body>
              </Card>
            </Col>
          ))}
        </Row>
      </Col>
    </Row>
  );
};

export default Home;
