import { useAuth } from '../context/AuthContext';
import { Navigate } from 'react-router-dom';

const Profile = () => {
    const { user, isAuthenticated, isLoading } = useAuth();

    if (isLoading) {
        return <div className="p-8 text-center">Loading profile...</div>;
    }

    if (!isAuthenticated) {
        return <Navigate to="/login" replace />;
    }

    if (!user) {
        return <div className="p-8 text-center">Could not load user profile.</div>;
    }

    return (
        <div className="max-w-md mx-auto bg-white rounded-lg shadow p-8 mt-8">
            <h2 className="text-2xl font-bold mb-4">Profile</h2>
            <div className="mb-2"><strong>Name:</strong> {user.name}</div>
            <div className="mb-2"><strong>Email:</strong> {user.email}</div>
            <div className="mb-2"><strong>Role:</strong> {user.role}</div>
        </div>
    );
};

export default Profile;
