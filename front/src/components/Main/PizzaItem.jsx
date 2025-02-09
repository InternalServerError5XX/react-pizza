import { useState } from "react";
import axios from "axios";
import DeleteOutlineIcon from "@mui/icons-material/DeleteOutline";
import EditIcon from "@mui/icons-material/Edit";
import { useDispatch } from "react-redux";
import { setPizzaToUpdate } from "../../redux/slices/modalSlice";

function PizzaItem({
  id,
  name,
  price,
  imageUrl,
  sizes,
  category,
  types,
  rating,
  onDelete,
}) {
  const dispatch = useDispatch();
  const handleOpen = () =>
    dispatch(
      setPizzaToUpdate({
        id,
        name,
        price,
        imageUrl,
        sizes,
        category,
        types,
        rating,
      })
    );

  const [activeSize, setActiveSize] = useState(sizes[0]);
  const [activeType, setActiveType] = useState(types[0]);
  const typeNames = ["thin", "traditional"];
  const API_URL = import.meta.env.VITE_API_URL;

  const deletePizza = async () => {
    try {
      await axios.delete(`${API_URL}${id}`);
      onDelete();
    } catch (error) {
      console.error("Error deleting pizza:", error);
    }
  };

  return (
    <div className="pizza-block">
      <img className="pizza-block__image" src={imageUrl} alt="Pizza" />
      <h4 className="pizza-block__title">{name}</h4>
      <div className="pizza-block__selector">
        <ul>
          {types.map((type, index) => (
            <li
              key={index}
              className={activeType === type ? "active" : ""}
              onClick={() => setActiveType(type)}
            >
              {typeNames[index]}
            </li>
          ))}
        </ul>
        <ul>
          {sizes.map((size) => (
            <li
              key={size}
              className={activeSize === size ? "active" : ""}
              onClick={() => setActiveSize(size)}
            >
              {size} cm
            </li>
          ))}
        </ul>
      </div>
      <div className="pizza-block__bottom">
        <div className="pizza-block__price">${price}</div>
        <button className="button button--outline button--add">
          <svg
            width="12"
            height="12"
            viewBox="0 0 12 12"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              d="M10.8 4.8H7.2V1.2C7.2 0.5373 6.6627 0 6 0C5.3373 0 4.8 0.5373 4.8 1.2V4.8H1.2C0.5373 4.8 0 5.3373 0 6C0 6.6627 0.5373 7.2 1.2 7.2H4.8V10.8C4.8 11.4627 5.3373 12 6 12C6.6627 12 7.2 11.4627 7.2 10.8V7.2H10.8C11.4627 7.2 12 6.6627 12 6C12 5.3373 11.4627 4.8 10.8 4.8Z"
              fill="white"
            />
          </svg>
          <span>Add</span>
          <i>2</i>
        </button>
        <button
          className="button button--outline"
          style={{ padding: "7px 0px", minWidth: "50px" }}
          onClick={handleOpen}
        >
          <EditIcon />
        </button>
        <button
          className="button button--outline"
          style={{ padding: "7px 0px", minWidth: "50px" }}
          onClick={deletePizza}
        >
          <DeleteOutlineIcon />
        </button>
      </div>
    </div>
  );
}

export default PizzaItem;
