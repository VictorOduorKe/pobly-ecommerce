import { useEffect, useState } from 'react';
import { getDashboard, getSalesTrends } from '../../api';
import SalesChart from '../../components/admin/SalesChart';

const Dashboard = () => {
    const [stats, setStats] = useState(null);
    const [sales, setSales] = useState(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const statsRes = await getDashboard();
                setStats(statsRes.data);
                const salesRes = await getSalesTrends();
                setSales(salesRes.data);
            } catch {
                setStats(null);
                setSales(null);
            }
            setLoading(false);
        };
        fetchData();
    }, []);

    if (loading) return <div>Loading...</div>;
    return (
        <div className="max-w-5xl mx-auto py-8">
            <h2 className="text-3xl font-bold mb-6 text-brown-900">Admin Dashboard</h2>
            {stats && (
                <div className="grid grid-cols-2 gap-6 mb-8">
                    <div className="bg-white rounded shadow p-6">
                        <div className="text-lg font-bold text-brown-900">Total Sales</div>
                        <div className="text-2xl text-sienna-500">${stats.totalSales}</div>
                    </div>
                    <div className="bg-white rounded shadow p-6">
                        <div className="text-lg font-bold text-brown-900">Total Users</div>
                        <div className="text-2xl text-sienna-500">{stats.totalUsers}</div>
                    </div>
                </div>
            )}
            {sales && (
                <div className="bg-white rounded shadow p-6">
                    <SalesChart data={sales} title="Monthly Sales" />
                </div>
            )}
        </div>
    );
};

export default Dashboard;