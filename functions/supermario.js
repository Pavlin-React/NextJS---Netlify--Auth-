exports.handler = async () => {
  console.log( 'function run' );

  let data = { name: 'mario', age: 35, job: 'plumber' }

  // return response to browser

  return {
    statusCode: 200,
    body: JSON.stringify( data )
  }
}