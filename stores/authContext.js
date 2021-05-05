import { createContext, useState, useEffect } from 'react'
import netlifyIdentity from 'netlify-identity-widget'

let AuthContext = createContext({
  user: null,
  login: () => {},
  logout: () => {},
  authReady: false
})

export let AuthContextProvider = ( { children } ) => {
  let [user, setUser] = useState( null )

  useEffect( () => {

    netlifyIdentity.on( 'login', ( user ) => {
      setUser( user )
      netlifyIdentity.close()
      console.log( 'login event' );
    } )

    netlifyIdentity.init()
  }, [] )

  let login = () => {
    netlifyIdentity.open()
  }

  let context = { user, login }

  return(
    <AuthContext.Provider value={ context }>
      { children }
    </AuthContext.Provider>
  )
}

export default AuthContext