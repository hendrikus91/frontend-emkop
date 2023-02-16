import React, { useEffect, useState } from "react";
import { Row, Col, Container, Table } from "react-bootstrap"
import { useParams } from 'react-router-dom';


export default function Showmployee() {

    let { id } = useParams();

    const [employee, setEmployee] = useState([]);

    useEffect(() => {
        fetch(`http://localhost:8001/api/employee/${id}`)
            .then(res => res.json())
            .then(
                (result) => {
                    setEmployee(result);
                },
                (error) => {
                    
                }
            )
    }, [])

    return (

        <Container style={{ paddingTop: "70px" }}>

            <Row className="justify-content-md-center">

                <Col lg="4">
                    <Table striped bordered>
                        <tbody>
                            <tr>
                                <th>ID</th>
                                <th>{employee.id}</th>
                            </tr>

                            <tr>
                                <th>Name</th>
                                <th>{employee.name}</th>
                            </tr>
                            <tr>
                                <th>Gender</th>
                                <th>{employee.gender}</th>
                            </tr>
                            <tr>
                                <th>DOB</th>
                                <th>{employee.dob}</th>
                            </tr>
                            <tr>
                                <th>Department</th>
                                <th>{employee.department}</th>
                            </tr>
                        </tbody>
                    </Table>
                </Col>
            </Row>
        </Container>
    )
}