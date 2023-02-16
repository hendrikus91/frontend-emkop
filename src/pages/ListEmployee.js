import React, { useEffect, useState } from "react";
import { Row, Col, Table, Container, Button } from "react-bootstrap";
import { BsPencilSquare, BsEye, BsTrash, BsSearch } from 'react-icons/bs';
import { Link } from "react-router-dom";
import { Form, InputGroup } from 'react-bootstrap';





export default function ListEmployee() {


    const [error, setError] = useState(null);
    const [isLoaded, setIsLoaded] = useState(false);
    const [items, setItems] = useState([]);
    const [search, setSearch] = useState({ text: "" });

    const handleChange = (event) => {
        setSearch({text: event.target.value});
    }

    const handleSearch = (event) => {
        event.preventDefault();
        getEmployee(search.text);
    }

    const getEmployee = async (querySearch = "") => {
        await fetch(`http://localhost:8001/api/employee?name=${querySearch}`)
            .then(res => res.json())
            .then(
                (result) => {
                    setIsLoaded(true);
                    setItems(result.data);
                },
                (error) => {
                    setIsLoaded(true);
                    setError(error);
                }
            )
    }


    useEffect(() => {
        getEmployee()
    }, [])

    const deleteEmployee = async (employeeId) => {
        await fetch(`http://localhost:8001/api/employee/${employeeId}`, {
            method: 'DELETE',
            headers: {
                'Content-Type': 'application/json',
            }
        }).then(res => {
            getEmployee();
        })

    }


    if (error) {
        return <div>Error: {error.message}</div>;
    } else if (!isLoaded) {

        return (
            <Container>
                <Row className="justify-content-md-center">
                    <Col lg="12">
                        <h1 className="text-center">Loading</h1>
                    </Col>
                </Row>
            </Container>
        )
    } else {
        return (

            <Container style={{ paddingTop: "70px" }}>

                <Row>
                    <Col lg="6">
                        <Link to="/employee/add">
                            <Button className="btn btn-success mb-3">Add Employee</Button>
                        </Link>
                    </Col>
                    <Col lg="6">
                        <Form onSubmit={handleSearch}>
                            <InputGroup className="mb-3">
                                <Form.Control placeholder="Search Employees" aria-label="Search Employees" onChange={handleChange} />
                                <Button variant="success" type="submit">
                                    <BsSearch />
                                </Button>
                            </InputGroup>
                        </Form>
                    </Col>
                </Row>





                <Row className="justify-content-md-center">
                    <Col>
                        <Table bordered striped>
                            <thead>
                                <tr>
                                    <th>Name</th>
                                    <th>DOB</th>
                                    <th>Gender</th>
                                    <th>Department</th>
                                    <th>Action</th>
                                </tr>
                            </thead>
                            <tbody>
                                {items.map(item => (
                                    <tr key={item.id}>
                                        <td>{item.name}</td>
                                        <td>{item.dob}</td>
                                        <td>{item.gender}</td>
                                        <td>{item.department}</td>
                                        <td>
                                            <Link to={`/employee/${item.id}/edit`}>
                                                <BsPencilSquare className="text-primary" />
                                            </Link>
                                            <Link to={`/employee/${item.id}/show`}>
                                                <BsEye className="text-warning" />
                                            </Link>

                                            <Link onClick={() => { if (window.confirm('Are you sure you wish to delete this item?')) deleteEmployee(item.id) }} >
                                                <BsTrash className="text-danger" />
                                            </Link>


                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </Table>
                    </Col>
                </Row>
            </Container>
        );
    }
}
