import React from "react";
import Select from "@mui/material/Select";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import MUIPagination from "@mui/material/Pagination";
import { useSelector, useDispatch } from "react-redux";
import { setPagination } from "../../redux/slices/paginationSlice";

function Pagination({ totalPages }) {
  const dispatch = useDispatch();
  const { pageNumber, pageSize } = useSelector((state) => state.pagination);

  const handlePageChange = (event, value) => {
    dispatch(
      setPagination({
        pageNumber: value,
        pageSize,
      })
    );
  };

  const handlePageSizeChange = (event) => {
    const newSize = event.target.value;
    dispatch(
      setPagination({
        pageNumber: 1,
        pageSize: newSize,
      })
    );
  };

  return (
    <>
      <MUIPagination
        count={totalPages}
        page={pageNumber}
        onChange={handlePageChange}
        color="primary"
        size="large"
      />

      <FormControl>
        <Select
          value={pageSize}
          onChange={handlePageSizeChange}
          sx={{ height: "40px" }}
        >
          <MenuItem value={4}>4</MenuItem>
          <MenuItem value={8}>8</MenuItem>
        </Select>
      </FormControl>
    </>
  );
}

export default Pagination;
