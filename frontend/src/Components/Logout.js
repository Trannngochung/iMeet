import React, { useEffect } from 'react';
import { useHistory } from 'react-router-dom';

export default function Logout() {
    const history = useHistory();

    useEffect(() => {
        const handleLogout = () => {
            // Xóa tất cả dữ liệu từ localStorage
            localStorage.removeItem('google_token');
            localStorage.removeItem('user_email');
            localStorage.removeItem('user_name');
            localStorage.removeItem('token');
            localStorage.removeItem('userId');
            localStorage.removeItem('username');
            
            console.log('User logged out successfully');
            
            // Redirect về login
            history.push('/login');
        };

        handleLogout();
    }, [history]);

    return (
        <div style={{
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
            height: '100vh',
            fontSize: '18px'
        }}>
            Đang đăng xuất...
        </div>
    );
}
