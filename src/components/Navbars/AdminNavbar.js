import React from "react";
import { Link } from "react-router-dom";
import * as http from  '../../api/api'
// reactstrap components
import {
  DropdownMenu,
  DropdownItem,
  UncontrolledDropdown,
  DropdownToggle,
  Form,
  FormGroup,
  InputGroupAddon,
  InputGroupText,
  Input,
  InputGroup,
  Navbar,
  Nav,
  Container,
  Media,
} from "reactstrap";


  class AdminNavbar extends React.Component{
    constructor(props){
      super(props)
      this.state={
        firstName:'',
        lastName:''
      }
    }
    
    logOut=()=>{
      const { match, location, history } = this.props
      localStorage.clear();
      history.push("/auth/login")
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
        firstName:profile.firstName,
          lastName:profile.lastName
      })
     })
     
     .catch(function (error) {
       console.log(error);
       return null;
     });
     
   }
    render(){
      return (
        <>
          <Navbar className="navbar-top navbar-dark" expand="md" id="navbar-main">
            <Container fluid>
              <Link
                className="h4 mb-0 text-white text-uppercase d-none d-lg-inline-block"
                to="/"
              >
                {this.props.brandText}
              </Link>
              <Form className="navbar-search navbar-search-dark form-inline mr-3 d-none d-md-flex ml-lg-auto">
                <FormGroup className="mb-0">
                  <InputGroup className="input-group-alternative">
                    <InputGroupAddon addonType="prepend">
                      <InputGroupText>
                        <i className="fas fa-search" />
                      </InputGroupText>
                    </InputGroupAddon>
                    <Input placeholder="Search" type="text" />
                  </InputGroup>
                </FormGroup>
              </Form>
              <Nav className="align-items-center d-none d-md-flex" navbar>
                <UncontrolledDropdown nav>
                  <DropdownToggle className="pr-0" nav>
                    <Media className="align-items-center">
                      <span className="avatar avatar-sm rounded-circle">
                        <img
                          alt="..."
                          src={
                            require("../../assets/img/theme/team-4-800x800.jpg")
                              .default
                          }
                        />
                      </span>
                      <Media className="ml-2 d-none d-lg-block">
                        <span className="mb-0 text-sm font-weight-bold">
                          {this.state.firstName} {this.state.lastName}
                        </span>
                      </Media>
                    </Media>
                  </DropdownToggle>
                  <DropdownMenu className="dropdown-menu-arrow" right>
                    <DropdownItem className="noti-title" header tag="div">
                      <h6 className="text-overflow m-0">Welcome!</h6>
                    </DropdownItem>
                    <DropdownItem to="/admin/user-profile" tag={Link}>
                      <i className="ni ni-single-02" />
                      <span>My profile</span>
                    </DropdownItem>
                    <DropdownItem to="/admin/user-profile" tag={Link}>
                      <i className="ni ni-settings-gear-65" />
                      <span>Settings</span>
                    </DropdownItem>
                    <DropdownItem to="/admin/user-profile" tag={Link}>
                      <i className="ni ni-calendar-grid-58" />
                      <span>Activity</span>
                    </DropdownItem>
                    <DropdownItem to="/admin/user-profile" tag={Link}>
                      <i className="ni ni-support-16" />
                      <span>Support</span>
                    </DropdownItem>
                    <DropdownItem divider />
                    <DropdownItem href="#pablo" onClick={this.logOut}>
                      <i className="ni ni-user-run" />
                      <span>Logout</span>
                    </DropdownItem>
                  </DropdownMenu>
                </UncontrolledDropdown>
              </Nav>
            </Container>
          </Navbar>
        </>
      );
    }
}

export default AdminNavbar;