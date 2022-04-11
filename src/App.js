import React from 'react'
import axios from 'axios'



const TableRowComponent = ({data}) => {
  const {name,address,email} = data
  
  return(
    <tr>
      <td>{name}</td>
      <td>{email}</td>
      <td>{address}</td>
    </tr>
  )

}





const App = props => {
  const [tableData,setTableData] = React.useState([])
  React.useEffect(()=>{

    axios.get("https://jsonplaceholder.typicode.com/users").then(data=>{
      let tabledata = data.data.map(item=>{
        let email = item.email.split("@")[0].split("").fill("*",1).join("") +"@"+ item.email.split("@")[1]
        let address = `${item.address.street}, ${item.address.suite}, ${item.address.city}, ${item.address.zipcode}`
        return{
          name:item.name,
          email:email,
          address: address
        }
      })
      setTableData(tabledata);
    }).catch(err=>{
      console.log(err);
    })
  },[])
  console.log(tableData)
  return(
    <div>
      <table>
        <tr>
          <td>Name</td>
          <td>Email</td>
          <td>Address</td>
        </tr>
        {tableData.map(item=>{
          return(
            <TableRowComponent data={item}/>
          )
        })}
      </table>
    </div>
  )
}

export default App;
