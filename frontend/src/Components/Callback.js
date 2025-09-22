import React, { useEffect } from 'react';
import { useHistory } from 'react-router-dom';

export default function Callback() {
    const history = useHistory();

    useEffect(() => {
        // Vì không sử dụng AWS Cognito nữa, redirect về login
        console.log('Callback page - redirecting to login');
        history.push('/login');
    }, [history]);

    return (
        <div style={{
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
            height: '100vh',
            fontSize: '18px'
        }}>
            Đang chuyển hướng...
        </div>
    );
}
