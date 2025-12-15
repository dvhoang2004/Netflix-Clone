import React, { use, useState } from 'react'
import './Login.css'
import { logIn, signUp } from '../../firebase'
import logo from '../../assets/logo.png'
import netflix_spinner from '../../assets/netflix_spinner.gif'

const Login = () => {

  const [signState, setSignState] = useState('Sign In')

  const [userName, setUserName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState(''); 

  const [loading, setLoading] = useState(false);

  const userAuth = async (event) => {
    event.preventDefault();
    setLoading(true);
    if(signState === 'Sign In'){
      await logIn(email, password);
    }
    else {
      await signUp(userName, email, password);
    }
    setLoading(false);
  }

  return (
    loading ? <div className="login-spinner">
      <img src={netflix_spinner} alt="" />
    </div> :
    <div className='login'>
      <img src={logo} className='login-logo' alt="" />
      <div className="login-form">
        <h1>{signState}</h1>
        <form>
          {signState === 'Sign Up' ? 
          <input value={userName} onChange={(e) => {setUserName(e.target.value)}} 
          type="text" placeholder='User Name'/> : <></>}
          <input value={email} onChange={(e) => {setEmail(e.target.value)}} 
          type="email" placeholder='Email'/>
          <input value={password} onChange={(e) => {setPassword(e.target.value)}} 
          type="password" placeholder='Password'/>

          <button onClick={userAuth} type='submit'>{signState}</button>
          <div className="form-help">
            <div className="remember">
              <input type="checkbox"/>
              <label htmlFor="">Remember Me</label>
            </div>
            <p>Need help?</p>
          </div>
        </form>
        <div className="form-switch">
          {signState === 'Sign In' ? <p>
            New to Netflix?
            <span onClick={() =>{setSignState('Sign Up')}}>Sign Up</span>
          </p> : <p>
            Already have an account?
            <span onClick={() =>{setSignState('Sign In')}}>Sign In</span>
          </p>}
        </div>

      </div>
    </div>
  )
}

export default Login
