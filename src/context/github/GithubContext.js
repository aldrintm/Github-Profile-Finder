import { createContext, useReducer } from 'react'
import githubReducer from './GithubReducer'

const GithubContext = createContext()

const GITHUB_URL = process.env.REACT_APP_GITHUB_URL
const GITHUB_TOKEN = process.env.REACT_APP_GITHUB_TOKEN

export const GithubProvider = ({ children }) => {
  // Previously used with useState
  // const [users, setUsers] = useState([])
  // const [loading, setLoading] = useState(true)

  const initialState = {
    users: [],
    user: {},
    loading: false,
  }

  const [state, dispatch] = useReducer(githubReducer, initialState)

  // Get initial users; Use this for testing purposes on;ly
  // const fetchUsers = async () => {
  //   setLoading()

  //   const response = await fetch(`${process.env.REACT_APP_GITHUB_URL}/users`, {
  //     headers: {
  //       Authorization: `token ${process.env.REACT_APP_GITHUB_TOKEN}`,
  //     },
  //   })

  //   const data = await response.json()

  //   // Previously used with useState
  //   // setUsers(data)
  //   // setLoading(false)

  //   dispatch({
  //     type: 'GET_USERS',
  //     payload: data,
  //   })
  // }

  // Get Search Results
  const searchUsers = async (text) => {
    setLoading()

    const params = new URLSearchParams({ q: text })

    const response = await fetch(
      `${process.env.REACT_APP_GITHUB_URL}/search/users?${params}`,
      {
        headers: {
          Authorization: `token ${process.env.REACT_APP_GITHUB_TOKEN}`,
        },
      }
    )
    // if you check postman with the fetch api above we get an JSON object of results from data
    // we are only interested in the "items" array, so we need to just grab that
    // so instead of using "data", we can destructure items in data by using {items}
    // const data = await response.json()
    const { items } = await response.json()

    // Previously used with useState
    // setUsers(data)
    // setLoading(false)

    dispatch({
      type: 'GET_USERS',
      // payload: data, "this part too, since we no longer use data as var; we can replace it with items as destructured above"
      payload: items,
    })
  }

  // Get a Single User Page Result
  const getUser = async (login) => {
    setLoading()

    const response = await fetch(
      `${process.env.REACT_APP_GITHUB_URL}/users/${login}`,
      {
        headers: {
          Authorization: `token ${process.env.REACT_APP_GITHUB_TOKEN}`,
        },
      }
    )

    if (response.status === 404) {
      window.location = '/notfound'
    } else {
      const data = await response.json()

      dispatch({
        type: 'GET_USER',
        payload: data,
      })
    }
  }

  // Set loading
  const setLoading = () =>
    dispatch({
      type: 'SET_LOADING',
    })

  // Clear users from State
  const clearUsers = () =>
    dispatch({
      type: 'CLEAR_USERS',
    })

  return (
    <GithubContext.Provider
      value={{
        users: state.users,
        loading: state.loading,
        user: state.user,
        searchUsers,
        clearUsers,
        getUser,
      }}
    >
      {children}
    </GithubContext.Provider>
  )
}

export default GithubContext
