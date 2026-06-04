import { useEffect } from "react"
import axios from "axios"
import { useDispatch } from "react-redux"
import { ServerUrl } from "../config/api"
import { setAuthLoaded, setUserData } from "../redux/userSlice"

function AuthSync() {
  const dispatch = useDispatch()

  useEffect(() => {
    const syncCurrentUser = async () => {
      try {
        const result = await axios.get(ServerUrl + "/api/auth/current-user")
        dispatch(setUserData(result.data))
      } catch (error) {
        if (error?.response?.status !== 401) {
          console.error("Failed to load current user:", error)
        }
        dispatch(setUserData(null))
      } finally {
        dispatch(setAuthLoaded(true))
      }
    }

    syncCurrentUser()
  }, [dispatch])

  return null
}

export default AuthSync
