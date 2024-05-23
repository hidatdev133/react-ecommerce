import React, { useState } from 'react'
import Nav from './components/nav/nav'
import { BrowserRouter } from 'react-router-dom'
import Rout from './components/rout'
import Footer from './components/footer/footer'
import Homeproduct from './components/home_product'

const App = () => {
  //Add to cart 
  const [cart, setCart] = useState([])

  // shop page product
  const [shop, setShop] = useState(Homeproduct)

  // shop search filter
  const [search, setSearch] = useState('')

  // shop category fillter
  const Filter = (x) => {
    const catefilter = Homeproduct.filter((product) => {
      return product.cat === x
    })
    setShop(catefilter)
  }

  const allcatefilter = () => {
    setShop(Homeproduct)
  }

  // shop search filter
  const searchlength = (search || []).length === 0

  const searchproduct = () => {
    if (searchlength) {
      alert("Please Search Something !")
      setShop(Homeproduct)
    }
    else {
      const searchfilter = Homeproduct.filter((x) => {
        return x.cat === search
      })
      setSearch(searchfilter)
    }
  }

  // add to cart 
  const addtocart = (product) => {
    const exist = cart.find((x) => {
      return x.id === product.id
    })

    if (exist) {
      alert("This product is already added in cart")
    }
    else {
      setCart([...cart, { ...product, qty: 1 }])
      alert("Added To cart")

    }
  }

  return (
    <>
      <BrowserRouter>
        <Nav search={search} setSearch={setSearch} searchproduct={searchproduct} />
        <Rout setCart={setCart} cart={cart} shop={shop} Filter={Filter} allcatefilter={allcatefilter} addtocart={addtocart} />
        <Footer />
      </BrowserRouter>
    </>
  )
}

export default App