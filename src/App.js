import React from 'react'
import axios from 'axios'
import Table from 'react-bootstrap/Table'
import 'bootstrap/dist/css/bootstrap.min.css';



const TableRowComponent = ({data}) => {
  const {name,address,email} = data
  
  return(
    <tbody>

    <tr>
      <td>{name}</td>
      <td>{email}</td>
      <td>{address}</td>
    </tr>
    </tbody>
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
      <Table striped bordered hover>
      <thead>
        <tr>
          <th>Name</th>
          <th>Email</th>
          <th>Address</th>
        </tr>
        </thead>
        {tableData.map(item=>{
          return(
            <TableRowComponent data={item}/>
          )
        })}
      </Table>
    </div>
  )
}

export default App;
