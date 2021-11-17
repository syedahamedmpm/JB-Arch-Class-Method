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
import { data } from "jquery";

class Clients extends Component{
    constructor(){
        super()
        this.state = {
            activeTab: '1',
            search:'',
            readInterior:[],
            unreadInterior:[],
            readExterior:[],
            readConsultant:[],
            readPlan:[]
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
      componentDidMount(){
        this.getInteriorProjects()
        this.getExteriorProjects()
        this.getConsultantsProjects()
        this.getPlanProjects()
        
      }
      getInteriorProjects = () =>{
        http
        .adminGet("clients/interior")
        .then((resp)=>resp.json())
        .then(data =>{
          console.log(data)
          this.setState({
            readInterior:data.clients
          })
          console.log(this.state.readInterior)
          var count = data.clients.readingStatus
          console.log(count)
        })
      }
      getExteriorProjects = () =>{
        http
        .adminGet("clients/exterior")
        .then((resp)=>resp.json())
        .then(data =>{
          console.log(data)
          this.setState({
            readExterior:data.clients
          })
          console.log(this.state.readExterior)
        })
      }
      getConsultantsProjects = () =>{
        http
        .adminGet("clients/consultant")
        .then((resp)=>resp.json())
        .then(data =>{
          console.log(data)
          this.setState({
            readConsultant:data.clients
          })
          console.log(this.state.readConsultant)
        })
      }
      getPlanProjects = () =>{
        http
        .adminGet("clients/planning")
        .then((resp)=>resp.json())
        .then(data =>{
          console.log(data)
          this.setState({
            readPlan:data.clients
          })
          console.log(this.state.readPlan)
        })
      }
render(){
  const { readInterior,search,readExterior,readConsultant,readPlan} = this.state;
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
                    readInterior.filter(data=>data.name.toLowerCase().includes(search.toLowerCase())).map((clients,index)=>(
                      <tr>
                        <td>{index + 1}</td>
                        <td className="text-capitalize">{clients.name} {clients.readingStatus=="unread" ? (<Badge color="primary">New</Badge>) : null} </td>
                        <td>{clients.phone}</td>
                        <td>
                          <i class="far fa-eye" style={{marginRight: "20px"}}></i>
                          <i class="fas fa-trash-alt"></i>
                        </td>
                      </tr>
                    ))}
                    {
                      readInterior.length===0 ? 
                      <div>
                          <h4>No Data Found</h4>
                      </div>
                      : null
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
            <Col sm="12">
              <div className="mt-5">
                  <Row>
                      <Col sm="12" md="6" lg="6">
                      <h4>Exterior</h4>
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
                    readExterior.filter(data=>data.name.toLowerCase().includes(search.toLowerCase())).map((clients,index)=>(
                      <tr>
                        <td>{index + 1}</td>
                        <td className="text-capitalize">{clients.name} {clients.readingStatus=="unread" ? (<Badge color="primary">New</Badge>) : null} </td>
                        <td>{clients.phone}</td>
                        <td>
                          <i class="far fa-eye" style={{marginRight: "20px"}}></i>
                          <i class="fas fa-trash-alt"></i>
                        </td>
                      </tr>
                    ))}
                    {
                      readInterior.length===0 ? 
                      <div>
                          <h4>No Data Found</h4>
                      </div>
                      : null
                    }
                </tbody>
                      </Table>
                      </Col>
                  </Row>
              </div>
              </Col>
              </Row>
          </TabPane>
          <TabPane tabId="3">
          <Row>
            <Col sm="12">
              <div className="mt-5">
                  <Row>
                      <Col sm="12" md="6" lg="6">
                      <h4>Consultant</h4>
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
                    readConsultant.filter(data=>data.name.toLowerCase().includes(search.toLowerCase())).map((clients,index)=>(
                      <tr>
                        <td>{index + 1}</td>
                        <td className="text-capitalize">{clients.name} {clients.readingStatus=="unread" ? (<Badge color="primary">New</Badge>) : null} </td>
                        <td>{clients.phone}</td>
                        <td>
                          <i class="far fa-eye" style={{marginRight: "20px"}}></i>
                          <i class="fas fa-trash-alt"></i>
                        </td>
                      </tr>
                    ))}
                    {
                      readInterior.length===0 ? 
                      <div>
                          <h4>No Data Found</h4>
                      </div>
                      : null
                    }
                </tbody>
                      </Table>
                      </Col>
                  </Row>
              </div>
              </Col>
              </Row>
          </TabPane>
          <TabPane tabId="4">
          <Row>
            <Col sm="12">
              <div className="mt-5">
                  <Row>
                      <Col sm="12" md="6" lg="6">
                      <h4>Plan</h4>
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
                    readPlan.filter(data=>data.name.toLowerCase().includes(search.toLowerCase())).map((clients,index)=>(
                      <tr>
                        <td>{index + 1}</td>
                        <td className="text-capitalize">{clients.name} {clients.readingStatus=="unread" ? (<Badge color="primary">New</Badge>) : null} </td>
                        <td>{clients.phone}</td>
                        <td>
                          <i class="far fa-eye" style={{marginRight: "20px"}}></i>
                          <i class="fas fa-trash-alt"></i>
                        </td>
                      </tr>
                    ))}
                    {
                      readPlan.length===0 ? 
                      <div>
                          <h4>No Data Found</h4>
                      </div>
                      : null
                    }
                </tbody>
                      </Table>
                      </Col>
                  </Row>
              </div>
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