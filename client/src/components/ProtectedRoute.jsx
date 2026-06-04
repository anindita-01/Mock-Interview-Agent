import React from "react"
import { Navigate, useLocation } from "react-router-dom"
import { useSelector } from "react-redux"

function ProtectedRoute({ children }) {
  const location = useLocation()
  const { authLoaded, userData } = useSelector((state) => state.user)

  if (!authLoaded) {
    return (
      <div className="min-h-screen app-shell flex items-center justify-center px-4">
        <div className="glass-panel rounded-lg px-6 py-4 text-gray-600 font-medium">
          Loading your session...
        </div>
      </div>
    )
  }

  if (!userData) {
    return <Navigate to="/auth" replace state={{ from: location }} />
  }

  return children
}

export default ProtectedRoute
