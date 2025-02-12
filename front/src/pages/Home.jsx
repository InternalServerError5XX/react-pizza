import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { pizzaApi } from "../components/utils/helpers/axiosInstance";
import Categories from "../components/Filter/Categories";
import Sort from "../components/Filter/Sort";
import PizzaItem from "../components/Main/PizzaItem";
import CircularProgress from "@mui/material/CircularProgress";
import Pagination from "../components/Filter/Pagination";
import CreatePizzaModal from "../components/Header/CreatePizzaModal";
import UpdatePizzaModal from "../components/Main/UpdatePizzaModal";

const Home = () => {
  const { searchValue } = useSelector((state) => state.search);
  const { category, sortBy, isAsc } = useSelector((state) => state.filter);
  const { pageNumber, pageSize } = useSelector((state) => state.pagination);

  const [loading, setLoading] = useState(true);
  const [items, setItems] = useState([]);
  const [totalPages, setTotalPages] = useState(1);
  const [refresh, setRefresh] = useState(0);

  const fetchData = async () => {
    setLoading(true);
    try {
      const { data } = await pizzaApi.get("", {
        params: {
          pageNumber,
          pageSize,
          name: searchValue,
          category,
          sortBy,
          isAsc,
        },
      });

      setItems(data.data);
      setTotalPages(data.totalPages);
    } catch (error) {
      console.error("Error fetching pizzas:", error);
    } finally {
      setLoading(false);
    }
  };

  const handleRefresh = () => {
    setRefresh((prev) => prev + 1);
  };

  useEffect(() => {
    fetchData();
  }, [pageNumber, pageSize, searchValue, category, sortBy, isAsc, refresh]);

  return (
    <>
      <div className="content__top">
        <Categories />
        <Sort />
      </div>
      <h2 className="content__title">All pizzas</h2>

      <div className="content__items">
        <CreatePizzaModal onCreate={handleRefresh} />
        <UpdatePizzaModal onUpdate={handleRefresh} />
        {loading ? (
          <div className="loader-container">
            <CircularProgress color="primary" size="4rem" />
          </div>
        ) : (
          items.map((obj) => (
            <PizzaItem key={obj.id} {...obj} onDelete={handleRefresh} />
          ))
        )}

        <Pagination totalPages={totalPages} />
      </div>
    </>
  );
};

export default Home;
