import { useEffect, useState } from "react";
import axios from "axios";
interface User {
  id: number;
  name: string;
  username: string;
  email: string;
  address: {
    street: string;
    city: string;
  };
  company: {
    name: string;
  };
}
function Users() {
  const [users, setUsers] = useState<User[]>([]);
  const [userId, setUserId] = useState<number | null>(null);

  const [selectedUser, setSelectedUser] = useState<User | null>(null); //--User | null bđ k ai đc chọn
  useEffect(() => {
    axios
      .get("https://jsonplaceholder.typicode.com/users")
      .then((res) => {
        console.log(res.data);

        setUsers(res.data);
      })
      .catch((err) => console.error("Lỗi tải danh sách:", err));
  }, []);

  useEffect(() => {
    console.log({ userId });

    if (!userId) return;
    axios
      .get("https://jsonplaceholder.typicode.com/users/" + userId)
      .then((res) => setSelectedUser(res.data))
      .catch((err) => console.error("Lỗi tải danh sách:", err));
  }, [userId]);

  const handleUserClick = (id: number) => {
    setUserId(id);
    console.log(userId);
  };

  return (
    <div>
      <h2>Danh sách người dùng</h2>
      <ul className="list-users mt3">
        {users.map((user) => (
          <li
            key={user.id}
            className="list-users-item"
            onClick={() => handleUserClick(user.id)}
            style={{ cursor: "pointer", fontSize: 30 }}
          >
            Ten toi la {user.name} - co email la {user.email}
          </li>
        ))}
      </ul>
      {/* Hiển thị chi tiết users */}
      {selectedUser && (
        <div className="card mt-4 p-3 shadow-sm">
          <h2>Chi tiết người dùng</h2>
          <p>
            <strong>Tên:</strong>
            {selectedUser.name}
          </p>
          <p>
            <strong>Username:</strong>
            {selectedUser.username}
          </p>
          <p>
            <strong>Email:</strong>
            {selectedUser.email}
          </p>
          <p>
            <strong>Địa chỉ:</strong>
            {selectedUser.address.street}, {selectedUser.address.city}
          </p>
          <p>
            <strong>Công ty:</strong>
            {selectedUser.company.name}
          </p>
        </div>
      )}
    </div>
  );
}
export default Users;
