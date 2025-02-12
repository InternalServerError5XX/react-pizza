import { useState } from "react";
import { pizzaApi } from "../utils/helpers/axiosInstance";
import { useDispatch, useSelector } from "react-redux";
import { setPizzaToUpdate } from "../../redux/slices/modalSlice";
import {
  getItemQuantityById,
  addToCart,
  deleteFromCart,
} from "../../redux/slices/cartSlise";
import DeleteOutlineIcon from "@mui/icons-material/DeleteOutline";
import EditIcon from "@mui/icons-material/Edit";
import AddIcon from "@mui/icons-material/Add";
import RemoveIcon from "@mui/icons-material/Remove";
import { Stack, Typography } from "@mui/material";

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
  const [activeSize, setActiveSize] = useState(sizes[0]);
  const [activeType, setActiveType] = useState(types[0]);
  const itemQuantity = useSelector((state) =>
    getItemQuantityById(state, id, activeSize, activeType)
  );
  const role = useSelector((state) => state.auth.role);

  const typeNames = ["thin", "traditional"];

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

  const deletePizza = async () => {
    try {
      await pizzaApi.delete(`${id}`);
      onDelete();
    } catch (error) {
      console.error("Error deleting pizza:", error);
    }
  };

  const handleAddToCart = () => {
    dispatch(
      addToCart({
        id,
        name,
        price,
        imageUrl,
        size: activeSize,
        type: activeType,
      })
    );
  };

  const handleDeleteFromCart = () => {
    dispatch(deleteFromCart({ id, size: activeSize, type: activeType }));
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
        <Stack
          direction="row"
          alignItems="center"
          style={{
            marginRight: role?.toLowerCase() === "admin" ? "0px" : "85px",
          }}
        >
          <button
            className="button button--outline"
            style={{ padding: "2px 0px", minWidth: "30px" }}
            onClick={handleDeleteFromCart}
            disabled={itemQuantity === 0}
          >
            <RemoveIcon style={{ fontSize: "18px", marginTop: "2px" }} />
          </button>
          <Typography style={{ margin: "0px 5px" }} variant="h6">
            {itemQuantity}
          </Typography>
          <button
            className="button button--outline"
            style={{ padding: "2px 0px", minWidth: "30px" }}
            onClick={handleAddToCart}
          >
            <AddIcon style={{ fontSize: "18px", marginTop: "2px" }} />
          </button>
        </Stack>
        {role?.toLowerCase() === "admin" && (
          <>
            <button
              className="button button--outline"
              style={{ padding: "7px 0px", minWidth: "50px" }}
              onClick={handleOpen}
            >
              <EditIcon />
            </button>
            <button
              className="button button--outline"
              style={{
                padding: "7px 0px",
                minWidth: "50px",
                marginLeft: "-20px",
              }}
              onClick={deletePizza}
            >
              <DeleteOutlineIcon />
            </button>
          </>
        )}
      </div>
    </div>
  );
}

export default PizzaItem;
