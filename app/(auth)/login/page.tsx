import { GeometricShapes } from '@/app/(public)/(home)/_components'
import { LoginForm } from './_components'

const Login = () => {
  return (
    <div>
      {/* Background geometric pattern */}
      <GeometricShapes />

      {/* Login form */}
      <div className='flex min-h-screen items-center justify-center'>
        <LoginForm />
      </div>
    </div>
  )
}

export default Login
