import { useEffect, useMemo, useState } from "react";
import { Link } from "react-router-dom";
import axios from "axios";

interface Product {
  id: number;
  name: string;
  description: string;
  price: number;
  image: string;
}

function useDebounce<T>(value: T, delay = 400): T {
  const [debounced, setDebounced] = useState(value);
  useEffect(() => {
    const t = setTimeout(() => setDebounced(value), delay);
    return () => clearTimeout(t);
  }, [value, delay]);
  return debounced;
}

const PAGE_SIZE = 10;

export default function AdminProducts() {
  const [items, setItems] = useState<Product[]>([]);
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string|null>(null);

  const [search, setSearch] = useState("");
  const [minPrice, setMinPrice] = useState<string>("");
  const [maxPrice, setMaxPrice] = useState<string>("");

  const dSearch = useDebounce(search);
  const dMin = useDebounce(minPrice);
  const dMax = useDebounce(maxPrice);

  const requestUrl = useMemo(() => {
    const p = new URLSearchParams();
    p.set("_page", String(page));
    p.set("_limit", String(PAGE_SIZE));
    p.set("_sort", "id");
    p.set("_order", "desc");
    if (dSearch.trim()) p.set("name_like", dSearch.trim());
    if (dMin.trim() !== "") p.set("price_gte", dMin.trim());
    if (dMax.trim() !== "") p.set("price_lte", dMax.trim());
    return `/api/products?${p.toString()}`;
  }, [page, dSearch, dMin, dMax]);

  useEffect(() => { setPage(1) }, [dSearch, dMin, dMax]);

  useEffect(() => {
    let cancelled = false;
    (async () => {
      setLoading(true); setError(null);
      try {
        const res = await axios.get<Product[]>(requestUrl);
        if (cancelled) return;
        setItems(res.data);
        const total = Number(res.headers["x-total-count"] ?? res.headers["X-Total-Count"] ?? 0);
        setTotalPages(Math.max(1, Math.ceil(total / PAGE_SIZE)));
      } catch (e:any) {
        if (!cancelled) setError(e?.message || "Load error");
      } finally {
        if (!cancelled) setLoading(false);
      }
    })();
    return () => { cancelled = true };
  }, [requestUrl]);

  const canPrev = page > 1;
  const canNext = page < totalPages;

  return (
    <div>
      <div className="d-flex justify-content-between align-items-center mb-3">
        <h4 className="mb-0">Products</h4>
        <Link to="/admin/products/add" className="btn btn-primary">+ Add</Link>
      </div>

      <div className="card p-3 mb-3">
        <div className="row g-3">
          <div className="col-md-4">
            <label className="form-label">Search name</label>
            <input className="form-control" value={search} onChange={(e)=>setSearch(e.target.value)} placeholder="e.g. iPhone..." />
          </div>
          <div className="col-md-3">
            <label className="form-label">Min price</label>
            <input type="number" className="form-control" value={minPrice} onChange={(e)=>setMinPrice(e.target.value)} placeholder="0" />
          </div>
          <div className="col-md-3">
            <label className="form-label">Max price</label>
            <input type="number" className="form-control" value={maxPrice} onChange={(e)=>setMaxPrice(e.target.value)} placeholder="1000000" />
          </div>
        </div>
      </div>

      <div className="table-responsive">
        <table className="table table-striped align-middle">
          <thead>
            <tr>
              <th style={{width:80}}>ID</th>
              <th>Image</th>
              <th>Name</th>
              <th>Description</th>
              <th className="text-end" style={{width:160}}>Price (₫)</th>
              <th style={{width:200}}>Actions</th>
            </tr>
          </thead>
          <tbody>
            {loading && <tr><td colSpan={6}>Loading...</td></tr>}
            {error && !loading && <tr><td colSpan={6} className="text-danger">{error}</td></tr>}
            {!loading && !error && items.length === 0 && <tr><td colSpan={6}>No data</td></tr>}
            {!loading && !error && items.map(p => (
              <tr key={p.id}>
                <td>{p.id}</td>
                <td><img src={p.image} alt={p.name} style={{width:56, height:56, objectFit:"cover", borderRadius:8}}/></td>
                <td>{p.name}</td>
                <td className="text-truncate" style={{maxWidth:360}}>{p.description}</td>
                <td className="text-end">{p.price.toLocaleString("vi-VN")}</td>
                <td>
                  <div className="btn-group">
                    <Link className="btn btn-sm btn-warning" to={`/admin/products/${p.id}/edit`}>Edit</Link>
                    <button className="btn btn-sm btn-danger" onClick={async ()=>{
                      if(!confirm("Delete this product?")) return;
                      await axios.delete(`/api/products/${p.id}`);
                      setItems(prev => prev.filter(i=>i.id!==p.id));
                    }}>Delete</button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {totalPages > 1 && (
        <nav className="mt-3">
          <ul className="pagination">
            <li className={`page-item ${!canPrev ? "disabled" : ""}`}>
              <button className="page-link" disabled={!canPrev} onClick={()=>setPage(p=>p-1)}>« Prev</button>
            </li>
            <li className="page-item disabled"><span className="page-link">Page {page}/{totalPages}</span></li>
            <li className={`page-item ${!canNext ? "disabled" : ""}`}>
              <button className="page-link" disabled={!canNext} onClick={()=>setPage(p=>p+1)}>Next »</button>
            </li>
          </ul>
        </nav>
      )}
    </div>
  );
}
