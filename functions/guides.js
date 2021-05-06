exports.handler = async ( event, context ) => {
  let guides = [
    { title: 'Beat all Zelda Bosses like a boss', author: 'mario' },
    { title: 'Mario Kart schortcut you will never knew existed', author: 'luigi' },
    { title: 'Ultimate street fighter Guides', author: 'chung-li' }
  ]

  if ( context.clientContext.user ) {
    return {
      statusCode: 200,
      body: JSON.stringify( guides )
    }
  }

  return {
    statusCode: 401,
    body: JSON.stringify( { mssg: 'ah, ah, ah you must be logIn to see this'} )
  }
}
