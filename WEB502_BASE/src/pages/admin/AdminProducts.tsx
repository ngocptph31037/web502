import { useEffect, useMemo, useState } from "react";
import { Link } from "react-router-dom";
import axios from "axios";

interface Product { id:number; name:string; description:string; price:number; image:string; }
function useDebounce<T>(v:T, d=400){ const [x,setX]=useState(v); useEffect(()=>{const t=setTimeout(()=>setX(v),d); return()=>clearTimeout(t)},[v,d]); return x; }
const PAGE_SIZE = 10;

export default function AdminProducts(){
  const [items,setItems]=useState<Product[]>([]);
  const [page,setPage]=useState(1);
  const [totalPages,setTotalPages]=useState(1);
  const [loading,setLoading]=useState(false);
  const [error,setError]=useState<string|null>(null);

  const [search,setSearch]=useState(""); const [minPrice,setMin]=useState(""); const [maxPrice,setMax]=useState("");
  const qSearch=useDebounce(search), qMin=useDebounce(minPrice), qMax=useDebounce(maxPrice);

  const url = useMemo(()=> {
    const p = new URLSearchParams();
    p.set("_page", String(page)); p.set("_limit", String(PAGE_SIZE));
    p.set("_sort","id"); p.set("_order","desc");
    if(qSearch.trim()) p.set("name_like", qSearch.trim());
    if(qMin.trim()!=="") p.set("price_gte", qMin.trim());
    if(qMax.trim()!=="") p.set("price_lte", qMax.trim());
    return `/api/products?${p.toString()}`;
  }, [page,qSearch,qMin,qMax]);

  useEffect(()=>{ setPage(1) },[qSearch,qMin,qMax]);

  useEffect(()=>{ let off=false;(async()=>{
    try{ setLoading(true); setError(null);
      const res = await axios.get<Product[]>(url);
      if(off) return;
      setItems(res.data);
      const total = Number(res.headers["x-total-count"] ?? res.headers["X-Total-Count"] ?? 0);
      setTotalPages(Math.max(1, Math.ceil(total/PAGE_SIZE)));
    }catch(e:any){ if(!off) setError(e?.message||"Load error"); }
    finally{ if(!off) setLoading(false); }
  })(); return()=>{off=true}; },[url]);

  const canPrev=page>1, canNext=page<totalPages;

  return (
    <div>
      {/* Header */}
      <div className="d-flex flex-wrap gap-2 justify-content-between align-items-center mb-3">
        <div>
          <h4 className="mb-0">Products</h4>
          <div className="text-muted small">Filter, paginate (10 / page)</div>
        </div>
        <Link to="/admin/products/add" className="btn btn-primary">
          + Add Product
        </Link>
      </div>

      {/* Filters */}
      <div className="card border-0 shadow-sm mb-3">
        <div className="card-body">
          <div className="row g-3">
            <div className="col-md-5">
              <label className="form-label">Search name</label>
              <div className="input-group">
                <span className="input-group-text">🔎</span>
                <input className="form-control" placeholder="e.g. iPhone..." value={search} onChange={e=>setSearch(e.target.value)} />
              </div>
            </div>
            <div className="col-md-3">
              <label className="form-label">Min price</label>
              <input type="number" min={0} className="form-control" placeholder="0" value={minPrice} onChange={e=>setMin(e.target.value)} />
            </div>
            <div className="col-md-3">
              <label className="form-label">Max price</label>
              <input type="number" min={0} className="form-control" placeholder="1000000" value={maxPrice} onChange={e=>setMax(e.target.value)} />
            </div>
          </div>
        </div>
      </div>

      {/* Table */}
      <div className="table-responsive">
        <table className="table table-hover align-middle">
          <thead className="table-light">
            <tr>
              <th style={{width:80}} className="text-muted">ID</th>
              <th>Image</th>
              <th>Name</th>
              <th>Description</th>
              <th className="text-end" style={{width:160}}>Price (₫)</th>
              <th style={{width:220}} className="text-end">Actions</th>
            </tr>
          </thead>
          <tbody>
            {loading && <tr><td colSpan={6}>Loading...</td></tr>}
            {error && !loading && <tr><td colSpan={6} className="text-danger">{error}</td></tr>}
            {!loading && !error && items.length===0 && <tr><td colSpan={6}>No data</td></tr>}
            {!loading && !error && items.map(p=>(
              <tr key={p.id}>
                <td className="text-muted">{p.id}</td>
                <td>
                  <img src={p.image} alt={p.name} style={{width:56,height:56,objectFit:"cover"}} className="rounded"/>
                </td>
                <td className="fw-semibold">{p.name}</td>
                <td className="text-truncate" style={{maxWidth:420}}>{p.description}</td>
                <td className="text-end">{p.price.toLocaleString("vi-VN")}</td>
                <td className="text-end">
                  <div className="btn-group">
                    <Link className="btn btn-sm btn-outline-secondary" to={`/admin/products/${p.id}/edit`}>Edit</Link>
                    <button className="btn btn-sm btn-outline-danger" onClick={async()=>{
                      if(!confirm("Delete this product?")) return;
                      await axios.delete(`/api/products/${p.id}`);
                      setItems(prev=>prev.filter(i=>i.id!==p.id));
                    }}>Delete</button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Pagination */}
      {totalPages>1 && (
        <nav className="mt-3 d-flex justify-content-center">
          <ul className="pagination">
            <li className={`page-item ${!canPrev?"disabled":""}`}>
              <button className="page-link" disabled={!canPrev} onClick={()=>setPage(p=>p-1)}>« Prev</button>
            </li>
            <li className="page-item disabled"><span className="page-link">Page {page}/{totalPages}</span></li>
            <li className={`page-item ${!canNext?"disabled":""}`}>
              <button className="page-link" disabled={!canNext} onClick={()=>setPage(p=>p+1)}>Next »</button>
            </li>
          </ul>
        </nav>
      )}
    </div>
  );
}
