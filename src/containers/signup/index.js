
import React from 'react';
import Navbar from '../../components/Navbar'
import { connect } from 'react-redux'
import {signupAction} from '../../actions/signup'
import {IsValidForm} from '../../components/validation'
class Signup extends React.Component{
  constructor(){
    super();
    this.state = {
      signup: {
        username: '',
        email: '',
        password: '',
        confirm_password: ''
      },
      errors:{},
      errorMsg: '',
      serverMsg: ''
    }
  }
  onChange(key,event){
    const { signup } = this.state
    signup[key] = event.target.value
    this.setState({ signup })
  }
  validateEmail(email) {
    var re = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;
    return re.test(email);
  };
  onSubmit(e){
    e.preventDefault();
    let {signup} = this.state;
    let fields = ['username', 'email', 'password', 'confirm_password']
     let formValidation = IsValidForm(fields, signup)
     this.setState({ errors: formValidation.errors, errorMsg: '', serverMsg: '' })
     if (formValidation.validate) {
      let emailValidate = this.validateEmail(signup.email)
      let {errors} = this.state;
        if (signup.password != signup.confirm_password) {
          errors['confirm_password'] = "비밀번호가 일치하지 않습니다.";
          this.setState({ errors })
        }
        else if(!emailValidate){
          errors['email'] = "이메일 형식으로 기입해주세요.";
          this.setState({ errors })
        }
        else{
           this.props.dispatch(signupAction(this.state.signup)).then(res=>{
             if (res.status == 200) {
                signup = {username: '', email: '', password: '', confirm_password: ''}
                this.setState({signup, serverMsg: ''});
                this.props.history.push('/')
             }
             else{
              this.setState({serverMsg: res.message})
             }
           })
        }
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
      <div style={{backgroundColor: '#245541'}}>
        <div>
          <Navbar />
        </div>
        <form onSubmit={this.onSubmit.bind(this)}>
          <div style={{width: '500px',margin: '0 auto',marginTop: '200px',padding: '50px'}}>
            <div style={{height: '70px'}}>
              <input className="pt-input" style={{width: "400px",height: '50px'}} placeholder="성명" type="text" dir="auto" onChange={this.onChange.bind(this,'username')}/>
              {!!this.showError('username') ? <p className="error-message">{this.getError('username')} </p> : null}
            </div>
            <div style={{height: '70px'}}>
              <input className="pt-input" style={{width: "400px",height: '50px'}} placeholder="아이디" type="text" dir="auto" onChange={this.onChange.bind(this,'email')}/>
              {!!this.showError('email') ? <p className="error-message">{this.getError('email')} </p> : null}
            </div>
            <div style={{height: '70px'}}>
              <input className="pt-input" style={{width: "400px",height: '50px'}} placeholder="비밀번호" type="password" dir="auto" onChange={this.onChange.bind(this,'password')}/>
              {!!this.showError('password') ? <p className="error-message">{this.getError('password')} </p> : null}
            </div>
            <div style={{height: '70px'}}>
              <input className="pt-input" style={{width: "400px",height: '50px'}} placeholder="비밀번호 확인" type="password" dir="auto" onChange={this.onChange.bind(this,'confirm_password')}/>
              {!!this.showError('confirm_password') ? <p className="error-message">{this.getError('confirm_password')} </p> : null}
            </div >
            <button style={{width: 400,height: '50px'}} type="submit"  class="pt-button pt-intent-primary">가입하기</button>
            {this.state.serverMsg != '' && <p className="error-message" style={{textAlign: 'center', marginTop: 20}}>{this.state.serverMsg}</p>}
          </div>
        </form>
        <div style={{backgroundColor: '#245541', height: 300}}/>
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
)(Signup)

const mapDispatch = dispatch => {
const allActionProps = Object.assign({}, dispatch)
return allActionProps
}
