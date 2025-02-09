import { useState, useEffect, useCallback } from "react";
import debounce from "lodash.debounce";
import CloseIcon from "@mui/icons-material/Close";
import { useDispatch } from "react-redux";
import { clearSearch, setSearchValue } from "../../redux/slices/searchSlice";

function Search() {
  const [isFocused, setIsFocused] = useState(false);
  const [inputValue, setInputValue] = useState("");
  const dispatch = useDispatch();

  const debouncedSearch = useCallback(
    debounce((value) => {
      dispatch(setSearchValue(value));
    }, 500)
  );

  useEffect(() => {
    debouncedSearch(inputValue);
    return () => debouncedSearch.cancel();
  }, [inputValue]);

  return (
    <div style={{ position: "relative", width: "300px" }}>
      <input
        style={{
          border: `1px solid ${
            isFocused ? "rgba(0, 0, 0, 0.3)" : "rgba(0, 0, 0, 0.1)"
          }`,
          padding: "12px 18px",
          width: "100%",
          borderRadius: "5px",
          fontSize: "15px",
          paddingRight: "30px",
          transition: "0.15s",
        }}
        value={inputValue}
        onChange={(e) => setInputValue(e.target.value)}
        placeholder="Search"
        onFocus={() => setIsFocused(true)}
        onBlur={() => setIsFocused(false)}
      />
      {inputValue && (
        <CloseIcon
          onClick={() => {
            setInputValue("");
            dispatch(clearSearch());
          }}
          style={{
            cursor: "pointer",
            position: "absolute",
            right: "10px",
            top: "50%",
            transform: "translateY(-50%)",
          }}
        />
      )}
    </div>
  );
}

export default Search;
