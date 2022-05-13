import { useState } from 'react';
import { Container, Row, Col, Form, Button } from 'react-bootstrap';
import axios from 'axios';
import { Navigate, useNavigate, useLocation } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { storeUser } from '../../redux/reducers/user';
import { storeToken } from '../../redux/reducers/token';
import { updateState } from '../../redux/updateState';

function Login() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [state, setState] = useState({
    email: '',
    password: '',
  });

  const onSubmit = async event => {
    event.preventDefault();
    try {
      const response = await axios.post('http://localhost:8000/api/login', state);
      await dispatch(updateState(storeUser(response.data.user)));
      await dispatch(updateState(storeToken(response.data.token)));
      setTimeout(() => {
        navigate('/products');
      });
    } catch (error) {

    }
  };

  const onChange = event => {
    setState(prevState => ({
      ...prevState,
      [event.target.name]: event.target.value,
    }));
  };

  return (
    <Container>
      <Row className="mt-5">
        <Col md={{ span: 4, offset: 4 }}>
          <Form onSubmit={onSubmit}>
            <h3>Login</h3>
            <Form.Group className="mb-3" controlId="formBasicEmail">
              <Form.Label>Email address</Form.Label>
              <Form.Control onChange={onChange} name="email" type="email" placeholder="Enter email" value={state.email} />
              <Form.Text className="text-muted">
                We'll never share your email with anyone else.
              </Form.Text>
            </Form.Group>
            <Form.Group className="mb-3" controlId="formBasicPassword">
              <Form.Label>Password</Form.Label>
              <Form.Control onChange={onChange} name="password" type="password" placeholder="Password" value={state.password} />
            </Form.Group>
            <Button variant="primary" type="submit">
              Submit
            </Button>
          </Form>
        </Col>
      </Row>
    </Container>
  );
}

export default Login;