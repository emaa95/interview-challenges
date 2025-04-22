import React, { useContext, useRef, useState } from 'react'
import Layout from '../../Components/Layout'
import { ShoppingCartContext } from '../../Context';
import { useAccount } from '../../hooks';

function MyAccount() {
  const context = useContext(ShoppingCartContext);
  const [view, setView] = useState("user-info")
  const {account} = useAccount();

  const form = useRef(null)

  const editAccount = () => {
    const formData = new FormData(form.current)
      const data = {
        name: formData.get('name'),
        email: formData.get('email'),
        password: formData.get('password')
      }
    
    const stringifiedAccount = JSON.stringify(data)
    localStorage.setItem('account', stringifiedAccount)
    context.setAccount(data)
  }

  const renderUserIngo = () => {
    return (
      <div className='flex flex-col w-80'>
        <p>
          <span className='font-light text-sm'>Name: </span>
          <span>{account?.name}</span>
        </p>
        <p>
          <span className='font-light text-sm'>Email: </span>
          <span>{account?.email}</span>
        </p>
        <button className='border border-black rounded-lg mt-6 py-3' onClick={() => setView('edit-user-info')}>
          Edit
        </button>
      </div>
    )
  }

  const renderEditUserInfo = () => {
    return(
      <form ref={form} className='flex flex-col gap-4 w-80'>
      <div className='flex flex-col gap-1'>
        <label htmlFor="name" className='font-light text-sm'>Your name:</label>
        <input
          type="text"
          id="name"
          name="name"
          defaultValue={account.name}
          placeholder="Peter"
          className='rounded-lg border border-black placeholder:font-light placeholder:text-sm placeholder:text-black/60 focus:outline-none py-2 px-4'
        />
      </div>
      <div className='flex flex-col gap-1'>
        <label htmlFor="email" className='font-light text-sm'>Your email:</label>
        <input
          type="text"
          id="email"
          name="email"
          defaultValue={account.email}
          placeholder="hi@helloworld.com"
          className='rounded-lg border border-black placeholder:font-light placeholder:text-sm placeholder:text-black/60 focus:outline-none py-2 px-4'
        />
      </div>
      <div className='flex flex-col gap-1'>
        <label htmlFor="password" className='font-light text-sm'>Your password:</label>
        <input
          type="text"
          id="password"
          name="password"
          defaultValue={account.password}
          placeholder="******"
          className='rounded-lg border border-black placeholder:font-light placeholder:text-sm placeholder:text-black/60 focus:outline-none py-2 px-4'
        />
      </div>
      <button
        className='bg-black text-white w-full rounded-lg py-3'
        onClick={() => {setView('user-info'), editAccount()}}>
        Edit
      </button>
    </form>
  )
}

const renderView = () => view === 'edit-user-info' ? renderEditUserInfo() : renderUserIngo()
    
  return (
    <Layout>
      <h1 className='font-medium text-xl text-center mb-6 2-80'>My Account</h1>
      {renderView()}
    </Layout>
  )
}

export default MyAccount