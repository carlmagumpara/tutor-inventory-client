import React, { useState, useEffect } from 'react';
import { Button, Form, Container, Table } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import Swal from 'sweetalert2';

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

	const onDelete = (id) => {
		Swal.fire({
		  title: 'Do you want to delete this product?',
		  icon: 'error',
		  showCancelButton: true,
		  confirmButtonText: 'Yes',
		  denyButtonText: 'No',
		}).then(async result => {
		  /* Read more about isConfirmed, isDenied below */
		  if (result.isConfirmed) {
				try {
					const response = await axios.delete('http://localhost:8000/api/products/delete/'+id);
					getData();
					Swal.fire('Deleted!', '', 'success');
				} catch(e) {
				}
		  } else if (result.isDenied) {
		  }
		});
	}

	const downloadPhoto = url => {
    var link = document.createElement("a");
    // If you don't know the name or want to use
    // the webserver default set name = ''
    link.setAttribute('download', url);
    link.href = url;
    document.body.appendChild(link);
    link.click();
    link.remove();
	};

	return (
		<Container>
			<Button variant="primary" onClick={()=>{navigate("/products/create")}}>
				Create Product
			</Button>
			<Table striped bordered hover className="mt-3">
			  <thead>
			    <tr>
			      <th>#</th>
			      <th>Photo</th>
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
			  				<td>
			  					<img src={item.photo} style={{ width: 100 }} />
			  					<Button onClick={() => downloadPhoto(item.photo)}>Download</Button>
			  				</td>
			  			  <td>{item.id}</td>
			  			  <td>{item.name}</td>
			  			  <td>{item.description}</td>
			  			  <td>{item.unit.name}</td>
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