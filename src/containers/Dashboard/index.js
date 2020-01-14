import React from 'react'
import Navbar from '../../components/Navbar'
import { AnchorButton, Button, Code, H5, Intent, Switch } from "@blueprintjs/core";
import { connect } from 'react-redux'
import {editAction} from '../../actions/editprofile'
import logo from './logo.svg';
import './App.css';

class Dashboard extends React.Component{
  onSubmit(){
    localStorage.removeItem('token')
    this.props.history.push('/')
  }
  onEdit(){
    this.props.history.push('/editprofile')
  }
  render(){
    console.log(this.props,'ppppp')
    return(


      <div style={{textAlign: 'center', backgroundColor: '#245541'}}>
      <div>
        <Navbar />
      </div>
      <div style={{marginTop:'150px'}}>
        <h1 style={{color: '#ffffff'}} >환영합니다.</h1>
        <button class="pt-button pt-intent-primary" style={{width: 400,height: '50px', marginTop:'50px'}} type="button"  onClick={this.onSubmit.bind(this)}>로그아웃</button><br /><br />
        <button class="pt-button pt-intent-primary" style={{width: 400,height: '50px'}} type="button"  onClick={this.onEdit.bind(this)}>프로필 수정</button>
        <div style={{backgroundColor: '#245541', height: 600}}/>
      </div>
    </div>
    )
  }
}
export default connect(
state => (
  {

  },
  mapDispatch
)
)(Dashboard)

const mapDispatch = dispatch => {
const allActionProps = Object.assign({}, dispatch)
return allActionProps
}
