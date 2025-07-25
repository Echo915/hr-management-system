'use client';

import Link from "next/link";

const Header = () => {
    const activeUser = JSON.parse(localStorage.getItem("activeUser"));
    return (
        <>
            {/* Component content */}
            <header className="header py-3 px-4 position-relative d-flex flex-row justify-content-end align-items-center">
                <div className="d-flex flex-row justify-content-between align-items-center">
                    {
                        activeUser ? (
                            <h5>Hello {activeUser.username}</h5>

                        ):(
                            <Link href={"/login"}>Login</Link>
                        )
                    }
                    <img className="ms-3 rounded-circle primary-border" src={'/manager.png'} width={40} height={40} />
                </div>
            </header>
        </>
    );
};

export default Header;