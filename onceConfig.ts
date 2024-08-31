const baseApi = 'http://localhost:3000/';
const config = {
  title: 'Only Once',
  devMode : true,// For console.logs
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
    getUserProfile: baseApi + 'profiles/',
    updateUserProfile: baseApi + 'profiles/',
    // Summary related
    getUserSummary: baseApi + 'summaries/',
    addUserSummary: baseApi + 'summaries',
    updateUserSummary:  baseApi + 'summaries/',
    deleteUserSummary:  baseApi + 'summaries/',
    // Experience related
    getUserExperiences : baseApi + 'experiences/',
    getUserExperience: baseApi + 'experiences/',
    addUserExperience: baseApi + 'experiences',
    updateUserExperience:  baseApi + 'experiences/',
    deleteUserExperience:  baseApi + 'experiences/',
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
  ],
  companySize : [
    { label: 'Small (1 to 9)', value: '1'},
    { label: 'Medium (10 to 29)', value: '2'},
    { label: 'Large (30 to 49)', value: '3'},
    { label: 'Very large (50+)', value: '4' }
  ],
  companyType: [
    { label: 'Prefer not to say', value: '1'},
    { label: 'Any type', value: '2'},
    { label: 'Start-up', value: '3'},
    { label: 'Scale-up', value: '4' },
    { label: 'Large', value: '5' }
  ]
  
}
export default config
