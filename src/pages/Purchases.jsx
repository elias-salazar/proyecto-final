import React, { useEffect } from "react";
import { ListGroup } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import { getpurchasesThunk } from "../store/slice/purchases.slice";
const Purchases = () => {
  const dispatch = useDispatch();
  const purchases = useSelector((state) => state.purchases);
  useEffect(() => {
    dispatch(getpurchasesThunk());
  }, []);
  const navigate = useNavigate();
  console.log(purchases);
  return (
    <div>
      <h3>Purchases</h3>

      <ListGroup style={{ width: "80%" }}>
        {purchases.map((purchase) => (
          <ListGroup.Item key={purchase.cart?.id}>
            <h2>{purchase.createdAt}</h2>
            {purchase.cart.products.map((product) => (
              <div key={product.id}>
                {" "}
                <Link to={`/product/${product.id}`}>
                  <p style={{ cursor: "pointer", fontWeight: "900" }}>
                    {product.title}
                  </p>
                </Link>
                <p>cantidad: {product.productsInCart.quantity}</p>
              </div>
            ))}
          </ListGroup.Item>
        ))}
      </ListGroup>
    </div>
  );
};

export default Purchases;
