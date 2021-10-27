import React from "react";
import {
  Button,
  Card,
  CardHeader,
  CardBody,
  FormGroup,
  Form,
  Input,
  Container,
  Row,
  Col,
  Spinner
} from "reactstrap";
// core components
import UserHeader from "components/Headers/UserHeader.js";
import { Component } from "react";
import * as http from  '../../api/api';
import { ToastContainer, toast } from 'react-toastify';

  class Profile extends Component{
    constructor(){
      super()
      this.state={
        id:'',
        firstName:'',
        lastName:'',
        email:'',
        phone:'',
        adminType:'',
        isLoading:false
      }
    }
    componentDidMount(){
      const { match, location, history } = this.props
      let token = localStorage.getItem("token");
    if(!token){
      history.push("/auth/login");
    }else{
      this.getProfile();
    }
  }
  getProfile = () =>{
    let profileId = (localStorage?.getItem("id")?.replace(/['"]+/g, ''))
   console.log(profileId)
      http
     .adminGet("myProfile?id="+profileId)
     .then((resp) => resp.json())
     .then(data=> {
       console.log("data", data);
       var profile = data.profile
       console.log(profile)
       this.setState({
         id:profile.id,
        firstName:profile.firstName,
          lastName:profile.lastName,
          email:profile.email,
          phone:profile.phone
      })
     })
     
     .catch(function (error) {
       console.log(error);
       return null;
     });
     
   }
   handleOnChange=(e)=>{
     const target=e.target
     const name=target.name
     const value=target.value
     this.setState({
       [name]:value
     })
     console.log(name)
     console.log(value)
   }
   handleSubmit=(event)=>{
    this.setState({
      isLoading:true
    })
    event.preventDefault()
    const profileData = {
      firstName:this.state.firstName,
        lastName:this.state.lastName,
        email:this.state.email,
        phone:this.state.phone,
        adminType:this.state.adminType,
        id:this.state.id
    }
    console.log(profileData)
    http 
    .adminPost(profileData,"updateAdmin?id="+profileData.id)
    .then((resp) => resp.json())
    .then(data=>{
      console.log(data)
      if(data.success){
        toast.success(data.message)
        this.getProfile()
        this.setState({
          isLoading:false
        })
      }else{
        toast.error(data.messege)
      }
    })
  }
    render(){
      return (
        <>
          <UserHeader />
          {/* Page content */}
          <Container className="mt--7" fluid>
            <ToastContainer/>
            <Row>
              <Col className="order-xl-2 mb-5 mb-xl-0" xl="4">
                <Card className="card-profile shadow">
                  <Row className="justify-content-center">
                    <Col className="order-lg-2" lg="3">
                      <div className="card-profile-image">
                        <a href="#pablo" onClick={(e) => e.preventDefault()}>
                          <img
                            alt="..."
                            className="rounded-circle"
                            src={
                              require("../../assets/img/theme/team-4-800x800.jpg")
                                .default
                            }
                          />
                        </a>
                      </div>
                    </Col>
                  </Row>
                  <CardHeader className="text-center border-0 pt-8 pt-md-4 pb-0 pb-md-4">
                    <div className="d-flex justify-content-between">
                      <Button
                        className="mr-4"
                        color="info"
                        href="#pablo"
                        onClick={(e) => e.preventDefault()}
                        size="sm"
                      >
                        Connect
                      </Button>
                      <Button
                        className="float-right"
                        color="default"
                        href="#pablo"
                        onClick={(e) => e.preventDefault()}
                        size="sm"
                      >
                        Message
                      </Button>
                    </div>
                  </CardHeader>
                  <CardBody className="pt-0 pt-md-4">
                    <Row>
                      <div className="col">
                        <div className="card-profile-stats d-flex justify-content-center mt-md-5">
                          <div>
                            <span className="heading">22</span>
                            <span className="description">Friends</span>
                          </div>
                          <div>
                            <span className="heading">10</span>
                            <span className="description">Photos</span>
                          </div>
                          <div>
                            <span className="heading">89</span>
                            <span className="description">Comments</span>
                          </div>
                        </div>
                      </div>
                    </Row>
                    <div className="text-center">
                      <h3>
                        Jessica Jones
                        <span className="font-weight-light">, 27</span>
                      </h3>
                      <div className="h5 font-weight-300">
                        <i className="ni location_pin mr-2" />
                        Bucharest, Romania
                      </div>
                      <div className="h5 mt-4">
                        <i className="ni business_briefcase-24 mr-2" />
                        Solution Manager - Creative Tim Officer
                      </div>
                      <div>
                        <i className="ni education_hat mr-2" />
                        University of Computer Science
                      </div>
                      <hr className="my-4" />
                      <p>
                        Ryan — the name taken by Melbourne-raised, Brooklyn-based
                        Nick Murphy — writes, performs and records all of his own
                        music.
                      </p>
                      <a href="#pablo" onClick={(e) => e.preventDefault()}>
                        Show more
                      </a>
                    </div>
                  </CardBody>
                </Card>
              </Col>
              <Col className="order-xl-1" xl="8">
                <Card className="bg-secondary shadow">
                  <CardHeader className="bg-white border-0">
                    <Row className="align-items-center">
                      <Col xs="8">
                        <h3 className="mb-0">My account</h3>
                      </Col>
                      <Col className="text-right" xs="4">
                        <Button
                          color="primary"
                          href="#pablo"
                          onClick={(e) => e.preventDefault()}
                          size="sm"
                        >
                          Settings
                        </Button>
                      </Col>
                    </Row>
                  </CardHeader>
                  <CardBody>
                    <Form onSubmit={this.handleSubmit}>
                      <h6 className="heading-small text-muted mb-4">
                        User information
                      </h6>
                      <div className="pl-lg-4">
                        <Row>
                          <Col lg="6">
                            <FormGroup>
                              <label
                                className="form-control-label"
                                htmlFor="input-username"
                              >
                                Mobile
                              </label>
                              <Input
                                className="form-control-alternative"
                                defaultValue={this.state.phone}
                                id="input-username"
                                placeholder="Username"
                                type="number"
                                name="phone"
                                value={this.state.phone}
                                onChange={this.handleOnChange}
                              />
                            </FormGroup>
                          </Col>
                          <Col lg="6">
                            <FormGroup>
                              <label
                                className="form-control-label"
                                htmlFor="input-email"
                              >
                                Email address
                              </label>
                              <Input
                                className="form-control-alternative"
                                defaultValue={this.state.email}
                                id="input-email"
                                placeholder="jesse@example.com"
                                type="email"
                                name="email"
                                value={this.state.email}
                                onChange={this.handleOnChange}
                              />
                            </FormGroup>
                          </Col>
                        </Row>
                        <Row>
                          <Col lg="6">
                            <FormGroup>
                              <label
                                className="form-control-label"
                                htmlFor="input-first-name"
                              >
                                First name
                              </label>
                              <Input
                                className="form-control-alternative"
                                
                                defaultValue={this.state.firstName}
                                id="input-first-name"
                                placeholder="First name"
                                type="text"
                                name="firstName"
                                value={this.state.firstName}
                                onChange={this.handleOnChange}
                              />
                            </FormGroup>
                          </Col>
                          <Col lg="6">
                            <FormGroup>
                              <label
                                className="form-control-label"
                                htmlFor="input-last-name"
                              >
                                Last name
                              </label>
                              <Input
                                className="form-control-alternative"
                                defaultValue={this.state.lastName}
                                id="input-last-name"
                                placeholder="Last name"
                                type="text"
                                name="lastName"
                                value={this.state.lastName}
                                onChange={this.handleOnChange}
                              />
                            </FormGroup>
                          </Col>
                        </Row>
                        <Row>
                          <Col lg="6">
                            <FormGroup>
                              <div>
                              {this.state.isLoading ? (
                    <Button
                    className="text-center"
                    color="primary"
                    disabled={true}
                    size="sm"
                  ><Spinner size="sm" color="dark" />
                    Update
                  </Button>
                      ) : (
                        <Button
                        className="text-center"
                        color="primary"
                        size="sm"
                      >
                        Update
                      </Button>
                      ) }
                              </div>
                            </FormGroup>
                          </Col>
                        </Row>
                      </div>
                      <hr className="my-4" />
                      {/* Address */}
                      <h6 className="heading-small text-muted mb-4">
                        Contact information
                      </h6>
                      <div className="pl-lg-4">
                        <Row>
                          <Col md="12">
                            <FormGroup>
                              <label
                                className="form-control-label"
                                htmlFor="input-address"
                              >
                                Address
                              </label>
                              <Input
                                className="form-control-alternative"
                                defaultValue="Bld Mihail Kogalniceanu, nr. 8 Bl 1, Sc 1, Ap 09"
                                id="input-address"
                                placeholder="Home Address"
                                type="text"
                              />
                            </FormGroup>
                          </Col>
                        </Row>
                        <Row>
                          <Col lg="4">
                            <FormGroup>
                              <label
                                className="form-control-label"
                                htmlFor="input-city"
                              >
                                City
                              </label>
                              <Input
                                className="form-control-alternative"
                                defaultValue="New York"
                                id="input-city"
                                placeholder="City"
                                type="text"
                              />
                            </FormGroup>
                          </Col>
                          <Col lg="4">
                            <FormGroup>
                              <label
                                className="form-control-label"
                                htmlFor="input-country"
                              >
                                Country
                              </label>
                              <Input
                                className="form-control-alternative"
                                defaultValue="United States"
                                id="input-country"
                                placeholder="Country"
                                type="text"
                              />
                            </FormGroup>
                          </Col>
                          <Col lg="4">
                            <FormGroup>
                              <label
                                className="form-control-label"
                                htmlFor="input-country"
                              >
                                Postal code
                              </label>
                              <Input
                                className="form-control-alternative"
                                id="input-postal-code"
                                placeholder="Postal code"
                                type="number"
                              />
                            </FormGroup>
                          </Col>
                        </Row>
                      </div>
                      <hr className="my-4" />
                      {/* Description */}
                      <h6 className="heading-small text-muted mb-4">About me</h6>
                      <div className="pl-lg-4">
                        <FormGroup>
                          <label>About Me</label>
                          <Input
                            className="form-control-alternative"
                            placeholder="A few words about you ..."
                            rows="4"
                            defaultValue="A beautiful Dashboard for Bootstrap 4. It is Free and
                            Open Source."
                            type="textarea"
                          />
                        </FormGroup>
                      </div>
                    </Form>
                  </CardBody>
                </Card>
              </Col>
            </Row>
          </Container>
        </>
      );
    }
  
}

export default Profile;
