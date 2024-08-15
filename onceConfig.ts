const baseApi = 'http://localhost:3000/';
const config = {
  test: 'toto',
  accessTokenLenght: 64,
  userIdLength: 6,
  profileIdLength: 7,
  salt: 'rpYhu39483y43hfilew[q03-i0923uriuuhsfkhuw',
  emailTemplate : 'Hi Only-Once user, your new password is : $password',
  uris: {
    // Base uri
    //base: 'http://localhost:3000/',
    getUsers: baseApi + 'users',
    getUserByName: baseApi + 'users?login=',
    getUserByEmail: baseApi + 'users?email=',
    updateUsers: baseApi + 'users/',//json-server PATCH only seems to work on category/id format
  }
}
export default config
