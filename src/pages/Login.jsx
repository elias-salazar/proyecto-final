import axios from "axios";
import React from "react";
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import { useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import "../styles/login.css";
const Login = ({ isValidation }) => {
  const { register, handleSubmit } = useForm();
  const navigate = useNavigate();
  const submit = (data) => {
    axios
      .post("https://e-commerce-api.academlo.tech/api/v1/users/login", data)
      .then((res) => {
        localStorage.setItem("token", res.data.data.token);
        navigate("/");
        isValidation(true);
      })
      .catch((error) => {
        if (error.response?.status === 404) {
          alert("Credenciales inválidas");
        }
      });
  };
  return (
    <div className="content-login">
      <div className="login">
        <Form onSubmit={handleSubmit(submit)} variant={"black"}>
          <Form.Group className="mb-3" controlId="formBasicEmail">
            <Form.Label>Email address</Form.Label>
            <Form.Control type="email" {...register("email")} />
          </Form.Group>

          <Form.Group className="mb-3" controlId="formBasicPassword">
            <Form.Label>Password</Form.Label>
            <Form.Control type="password" {...register("password")} />
          </Form.Group>

          <Button variant="primary" type="submit">
            Login
          </Button>
        </Form>
      </div>
    </div>
  );
};

export default Login;
