import { Bar } from 'react-chartjs-2';
import { Chart, CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend } from 'chart.js';
Chart.register(CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend);

const SalesChart = ({ data, title }) => {
    const chartData = {
        labels: data.labels,
        datasets: [
            {
                label: 'Sales',
                data: data.values,
                backgroundColor: '#701705',
            },
        ],
    };
    const options = {
        responsive: true,
        plugins: {
            legend: { display: false },
            title: { display: !!title, text: title },
        },
    };
    return <Bar data={chartData} options={options} />;
};
export default SalesChart;
