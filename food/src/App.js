import React, { useState } from 'react'
import { Amplify, API } from 'aws-amplify'
import { withAuthenticator, Button } from '@aws-amplify/ui-react'
import '@aws-amplify/ui-react/styles.css'
import './App.css'

Amplify.configure(window.app_config);

const App = ({ signOut, user }) => {
  const [food, setFood] = useState("No food yet?")

  const getFood = () => {
    console.log(user.signInUserSession.idToken.jwtToken)
    return API.get('training', "food", {
      headers: {
        Authorization: user.signInUserSession.idToken.jwtToken
      }
    }).then((data) => { setFood(data) })
  }
  return (
    <div className="App">
      <header className="App-header">        
        Identity Example      
      </header>

      <div >
        <p>Hello {user.attributes.email} <Button onClick={signOut}>Log out</Button></p>
        <Button onClick={() => { getFood() }}>Get food</Button>
        <p>{food}</p>
      </div>
    </div>
  )
}

export default withAuthenticator(App);