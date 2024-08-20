const baseApi = 'http://localhost:3000/';
const config = {
  title: 'Only Once',
  accessTokenLenght: 64,
  accessTokenExpires : '7d',
  userIdLength: 6,
  profileIdLength: 7,
  salt: 'rpYhu39483y43hfilew[q03-i0923uriuuhsfkhuw',
  emailTemplate : 'Hi Only-Once user, your new password is : $password',
  uris: {
    // Api calls
    // Users related
    getUsers: baseApi + 'users',
    getUser: baseApi + 'users?userID=',
    getUserByName: baseApi + 'users?login=',
    getUserByEmail: baseApi + 'users?email=',
    updateUsers: baseApi + 'users/',//json-server PATCH only seems to work on category/id format
    // Profile related
    getUserProfile: baseApi + 'profiles/'
  },
  SideNav: [
    {id: 1, name: 'Option 1', icon: 'fingerprint'},
    {id: 2, name: 'Option 2', icon: 'lock_open'},
    {id: 3, name: 'Option 3', icon: 'hotel_class'},
    {id: 4, name: 'Option 4', icon: 'collections_bookmark'},
    {id: 5, name: 'Option 5', icon: 'date_range'}
  ],
  Stats: [
    {id: 1, icon: 'monitoring', desc: 'How often you account has been viewed', amount:26},
    {id: 2, icon: 'trending_up', desc: 'How often your profile is downloaded', amount:12},
    {id: 3, icon: 'legend_toggle', desc: 'How often you appeared in searches', amount:56},
    {id: 4, icon: 'score', desc: 'Another stat description', amount:28},
    {id: 5, icon: 'download', desc: 'How often you account has been requested', amount:3}
  ]
  
}
export default config
