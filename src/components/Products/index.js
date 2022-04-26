import React, { useState, useEffect } from 'react';
import { Button, Form, Container, Table } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

function Index(){
	const navigate = useNavigate();
	
	const [data,setData] = useState([]);

	useEffect(()=>{
		getData();
	},[]);
	
	const getData = async()=>{
		try{
			const response = await axios.get('http://localhost:8000/api/products');
			setData(response.data);
			//console.log(response.data);
		}catch(e){
			console.log(e);
		}
	}

	const onDelete = async(id)=>{
		try{
			const response = await axios.delete('http://localhost:8000/api/products/delete/'+id);
			getData();
		}catch(e){

		}
	}

	console.log(data);

	return (
		<Container>
			<Button variant="primary" onClick={()=>{navigate("/products/create")}}>
				Create Product
			</Button>
			<Table striped bordered hover className="mt-3">
			  <thead>
			    <tr>
			      <th>#</th>
			      <th>Name</th>
			      <th>Description</th>
			      <th>UOM</th>
			      <th>isActive</th>
			      <th>Action</th>
			    </tr>
			  </thead>
			  <tbody>
			  	{data.map((item)=>{
			  		return (
			  			<tr key={item.id}>
			  			  <td>{item.id}</td>
			  			  <td>{item.name}</td>
			  			  <td>{item.description}</td>
			  			  <td>{item.uom}</td>
			  			  <td>{item.isActive ? 'Active' : 'Not Active'}</td>
			  			  <td>
			  			  	<Button variant="info" onClick={()=>{navigate("/products/edit/"+item.id)}} >Edit</Button>
			  			  	<Button variant="danger" onClick={()=>onDelete(item.id)}>Delete</Button>
			  			  </td>
			  			</tr>
			  		);
			  	})}
			    
			  </tbody>
			</Table>
		</Container>
	);
}

export default Index;