"use client"
import { useState } from 'react'
import Head from "next/head";
import { doLogin } from '@/services/Web3Service';
import { useRouter } from 'next/navigation'

export default function Home() {
  const [message, setMessage] = useState("")
  const { push } = useRouter()
  
  function btnLoginClick(){ 
    doLogin()
    .then(account => push('/vote'))
    .catch(err => {
      console.error(err)
      setMessage(err.message)
    })
  }

  return (
    <>
      <Head>
        <title>Webbb3 | Login</title>
        <meta charSet="UTF-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
      </Head>
      <div className="container col-xxl-8 px-4">
        <div className="row flex-lg-row-reverse align-items-center g-5 py-5">
          <div className="col-10 col-sm-8 col-lg-6">
            <img src="https://imgs.search.brave.com/KHitrpVD-SOnQcqt91YjKgbAfJHK6xixw9BiXb7C4oA/rs:fit:860:0:0/g:ce/aHR0cHM6Ly9pMS53/cC5jb20vd3d3LmRj/aS5jb20uYnIvd3At/Y29udGVudC91cGxv/YWRzLzIwMjEvMTIv/YmJiLTIwMjIuanBn" 
            className="d-block mx-lg-auto img-fluid" width="700" height="500" />
          </div>

          <div className="col-lg-6">
            <h1 className="display-5 fw-bold text-bold-emphasis lh-1 mb-3">Webbb3</h1>
            <p className="lead">Votação on-chain BBB.</p>
            <p className="p mb-3">Autentique-se com sua carteira, e deixe seu voto para o próximo paredão</p>
            <div className="d-grid gap-2 d-md-flex justify-content-md-start"></div>
            <button type="button" onClick={() => btnLoginClick()} className="btn btn-primary btn-lg px-4 me-md-2">
              <img src="https://imgs.search.brave.com/vtUfy4GTM08VwVCFcxjBsl3mER_ox0JF1bCJEYaWHAY/rs:fit:860:0:0/g:ce/aHR0cHM6Ly9icmFu/ZGVwcy5jb20vbG9n/by1kb3dubG9hZC9N/L01ldGFtYXNrLWxv/Z28tdmVjdG9yLTAx/LnN2Zw.svg" 
              width="64" className="me-3" />
              Conectar com a MetaMask
            </button>
          </div>
          <p className='message'>{message}</p>
        </div>
        <footer className="d-flex flex-wrap justify-content-between align-items-center py-3 my-4 border-top">
          <p className="col-md-4 mb-0 text-body-secondary">&copy; 2024 Webbb3, Inc</p>
          <ul className='nav col-md-4 justify-content-end'>
            <li className='nav-item'><a href="/" className='nav-link px-2 text-body-secondary'>Home</a></li>
            <li className='nav-item'><a href="/about" className='nav-link px-2 text-body-secondary'>About</a></li>
          </ul>
        </footer>
      </div>
    </>
  );
}
