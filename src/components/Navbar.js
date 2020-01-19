import React from 'react'
import { Link } from 'react-router-dom'
import logo from './logo1.png';
export default class Navbar extends React.Component{

  render(){
    return(
      <nav className="pt-navbar .modifier pt-dark">

        <div className="pt-navbar-group pt-align-left">
          <div className="pt-navbar-heading"><img style={{align:"left" , height:30}} src={logo} className="App-logo"  alt="logo"/></div>
          <div>Retriver</div>
        </div>
        <div className="pt-navbar-group pt-align-right">
          <Link to="/"><button className="pt-button pt-minimal pt-icon-log-in" >로그인</button></Link>
          <Link to="/signup"><button className="pt-button pt-minimal pt-icon-document">가입하기</button></Link>

        </div>
      </nav>
    )
  }
}
