import { NavLink, Outlet, Link } from "react-router-dom";

export default function AdminLayout() {
  return (
    <div className="d-flex" style={{ minHeight: "100vh" }}>
      {/* Sidebar */}
      <aside className="bg-dark text-white d-flex flex-column p-3" style={{ width: 260 }}>
        <Link to="/" className="text-white text-decoration-none">
          <h5 className="mb-4 fw-bold">WEB502 Admin</h5>
        </Link>

        <ul className="nav nav-pills flex-column gap-1 mb-auto">
          <li className="nav-item">
            <NavLink
              to="/admin/products"
              className={({ isActive }) =>
                "nav-link w-100 text-start " + (isActive ? "active" : "text-white-50")
              }
            >
              <i className="bi bi-box-seam me-2" /> Products
            </NavLink>
          </li>
        </ul>

        <div className="small text-white-50">
          <span className="d-block">© {new Date().getFullYear()} WEB502</span>
        </div>
      </aside>

      {/* Main */}
      <main className="flex-grow-1 bg-light">
        {/* Top bar */}
        <div className="border-bottom bg-white">
          <div className="container-fluid py-3">
            <h5 className="m-0 fw-semibold">Dashboard</h5>
          </div>
        </div>

        {/* Content */}
        <div className="container-fluid p-4">
          <div className="card shadow-sm border-0">
            <div className="card-body">
              <Outlet />
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}
