import { combineReducers, configureStore } from '@reduxjs/toolkit'
import auth from './AuthSlice'
import storage from 'redux-persist/lib/storage';
import { persistReducer, persistStore } from 'redux-persist';
import product from './ProductsSlice'
import category from './CategoriesSlice'
import subCategory from './SubCategorySlice'
import brand from './BrandSlice'
import cart from './CartSLice'


const persistConfig = {
    key: 'root',
    storage,
  }


  const rootReducer = combineReducers({ 
  auth,
  product,
  category,
  subCategory,
  brand,
  cart
  })

  const persistedReducer = persistReducer(persistConfig, rootReducer)

  export const store = configureStore({
    reducer: persistedReducer,
    middleware: (getDefaultMiddleware) =>
		getDefaultMiddleware({
			serializableCheck: false,
		})
  })
  


  export const persistor = persistStore(store)



export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch


