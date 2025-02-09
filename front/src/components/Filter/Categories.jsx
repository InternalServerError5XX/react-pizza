import { useState } from "react";
import { useDispatch } from "react-redux";
import { setCategory } from "../../redux/slices/filterSlice";

function Categories() {
  const dispatch = useDispatch();
  const [activeIndex, setActiveIndex] = useState(0);
  const categories = ["All", "Meat", "Vegetarian", "Grille", "Spicy", "Closed"];

  const handleCategoryChange = (newCategory) => {
    dispatch(setCategory(newCategory));
  };

  const handleCategoryClick = (category, index) => {
    setActiveIndex(index);
    handleCategoryChange(category === "All" ? "" : category);
  };

  return (
    <div className="categories">
      <ul>
        {categories.map((category, i) => (
          <li
            key={i}
            className={activeIndex === i ? "active" : ""}
            onClick={() => handleCategoryClick(category, i)}
          >
            {category}
          </li>
        ))}
      </ul>
    </div>
  );
}

export default Categories;
