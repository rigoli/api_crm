import { useEffect, useState } from 'react'
import { useParams } from "react-router-dom"
import Spinner from '../components/Spinner'

const DetailsClient = () => {
  const [client, setClient]  = useState({})
  const [loading, setLoading] = useState(true)

  const { id } = useParams()

  useEffect(() => {
    setLoading(true)

    const getClientAPI = async () => {
      try {
        const url = `http://localhost:4000/clients/${id}`
        const response = await fetch(url)
        const result = await response.json()

        setClient(result);
      } catch (error) {
        console.log(error)
      }

      setLoading(false)
    }
    getClientAPI();
  }, [])

  const {name, email, phoneNumber, company, notes} = client

  return (
    loading ? <Spinner /> : 
      Object.keys(client).length === 0 ? 
      <p>No hay Resultados</p> : (
        <div>
          <h1 className='font-black text4xl text-blue-900'>Ver cliente: {name}</h1>
          <p className='mt-3'>Información del cliente.</p>

          <p className='text-4xl text-gray-600'>
            <span className='text-gray-800 uppercase font-bold'>Cliente: </span>
            {name}
          </p>
          <p className='text-2xl text-gray-600 mt-4'>
            <span className='text-gray-800 uppercase font-bold'>Email: </span>
            {email}
          </p>

          {phoneNumber && (
          <p className='text-2xl text-gray-600 mt-4'>
            <span className='text-gray-800 uppercase font-bold'>Telefono: </span>
            {phoneNumber}
          </p>
          )}

          {company && (
          <p className='text-2xl text-gray-600 mt-4'>
            <span className='text-gray-800 uppercase font-bold'>Empresa: </span>
            {company}
          </p>
          )}

          {notes && (
            <p className='text-2xl text-gray-600 mt-4'>
              <span className='text-gray-800 uppercase font-bold'>Notas: </span>
              {notes}
            </p>
          )}
      </div>
    )
  )
}

export default DetailsClient
