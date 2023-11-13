import React, { ChangeEvent } from "react";
import style from "./CategoryList.module.scss";
import { useAppDispatch, useAppSelector } from "../../Store/hooks";
import { categoryFiltered } from "../../Store/ProductsSlice";

const CategoryList = () => {
  const { categories } = useAppSelector((state) => state.category);
  const dispatch = useAppDispatch();
  const selectRef = React.useRef<HTMLSelectElement>(null);

  const onchange = (e: ChangeEvent<HTMLSelectElement>) => {
    dispatch(categoryFiltered(e.currentTarget.value));
  };

  return (
    <div className={`${style.list}`}>
      <select
        className="form-select"
        aria-label="Default select example"
        ref={selectRef}
        onChange={onchange}
      >
        <option>Filter By Categories</option>
        {categories.map((item) => (
          <option value={item.name} key={item._id}>
            {item.name}
          </option>
        ))}
      </select>
    </div>
  );
};

export default CategoryList;
