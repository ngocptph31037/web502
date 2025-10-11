# Bài tập 9 & 10 — Routes, Layout & Admin Products

## Bài 9 (Routes, Layout)
- Client layout: `src/pages/Layout.tsx` (navbar, footer, <Outlet/>).
- Admin layout: `src/admin/AdminLayout.tsx` (sidebar trái, nội dung phải).
- Router: `src/main.tsx`
  - Client: `/`, `/products/:id`
  - Admin: `/admin`, `/admin/products`, `/admin/products/add`, `/admin/products/:id/edit`

## Bài 10 (Hoàn thiện List Products Admin)
- Trang: `src/admin/AdminProducts.tsx`
- Hiển thị danh sách dạng **table**.
- **Phân trang**: `page` 1..N, kích thước trang `limit=10` (đặt hằng số `PAGE_SIZE=10`).
- **Filter**:
  - `search` theo tên → `name_like`
  - `minPrice` → `price_gte`
  - `maxPrice` → `price_lte`
- API gọi qua proxy `/api` (xem `vite.config.ts`).
- Với json-server: đọc `X-Total-Count` để tính tổng trang.

## Cách chạy
```bash
npm i
npm run server    # API: http://localhost:3000/products
npm run dev       # Web: http://localhost:5173
```
