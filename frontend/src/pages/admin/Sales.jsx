
import SalesChart from '../../components/admin/SalesChart';

const mockData = {
    labels: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun'],
    values: [1200, 1900, 800, 1500, 2100, 1700],
};

const Sales = () => (
    <div>
        <h2 className="text-2xl font-bold mb-6 text-brown-900">Sales Trends</h2>
        <div className="bg-white rounded shadow p-6 max-w-2xl mx-auto">
            <SalesChart data={mockData} title="Monthly Sales" />
        </div>
    </div>
);

export default Sales;