import { useEffect, useState } from "react";

interface User {
  id: number;
  name: string;
  phone: string;
  website: string;
}

export default function App() {
  const [users, setUsers] = useState<User[]>([]);
  const [selectedUser, setSelectedUser] = useState<User | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string>("");
  useEffect(() => {
    fetch("https://jsonplaceholder.typicode.com/users")
      .then((res) => {
        if (!res.ok) throw new Error("Không thể tải dữ liệu người dùng!");
        return res.json();
      })
      .then((data) => {
        setUsers(data);
        setLoading(false);
      })
      .catch((err) => {
        setError(err.message);
        setLoading(false);
      });
  }, []);

  return (
    <div
      style={{
        padding: "20px",
        fontFamily: "Arial, sans-serif",
        maxWidth: "700px",
        margin: "0 auto",
      }}
    >
      <h1 style={{ textAlign: "center" }}>useEffect</h1>
      {loading && <p>Đang tải danh sách người dùng...</p>}
      {error && <p style={{ color: "red" }}>{error}</p>}
      {!loading && !error && (
        <ul style={{ lineHeight: "1.8", listStyle: "decimal" }}>
          {users.map((user) => (
            <li
              key={user.id}
              style={{
                cursor: "pointer",
                borderBottom: "1px solid #ddd",
                padding: "4px 0",
              }}
              onClick={() => setSelectedUser(user)}
            >
              {user.id}. {user.name} | {user.phone}
            </li>
          ))}
        </ul>
      )}
      <h2 style={{ marginTop: "30px" }}>Thông tin chi tiết</h2>
      <div
        style={{
          border: "1px solid #ccc",
          borderRadius: "8px",
          padding: "10px 15px",
          background: "#fafafa",
        }}
      >
        {selectedUser ? (
          <>
            <p>
              <b>Họ và tên:</b> {selectedUser.name}
            </p>
            <p>
              <b>Số điện thoại:</b> {selectedUser.phone}
            </p>
            <p>
              <b>Website:</b>{" "}
              <a href={`https://${selectedUser.website}`} target="_blank">
                {selectedUser.website}
              </a>
            </p>
          </>
        ) : (
          <p>Click vào 1 user để xem chi tiết</p>
        )}
      </div>
    </div>
  );
}
