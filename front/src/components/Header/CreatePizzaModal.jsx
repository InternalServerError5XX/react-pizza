import React, { useState } from "react";
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
import { useDispatch, useSelector } from "react-redux";
import { setCreatePizzaOpen } from "../../redux/slices/modalSlice";
import axios from "axios";
import { PizzaCategories } from "../utils/enums/PizzaCategories";
import { PizzaTypes } from "../utils/enums/PizzaTypes";

function CreatePizzaModal({ onCreate }) {
  const API_URL = import.meta.env.VITE_API_URL;
  const dispatch = useDispatch();
  const open = useSelector((state) => state.modal.createPizzaOpen);

  const initialPizzaState = {
    name: "",
    imageUrl: "",
    sizes: [],
    types: [],
    price: "",
    category: "",
    rating: 0,
  };

  const [pizza, setPizza] = useState(initialPizzaState);
  const [errors, setErrors] = useState({});

  const handleModal = () => {
    setErrors({});
    setPizza(initialPizzaState);
    dispatch(setCreatePizzaOpen(!open));
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setPizza((prev) => ({
      ...prev,
      [name]: name === "types" ? value : value,
    }));
    setErrors((prev) => ({ ...prev, [name]: "" }));
  };

  const validate = () => {
    let tempErrors = {};
    if (!pizza.name.trim()) tempErrors.name = "Name is required";
    if (!pizza.imageUrl.trim()) tempErrors.imageUrl = "Image URL is required";
    if (!pizza.sizes.length) tempErrors.sizes = "Sizes are required";
    if (!pizza.types.length) tempErrors.types = "Select at least one type";
    if (!pizza.price || isNaN(pizza.price) || parseFloat(pizza.price) <= 0)
      tempErrors.price = "Enter a valid price";
    if (!pizza.category || isNaN(pizza.category))
      tempErrors.category = "Select a valid category";

    setErrors(tempErrors);
    return Object.keys(tempErrors).length === 0;
  };

  const sendRequest = async () => {
    await axios.post(API_URL, {
      ...pizza,
      sizes: pizza.sizes.split(",").map(Number),
      types: pizza.types.map((type) => parseInt(type, 10)),
      price: parseFloat(pizza.price),
      rating: parseFloat(pizza.rating),
      category: parseInt(pizza.category, 10),
    });
  };

  const handleSubmit = async () => {
    if (!validate()) return;

    try {
      await sendRequest();
      onCreate();
      handleModal();
    } catch (error) {
      console.error("Error creating pizza:", error);
    }
  };

  return (
    <Dialog open={open} onClose={handleModal}>
      <DialogTitle sx={{ marginTop: 1 }}>Create Pizza</DialogTitle>
      <DialogContent>
        <TextField
          label="Name"
          name="name"
          fullWidth
          margin="dense"
          value={pizza.name}
          onChange={handleChange}
          error={!!errors.name}
          helperText={errors.name}
        />
        <TextField
          label="Image URL"
          name="imageUrl"
          fullWidth
          margin="dense"
          value={pizza.imageUrl}
          onChange={handleChange}
          error={!!errors.imageUrl}
          helperText={errors.imageUrl}
        />
        <TextField
          label="Sizes"
          name="sizes"
          fullWidth
          margin="dense"
          value={pizza.sizes}
          onChange={handleChange}
          error={!!errors.sizes}
          helperText={errors.sizes}
        />

        <FormControl fullWidth margin="dense" error={!!errors.types}>
          <InputLabel>Pizza Types</InputLabel>
          <Select
            multiple
            name="types"
            value={pizza.types || []}
            onChange={handleChange}
            input={<OutlinedInput label="Pizza Types" />}
            renderValue={(selected) =>
              selected.map((val) => PizzaTypes[val]).join(", ")
            }
          >
            {Object.entries(PizzaTypes)
              .filter(([key]) => isNaN(Number(key)))
              .map(([key, value]) => (
                <MenuItem key={value} value={value}>
                  {key}
                </MenuItem>
              ))}
          </Select>
          {errors.types && <p style={{ color: "red" }}>{errors.types}</p>}
        </FormControl>

        <TextField
          label="Price"
          name="price"
          type="number"
          fullWidth
          margin="dense"
          value={pizza.price}
          onChange={handleChange}
          error={!!errors.price}
          helperText={errors.price}
        />

        <TextField
          select
          label="Category"
          name="category"
          fullWidth
          margin="dense"
          value={pizza.category}
          onChange={handleChange}
          error={!!errors.category}
          helperText={errors.category}
        >
          {Object.entries(PizzaCategories)
            .filter(([key]) => isNaN(Number(key)))
            .map(([key, value]) => (
              <MenuItem key={value} value={value}>
                {key}
              </MenuItem>
            ))}
        </TextField>
      </DialogContent>
      <DialogActions sx={{ marginRight: 2, paddingBottom: 3 }}>
        <Button onClick={handleModal} variant="contained" color="error">
          Cancel
        </Button>
        <Button onClick={handleSubmit} variant="contained" color="primary">
          Save
        </Button>
      </DialogActions>
    </Dialog>
  );
}

export default CreatePizzaModal;
