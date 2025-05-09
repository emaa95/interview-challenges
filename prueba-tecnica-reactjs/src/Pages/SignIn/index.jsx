import { Link, Navigate } from 'react-router-dom'
import Layout from '../../Components/Layout'
import { useContext, useRef, useState } from 'react'
import { ShoppingCartContext } from '../../Context'
import { useAccount } from '../../hooks'

function SignIn() {
  const context = useContext(ShoppingCartContext)
  const [view, setView] = useState('user-info');
  const form = useRef(null);

  const {account, hasUserAnAccount} = useAccount();


/**
 * Maneja el proceso de inicio de sesión del usuario.
 *
 * - Actualiza el estado de sesión en `localStorage` y en el contexto global de la app.
 * - Establece que el usuario está autenticado (`sign-out: false`).
 * - Redirige automáticamente a la página principal (`/`) utilizando `react-router-dom`.
 *
 * ⚠️ Nota: Si se usa esta función desde un evento (como un botón),
 * se recomienda manejar la redirección mediante un estado (`useState`)
 * y renderizar el componente `<Navigate />` condicionalmente.
 *
 * @function handleSignIn
 * @returns {JSX.Element} Redirección a `/` si se llama desde un render.
 */

  const handleSignIn = () => {
   const stringifiedSignOut = JSON.stringify(false);
    localStorage.setItem('sign-out', stringifiedSignOut)
    context.setSignOut(false)

    return <Navigate replace to={'/'}/>
  }

  const createAnAccount = () => {
    const formData = new FormData(form.current)
    const data = {
      name: formData.get('name'),
      email: formData.get('email'),
      password: formData.get('password')
    }

    const stringifiedAccount = JSON.stringify(data)
    localStorage.setItem('account', stringifiedAccount)
    context.setAccount(data)

    handleSignIn()
  }

  const renderLogin = () => {
    return (
        <div className='flex flex-col w-80'>
          <p>
            <span className='font-light text-sm'>Email: </span>
            <span>{account?.email}</span>
          </p>
          <p>
            <span className='font-light text-sm'>Password: </span>
            <span>{account?.password}</span>
          </p>
          <Link
            to={"/"}
          >
            <button className='bg-black disabled:bg-black/40 text-white w-full rounded-lg py-3 mt-4 mb-2' disabled={!hasUserAnAccount}
             onClick={() => handleSignIn()}>
              Log in            
            </button>
          </Link>
          <div className='text-center'>
            <a className='font-light text-xs underline underline-offset-4' href='/'>Forgot my password</a>
          </div>
          <button className='border border-black disabled:text-black/40 disabled:border-black/40 rounded-lg mt-6 py-3' disabled={hasUserAnAccount}
            onClick={() => setView('create-user-info')}
          >
            Sign up
          </button>
        </div>
    )
  }

  const renderCreateUserInfo = () => {
    return (
    <form ref={form} className='flex flex-col gap-4 w-80'>
      <div className='flex flex-col gap-1'>
        <label htmlFor="name" className='font-light text-sm'>Your name: </label>
        <input 
          type="text" 
          id='name'
          name='name'
          defaultValue={account?.name}
          placeholder='Peter'
          className='rounded-lg border border-black placeholder:font-ligfht
          placeholder:text-sm placeholder:text-black/60 focus:outline-none py-2 px-4'   
        />
      </div>
      <div className='flex flex-col gap-1'>
        <label htmlFor="email" className='font-light text-sm'>Your email: </label>
        <input 
          type="text" 
          id='email'
          name='email'
          defaultValue={account?.email}
          placeholder='hi@helloworld.com'
          className='rounded-lg border border-black placeholder:font-ligfht
          placeholder:text-sm placeholder:text-black/60 focus:outline-none py-2 px-4'   
        />

      </div>
      <div className='flex flex-col gap-1'>
        <label htmlFor="password" className='font-light text-sm'>Your password: </label>
        <input 
          type="text" 
          id='password'
          name='password'
          defaultValue={account?.password}
          placeholder='*******'
          className='rounded-lg border border-black placeholder:font-ligfht
          placeholder:text-sm placeholder:text-black/60 focus:outline-none py-2 px-4'   
        />
        <Link to="/">
          <button className='bg-black text-white w-full rounded-lg py-3'
           onClick={() => createAnAccount()}>
           Create   
          </button>
        </Link>
      </div>
    </form>
    )
  } 

  const renderView = () => view === 'create-user-info' ? renderCreateUserInfo() : renderLogin()

  return (
    <Layout>
        <h1 className='font-medium text-xl text-center mb-6 w-80'>Welcome</h1>
        {renderView()}
    </Layout>
  )
  
}

export default SignIn