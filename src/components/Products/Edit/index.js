import React, { useState, useEffect } from 'react';
import { Button, Form, Container } from 'react-bootstrap';
import { useNavigate, useParams } from 'react-router-dom';
import axios from 'axios';

function Index(){
	const navigate = useNavigate();
	const {id} = useParams();
	const [state, setState] = useState({
		name: '',
		description: '',
		uom:'',
		isActive: false,
	});

	useEffect(()=>{
		getData();
	},[]);

	const getData = async()=>{
		try{
			const response = await axios.get('http://localhost:8000/api/products/show/'+id);
			setState(response.data);
			//console.log(response.data);
		}catch(e){
			console.log(e);
		}
	}

	const onChange = (event) => {
		console.log(event.target.value);
		setState(prevState => ({
		  ...prevState,
		  [event.target.name]: event.target.type === 'checkbox' ? event.target.checked : event.target.value
		}));
	}

	console.log(id);

	const onSubmit = async (event) => {
		event.preventDefault();
		//alert(JSON.stringify(state));
		try {
		  const response = await axios.post('http://localhost:8000/api/products/update/'+id,state);
			console.log(response);
		  // setState({
		  // 	name: '',
		  // 	description: '',
		  // 	uom:'',
		  // 	isActive: false,
		  // })

		  navigate("/products");
		}
		catch(e) {
		  console.log(e);
		}
	}
	return (
		<Container>
			<Button variant="primary" onClick={()=>{navigate("/products")}} className="mb-3">
				Back to Index
			</Button>
			<Form onSubmit={onSubmit}>
				<Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
				    <Form.Label>Email address</Form.Label>
				    <Form.Control type="text" placeholder="name@example.com" name="name" value={state.name} onChange={onChange} />
				  </Form.Group>
				  <Form.Group className="mb-3" controlId="exampleForm.ControlTextarea1">
				    <Form.Label>Example textarea</Form.Label>
				    <Form.Control as="textarea" rows={3} name="description" value={state.description} onChange={onChange}/>
				  </Form.Group>
				  <Form.Group className="mb-3">
					  <Form.Select aria-label="Default select example" name="uom" value={state.uom} onChange={onChange}>
					    <option>Open this select menu</option>
					    <option value="1">One</option>
					    <option value="2">Two</option>
					    <option value="3">Three</option>
					  </Form.Select>
				  </Form.Group>
				  <Form.Group className="mb-3">
					  <Form.Check
				          type={'checkbox'}
				          label={`Please Check this`}
				          id={`1`}
				          value={`1`}
				          name="isActive"
				          checked={state.isActive}
				          onChange={onChange}
				       />
				  </Form.Group>
				  <Button variant="primary" type="submit">
				      Submit
				  </Button>
			</Form>
		</Container>
	);
}

export default Index;