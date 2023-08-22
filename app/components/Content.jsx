'use client'
import React, {useEffect, useState} from 'react'
import 'bootstrap/dist/css/bootstrap.css'
import axios from "axios";

const Drink = ({ thumbURL, title, instructions, ingredients }) => {
    return(
      <div className="drink-item d-flex border rounded shadow-sm p-3">
        <div><img className='rounded thumb' src={ thumbURL } alt="Drink thumb" /></div>
        <div className="ms-3">
          <h4 className="title mb-0">{ title }</h4>
          <div className='d-flex gap-2 mt-2'>
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

export default function Content() {
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
        <>
            <section className="search-bar py-5 text-center shadow-sm">
                <div className="container">
                    <h1 className="text-center main-title">Cocktail Info</h1>
                    <form action="">
                    <div><input onChange={ onSearchChanged } className={`form-control w-75 mx-auto`} placeholder='Search cocktail name here' /></div>
                    </form>
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
        </>
    )
}
