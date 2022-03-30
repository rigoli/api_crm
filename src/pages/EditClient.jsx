import { useEffect, useState } from 'react'
import { useParams } from "react-router-dom"
import FormClient from "../components/FormClient"

const EditClient = () => {
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

  return (
    <>
      <h1 className='font-black text4xl text-blue-900'>Editar cliente</h1>
      <p className='mt-3'>Utiliza este formulario para editar información de un cliente.</p>


      {client?.name ? (
        <FormClient 
          client={client}
          loading={loading}
        />
      ): <p>Cliente ID no válido</p>}
    </>
  )
}

export default EditClient
