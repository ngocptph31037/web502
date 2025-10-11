import { Toaster } from "react-hot-toast";
import { Route, Routes } from "react-router-dom";
import Home from "./pages/Home";
import Users from "./components/User";
import List from "./pages/List";
import Add from "./pages/Add";
import Edit from "./pages/Edit";
import ClientLayout from "./layouts/ClientLayout";
import AdminLayout from "./layouts/AdminLayout";

function App() {
  return (
    <>
      <Routes>
        {/* Client Layout */}
        <Route path="/" element={<ClientLayout />}>
          <Route index element={<Home />} />
          <Route path="users" element={<Users />}></Route>
        </Route>

        {/* Admin Layout */}
        <Route path="/admin" element={<AdminLayout />}>
          <Route path="list" element={<List />}></Route>
          <Route path="add" element={<Add />}></Route>
          <Route path="edit" element={<Edit />}></Route>
        </Route>
      </Routes>
      <Toaster />
    </>
  );
}

export default App;
