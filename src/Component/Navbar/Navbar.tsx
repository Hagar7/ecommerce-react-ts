import { logOut } from "../../Store/AuthSlice";
import { useAppDispatch, useAppSelector } from "../../Store/hooks";
import style from "./Navbar.module.scss";
import { Link } from "react-router-dom";

const Navbar = () => {
  const dispatch = useAppDispatch();

  const { authUser } = useAppSelector((state) => state.auth);
  return (
    <nav className={`${style.mainNav} navbar navbar-expand-lg navbar-light`}>
      <div className="container-fluid">
        <Link className="navbar-brand" to="/">
          <img src="images/freshcart-logo.svg" alt="logo" />
        </Link>
        <button
          className={`${style.toggleBtn} navbar-toggler`}
          type="button"
          data-bs-toggle="collapse"
          data-bs-target="#navbarSupportedContent"
          aria-controls="navbarSupportedContent"
          aria-expanded="false"
          aria-label="Toggle navigation"
        >
          <span className="navbar-toggler-icon" />
        </button>
        <div className="collapse navbar-collapse" id="navbarSupportedContent">
          <ul className="navbar-nav ms-auto mt-2 mt-lg-0">
            {authUser ? (
              <>
                <li className="nav-item">
                  <Link className="nav-link active" to="/" aria-current="page">
                    Home <span className="visually-hidden">(current)</span>
                  </Link>
                </li>
                <li className="nav-item">
                  <Link className="nav-link" to="product">
                    Products
                  </Link>
                </li>
                <li className="nav-item">
                  <Link className="nav-link" to="contact">
                    Contact
                  </Link>
                </li>
                <li className="nav-item" onClick={() => dispatch(logOut())}>
                  <span className="nav-link curusor_pointer">Logout</span>
                </li>
              </>
            ) : (
              <>
                <li className="nav-item">
                  <Link className="nav-link" to="login">
                    Login
                  </Link>
                </li>

                <li className="nav-item">
                  <Link className="nav-link" to="register">
                    Register
                  </Link>
                </li>
              </>
            )}
          </ul>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
