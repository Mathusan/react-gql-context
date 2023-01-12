import { useEffect, useState } from 'react'

import useAuth  from '../hooks/useAuth'
import { useNavigate } from 'react-router-dom'
import useAxiosPrivate from '../hooks/usePrivateRoute'
import { useQuery , useMutation , useLazyQuery} from '@apollo/client'
import { GET_USER, REFRESH_TOKEN } from '../queries/userQueries'


export default function HomePage() {
  const [user,setUser] = useState<String>()

  const {auth,setAuth} = useAuth()
  const navigate = useNavigate()

  

  const [ privateRoute, {data,loading}] = useLazyQuery(GET_USER, {
    context:{
      headers: {
        "Authorization" : `Bearer ${auth.accessToken}`
      }
    },
      onError({graphQLErrors}){
      console.log("error",graphQLErrors[0].message)
    }
  })

  useEffect(()=>{
    if(auth.isLoggedIn){
      privateRoute()
      console.log('useeffect called ')
      setUser(data?.privateroute?.name)
    }
  },[])

  
  // const {  data } = useQuery(GET_USER, { 
  //   context:{
  //     headers :{
  //         "Authorization" : `Bearer ${auth.accessToken}`
  //     }
  //   },
  //   onError({graphQLErrors}){
  //     console.log("error",graphQLErrors[0].message)
      
  //   }
  //   }
  // )



  return (
    <>
    <div>
      <h3>
      Welcome
      </h3>
      <h3>
      {user}
      </h3>

    </div>
    </>
  )
}
