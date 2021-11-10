import React from "react";

// reactstrap components
import {
  Badge,
  Card,
  CardHeader,
  CardText,
  CardTitle,
  CardFooter,
  CardBody,
  Label,
  FormGroup,
  Input,
  Container,
  Row,
  Modal,
  ModalHeader,
  ModalBody,
  Col,
  Button,
  ModalFooter,
  UncontrolledTooltip,
  TabContent, TabPane, Nav, NavItem, NavLink,
  Spinner,
  Table
} from "reactstrap";
// core components
import Header from "components/Headers/Header.js";
import * as http from '../../api/api'
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import classnames from 'classnames';
import { Component } from "react";

class Clients extends Component{
    constructor(){
        super()
        this.state = {
            activeTab: '1',
            search:'',
            readInterior:[]
          };
       
    }
    toggle =(tab)=> {
        if (this.state.activeTab !== tab) {
          this.setState({
            activeTab: tab
          });
        }
      }
      handleOnChange = (e) =>{
          const target = e.target
          const name = target.name
          const value = target.value
          this.setState({
              [name]:value
          })
      }
      getInteriorProjects = () =>{
        
      }
render(){
    return(
        <>
        <Header />
        <Container className="mt--7" fluid>
        <ToastContainer />
        <Row>
          <div className="col">
            <Card className="shadow container bg-secondary">
            <CardHeader className="border-0">
              <Row className="align-items-center">
                  <Col xs="8">
                    <h3 className="mb-0">Clients</h3>
                  </Col>
                </Row>
              </CardHeader>
              <CardBody>
              <div>
        <Nav tabs>
          <NavItem>
            <NavLink
              className={classnames({ active: this.state.activeTab === '1' })}
              onClick={() => { this.toggle('1'); }}
            >
              Interior
            </NavLink>
          </NavItem>
          <NavItem>
            <NavLink
              className={classnames({ active: this.state.activeTab === '2' })}
              onClick={() => { this.toggle('2'); }}
            >
              Exterior
            </NavLink>
          </NavItem>
          <NavItem>
            <NavLink
              className={classnames({ active: this.state.activeTab === '3' })}
              onClick={() => { this.toggle('3'); }}
            >
              Consultant
            </NavLink>
          </NavItem>
          <NavItem>
            <NavLink
              className={classnames({ active: this.state.activeTab === '4' })}
              onClick={() => { this.toggle('4'); }}
            >
              Plans
            </NavLink>
          </NavItem>
        </Nav>
        <TabContent activeTab={this.state.activeTab}>
          <TabPane tabId="1">
          <Row>
            <Col sm="12">
              <div className="mt-5">
                  <Row>
                      <Col sm="12" md="6" lg="6">
                      <h4>Interior</h4>
                      </Col>
                      <Col sm="12" md="6" lg="6">
                      <input
                      className="form-control-alternative form-control"
                      placeholder="Search"
                      type="text"
                      name="search"
                      value={this.state.search}
                      onChange={this.handleOnChange}
                      />
                      </Col>
                  </Row>
                  <Row>
                      <Col md="12">
                      <Table className="align-items-center table-flush" responsive>
                      <thead className="thead-light">
                  <tr>
                    <th>S.No</th>
                    <th scope="col">Name</th>
                    <th scope="col">Phone Number</th>
                    <th scope="col">Action</th>
                  </tr>
                </thead>
                <tbody>
                    {

                    }
                </tbody>
                      </Table>
                      </Col>
                  </Row>
              </div>
              </Col>
              </Row>
          </TabPane>
          <TabPane tabId="2">
            <Row>
              <Col sm="6">
                <Card body>
                  <CardTitle>Special Title Treatment</CardTitle>
                  <CardText>With supporting text below as a natural lead-in to additional content.</CardText>
                  <Button>Go somewhere</Button>
                </Card>
              </Col>
              <Col sm="6">
                <Card body>
                  <CardTitle>Special Title Treatment</CardTitle>
                  <CardText>With supporting text below as a natural lead-in to additional content.</CardText>
                  <Button>Go somewhere</Button>
                </Card>
              </Col>
            </Row>
          </TabPane>
          <TabPane tabId="3">
            <Row>
              <Col sm="6">
                <Card body>
                  <CardTitle>Special Title Treatment</CardTitle>
                  <CardText>With supporting text below as a natural lead-in to additional content.</CardText>
                  <Button>Go somewhere</Button>
                </Card>
              </Col>
              <Col sm="6">
                <Card body>
                  <CardTitle>Special Title Treatment</CardTitle>
                  <CardText>With supporting text below as a natural lead-in to additional content.</CardText>
                  <Button>Go somewhere</Button>
                </Card>
              </Col>
            </Row>
          </TabPane>
          <TabPane tabId="4">
            <Row>
              <Col sm="6">
                <Card body>
                  <CardTitle>Special Title Treatment</CardTitle>
                  <CardText>With supporting text below as a natural lead-in to additional content.</CardText>
                  <Button>Go somewhere</Button>
                </Card>
              </Col>
              <Col sm="6">
                <Card body>
                  <CardTitle>Special Title Treatment</CardTitle>
                  <CardText>With supporting text below as a natural lead-in to additional content.</CardText>
                  <Button>Go somewhere</Button>
                </Card>
              </Col>
            </Row>
          </TabPane>
        </TabContent>
      </div>  
            </CardBody> 
            </Card>
            </div>
            </Row>
            </Container>
      </>
    )
}
}
export default Clients;