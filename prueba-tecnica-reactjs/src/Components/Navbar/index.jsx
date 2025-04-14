import { useContext } from 'react'
import { NavLink } from 'react-router-dom'
import { ShoppingBagIcon } from '@heroicons/react/24/solid'
import { ShoppingCartContext } from '../../Context'

const Navbar = () => {
  const context = useContext(ShoppingCartContext)
  const activeStyle = 'underline underline-offset-4'

  // Sign out 

  //Recupera el valor de la clave 'sign-out' guardada en el navegador.
  const signOut = localStorage.getItem('sign-out');

  //Convierte ese string en su valor real: true o false como booleano.
  const parsedSignOut = JSON.parse(signOut);

  //Determina si el usuario está desconectado.
  const isUserSignOut = context.signOut || parsedSignOut;

  /**
 * Cierra la sesión del usuario.
 *
 * - Guarda el valor `true` en `localStorage` bajo la clave `'sign-out'`.
 * - Actualiza el estado global (`context`) para reflejar que el usuario ha cerrado sesión.
 *
 * Esto permite que:
 * - La aplicación reaccione inmediatamente al cierre de sesión.
 * - El estado de "sign out" persista incluso tras recargar la página.
 *
 * @returns {void}
 */

  const handleSignOut = () => {
    const stringifiedSignOut = JSON.stringify(true);

    localStorage.setItem('sign-out', stringifiedSignOut);

    context.setSignOut(true)

  }

  const renderView = () => {
    if (isUserSignOut) {
      return (
        <li>
          <NavLink
            to="/sign-in"
            className={({ isActive }) => isActive ? activeStyle : undefined }
            onClick={() => handleSignOut()}>
            Sign out
          </NavLink>
        </li>
      )
    } else {
      return (
        <>
          <li className='text-black/60'>
            teff@platzi.com
          </li>
          <li>
            <NavLink
              to='/my-orders'
              className={({ isActive }) => isActive ? activeStyle : undefined}>
              My Orders
            </NavLink>
          </li>
          <li>
            <NavLink
              to='/my-account'
              className={({ isActive }) => isActive ? activeStyle : undefined}>
              My Account
            </NavLink>
          </li>
          <li>
            <NavLink
              to='/sign-in'
              className={({ isActive }) => isActive ? activeStyle : undefined}
              onClick={() => handleSignOut()}>
              Sign out
            </NavLink>
          </li>
        </>
      )
    }
  }

  return (
    <nav className='flex justify-between items-center fixed z-10 top-0 w-full py-5 px-8 text-sm font-light bg-white'>
      <ul className='flex items-center gap-3'>
        <li className='font-semibold text-lg'>
          <NavLink 
            to='/'
            onClick={() => context.setSearchByCategory()}
          >
            SHOPI
          </NavLink>
        </li>
        <li>
          <NavLink
            to='/'
            onClick={() => context.setSearchByCategory()}
            className={({ isActive }) =>
              isActive ? activeStyle : undefined
            }>
            All
          </NavLink>
        </li>
        <li>
          <NavLink
            to='/clothing'
            onClick={() => context.setSearchByCategory('clothing')}
            className={({ isActive }) =>
              isActive ? activeStyle : undefined
            }>
            Clothing
          </NavLink>
        </li>
        <li>
          <NavLink
            to='/electronics'
            onClick={() => context.setSearchByCategory('electronics')}
            className={({ isActive }) =>
              isActive ? activeStyle : undefined
            }>
            Electronics
          </NavLink>
        </li>
        <li>
          <NavLink
            to='/men'
            onClick={() => context.setSearchByCategory('men')}
            className={({ isActive }) =>
              isActive ? activeStyle : undefined
            }>
            Men
          </NavLink>
        </li>
        <li>
          <NavLink
            to='/women'
            onClick={() => context.setSearchByCategory('women')}
            className={({ isActive }) =>
              isActive ? activeStyle : undefined
            }>
            Women
          </NavLink>
        </li>
        <li>
          <NavLink
            to='/jewelery'
            onClick={() => context.setSearchByCategory('jewelery')}
            className={({ isActive }) =>
              isActive ? activeStyle : undefined
            }>
            Jewelery
          </NavLink>
        </li>
      </ul>
      <ul className='flex items-center gap-3'>
        {renderView()}
        <li className='flex items-center'>
          <ShoppingBagIcon className='h-6 w-6 text-black'></ShoppingBagIcon>
          <div>{context.cartProducts.length}</div>
        </li>
      </ul>
    </nav>
  )
}

export default Navbar