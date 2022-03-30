import { Formik, Form, Field } from 'formik'
import React from 'react'
import { useNavigate } from 'react-router-dom';
import * as Yup from 'yup';
import Alert from './Alert';
import Spinner from './Spinner';

const FormClient = ({client, loading}) => {
  const navigate = useNavigate()

  const newClientSchema = Yup.object().shape({
    name: Yup.string()
              .min(3, 'El nombre es muy corto')
              .max(23, 'El nombre es muy largo')
              .required('El nombre del cliente es obligatorio'),
    company: Yup.string()
              .required('El Nombre de la empresa es obligatorio'),
    email: Yup.string()
              .email('El email no es correcto')
              .required('El e-mail es obligatorio'),
    phoneNumber: Yup.number()
              .positive('Número de telefono no válido')
              .integer('Número de telefono no válido')
              .typeError('El número no es valido'),
  })

  const handleSubmit = async (v) => {
    try {
      let response

      if(client.id) {
        const url = `http://localhost:4000/clients/${client.id}`
        response = await fetch(url, {
          method: 'PUT',
          body: JSON.stringify(v),
          headers: {
            'Content-Type': 'application/json'
          }
        })
      } else {
        const url = 'http://localhost:4000/clients'
        response = await fetch(url, {
          method: 'POST',
          body: JSON.stringify(v),
          headers: {
            'Content-Type': 'application/json'
          }
        })
      }

      const result = await response.json()
      if (result) {
        navigate('/clients')
      }
    } catch (error) {
      console.log(error);
    }
  }

  return (
    loading ? <Spinner /> : (
      <div className='bg-white mt-10 px-5 py-10 rounded-md shadow-md md:w-3/4 mx-auto'>
        <h1 className='text-gray-600 font-bold text-xl uppercase center'>
          {client?.name ? 'Editar Cliente' : 'Agregar Cliente'}
        </h1>

        <Formik
          initialValues = {{
            name: client?.name ?? "",
            company: client?.company ?? "",
            email: client?.email ?? "",
            phoneNumber: client?.phoneNumber ?? "",
            notes: client?.notes ?? "",
          }}
          enableReinitialize={true}
          onSubmit={ async(v, {resetForm}) => {
            await handleSubmit(v)

            resetForm()
          }}
          validationSchema={newClientSchema}
        >
          {({errors, touched}) => {
            return (
              <Form className="mt-10">
                <div className='mb-4'>
                  <label
                    className='text-gray-800'
                    htmlFor="name"
                  >Nombre: </label>
                  <Field 
                    id="name"
                    name="name"
                    type="text"
                    className="mt-2 block w-full p-3 bg-gray-50"
                    placeholder="Nombre del cliente"
                  />
                  {errors.name && touched.name ? (
                    <Alert>{errors.name}</Alert>
                  ) : null }
                </div>
                <div className='mb-4'>
                  <label
                    className='text-gray-800'
                    htmlFor="company"
                  >Empresa: </label>
                  <Field 
                    id="company"
                    name="company"
                    type="text"
                    className="mt-2 block w-full p-3 bg-gray-50"
                    placeholder="Nombre de la empresa del cliente"
                  />
                  {errors.company && touched.company ? (
                    <Alert>{errors.company}</Alert>
                  ) : null }
                </div>
                <div className='mb-4'>
                  <label
                    className='text-gray-800'
                    htmlFor="email"
                  >E-Mail: </label>
                  <Field 
                    id="email"
                    name="email"
                    type="email"
                    className="mt-2 block w-full p-3 bg-gray-50"
                    placeholder="Correo electronico del cliente"
                  />
                  {errors.email && touched.email ? (
                    <Alert>{errors.email}</Alert>
                  ) : null }
                </div>
                <div className='mb-4'>
                  <label
                    className='text-gray-800'
                    htmlFor="phoneNumber"
                  >Numero de teléfono: </label>
                  <Field 
                    id="phoneNumber"
                    name="phoneNumber"
                    type="tel"
                    className="mt-2 block w-full p-3 bg-gray-50"
                    placeholder="Numero de teléfono del cliente"
                  />
                  {errors.phoneNumber && touched.phoneNumber ? (
                    <Alert>{errors.phoneNumber}</Alert>
                  ) : null }
                </div>
                <div className='mb-4'>
                  <label
                    className='text-gray-800'
                    htmlFor="notes"
                  >Notas: </label>
                  <Field 
                    as="textarea"
                    id="notes"
                    name="notes"
                    type="text"
                    className="mt-2 block w-full p-3 bg-gray-50 h-35"
                    placeholder="Notas del cliente"
                  />
                  {errors.notes && touched.notes ? (
                    <Alert>{errors.notes}</Alert>
                  ) : null }
                </div>
    
                <input
                  type="submit"
                  value={client?.name ? 'Editar Cliente' : 'Agregar Cliente'}
                  className="mt-5 w-full bg-blue-800 p-3 text-white uppercase font-bold text-lg"
                />
              </Form>
            )
          }}
        </Formik>
      </div>
    )
  )
}

FormClient.defaultProps = {
  client: {},
  loading: false
}

export default FormClient
