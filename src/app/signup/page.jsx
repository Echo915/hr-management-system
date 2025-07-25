'use client';

import Link from "next/link";
import { useState } from "react";
import { useRouter } from "next/navigation";

const Signup = () => {
    const [ username, setUsername ] = useState(''); 
    const [ password, setPassword ] = useState('');
    const [ confirmPassword, setConfirmPassword ] = useState('');
    const router = useRouter();

    const onChangeUsername = (e) => {
        setUsername(e.target.value);    
    }

    const onChangePassword = (e) => {
        setPassword(e.target.value);
    }

    const onChangeConfirmPassword = (e) => {
        setConfirmPassword(e.target.value);
    }

    const handleSubmit = (e) => {
        console.log('Form submitted');
        e.preventDefault();

        if (password === confirmPassword) {
            const users = localStorage.getItem('users');
            if (users) {
                const parsedUsers = JSON.parse(users);
                const userExists = parsedUsers.some(user => user.username === username);

                if (userExists) {
                    document.getElementById('err-msg1').classList.remove('d-none');
                    document.getElementById('err-msg1').classList.add('d-block');
                    return;
                } 
            } 
        
            const newUser = { username, password };
            localStorage.setItem('users', JSON.stringify([newUser]));
            router.push('/login');
        } else {
            document.getElementById('err-msg2').classList.remove('d-none');
            document.getElementById('err-msg2').classList.add('d-block');
        }
    }

    return (
        <>
            {/* Component content */}
            <div className="themed-bg rounded-4 p-4 mini-form">
                <h1 className="mb-4">Signup</h1>
                <hr />
                <form className="mt-4" onSubmit={handleSubmit}>
                    <div className="mb-4">
                        <label htmlFor="username" className="block text-sm font-medium text-gray-700">Username</label>
                        <input type="text" id="username" className="form-control background-light mt-1 rounded shadow-sm" placeholder="Enter your username" value={username} onChange={onChangeUsername} required/>
                        <small id="err-msg1" className="text-danger d-none">Username already exists</small>
                    </div>
                    <div className="mb-4">
                        <label htmlFor="password" className="block text-sm font-medium text-gray-700">Password</label>
                        <input type="password" id="password" className="form-control background-light mt-1 rounded shadow-sm" placeholder="Enter your password" value={password} onChange={onChangePassword} required/>
                    </div>
                    <div className="mb-4">
                        <label htmlFor="confirm-password" className="block text-sm font-medium text-gray-700">Confirm Password</label>
                        <input type="password" id="confirm-password" className="form-control background-light mt-1 rounded shadow-sm" placeholder="Confirm your password" value={confirmPassword} onChange={onChangeConfirmPassword} required/>
                        <small id="err-msg2" className="text-danger d-none">Passwords do not match</small>
                    </div>
                    <button type="submit" className="bg-primary text-white py-2 px-4 rounded">Sign Up</button>
                </form>
                <p className="mt-4 text-sm text-gray-600">Already have an account? <Link href="/login" className="text-primary hover:underline">Login here</Link></p>
            </div>
        </>
    );
};

export default Signup;