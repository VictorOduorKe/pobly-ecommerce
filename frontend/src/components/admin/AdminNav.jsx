import { Link } from 'react-router-dom';
const AdminNav = () => (
    <nav className="bg-brown-900 text-white px-4 py-3 flex gap-4">
        <Link to="/admin/dashboard" className="bg-amber-900 border-2 rounded-2xl px-1.5 py-1.5 hover:bg-amber-700  text-sienna-500">Dashboard</Link>
        <Link to="/admin/orders" className="bg-amber-900 border-2 rounded-2xl px-1.5 py-1.5 hover:bg-amber-700  text-sienna-500">Orders</Link>
        <Link to="/admin/books" className="bg-amber-900 border-2 rounded-2xl px-1.5 py-1.5 hover:bg-amber-700  text-sienna-500">Books</Link>
        <Link to="/admin/add-book" className="bg-amber-900 border-2 rounded-2xl px-1.5 py-1.5 hover:bg-amber-700  text-sienna-500">Add Book</Link>
        <Link to="/admin/users" className="bg-amber-900 border-2 rounded-2xl px-1.5 py-1.5 hover:bg-amber-700  text-sienna-500">Users</Link>
        <Link to="/admin/sales" className="bg-amber-900 border-2 rounded-2xl px-1.5 py-1.5 hover:bg-amber-700  text-sienna-500">Sales</Link>
    </nav>
);
export default AdminNav;
