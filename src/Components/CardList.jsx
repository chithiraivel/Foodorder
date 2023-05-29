import { Card, CardActions, CardMedia, Grid, IconButton, TextField } from '@mui/material'
import React, { useEffect, useState } from 'react'
import {list} from '../Assets/JSON/productList'
import FavoriteIcon from '@mui/icons-material/Favorite';
import '../Assets/CSS/layout.css'
import { CardTravel, Star } from '@mui/icons-material';
import AddShoppingCartIcon from '@mui/icons-material/AddShoppingCart';
import instance from '../AxiosInstance/Instance';
import CurrencyRupeeIcon from '@mui/icons-material/CurrencyRupee';
const CardList = () => {

   const [fav,setFav]=useState(null)
   const [searchInput,setSearchInput]=useState(1)
   const [productData,setProductData]=useState(list)
  const [add,setAdd]=useState([])
    const favList=(data,index)=>{
        setFav(index)
        instance.post('FavList/create',data)

    }

    const addToCart=(data)=>{
        console.log(data);
        instance.post('CartList/create',data)
    }

   

  return (
    <div>
         <Card >
         <Grid container spacing={3} sx={{padding:'30px'}}>
      
       {
        list.map((data,index)=>
        <Grid item xs={12} sm={6} lg={3} xl={3} key={index} className='card'>
        <CardMedia
        component="img"
        height="230"
    
        image={`${data.image}`}
        alt="Paella dish"
      />

      <div style={{display:'flex',justifyContent:'space-between',padding:'15px'}}>
        <h2>{data.dishes}</h2>
        <p style={{paddingTop:'10px'}}><span ><CurrencyRupeeIcon fontSize='18px'/></span><span>{data.rate}</span></p>
      </div>
<div style={{display:'flex',justifyContent:'space-between'}}>
      <CardActions disableSpacing>
        <IconButton aria-label="add to favorites" onClick={()=>favList(data,index)} >
          <FavoriteIcon style={{color:index==fav ? "red":""}}/>
        </IconButton>
      </CardActions>

      <CardActions disableSpacing>
        <span className='rating'><Star fontSize='20px'/> {data.rating}</span>
      </CardActions>

      <CardActions disableSpacing>
        <div aria-label="add to favorites" className='box3' onClick={()=>addToCart(data)}>
        AddToCart
        </div>
      </CardActions>
      </div>
      </Grid>
        )
      } 
      

      </Grid>

      </Card>


    </div>
  )
}

export default CardList