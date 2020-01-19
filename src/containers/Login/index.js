import React from 'react';
import Navbar from '../../components/Navbar'
import { connect } from 'react-redux'
import {loginAction} from '../../actions/login'
import {IsValidForm} from '../../components/validation'
import { AnchorButton, Button, Code, H5, Intent, Switch } from "@blueprintjs/core";
import logo from './logo1.png';
import google_login from './google_login.png';
import './App.css';

class Login extends React.Component{
  constructor(props){
    super(props);
    this.state = {
      login: {
        email: '',
        password: ''
      },
      errors:{},
      errorMsg: ''
    }
  }
  onChange(key,event){
    const { login } = this.state
    login[key] = event.target.value
    this.setState({ login })
  }
  onSubmit(e){
      e.preventDefault();
      let fields = ['email', 'password']
       let formValidation = IsValidForm(fields, this.state.login)
       this.setState({ errors: formValidation.errors, errorMsg: '' })
       if (formValidation.validate) {
       this.props.dispatch(loginAction(this.state.login)).then(res=>{
         if (!res.token) {
          this.setState({errorMsg: res.message})
         }
         else{
           this.setState({errorMsg: ''})
           this.props.history.push('/dashboard')
         }
       })
     }
  }
  showError(key) {
     let errors = this.state.errors
     if (errors[key] && errors[key].length) {
       return true
     }
     return false
   }
   getError(key) {
     let errors = this.state.errors
     if (errors[key] && errors[key].length) {
       return typeof errors[key] === 'object' ? errors[key].join(',') : errors[key]
     }
     return false
   }
  render(){


    return(
      <div style={{backgroundColor: '#ffffff'}}  >

        <div>
          <Navbar />
        </div>

        <form className="aform" style={{ backgroundColor: '#f8f361'}}  onSubmit={this.onSubmit.bind(this)}>
          <img style={{ margin: '0 auto', marginTop:'40px' }} src={logo} className="App-logo"  alt="logo" />


            <div style={{marginTop:'40px', height: '50px'}}>
              <input className="pt-input" style={{width: "250px",height: '30px'}}  placeholder="아이디" type="text" dir="auto" onChange={this.onChange.bind(this,'email')}/>
              {!!this.showError('email') ? <p className="error-message">{this.getError('email')} </p> : null}
            </div>
            <div style={{height: '50px'}}>
              <input className="pt-input" style={{width: "250px",height: '30px'}} placeholder="비밀번호" type="password" dir="auto" onChange={this.onChange.bind(this,'password')}/>
              {!!this.showError('password') ? <p className="error-message">{this.getError('password')} </p> : null}
            </div>
            <button class="pt-button pt-intent-primary" style={{ width: 250,height: '30px'}} type="submit" >로그인</button>
            <button class="pt-button pt-intent-primary" style={{ marginTop:10, width: 250,height: '50px'}}><img style={{ width: 250,height: '50px'}} src={google_login}/></button>
            {this.state.errorMsg != '' && <p className="error-message" style={{textAlign: 'center',  marginTop: 20}}>{this.state.errorMsg}</p>}
            <div style={{ height: '30px'}}/>



        </form>
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
)(Login)

const mapDispatch = dispatch => {
const allActionProps = Object.assign({}, dispatch)
return allActionProps
}
