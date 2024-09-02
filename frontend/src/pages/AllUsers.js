import React, { useEffect, useState } from 'react'
import SumaryApi from '../common'
import { toast } from 'react-toastify';

const AllUsers = () => {
    const [allUser, setAllUsers] = useState([])

    const fetchAllUsers = async () => {
        const fetchData = await fetch(SumaryApi.allUser.url,{
            method: SumaryApi.allUser.method,
            credentials: "include"
        })

        const dataResponse = await fetchData.json()

        if(dataResponse.success){
          setAllUsers(dataResponse.data)
        }

        if(dataResponse.error){
          toast.error(dataResponse.message)
        }

        console.log(dataResponse)
    }

    useEffect(() => {
        fetchAllUsers()
    },[])

  return (
    <div>
      <table className='w-full userTable'>
        <thead>
          <tr>
            <th>Sr.</th>
            <th>Name</th>
            <th>Email</th>
            <th>Role</th>
            <th>Created Date</th>        
          </tr>
        </thead>
        <tbody>
          {
            allUser.map((el,index) => {
              return(
                <tr>
                  <td>
                    {index+1}
                  </td>
                </tr>
              )
            })
          }
        </tbody>
      </table>
    </div>
  )
}

export default AllUsers