import React, { useEffect, useState } from 'react'
import axios from 'axios'
import { useParams } from 'react-router-dom'

const Cummulative = () => {

  const [data, setData] = useState({})


  const { id } = useParams([]);

  const getStudentGpa = async () => {

    const { data }  = await axios.post(`https://test.omniswift.com.ng/api/viewResult/${id}`)
        
        setData(data.data.cummulative)
        //console.log(data.data.cummulative)

  }

  useEffect(() => {
      getStudentGpa()
    }, [])


  return (

          <div className='bg-white border rounded text-sm max-h-[90vh] min-h-[70vh]'>
            {/* <div className='hidden sm:grid grid-cols-[2fr_2fr_2fr_2fr_2fr_2fr] grid-flow-col py-3 px-6 border-b'>
          
              <p>UNTS</p>
              <p>UNTD</p>
              <p>GPTS</p>
              <p>GTPD</p>
              <p>GPATS</p>
              <p>GPATD</p>

            </div> */}
          
            {
            Object.entries(data).map(([key, gpa], i)=>(
                
                <div className='items-center text-gray-700 py-3 px-6 border-b hover:bg-gray-100' key={i}>
                    <p>
                        {key}: {gpa}
                    </p>
                  
                                    
                </div>
            

            ))
            }

    </div>

  )
}

export default Cummulative






  // <p>{index + 1}</p>
  // <p>{gpa.unts}</p>
  // <p>{gpa.untd}</p>
  // <p>{gpa.gpts}</p>
  // <p>{gpa.gtpd}</p>
  // <p>{gpa.gpats}</p>
  // <p>{gpa.gpatd}</p>