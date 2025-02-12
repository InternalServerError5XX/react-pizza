import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  TextField,
  Button,
  MenuItem,
  Select,
  InputLabel,
  FormControl,
  OutlinedInput,
} from "@mui/material";
import { pizzaApi } from "../utils/helpers/axiosInstance";
import { PizzaCategories } from "../utils/enums/PizzaCategories";
import { PizzaTypes } from "../utils/enums/PizzaTypes";
import { setPizzaToUpdate } from "../../redux/slices/modalSlice";

function UpdatePizzaModal({ onUpdate }) {
  const dispatch = useDispatch();
  const pizzaToUpdate = useSelector((state) => state.modal.pizzaToUpdate);
  const [pizza, setPizza] = useState({});

  useEffect(() => {
    if (Object.keys(pizzaToUpdate).length > 0) {
      setPizza(pizzaToUpdate);
    } else {
      setPizza({});
    }
  }, [pizzaToUpdate]);

  const handleClose = () => {
    dispatch(setPizzaToUpdate({}));
    setPizza({});
  };

  const handleChange = (e) => {
    const { name, value } = e.target;

    setPizza((prev) => ({
      ...prev,
      [name]:
        name === "types" ? (Array.isArray(value) ? value : [value]) : value,
    }));
  };

  const sendRequest = async () => {
    const updatedPizza = {};

    if (pizza.name !== pizzaToUpdate.name) updatedPizza.name = pizza.name;
    if (pizza.imageUrl !== pizzaToUpdate.imageUrl)
      updatedPizza.imageUrl = pizza.imageUrl;
    if (pizza.sizes !== pizzaToUpdate.sizes) {
      updatedPizza.sizes = pizza.sizes
        ? pizza.sizes.toString().split(",").map(Number)
        : [];
    }
    if (pizza.types !== pizzaToUpdate.types) {
      updatedPizza.types = pizza.types
        ? pizza.types.map((type) => parseInt(type, 10))
        : [];
    }
    if (pizza.price !== pizzaToUpdate.price)
      updatedPizza.price = parseFloat(pizza.price);
    if (pizza.rating !== pizzaToUpdate.rating)
      updatedPizza.rating = parseFloat(pizza.rating);
    if (pizza.category !== pizzaToUpdate.category)
      updatedPizza.category = parseInt(pizza.category, 10);

    if (Object.keys(updatedPizza).length > 0) {
      await pizzaApi.patch("", updatedPizza, {
        params: {
          id: pizza.id,
        },
      });
    }
  };

  const handleSubmit = async () => {
    try {
      await sendRequest();
      handleClose();
      onUpdate();
    } catch (error) {
      console.error("Error updating pizza:", error);
    }
  };

  return (
    <Dialog
      open={Object.keys(pizzaToUpdate).length !== 0}
      onClose={handleClose}
    >
      <DialogTitle sx={{ marginTop: 1 }}>Update Pizza</DialogTitle>
      <DialogContent>
        <TextField
          label="Name"
          name="name"
          fullWidth
          margin="dense"
          value={pizza.name || ""}
          onChange={handleChange}
        />
        <TextField
          label="Image URL"
          name="imageUrl"
          fullWidth
          margin="dense"
          value={pizza.imageUrl || ""}
          onChange={handleChange}
        />
        <TextField
          label="Sizes"
          name="sizes"
          fullWidth
          margin="dense"
          value={pizza.sizes || ""}
          onChange={handleChange}
        />

        <FormControl fullWidth margin="dense">
          <InputLabel>Pizza Types</InputLabel>
          <Select
            multiple
            name="types"
            value={pizza.types || []}
            onChange={handleChange}
            input={<OutlinedInput label="Pizza Types" />}
          >
            {Object.entries(PizzaTypes)
              .filter(([key]) => isNaN(Number(key)))
              .map(([key, value]) => (
                <MenuItem key={value} value={value}>
                  {key}
                </MenuItem>
              ))}
          </Select>
        </FormControl>

        <TextField
          label="Price"
          name="price"
          type="number"
          fullWidth
          margin="dense"
          value={pizza.price || ""}
          onChange={handleChange}
        />

        <TextField
          select
          label="Category"
          name="category"
          fullWidth
          margin="dense"
          value={pizza.category || ""}
          onChange={handleChange}
        >
          {Object.entries(PizzaCategories)
            .filter(([key]) => isNaN(Number(key)))
            .map(([key, value]) => (
              <MenuItem key={value} value={value}>
                {key}
              </MenuItem>
            ))}
        </TextField>
        <TextField
          label="Rating"
          name="rating"
          type="number"
          fullWidth
          margin="dense"
          value={pizza.rating || ""}
          onChange={handleChange}
        />
      </DialogContent>
      <DialogActions sx={{ marginRight: 2, paddingBottom: 3 }}>
        <Button onClick={handleClose} variant="contained" color="error">
          Cancel
        </Button>
        <Button onClick={handleSubmit} variant="contained" color="primary">
          Save
        </Button>
      </DialogActions>
    </Dialog>
  );
}

export default UpdatePizzaModal;
