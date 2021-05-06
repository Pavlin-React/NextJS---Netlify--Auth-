import { useContext, useEffect, useState } from 'react'
import AuthContext from '../stores/authContext'
import styles from '../styles/Guides.module.css'

export default function Guides() {

  let { user, authReady } = useContext( AuthContext )
  let [guides, setGuides] = useState( null )
  let [error, setError] = useState( null )
  

  useEffect( () => {
    if ( authReady ) {
      fetch( '/.netlify/functions/guides', user && {
        headers: {
          Authorization: 'Bearer ' + user.token.access_token
        }
      } )
        .then( res => {
          console.log( res );
        } )
        .then( data => console.log( data ) )
    }
    
  }, [user, authReady] )

  return (
    <div className={styles.guides}>
      <h2>All Guides</h2>
    </div> 
  )
}