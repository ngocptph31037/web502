import React, { useEffect, useMemo, useState } from "react";
import axios from "axios";
import { Link } from "react-router-dom";

interface Product {
  id: number;
  name: string;
  description: string;
  price: number;
  image: string;
}

// Debounce đơn giản
function useDebounce<T>(value: T, delay = 300): T {
  const [debounced, setDebounced] = useState(value);
  useEffect(() => {
    const t = setTimeout(() => setDebounced(value), delay);
    return () => clearTimeout(t);
  }, [value, delay]);
  return debounced;
}

const API_BASE = "http://localhost:3000";
const PAGE_SIZE = 8;

const List: React.FC = () => {
  const [products, setProducts] = useState<Product[]>([]);
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);

  // bộ lọc
  const [name, setName] = useState("");
  const [minPrice, setMinPrice] = useState<string>("");
  const [maxPrice, setMaxPrice] = useState<string>("");

  // debounce các input để giảm số lần call API
  const dName = useDebounce(name, 300);
  const dMin = useDebounce(minPrice, 300);
  const dMax = useDebounce(maxPrice, 300);

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  // mảng số trang để render
  const pages = useMemo(
    () => Array.from({ length: totalPages }, (_, i) => i + 1),
    [totalPages]
  );

  useEffect(() => {
    const source = axios.CancelToken.source();
    async function fetchProducts() {
      try {
        setLoading(true);
        setError(null);

        // chuẩn hóa giá trị min/max
        const min = dMin ? Math.max(0, Number(dMin) || 0) : undefined;
        const max = dMax ? Math.max(0, Number(dMax) || 0) : undefined;

        // nếu min > max, tự hoán đổi
        let price_gte = min;
        let price_lte = max;
        if (price_gte !== undefined && price_lte !== undefined && price_gte > price_lte) {
          [price_gte, price_lte] = [price_lte, price_gte];
        }

        const params: any = {
          _page: page,
          _limit: PAGE_SIZE,
          _sort: "name",
          _order: "asc",
        };
        if (dName.trim()) params.name_like = dName.trim();
        if (price_gte !== undefined) params.price_gte = price_gte;
        if (price_lte !== undefined) params.price_lte = price_lte;

        const res = await axios.get<Product[]>(`${API_BASE}/products`, {
          cancelToken: source.token,
          params,
        });

        setProducts(res.data);
        const totalHeader = res.headers?.["x-total-count"];
        const total = Number(typeof totalHeader === "string" ? totalHeader : res.data.length);
        setTotalPages(Math.max(1, Math.ceil(total / PAGE_SIZE)));
      } catch (err: any) {
        if (axios.isCancel?.(err) || err?.code === "ERR_CANCELED") return;
        const status = err?.response?.status;
        const detail = err?.message || "Network Error";
        setError(status ? `HTTP ${status} – ${detail}` : detail);
      } finally {
        setLoading(false);
      }
    }

    fetchProducts();
    return () => source.cancel("cancel previous request");
  }, [page, dName, dMin, dMax]);

  // khi đổi filter ⇒ về trang 1
  const onChangeName = (e: React.ChangeEvent<HTMLInputElement>) => {
    setName(e.target.value);
    setPage(1);
  };
  const onChangeMin = (e: React.ChangeEvent<HTMLInputElement>) => {
    setMinPrice(e.target.value);
    setPage(1);
  };
  const onChangeMax = (e: React.ChangeEvent<HTMLInputElement>) => {
    setMaxPrice(e.target.value);
    setPage(1);
  };

  const clearFilters = () => {
    setName("");
    setMinPrice("");
    setMaxPrice("");
    setPage(1);
  };

  const canPrev = page > 1;
  const canNext = page < totalPages;

  return (
    <div className="container mt-4">
      {/* Thanh tiêu đề + Tìm kiếm + Giá */}
      <div className="d-flex flex-wrap justify-content-between align-items-center mb-3 gap-2">
        <h2 className="m-0">Danh sách Products</h2>
        <div className="d-flex gap-2 align-items-center">
          <input
            type="text"
            className="form-control"
            placeholder="Tìm theo tên…"
            style={{ minWidth: 220 }}
            value={name}
            onChange={onChangeName}
          />
          <input
            type="number"
            min={0}
            className="form-control"
            placeholder="Giá từ"
            style={{ width: 140 }}
            value={minPrice}
            onChange={onChangeMin}
          />
          <input
            type="number"
            min={0}
            className="form-control"
            placeholder="Giá đến"
            style={{ width: 140 }}
            value={maxPrice}
            onChange={onChangeMax}
          />
          <button className="btn btn-outline-secondary" onClick={clearFilters}>
            Reset
          </button>
        </div>
      </div>

      {/* Trạng thái */}
      {loading && <div className="alert alert-info">Đang tải dữ liệu…</div>}
      {error && <div className="alert alert-danger">{error}</div>}
      {!loading && !error && products.length === 0 && (
        <div className="alert alert-warning">Không tìm thấy sản phẩm phù hợp.</div>
      )}

      {/* Danh sách sản phẩm */}
      <div className="row row-cols-1 row-cols-sm-2 row-cols-md-3 row-cols-lg-4 g-4">
        {products.map((p) => (
          <div key={p.id} className="col">
            <div className="card h-100">
              <Link to={`/products/${p.id}`} className="text-decoration-none">
                <img
                  src={p.image}
                  alt={p.name}
                  className="card-img-top"
                  style={{ aspectRatio: "4/3", objectFit: "cover" }}
                  onError={(e) => {
                    (e.currentTarget as HTMLImageElement).src =
                      "https://via.placeholder.com/600x450?text=No+Image";
                  }}
                />
              </Link>
              <div className="card-body d-flex flex-column">
                <h5 className="card-title">{p.name}</h5>
                <p className="card-text flex-grow-1">
                  {p.description?.slice(0, 100)}
                  {p.description && p.description.length > 100 ? "…" : ""}
                </p>
                <div className="d-flex justify-content-between align-items-center">
                  <span className="badge bg-success fs-6">
                    {p.price?.toLocaleString("vi-VN")}₫
                  </span>
                  <div>
                    <button className="btn btn-primary btn-sm me-2">Mua ngay</button>
                    <button className="btn btn-outline-success btn-sm">Add cart</button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Phân trang (8/sp) */}
      {totalPages > 1 && (
        <nav className="mt-4" aria-label="Pagination">
          <ul className="pagination justify-content-center">
            <li className={`page-item ${!canPrev ? "disabled" : ""}`}>
              <button
                className="page-link"
                onClick={() => canPrev && setPage((p) => p - 1)}
                disabled={!canPrev}
              >
                « Prev
              </button>
            </li>

            {pages.map((p) => (
              <li key={p} className={`page-item ${page === p ? "active" : ""}`}>
                <button className="page-link" onClick={() => setPage(p)}>
                  {p}
                </button>
              </li>
            ))}

            <li className={`page-item ${!canNext ? "disabled" : ""}`}>
              <button
                className="page-link"
                onClick={() => canNext && setPage((p) => p + 1)}
                disabled={!canNext}
              >
                Next »
              </button>
            </li>
          </ul>
        </nav>
      )}
    </div>
  );
};

export default List;
