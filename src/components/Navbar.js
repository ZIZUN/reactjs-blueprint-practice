import React from 'react'
import { Link } from 'react-router-dom'

export default class Navbar extends React.Component{

  render(){
    return(
      <nav className="pt-navbar .modifier pt-dark">

        <div className="pt-navbar-group pt-align-left">
          <Link to="/"><div className="pt-navbar-heading">Retriver</div></Link>
        </div>
        <div className="pt-navbar-group pt-align-right">
          <Link to="/"><button className="pt-button pt-minimal pt-icon-log-in" >로그인</button></Link>
          <Link to="/signup"><button className="pt-button pt-minimal pt-icon-document">가입하기</button></Link>

        </div>
      </nav>
    )
  }
}
