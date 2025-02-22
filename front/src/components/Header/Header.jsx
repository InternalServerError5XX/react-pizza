import { Link, useNavigate } from "react-router-dom";
import Search from "../Filter/Search";
import AddCircleOutlineIcon from "@mui/icons-material/AddCircleOutline";
import { useDispatch, useSelector } from "react-redux";
import { setCreatePizzaOpen } from "../../redux/slices/modalSlice";
import { getCartItemsCount, getCartTotal } from "../../redux/slices/cartSlise";
import { logout } from "../../redux/slices/authSlice";

function Header() {
  const dispatch = useDispatch();
  const handleOpen = () => dispatch(setCreatePizzaOpen(true));
  const cartItemsCount = useSelector((state) => getCartItemsCount(state));
  const cartTotal = useSelector((state) => getCartTotal(state));
  const token = useSelector((state) => state.auth.token);
  const role = useSelector((state) => state.auth.role);
  const navigate = useNavigate();

  const handleAuth = () => {
    navigate("/login");
  };

  const handleLogout = () => {
    dispatch(logout());
  };

  return (
    <header className="header">
      <div className="container">
        <Link to="/">
          <div className="header__logo">
            <img width="38" src="img/pizza-logo.svg" alt="Pizza logo" />
            <div>
              <h1>React Pizza</h1>
              <p>Cringe dev shit</p>
            </div>
          </div>
        </Link>
        <Search />
        {!token ? (
          <div className="header__cart" onClick={handleAuth}>
            <div
              className="button button--outline"
              style={{ padding: "10px", minWidth: "20px" }}
            >
              Authenticate
            </div>
          </div>
        ) : (
          <div
            className="header__cart"
            style={{
              marginRight: role?.toLowerCase() === "admin" ? "-215px" : "-25px",
            }}
            onClick={handleLogout}
          >
            <div
              className="button button--outline"
              style={{ padding: "10px", minWidth: "20px" }}
            >
              Logout
            </div>
          </div>
        )}

        {role?.toLowerCase() === "admin" && (
          <div className="header__cart" onClick={handleOpen}>
            <div
              className="button button--cart"
              style={{ padding: "10px", minWidth: "20px" }}
            >
              <AddCircleOutlineIcon sx={{ marginLeft: 1 }} />
            </div>
          </div>
        )}
        <div className="header__cart" style={{ marginLeft: "-220px" }}>
          <Link to="/cart" className="button button--cart">
            <span>${cartTotal}</span>
            <div className="button__delimiter"></div>
            <svg
              width="18"
              height="18"
              viewBox="0 0 18 18"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M6.33333 16.3333C7.06971 16.3333 7.66667 15.7364 7.66667 15C7.66667 14.2636 7.06971 13.6667 6.33333 13.6667C5.59695 13.6667 5 14.2636 5 15C5 15.7364 5.59695 16.3333 6.33333 16.3333Z"
                stroke="white"
                strokeWidth="1.8"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
              <path
                d="M14.3333 16.3333C15.0697 16.3333 15.6667 15.7364 15.6667 15C15.6667 14.2636 15.0697 13.6667 14.3333 13.6667C13.597 13.6667 13 14.2636 13 15C13 15.7364 13.597 16.3333 14.3333 16.3333Z"
                stroke="white"
                strokeWidth="1.8"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
              <path
                d="M4.78002 4.99999H16.3334L15.2134 10.5933C15.1524 10.9003 14.9854 11.176 14.7417 11.3722C14.4979 11.5684 14.1929 11.6727 13.88 11.6667H6.83335C6.50781 11.6694 6.1925 11.553 5.94689 11.3393C5.70128 11.1256 5.54233 10.8295 5.50002 10.5067L4.48669 2.82666C4.44466 2.50615 4.28764 2.21182 4.04482 1.99844C3.80201 1.78505 3.48994 1.66715 3.16669 1.66666H1.66669"
                stroke="white"
                strokeWidth="1.8"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>
            <span>{cartItemsCount}</span>
          </Link>
        </div>
      </div>
    </header>
  );
}

export default Header;
