"use client"
import { useState, useEffect } from 'react'
import Head from "next/head";
import { getCurrentVoting } from '@/services/Web3Service';
import { useRouter } from 'next/navigation'

export default function Vote() {
  const DEFAULT_OPTION = {name: "Loading...", image: "https://imgs.search.brave.com/cTr-V99qB5EjDLzTBILG5Af8PFNeP_WUukmTVxEbERs/rs:fit:500:0:0/g:ce/aHR0cHM6Ly9lbi5w/aW1nLmpwLzA1NS8z/NjEvNjY2LzEvNTUz/NjE2NjYuanBn"}

  const [message, setMessage] = useState("")
  const [voting, setVoting] = useState({ maxDate: Date.now() })
  const [option1, setOption1] = useState(DEFAULT_OPTION)
  const [option2, setOption2] = useState(DEFAULT_OPTION)
  const [showVotes, setShowVotes] = useState(0)


  const { push } = useRouter()


  useEffect(() => {
    if (!localStorage.getItem('wallet')) push('/home')

    getCurrentVoting()
    .then(voting => {
        console.log(voting)
        setVoting(voting)
        setOption1(getOption(voting.option1))
        setOption2(getOption(voting.option2))
    })
    .catch(err => {
        console.error(err)
        setMessage(err.message)
    })
  }, [])
  

  function getOption(option) {
    switch(option) {
      case "Luiz":
        return { name: "LuizTools", image: ""}
      case "Monica":
        return { name: "Monica", image: ""}
      default: 
        return DEFAULT_OPTION
    }
  }

  function btnVote2Click() {

  }

  function btnVote1Click() {

  }

  return (
    <>
      <Head>
        <title>Webbb3 | Vote</title>
        <meta charSet="UTF-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
      </Head>
      <div className="container col-xxl-8 px-4">
        <div className='row align-items-cente'>
            <h1 className="display-5 fw-bold text-bold-emphasis lh-1 mb-3">Webbb3</h1>
            <p className="lead">Votação on-chain BBB.</p>
            {
                voting.maxDate > (Date.now() / 1000)
                ? <p className='mb-3'>Você tem até {new Date(Number(voting.maxDate) * 1000).toString()} para deixar seu voto em um dos participantes abaixo para que ele saia do programa </p> 
                : <p>Votação encerrada! Confira abaixo os resultos.</p>
            }
        </div>
        <div className="row flex-lg-row-reverse align-items-center g-1 py-5">
            <div className='col-1'></div>
            <div className='col-5'>
                <h3 className='my-2 mx-auto d-block' style={{ width: 250 }}>
                    {voting.option2}
                </h3>
                <img src={option2.image}className='d-block mx-auto img-fluid rounded' width={{ width: 250 }}/>
                { 
                  showVotes > 0 ||   voting.maxDate < (Date.now() / 1000)
                  ? <button className='btn btn-secondary p-3 my-2 d-block mx-auto' style={{ width: 250 }}
                  disabled={true} >{showVotes === 2 ? Number(voting.votes2) + 1 : Number(voting.votes2)}</button>
                  : <button className='btn btn-primary p-3 my-2 d-block mx-auto' style={{ width: 250 }} onClick={() => btnVote2Click()}> Quero que saia esse</button>
                }
            </div>
            <div className='col-5'>
                <h3 className='my-2 mx-auto d-block' style={{ width: 250 }}>
                    {voting.option1}
                </h3>
                <img src={option1.image}className='d-block mx-auto img-fluid rounded' width={{ width: 250 }}/>
                { 
                  showVotes > 0 ||   voting.maxDate < (Date.now() / 1000)
                  ? <button className='btn btn-secondary p-3 my-2 d-block mx-auto' style={{ width: 250 }}
                  disabled={true} >{showVotes === 1 ? Number(voting.votes1) + 1 : Number(voting.votes1)}</button>
                  : <button className='btn btn-primary p-3 my-2 d-block mx-auto' style={{ width: 250 }} onClick={() => btnVote1Click()}> Quero que saia esse</button>
                }
            </div>
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
