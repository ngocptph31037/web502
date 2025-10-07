import React from "react";

export interface User {
  id: number;
  name: string;
  phone: string;
  website: string;
}

interface UserProps {
  users: User[];
  onSelect: (user: User) => void;
}

const UserList: React.FC<UserProps> = ({ users, onSelect }) => {
  return (
    <ul style={{ lineHeight: "1.8", listStyle: "decimal" }}>
      {users.map((user) => (
        <li
          key={user.id}
          style={{
            cursor: "pointer",
            borderBottom: "1px solid #ddd",
            padding: "4px 0",
          }}
          onClick={() => onSelect(user)}
        >
          {user.id}. {user.name} | {user.phone}
        </li>
      ))}
    </ul>
  );
};

export default UserList;
