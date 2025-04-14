import { Link } from 'react-router-dom'
import Layout from '../../Components/Layout'
import { useContext, useRef, useState } from 'react'
import { ShoppingCartContext } from '../../Context'

function SignIn() {
  const context = useContext(ShoppingCartContext)
  const [view, setView] = useState('user-info');
  const form = useRef(null);

  const account = localStorage.getItem('account');
  const parsedAccount = JSON.parse(account);

  /**
 * Determina si el usuario ya tiene una cuenta registrada,
 * validando tanto el almacenamiento local (`localStorage`) como
 * el estado global (contexto de la app).
 *
 * - `parsedAccount` representa la cuenta del usuario almacenada en localStorage (parseada con JSON.parse).
 * - `context.account` representa la cuenta cargada en el contexto global de React.
 *
 * La función considera que el usuario tiene cuenta si al menos uno
 * de los dos (localStorage o contexto) contiene información.
 *
 * @returns {boolean} `true` si el usuario tiene una cuenta registrada, `false` si no.
 */

  const noAccountInLocalStorage = parsedAccount ? Object.keys(parsedAccount).length === 0 : true;
  const noAccountInLocalState = context.account ? Object.keys(context.account).length === 0 : true;
  const hasUserAnAccount = !noAccountInLocalStorage || !noAccountInLocalState

  const createAnAccount = () => {
    const formData = new FormData(form.current)
    const data = {
      name: formData.get('name'),
      email: formData.get('email'),
      password: formData.get('password')
    }

    console.log(data)
  }

  const renderLogin = () => {
    return (
        <div className='flex flex-col w-80'>
          <p>
            <span className='font-light text-sm'>Email: </span>
            <span>{parsedAccount?.email}</span>
          </p>
          <p>
            <span className='font-light text-sm'>Password: </span>
            <span>{parsedAccount?.password}</span>
          </p>
          <Link
            to={"/"}
          >
            <button className='bg-black disabled:bg-black/40 text-white w-full rounded-lg py-3 mt-4 mb-2' disabled={!hasUserAnAccount}>
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
          defaultValue={parsedAccount?.name}
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
          defaultValue={parsedAccount?.email}
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
          defaultValue={parsedAccount?.password}
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