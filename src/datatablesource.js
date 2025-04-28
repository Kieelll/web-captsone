import { width } from "@mui/system";


export const userColumns = [
  {field: "id", headerName: "ID", width: 70},
  {
    field: "user",
    headerName: 'User',
    width: 230, 
    renderCell: (params) => {
      return(
       <div className="cellWithImg">
        <img className="cellImg" src={params.row.img} alt="avatar"/>
        {params.row.username}
       </div>
      )
    }
  },
  {
    field: "email", headerName: "Email", width: 230
  },
  {
    field: "age", headerName: "Age", width: 230
  },
  {
    field: "status", headerName: "Status", width: 230,
    renderCell: (params) => {
      return (
        <span className={`cellWithStatus ${params.row.status}`}>
          {params.row.status}
          </span>
      )
    }
  },

]



// temporary data

export const userRows = [
  { id: 1,
    username: 'jakala',
    img:"https://images.pexels.com/photos/1933873/pexels-photo-1933873.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1",
    status: "active", 
    email: "allen@gmail.com",
    age: 35,
  },
  { id: 2,
    username: 'kiel',
    img: 'https://images.pexels.com/photos/1933873/pexels-photo-1933873.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1',
    status: "passive", 
    email: "kiel@gmail.com",
    age: 13,
  },
  { id: 3,
    username: 'cute',
    img: "https://images.pexels.com/photos/1933873/pexels-photo-1933873.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1",
    status: "passive", 
    email: "cute@gmail.com",
    age: 58,
  },
  { id: 4,
    username: 'ez',
    img: "https://images.pexels.com/photos/1933873/pexels-photo-1933873.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1",
    status: "active", 
    email: "ez@gmail.com",
    age: 15,
  },
  { id: 5,
    username: 'xplit',
    img: "https://images.pexels.com/photos/1933873/pexels-photo-1933873.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1",
    status: "pending",
    email: "secret@gmail.com",
    age: 12, 
  },
  { id: 6,
    username: 'bert',
    img: "https://images.pexels.com/photos/1933873/pexels-photo-1933873.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1",
    status: "active", 
    email: "bert@gmail.com",
    age: 32,
  },

];