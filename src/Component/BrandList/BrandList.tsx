import React, { useEffect, ChangeEvent } from "react";
import style from "../CategoryList/CategoryList.module.scss";
import { useAppDispatch, useAppSelector } from "../../Store/hooks";
import { getBrands } from "../../Store/BrandSlice";
import { brandFiltered } from "../../Store/ProductsSlice";

const BrandList = () => {
  const { brands } = useAppSelector((state) => state.brand);

  const dispatch = useAppDispatch();

  const selectRef = React.useRef<HTMLSelectElement>(null);

  const onchange = (e: ChangeEvent<HTMLSelectElement>) => {
    console.log(e.currentTarget.value);
    dispatch(brandFiltered(e.currentTarget.value));
  };
  useEffect(() => {
    dispatch(getBrands());
  }, [dispatch]);
  return (
    <div className={`${style.list}`}>
      <select
        className="form-select"
        aria-label="Default select example"
        ref={selectRef}
        onChange={onchange}
      >
        <option>Filter By Brand</option>
        {brands.map((item) => (
          <option value={item.name} key={item._id}>
            {item.name}
          </option>
        ))}
      </select>
    </div>
  );
};

export default BrandList;
