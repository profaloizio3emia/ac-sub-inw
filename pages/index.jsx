import Head from 'next/head'
import { useState,useEffect} from 'react'

//importar a config do firebase
import { app, database } from '../services/firebase'
import { collection,addDoc, getDocs } from 'firebase/firestore';

//configurar o Firebase do projeto
const contato = collection(database,'contato')

export default function Home() {

  const [nome, setNome] = useState('')
  const [email, setEmail] = useState('')
  const [telefone, setTelefone] = useState('')
  const [mensagem,setMensagem]=useState('')

  const cadastrar = ()=>{
    addDoc(contato,
      { nome:nome,
        email:email,
        telefone:telefone,
        mensagem:mensagem
      }
      ).then(()=>{
        setNome('')
        setEmail('')
        setTelefone('')
        setMensagem('')
        read()
      })
  }

  const [contatoLista,setContatoLista] = useState([])
  const read = ()=>{
    getDocs(contato)
    .then((data)=>{
      setContatoLista(data.docs.map((item)=>{
        return{...item.data(), id:item.id}
      }))
    })
  }

  useEffect(()=>{
    read()
  },[])

  return (
    <>
      <Head>
        <title>Crud Simples com Firestore</title>
      </Head>
      <main className='container'>
      <div className="row">
        <div className="col-lg">
          <h3 className='text-center'>CADASTRAR</h3>
      <input type="text" name="nome" placeholder='Nome' className='form-control' id="" required onChange={event=>setNome(event.target.value)} value={nome} />
        <input type="email" name="email" placeholder='Email' className='form-control' id="" required onChange={event=>setEmail(event.target.value)} value={email} />
        <input type="tel" name="telefone" placeholder='Telefone' className='form-control' id="" required onChange={event=>setTelefone(event.target.value)} value={telefone} />
        <textarea name="mensagem" className='form-control' placeholder='Mensagem' id="" onChange={event=>setMensagem(event.target.value)} value={mensagem} ></textarea>
        <input type="submit" value="SALVAR" onClick={cadastrar} className='form-control btn btn-outline-dark' />
      </div>
      <div className="col-lg">
        <h3 className='text-center'>GRAVADOS</h3>
        {contatoLista.map((lista)=>{
          return(
            <div className='card'>
              <div className="card-header bg-dark text-light">{lista.nome}</div>
              <div className='card-body'>
              <p className='card-subtitle'>{lista.email}</p>
              <p className='card-subtitle'>{lista.telefone}</p>
              <p className='card-text'>{lista.mensagem}</p>
              </div>
              <div className='card-footer text-center'>
              <div className="input-group">
              <input type="button" className='btn-outline-warning form-control' value="Alterar" />
              <input type="button" className='btn-outline-danger form-control' value="Excluir" />  
              </div>
              </div>

              </div>
            
          )
        })}
      </div>
      </div>
    </main>
        </>
  )
}
