import { Category } from "../../Interfaces/CategoriesInterface";
import { Pagination, Navigation } from "swiper/modules";
import { Swiper, SwiperSlide } from "swiper/react";
import style from "./CategorySlider.module.scss";
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";
import "./CategorySlider.css";
import { Link } from "react-router-dom";

interface CategoriesProps {
  categories: Category[];
}
const CategorySlider: React.FC<CategoriesProps> = ({ categories }) => {
  return (
    <section className={`${style.category_slider}`}>
      <div className="container">
        <div className="category_box">
          <Swiper
            modules={[Pagination, Navigation]}
            pagination={{ clickable: true }}
            navigation
            breakpoints={{
              769: {
                slidesPerView: 3,
              },
              991: {
                slidesPerView: 3,
              },
              1024: {
                slidesPerView: 4,
              },
              1280: {
                slidesPerView: 7,
              },
              1380: {
                slidesPerView: 7,
              },
            }}
          >
            {categories.map((item) => (
              <SwiperSlide key={item._id}>
                <Link to={`category/${item._id}`} style={{ textDecoration: "none" }}>
                  <div
                    className="slider_category"
                    style={{ backgroundImage: `url(${item.image})` }}
                  ></div>
                  <div className="slider_title">
                    <h4>{item.name}</h4>
                  </div>
                </Link>
              </SwiperSlide>
            ))}
          </Swiper>
        </div>
      </div>
    </section>
  );
};

export default CategorySlider;
