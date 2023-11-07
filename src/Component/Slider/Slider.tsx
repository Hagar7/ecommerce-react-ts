import {Pagination} from 'swiper/modules'
import { Swiper, SwiperSlide } from 'swiper/react';
import style from "./Slider.module.scss";
import 'swiper/css';
import './Slider.css'


const Slider = () => {

   const data = [
    {id:1,img:"images/slider-image-1.jpeg",title:"Welcome To FreshCart"},
    {id:2,img:"images/slider-image-2.jpeg",title:"Welcome To FreshCart"},
    {id:3,img:"images/slider-image-1.jpeg",title:"Welcome To FreshCart"},
   ]

  return (
    <header className={`${style.header}`}>
    <Swiper
    // slidesPerView={1}
    modules={[Pagination]}
    pagination={{ clickable: true }}
    allowTouchMove={false}
  >
    
{data.map((item)=>
    <SwiperSlide key={item.id}>
         <div className="bgimg" style={{ backgroundImage: `url(${item.img})` }}>
            <div className="overlay">
                <h4>{item.title}</h4>
            </div>
</div>
    </SwiperSlide>
)}
    


    
  </Swiper>
    </header>
  )
}

export default Slider
