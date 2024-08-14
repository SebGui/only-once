const baseApi = 'http://localhost:3000/';
const config = {
  test: 'toto',
  accessTokenLenght: 64,
  userIdLength: 6,
  profileIdLength: 7,
  salt: 'rpYhu39483y43hfilew[q03-i0923uriuuhsfkhuw',
  uris: {
    // Base uri
    //base: 'http://localhost:3000/',
    getUsers: baseApi + 'users'
  }
}
export default config
