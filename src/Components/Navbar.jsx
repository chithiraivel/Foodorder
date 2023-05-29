import { AppBar, Badge, CardMedia, Container, Drawer, Table, TableContainer, TableHead, TableRow, Toolbar } from '@mui/material'
import React, { useEffect, useState } from 'react'
import FavoriteIcon from '@mui/icons-material/Favorite';
import AddShoppingCartIcon from '@mui/icons-material/AddShoppingCart';
import { styled } from '@mui/material/styles';
import TableCell, { tableCellClasses } from '@mui/material/TableCell';
import TableBody from '@mui/material/TableBody';
import '../Assets/CSS/layout.css'
import instance from '../AxiosInstance/Instance';

const Navbar = () => {

  const [state,setState]=useState(false)
const toggleDrawer=()=>{
  setState(!state)
}

const [state2,setState2]=useState(false)
const toggleDrawer2=()=>{
  setState2(!state2)
}
const StyledTableCell = styled(TableCell)(({ theme }) => ({
  [`&.${tableCellClasses.head}`]: {
    backgroundColor: theme.palette.common.black,
    color: theme.palette.common.white,
  },
  [`&.${tableCellClasses.body}`]: {
    fontSize: 14,
  },
}));

const StyledTableRow = styled(TableRow)(({ theme }) => ({
  '&:nth-of-type(odd)': {
    backgroundColor: theme.palette.action.hover,
  },
  // hide last border
  '&:last-child td, &:last-child th': {
    border: 0,
  },
}));

const [list,setList]=useState([])
const [list2,setList2]=useState([])
const [value,setValue]=useState([])
useEffect(()=>{
  cardview()
  
favview()
  
},[value])

const cardview=()=>{
  instance.post('CartList/view').then((res)=>{
    setList(res.data.message.message);
  })
}

const favview=()=>{
  instance.post('FavList/view').then((res)=>{
    setList2(res.data.message.message);
  })
}
const [increa,setIncreament]=useState(1)
const [just,setjust]=useState('')
const [quantity,setQuantity]=useState('')
let a=just.qty*just.rate;

const increament=(data)=>{
  console.log(data);
  setjust(data)
 
    setIncreament(increa+1)
  
   const obj={favourite_id:data.favourite_id,qty:data.qty+1,total:quantity}
   setQuantity(data.rate*increa)
  instance.post('CartList/update',obj).then((res)=>{
    setValue(res.data.message.message)
  })
}

const decreament=(data)=>{
  const obj={favourite_id:data.favourite_id,qty:data.qty-1}
   
  instance.post('CartList/update',obj).then((res)=>{
    setValue(res.data.message.message)
})

console.log(data.qty);
if(data.qty==0){
  console.log('jj');
  removeItem(data.favourite_id)
}
}

const removeItem=(favourite_id)=>{
  instance.post('CartList/delete',{favourite_id}).then((res)=>{
    if(res.data.message.status ==true){
      cardview()
    }
  })
}

const removeItem2=(favourite_list)=>{
  instance.post('FavList/delete',{favourite_list}).then((res)=>{
    if(res.data.message.status ==true){
      favview()
    }
  })

}
  return (
    <div>

<AppBar position="static" style={{backgroundColor:'gray'}}>
      <Container maxWidth="xl">
        

                <div style={{display:'flex',justifyContent:'space-between'}}>
                    <div><h2>Food</h2></div>
                    <div className='navbar'>
                        <span onClick={toggleDrawer2}><Badge badgeContent={list2.length} color='primary'><FavoriteIcon/></Badge></span>
                        <span onClick={toggleDrawer}><Badge badgeContent={list.length} color='primary'><AddShoppingCartIcon/></Badge></span>
                    </div>
                </div>
          
            </Container>
            </AppBar>

      {/* Add to cart productList */}
            <Drawer
            anchor={'right'}
            open={state}
            onClose={toggleDrawer}
          >
            <h2>product List</h2>
            <TableContainer>
      <Table sx={{ minWidth: 700 }} aria-label="customized table">
        
        <TableBody>
         {
          list.map((data)=>
          <StyledTableRow> 
              <StyledTableCell align="right"><CardMedia
        component="img"
        height="80"
        width="100"
        image={`${data.image}`}
        alt="Paella dish"
      /></StyledTableCell>
              <StyledTableCell align="right">{data.dishes}</StyledTableCell>
              <StyledTableCell align="right"><span className='box' onClick={()=>decreament(data)}>-</span><span className='box'>{data.qty}</span><span className='box' onClick={()=>increament(data)}>+</span></StyledTableCell>
              <StyledTableCell>{data.qty*data.rate}</StyledTableCell>
              <StyledTableCell align="right"><span className='box2' onClick={()=>removeItem(data.favourite_id)}>RemoveItem</span></StyledTableCell>
            </StyledTableRow> 
          )
         }
             

            
        </TableBody>
          </Table>
          </TableContainer>
          </Drawer>

      {/* favourite productList */}
     
          <Drawer
            anchor={'right'}
            open={state2}
            onClose={toggleDrawer2}
          >
            <h2>Favourite List</h2>
            <TableContainer>
      <Table sx={{ minWidth: 700 }} aria-label="customized table">
        
        <TableBody>
         {
          list2.map((data)=>
          <StyledTableRow> 
              <StyledTableCell align="right"><CardMedia
        component="img"
        height="80"
        width="100"
        image={`${data.image}`}
        alt="Paella dish"
      /></StyledTableCell>
              <StyledTableCell align="right">{data.dishes}</StyledTableCell>
              <StyledTableCell align="right"><span className='box2' onClick={()=>removeItem2(data.favourite_list)}>RemoveItem</span></StyledTableCell>
            </StyledTableRow> 
          )
         }
             

            
        </TableBody>
          </Table>
          </TableContainer>
          </Drawer>

    </div>
  )
}

export default Navbar;