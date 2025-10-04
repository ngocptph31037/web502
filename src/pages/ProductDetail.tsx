import React, { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";
import axios from "axios";

interface Product {
  id: number;
  name: string;
  description: string;
  price: number;
  image: string;
}

const API_BASE = "http://localhost:3000"; // Nếu dùng Vite proxy: đổi thành "" và gọi `/api/products/${id}`

const ProductDetail: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const [product, setProduct] = useState<Product | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (!id) {
      setError("Thiếu mã sản phẩm");
      setLoading(false);
      return;
    }

    const source = axios.CancelToken.source();

    async function fetchDetail() {
      try {
        setLoading(true);
        setError(null);
        const res = await axios.get<Product>(`${API_BASE}/products/${id}`, {
          cancelToken: source.token,
        });
        setProduct(res.data);
      } catch (err: any) {
        if (axios.isCancel?.(err) || err?.code === "ERR_CANCELED") return;
        const status = err?.response?.status;
        if (status === 404) setError("Không tìm thấy sản phẩm.");
        else setError(err?.message || "Network Error");
      } finally {
        setLoading(false);
      }
    }

    fetchDetail();
    return () => source.cancel("cancel previous request");
  }, [id]);

  if (loading) return <p className="text-center mt-5">Đang tải…</p>;
  if (error)
    return (
      <div className="container mt-4">
        <div className="alert alert-danger">{error}</div>
        <Link to="/" className="btn btn-secondary">Quay lại</Link>
      </div>
    );
  if (!product)
    return (
      <div className="container mt-4">
        <div className="alert alert-warning">Không có dữ liệu sản phẩm.</div>
        <Link to="/" className="btn btn-secondary">Quay lại</Link>
      </div>
    );

  return (
    <div className="container mt-4">
      <div className="row g-4">
        <div className="col-md-6">
          <img
            src={product.image}
            alt={product.name}
            className="img-fluid rounded"
            style={{ aspectRatio: "4/3", objectFit: "cover" }}
            onError={(e) => {
              (e.currentTarget as HTMLImageElement).src =
                "https://via.placeholder.com/800x600?text=No+Image";
            }}
          />
        </div>
        <div className="col-md-6">
          <h2 className="mb-3">{product.name}</h2>
          <h4 className="text-danger mb-3">
            {product.price.toLocaleString("vi-VN")}₫
          </h4>
          <p className="mb-4">{product.description}</p>
          <div className="d-flex gap-2">
            <button className="btn btn-primary">Mua ngay</button>
            <button className="btn btn-success">Add cart</button>
            <Link to="/" className="btn btn-secondary ms-auto">Quay lại</Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProductDetail;
