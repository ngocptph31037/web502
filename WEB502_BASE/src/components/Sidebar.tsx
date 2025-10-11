import { Link } from "react-router-dom";

export default function Sidebar() {
  return (
    <div
      className="d-flex flex-column flex-shrink-0 p-3 bg-dark text-white"
      style={{ width: "250px", height: "100vh" }}
    >
      <Link
        to="/"
        className="d-flex align-items-center mb-3 mb-md-0 me-md-auto text-white text-decoration-none"
      >
        <span className="fs-4">WEB502 Admin</span>
      </Link>
      <hr />
      <ul className="nav nav-pills flex-column mb-auto">
        <li className="nav-item">
          <a
            href="#"
            className="nav-link active text-white"
            aria-current="page"
          >
            Dashboard
          </a>
        </li>
        <li>
          <a href="#" className="nav-link text-white">
            Orders
          </a>
        </li>
        <li>
          <a href="#" className="nav-link text-white">
            Products
          </a>
        </li>
        <li>
          <a href="#" className="nav-link text-white">
            Customers
          </a>
        </li>
        <li>
          <a href="#" className="nav-link text-white">
            Reports
          </a>
        </li>
      </ul>
      <hr />
      <div className="dropdown">
        <a
          href="#"
          className="d-flex align-items-center text-white text-decoration-none dropdown-toggle"
          data-bs-toggle="dropdown"
        >
          <img
            src="https://i.pravatar.cc/30"
            alt=""
            width="30"
            height="30"
            className="rounded-circle me-2"
          />
          <strong>Admin</strong>
        </a>
        <ul className="dropdown-menu dropdown-menu-dark text-small shadow">
          <li>
            <a className="dropdown-item" href="#">
              Profile
            </a>
          </li>
          <li>
            <a className="dropdown-item" href="#">
              Settings
            </a>
          </li>
          <li>
            <hr className="dropdown-divider" />
          </li>
          <li>
            <a className="dropdown-item" href="#">
              Logout
            </a>
          </li>
        </ul>
      </div>
    </div>
  );
}
