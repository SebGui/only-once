const baseApi = 'http://localhost:3000/';
const config = {
  title: 'Only Once',
  accessTokenLenght: 64,
  userIdLength: 6,
  profileIdLength: 7,
  salt: 'rpYhu39483y43hfilew[q03-i0923uriuuhsfkhuw',
  emailTemplate : 'Hi Only-Once user, your new password is : $password',
  uris: {
    // Api calls
    getUsers: baseApi + 'users',
    getUserByName: baseApi + 'users?login=',
    getUserByEmail: baseApi + 'users?email=',
    updateUsers: baseApi + 'users/',//json-server PATCH only seems to work on category/id format
  },
  SideNav: [
    {id: 1, name: 'Option 1', icon: 'fingerprint'},
    {id: 2, name: 'Option 2', icon: 'lock_open'},
    {id: 3, name: 'Option 3', icon: 'hotel_class'},
    {id: 4, name: 'Option 4', icon: 'collections_bookmark'},
    {id: 5, name: 'Option 5', icon: 'date_range'}
  ]
    
  
}
export default config
