import React from 'react'
import "./Header.css"
import {Link} from 'react-router-dom'
import {auth} from '../../config/firebaseConfig'
import {useAuthState} from 'react-firebase-hooks/auth'
import {signOut} from 'firebase/auth'
import {useNavigate} from 'react-router-dom'

function Header() {
    const navigate = useNavigate();
    //get user data
  const [user] = useAuthState(auth);

  const signout = () =>{
    signOut(auth)
    navigate('/')

  }

  return (
    <div className="header-container">
        <Link className="logo" to="/">
            LEARNING LOG
        </Link>
        {
            user?
            <div>
                <span className="username">
              {user.displayName?user.displayName : user.email}
              </span>
            <button className="auth-link" onClick={signout}>Logout</button>
            </div>
            :
        <Link className="auth-link" to="/auth">Signup</Link>
        }
    </div>
  )
}

export default Header