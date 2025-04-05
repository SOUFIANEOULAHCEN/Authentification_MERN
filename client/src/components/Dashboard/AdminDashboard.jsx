import { useContext } from 'react'
import { AuthContext } from '../../context/AuthContext'

const AdminDashboard = () => {
  const { user, logout } = useContext(AuthContext)

  return (
    <div className="max-w-2xl mx-auto mt-10 bg-white p-8 rounded-lg shadow-md">
      <h1 className="text-3xl font-bold mb-6 text-center">Admin Dashboard</h1>
      {user && (
        <div className="space-y-4">
          <p className="text-lg">
            Welcome, <span className="font-semibold">{user.username}</span>!
          </p>
          <p className="text-lg">
            Email: <span className="font-semibold">{user.email}</span>
          </p>
          <p className="text-lg">
            Role: <span className="font-semibold capitalize">{user.role}</span>
          </p>
          <button
            onClick={logout}
            className="mt-6 bg-red-500 text-white py-2 px-4 rounded-lg hover:bg-red-600 transition duration-200"
          >
            Logout
          </button>
        </div>
      )}
    </div>
  )
}

export default AdminDashboard