'use client';
import Link from "next/link";
import { useState } from "react";
import {useRouter} from "next/navigation";

const Login = () => {
    const [ username, setUsername ] = useState('');
    const [ password, setPassword ] = useState('');
    const router = useRouter();

    const onChangeUsername = (e) => {
        setUsername(e.target.value);    
    }

    const onChangePassword = (e) => {
        setPassword(e.target.value);
    }

    const handleSubmit = (e) => {
        e.preventDefault();  
        
        const users = localStorage.getItem('users');
        if (users) {
            const parsedUsers = JSON.parse(users);
            const user = parsedUsers.find(user => user.username === username && user.password === password);

            if (user) {
                localStorage.setItem("activeUser", JSON.stringify(user));
                router.push('/app/employees')
                return
            } 
        }

        document.getElementById('err-msg1').classList.remove('d-none');
        document.getElementById('err-msg1').classList.add('d-block');
    }

    return (
        <>
            {/* Component content */}            
            <div className="mini-form themed-bg rounded-4 p-4" style={{}}>
                <h1 className="mb-4">Login</h1>
                <hr />
                <form className="mt-4" onSubmit={handleSubmit}>
                    <div className="mb-4">
                        <small id="err-msg1" className="text-danger d-none">Invalid username or password. Please try again.</small>
                        <label htmlFor="username" className="block text-sm font-medium text-gray-700">Username</label>
                        <input type="text" id="username" className="form-control background-light mt-1 rounded shadow-sm" placeholder="Enter your username" value={username} onChange={onChangeUsername} required />
                    </div>
                    <div className="mb-4">
                        <label htmlFor="password" className="block text-sm font-medium text-gray-700">Password</label>
                        <input type="password" id="password" className="form-control background-light mt-1 rounded shadow-sm" placeholder="Enter your password" value={password} onChange={onChangePassword} required />
                    </div>
                    <button type="submit" className="bg-primary text-white py-2 px-4 rounded">Login</button>
                </form>
                <p className="mt-4 text-sm text-gray-600">Don't have an account? <Link href="/signup" className="text-primary hover:underline">Register here</Link></p>
            </div>
        </>
    );
};

export default Login;