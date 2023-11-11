import React, { useEffect } from 'react'
import { useAppDispatch, useAppSelector } from '../Store/hooks'
import { getProducts } from '../Store/ProductsSlice'
import { getCategories } from '../Store/CategoriesSlice'
import { getSubCategoriesByCategory, getSubCategory, getSubCategoryById } from '../Store/SubCategorySlice'
import Slider from '../Component/Slider/Slider'
import CategorySlider from '../Component/CategorySlider/CategorySlider'
import ProductsContainer from '../Component/ProductsContainer/ProductsContainer'

const Home:React.FC = () => {
const dispatch = useAppDispatch()
  const {categories} = useAppSelector((state)=>state.category)
  const {products} = useAppSelector((state)=>state.product)


useEffect(() => {
dispatch(getProducts())
dispatch(getCategories())
dispatch(getSubCategory())
dispatch(getSubCategoryById("6407f40db575d3b90bf957fa"))
dispatch(getSubCategoriesByCategory('6439d5b90049ad0b52b90048'))
}, [dispatch])


  return (
    <>
  <Slider/>
  <CategorySlider categories={categories}/>
  <ProductsContainer products={products}/>
    </>
  )
}

export default Home
