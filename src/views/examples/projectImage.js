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
} from "reactstrap";
// core components
import Header from "components/Headers/Header.js";
import * as http from '../../api/api'
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import classnames from 'classnames';
import { Component } from "react";

class projectImage extends Component{
    constructor(){
        super()
        this.state = {
          activeTab: '1',
          allSearch:'',
          projectList:[]
        };
       
    }
    componentDidMount(){
      this.getAllProjects()
    }
    getAllProjects = ()=>{
      http
      .adminGet("getAllProject")
      .then((resp) => resp.json())
      .then(data =>{
        console.log(data)
        })
    }
    toggle = (tab)=> {
      if (this.state.activeTab !== tab) {
        this.setState({
          activeTab: tab
        });
      }
    }
    searchChange = (event) =>{
      const target = event.target
      const name = target.name
      const value = target.value
      this.setState({
        [name]:value
      })
    }
    render(){
      const {projectList,allSearch}=this.state
      const baseUrl = http.url
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
                    <h3 className="mb-0">Project Images</h3>
                  </Col>
                  <Col className="text-right" xs="4">
                    <Button
                      color="primary"
                      size="sm"
                    >
                      Add Image
                    </Button>
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
              All
            </NavLink>
          </NavItem>
          <NavItem>
            <NavLink
              className={classnames({ active: this.state.activeTab === '2' })}
              onClick={() => { this.toggle('2'); }}
            >
              Interior
            </NavLink>
          </NavItem>
          <NavItem>
            <NavLink
              className={classnames({ active: this.state.activeTab === '3' })}
              onClick={() => { this.toggle('3'); }}
            >
              Exterior
            </NavLink>
          </NavItem>
          <NavItem>
            <NavLink
              className={classnames({ active: this.state.activeTab === '4' })}
              onClick={() => { this.toggle('4'); }}
            >
              Consultant
            </NavLink>
          </NavItem>
          <NavItem>
            <NavLink
              className={classnames({ active: this.state.activeTab === '5' })}
              onClick={() => { this.toggle('5'); }}
            >
              Plans
            </NavLink>
          </NavItem>
        </Nav>
        <TabContent activeTab={this.state.activeTab}>
          <TabPane tabId="1">
            <Row>
              <Col sm="12">
                <Row>
                  <Col md='6'>
                  <h4>All Project</h4>
                  </Col>
                  <Col md='6'>
                  <input className="form-control-alternative form-control" 
                  type="text" onChange={this.searchChange} 
                  placeholder="Search"
                  value={this.state.allSearch}
                  name="allSearch"
                   />
                  </Col>
                </Row>
              </Col>
            </Row>
            <Row>
              {
                projectList.map(projects =>{
                  <Col sm="12" md="4" lg="3" className="mt-3" key={projects.id}>
                                    <Card>
                                        <CardBody>
                                            <img alt={projects.name} src={baseUrl+projects.image} height="185" width="185" />
                                        </CardBody>
                                        <CardFooter>
                                            {projects.name}
                                        </CardFooter>
                                    </Card>
                                </Col>
                })
              }
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
export default projectImage;