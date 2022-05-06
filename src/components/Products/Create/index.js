import React, { useState, useEffect } from 'react';
import { Button, Form, Container } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import { hasError } from '../../../utils';

function Index(){
	const navigate = useNavigate();
	const [units, setUnits] = useState([]);
	const [photo, setPhoto] = useState(null);
	const [state, setState] = useState({
		name: null,
		description: null,
		uom_id: null,
		isActive: null,
	});
	const [errors, setErrors] = useState({});

	useEffect(() => {
		fetchUnits();
	}, []);

	const onChange = (event) => {
		setState(prevState => ({
		  ...prevState,
		  [event.target.name]: event.target.type === 'checkbox' ? event.target.checked : event.target.value
		}));
	}

	const fetchUnits = async () => {
		try {
		  const response = await axios.get('http://localhost:8000/api/products/units');
			setUnits(response.data);
		}
		catch(e) {
		  console.log(e);
		}
	};

	const onSubmit = async (event) => {
		event.preventDefault();
		setErrors({});
		try {
			const formData = new FormData();
			formData.append('photo', photo ? photo : '');
			Object.keys(state).map(key => {
				formData.append(key, state[key] ? state[key] : '' );
			});

		  const response = await axios.post('http://localhost:8000/api/products/store', formData);
			console.log(response);
		  // setState({
		  // 	name: '',
		  // 	description: '',
		  // 	uom_id:'',
		  // 	isActive: false,
		  // })

		  navigate("/products");
		}
		catch(e) {
		  setErrors(e.response.data.errors);
		}
	}

	const onFileSelect = event => {
		if (event.target.files) {
			setPhoto(event.target.files[0]);
		}
	};

	console.log('errors', errors);

	return (
		<Container>
			<Button variant="primary" onClick={()=>{navigate("/products")}} className="mb-3">
				Back to Index
			</Button>
			<Form onSubmit={onSubmit}>
			  <Form.Group className="mb-3">
			    <Form.Label>Photo</Form.Label>
			    <Form.Control className={hasError('photo', errors) ? 'is-invalid' : ''} type="file" name="photo" onChange={onFileSelect} />
			    {hasError('photo', errors) ? <div className="invalid-feedback">{hasError('photo', errors)}</div> : null}
			  </Form.Group>
			  {photo ? <img src={window.URL.createObjectURL(photo)} style={{ width: 300 }} /> : <p>Preview Here</p>}
				<Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
			    <Form.Label>Name</Form.Label>
			    <Form.Control className={hasError('name', errors) ? 'is-invalid' : ''} type="text" name="name" value={state.name} onChange={onChange} />
			    {hasError('name', errors) ? <div className="invalid-feedback">{hasError('name', errors)}</div> : null}
			  </Form.Group>
			  <Form.Group className="mb-3" controlId="exampleForm.ControlTextarea1">
			    <Form.Label>Description</Form.Label>
			    <Form.Control className={hasError('description', errors) ? 'is-invalid' : ''}  as="textarea" rows={3} name="description" value={state.description} onChange={onChange}/>
			    {hasError('description', errors) ? <div className="invalid-feedback">{hasError('description', errors)}</div> : null}
			  </Form.Group>
			  <Form.Group className="mb-3">
				  <Form.Select className={hasError('uom_id', errors) ? 'is-invalid' : ''}  name="uom_id" value={state.uom_id} onChange={onChange}>
				    <option>Select UOM</option>
				    {units.map(unit => <option key={unit.id} value={unit.id}>{unit.name}</option>)}
				  </Form.Select>
				  {hasError('uom_id', errors) ? <div className="invalid-feedback">{hasError('uom_id', errors)}</div> : null}
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