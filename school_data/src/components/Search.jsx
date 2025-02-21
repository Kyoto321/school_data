import React, { useEffect, useState } from 'react'

const Search = () => {

    const [name, setName] = useState('')
    const [email, setEmail] = useState('')

    const [age, setAge] = useState('')
    const [state, setState] = useState('')
    const [level, setLevel] = useState('')
    const [gender, setGender] = useState('')


    const onSubmitHandler = async () => {
        event.preventDefault()
    
        try {
    
          const formData = new FormData()
    
          formData.append('name', name)
          formData.append('email', email)

           
          //console.log formData
          formData.forEach((value, key) => {
            console.log(`${key} : ${value}`)
          })

          console.log(formData)

        // const { data } = await axios.post(backendUrl + '/api/admin/add-doctor', formData, {headers:{aToken}})
        
        if(data.success) {
            toast.success(data.message)

            setName('')
            setEmail('')
 
        } else {
            toast.error(data.message) 
        }

        } catch (error) {
        toast.error(data.message) 
        console.log(error)
        }
    }


  return (

    <form onSubmit={onSubmitHandler} className='m-5 w-full'>


      <div className='bg-white py-8 px-8 rounded w-50 max-w-4xl max-h-[80vh] '>
        

        <div className='flex lg:flex-row items-start gap-10 text-gray-600'>
          <div className='w-full lg:flex-1 flex flex-col gap-4'>

            <div className='flex-1 flex flex-col gap-1'>
              <p>Doctor Name</p>
              <input onChange={(e)=>setName(e.target.value)} value={name} className='border rounded px-3 py-3' type="text" placeholder='name' required/>
            </div>

            <div className='flex-1 flex flex-col gap-1'>
              <p>Doctor Email</p>
              <input onChange={(e)=>setEmail(e.target.value)} value={email} className='border rounded px-3 py-3' type="email" placeholder='email' required/>
            </div>

            
          </div>
        </div>



        <button type='submit' className='bg-primary px-10 py-3 mt-4 text-white rounded-full'>Search</button>

      </div>
    </form>

  )
}

export default Search
