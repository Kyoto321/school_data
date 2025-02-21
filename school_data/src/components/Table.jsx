import { useState, useEffect } from 'react';
import React from 'react';
import axios from 'axios'
import html2canvas from "html2canvas";
import { NavLink } from 'react-router-dom';
import { jsPDF } from "jspdf";

const Table = () => {

    const printRef = React.useRef(null);

    const [data, setData] = useState([])
    const [records, setRecords] = useState([])
     const [gender, setGender] = useState('')

    const getStudentData = async () => {

        const {data} = await axios.get("https://test.omniswift.com.ng/api/viewAllData")
            //console.log(data.data.students)
            setData(data.data.students)
            setRecords(data.data.students)

    }

    const Filter = async (event) => {
        const {data} = await axios.get("https://test.omniswift.com.ng/api/viewAllData")
        setRecords(data.data.students.filter(f => f.surname.toLowerCase().includes(event.target.value)))
    }

    const handleDownloadPdf = async () => {
        const element = printRef.current;
        if (!element) {
            return;
        }

        const canvas = await html2canvas(element);
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



    useEffect(() => {
        getStudentData()
        Filter()
      }, [])


    return (
        <div ref={printRef} className='m-5'>
    

        <p className='mb-3 text-lg font-medium text-gray-500'>Filter Student Data Table By:</p>

        <div class='max-w-sm mb-3'>
              <div class="relative flex items-center w-full h-12 rounded-lg focus-within:shadow-lg bg-white overflow-hidden">
                  <div class="grid place-items-center h-full w-12 text-black-300">
                    <svg xmlns="http://www.w3.org/2000/svg" class="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                    </svg>
                  </div>

                  <input
                    class="peer h-full w-full outline-none text-sm text-gray-700 pr-2"
                    type="text"
                    id="search"
                    placeholder="Search Surname" 
                    onChange={Filter}
                  /> 
              </div>
          </div>
           
            <div className='bg-white border rounded text-sm max-h-[80vh] min-h-[60vh] overflow-y-scroll'>


            <div className='hidden text-lg sm:grid grid-cols-[0.5fr_1fr_1fr_1fr_1fr_1fr_1fr_1fr] grid-flow-col py-3 px-6 border-b'>
            <p>SN</p>
             <p>Surname</p>
             <p>First name</p>
             <p>Age</p>
             <p>Gender</p>
             <p>Level</p>
             <p>State</p>
             <p className='text-center'>Action</p>
            </div>

            {
            records.map((item, index)=>(
                <div className='flex flex-wrap justify-between max-sm:gap-2 sm:grid sm:grid-cols-[0.5fr_1fr_1fr_1fr_1fr_1fr_1fr_1fr] items-center text-gray-600 py-3 px-6 border-b hover:bg-gray-100' key={index}>
                    <p className='max-sm:hidden'>{item.id}</p> 
                    <p>{item.surname}</p> 
                    <p>{item.firstname}</p>
                    <p>{item.age}</p>
                    <p>{item.gender}</p>
                    
                    <p>{item.level}</p> 
                    <p>{item.state}</p>
                    
                    <p>
                    <NavLink to={`/result/${item.id}`} className='bg-green-500 text-center items-center text-gray-950 px-7 py-3 font-light md:block'>View Result</NavLink>
                    </p>
                </div>
                ))
                }
            </div>
        </div>
    )
}

export default Table

