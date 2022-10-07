import { useEffect, useState } from "react";
import { HashRouter, Route, Routes } from "react-router-dom";
import "./App.css";
import Home from "./pages/Home";
import Login from "./pages/Login";
import ProductDetails from "./pages/ProductDetails";
import Purchases from "./pages/Purchases";
import MyNavBar from "./components/MyNavBar";
import Cart from "./pages/Cart";
import LoadingScreen from "./components/LoadingScreen";
import { useDispatch, useSelector } from "react-redux";
import { getProductsThunk } from "./store/slice/products.slice";
import ProtectedRoutes from "./components/ProtectedRoutes";
import { Container } from "react-bootstrap";
import ProductsSidebar from "./components/ProductsSidebar";

function App() {
  const [validation, setValidation] = useState(false);
  const isLoading = useSelector((state) => state.isLoading);
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(getProductsThunk());
  }, []);
  const [show, setShow] = useState(false);

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);
  /* */
  // const cartProducts = useSelector((state) => state.cart);
  const isValidation = (res) => {
    setValidation(res);
  };
  return (
    <HashRouter>
      <MyNavBar isValidation={isValidation} validation={validation} />
      {isLoading && <LoadingScreen />}
      {validation && (
        <div className="cart">
          <i
            class="fa-solid fa-cart-shopping"
            onClick={handleShow}
            style={{ cursor: "pointer" }}
          />
        </div>
      )}

      <Container className="mt-3 mb-5">
        <ProductsSidebar show={show} handleClose={handleClose} />
        <Routes>
          <Route
            path="/login"
            element={<Login isValidation={isValidation} />}
          />

          <Route path="/" element={<Home />} />
          <Route
            path="/product/:id"
            element={<ProductDetails validation={validation} />}
          />
          <Route path="/cart" element={<Cart />} />
          <Route element={<ProtectedRoutes />}>
            <Route path="/purchases" element={<Purchases />} />
          </Route>
        </Routes>
      </Container>
    </HashRouter>
  );
}

export default App;
