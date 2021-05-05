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

    netlifyIdentity.on( 'logout', () => {
      setUser( null )
      console.log( 'logout event' );
    } )

    netlifyIdentity.init()

    return() => {
      netlifyIdentity.off( 'login' )
      netlifyIdentity.off( 'logout' )
    }

  }, [] )

  

  let login = () => {
    netlifyIdentity.open()
  }

  let logout = () => {
    netlifyIdentity.logout()
  }

  let context = { user, login, logout }

  return(
    <AuthContext.Provider value={ context }>
      { children }
    </AuthContext.Provider>
  )
}

export default AuthContext