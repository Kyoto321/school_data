import React, { useEffect, useState } from 'react'
import acadd from '../assets/acadd.jpg'
import passport from '../assets/Passport.jpg'
import logo from '../assets/Logo.jpg'
import axios from 'axios'
import { NavLink, useParams } from 'react-router-dom'
import html2canvas from "html2canvas";
import { jsPDF } from "jspdf";
import Cummulative from '../components/Cummulative';

const Result = () => {

  const printRef = React.useRef(null);

  const [dataInfo, setDataInfo] = useState([])
  const [cummulative, setCummulative] = useState([])
  const [res, setRes] = useState([])

  const { id } = useParams([]);

  const getStudentResult = async () => {

      const {data} = await axios.post(`https://test.omniswift.com.ng/api/viewResult/${id}`)

        setDataInfo(data.data.result)
        setRes(data.data)
      
  }

  // const getStudentGpa = async () => {

  //   const response  = await axios.post(`https://test.omniswift.com.ng/api/viewResult/${id}`)
  //     console.log(response)
  //     setCummulative(response.data.data.cummulative)  
  //     setRes(response.data.data)
      

  // }

  useEffect(() => {
      getStudentResult()
      //getStudentGpa()
    }, [])


  const handleDownloadPdf = async () => {
      const element = printRef.current;
      if (!element) {
          return;
      }

      const canvas = await html2canvas(element, {
        scale: 2,
      });
      const data = canvas.toDataURL("image/png")

      // Landscape export, 2×4 inches
      const pdf = new jsPDF({
          orientation: "portrait",
          unit: "px",
          format: 'a4'
      });

      const imgProperties = pdf.getImageProperties(data);
      const pdfWidth = pdf.internal.pageSize.getWidth();

      const pdfHeight = (imgProperties.height * pdfWidth) / imgProperties.width

      pdf.addImage(data, 'PNG', 0, 0, pdfWidth, pdfHeight);
      pdf.save('Result.pdf')
  }


  return (
    
    <div>
      <div ref={printRef}>
      <div className='mb-5 mx-20'>

        <div className='flex items-center justify-between text-sm border-border-b-gray-400'>
            
          <div className='w-44 cursor-pointer'>
          <img className='w-full md:max-w-[360px]' src={logo} alt="" />
          </div>
          <div className='px-10 py-8 md:px-16 flex flex-col gap-5 text-[15px] text-gray-600 cursor-pointer'>
            <div className='flex flex-col items-center gap-4 py-16 text-gray-800'>

              <h1 className='text-center text-gray-600 text-lg font-medium'>FREMONT COLLEGE OF EDUCATION</h1>
              <p className='sm:w-1/1 text-gray-500 text-center text-sm'>No.5 Raymond Osuman Street, PMB 2191<br /> Maitama, Abuja, Nigeria.</p>
              <h1 className='text-center text-gray-700 text-xl font-medium'>Post Graduate Diploma in Education</h1>
              <p className='sm:w-1/1 text-gray-700 text-center text-sm'>Student First Semester Statement Of Result</p>
            </div>

          </div>
          <div className='w-44 cursor-pointer'>
            <img className='w-full md:max-w-[360px]' src={passport} alt="" />       
          </div>   
        </div>
        
          <div className='flex flex-col sm:grid grid-cols-[3fr_1fr] gap-14 my-2 text-sm'>
              <p className='font-semibold'>Name:  Chukwuma James Nnamdi</p>
              <p className='font-semibold'>Reg No: FCE/PGDE/2021/002</p>

              <p className='font-semibold'>Level:  100 Level</p>
              <p className='font-semibold'>Session:  2022/2023 Session</p>
            </div>
          
        
            <div className=' border border-t-0'>
              

              <div className='bg-white border rounded text-sm max-h-[90vh] min-h-[70vh]'>
                <div className='bg-[#0D7590] text-white sm:grid grid-cols-[0.5fr_1fr_2fr_1fr_1fr_1fr] grid-flow-col py-3 px-6 border-b hidden'>
                  <p>SN</p>
                  <p>Course Code</p>
                  <p>Course Title</p>
                  <p>Unit</p>
                  <p>Grade</p>
                  <p>Total Point</p>
                
                </div>

                {
                dataInfo.map((item, index)=>(
                    <div className='flex flex-wrap justify-between max-sm:gap-2 sm:grid sm:grid-cols-[0.5fr_1fr_2fr_1fr_1fr_1fr] items-center text-gray-500 py-3 px-6 border-b hover:bg-gray-100' key={index}>
                        <p className='max-sm:hidden'>{index + 1}</p> 
                        <p>{item.coursecode}</p> 
                        <p>{item.title}</p>
                        <p>{item.credit_unit}</p>
                        <p>{item.grade}</p>

                        <p>{item.total_point}</p> 
                    

                  
                    </div>
                  ))
                  }
              </div>

              <Cummulative />

              {/* <div className='bg-white border rounded text-sm max-h-[90vh] min-h-[70vh]'>
                <div className='hidden sm:grid grid-cols-[0.5fr_1fr_1fr_1fr_1fr_1fr] grid-flow-col py-3 px-6 border-b'>
              
                  <p>UNTS</p>
                  <p>UNTD</p>
                  <p>GPTS</p>
                  <p>GTPD</p>
                  <p>GPATS</p>
                  <p>GPATD</p>

                </div>
              
                {
                // if data were to be stored as an array
              cummulative.map((gpa, index)=>(
                    <div className='flex flex-wrap justify-between max-sm:gap-2 sm:grid sm:grid-cols-[0.5fr_1fr_1fr_1fr_1fr_1fr] items-center text-gray-500 py-3 px-6 border-b hover:bg-gray-100' key={index}>
                        
                        <p>{gpa.unts}</p>
                        <p>{gpa.untd}</p>
                        <p>{gpa.gpts}</p>
                        <p>{gpa.gtpd}</p>
                        <p>{gpa.gpats}</p>
                        <p>{gpa.gpatd}</p>
                        
                    </div>
                

                ))
                }

            </div> */}
              <br />           
          
            </div>
            <div className='mt-5'>
              <p>_______________________</p>
              <p className='text-gray-500'>Registrar</p>
            </div>
      </div>
      </div>
      <button onClick={handleDownloadPdf} 
            className='bg-green-500 text-white px-4 py-2 hover:bg-green-700 transition duration-300 rounded-sm font-light md:block mx-20'>Download Result
            </button>
            <NavLink to='/'><li className='text-gray-700 mx-20 px-4 py-2'>HOME</li></NavLink>
    </div>

  )
}

export default Result


