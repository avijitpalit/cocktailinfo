'use client'
import React, {useEffect, useState} from 'react'
import 'bootstrap/dist/css/bootstrap.css'
import axios from "axios";
import './page.css'

const Drink = ({ thumbURL, title, instructions, ingredients }) => {
  return(
    <div className="drink-item d-flex rounded p-3 gap-3">
      <div className='thumb-wrapper text-center-sm'><img className='rounded thumb' src={ thumbURL } alt="Drink thumb" /></div>
      <div>
        <h4 className="title mb-0">{ title }</h4>
        <div className='d-flex flex-wrap gap-2 mt-2'>
          <small className='fw-600'>Ingredients:</small>
          {
            ingredients.map((ingredient, index) => {
              return(
                <small key={ index } className='ingredients'>{ ingredient }</small>
              )
            })
          }
        </div>
        <p className='mt-3'><span className='fw-600'>Instructions:</span> { instructions }</p>
      </div>
    </div>
  )
}

export default function Home() {
  const [drinks, setDrinks] = useState([]);
  useEffect(() => {
    axios.get(`https://www.thecocktaildb.com/api/json/v1/1/search.php?s=`)
    .then(res => {
        setDrinks(res.data.drinks ? res.data.drinks : [])
    })
  }, [])

  function onSearchChanged(e){
      axios.get(`https://www.thecocktaildb.com/api/json/v1/1/search.php?s=${ e.target.value }`)
      .then(res => {
          setDrinks(res.data.drinks ? res.data.drinks : [])
      })
  }

  return (
    <main>
      <section className="search-bar py-5 text-center shadow-sm">
        <div className="container">
            <h1 className={`text-center main-title display-4`}>Cocktail <i class="fa-solid fa-martini-glass-citrus icon"></i> Info</h1>
            <div><input id='search' onChange={ onSearchChanged } className={`form-control w-75 mx-auto neumorphism-pushed`} placeholder='Search cocktail name here' /></div>
        </div>
      </section>

      <section className="search-result">
        <div className="container py-5 d-grid gap-4">
            {
                drinks.length ?
                drinks.map((drink, index) => {
                    var ingredients = []
                    for(var i = 1; i <= 15; i++){
                    if(drink[`strIngredient${ i }`]) ingredients.push(drink[`strIngredient${ i }`])
                    }
                    return( <Drink key={ index } ingredients={ ingredients } thumbURL={ drink.strDrinkThumb } title={ drink.strDrink } instructions={ drink.strInstructions } /> )
                }) : <h4 className="text-center text-danger">No Drink Found</h4>
            }
        </div>
      </section>
    </main>
)
}
