'use client';
import { usePathname, useRouter } from "next/navigation";
import Link from "next/link";

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
  faUsers,
  faUserPlus,
  faBuilding,
  faFolderPlus,
  faRightFromBracket,
} from '@fortawesome/free-solid-svg-icons';

const Sidenav = () => {
    const pathname = usePathname();
    const router = useRouter();

    const logout = () => {
        localStorage.removeItem("activeUser");
    }

    return (
        <>
            {/* Component content */}
            <div>
                <div className="d-flex position-relative w-100 align-items-center justify-content-left">
                    <img src={"/task-management.png"} width={50} height={50}></img>
                    <div>
                        <p className='color-primary ms-2 my-0' style={{textWrap: "wrap", width: 50, fontSize: "small"}}>HR Management System</p>
                    </div>

                </div>
                <ul className="sidenav-links nav flex-column mt-5">
                    <li className={pathname === '/app/employees' ? 'active' : ''}><Link href="/app/employees"><FontAwesomeIcon className="me-2" icon={faUsers} /> <span className="link-text">Employess</span></Link ></li>
                    <li className={pathname.startsWith('/app/employees/add') ? 'active' : ''}><Link href="/app/employees/add"><FontAwesomeIcon className="me-2" icon={faUserPlus} /> <span className="link-text">Add Employee</span></Link ></li>
                    <li className={pathname === '/app/departments' ? 'active' : ''}><Link href="/app/departments"><FontAwesomeIcon className="me-2" icon={faBuilding} /> <span className="link-text">Departments</span></Link ></li>
                    <li className={pathname.startsWith('/app/departments/add') ? 'active' : ''}><Link href="/app/departments/add"><FontAwesomeIcon className="me-2" icon={faFolderPlus} /> <span className="link-text">Add Department</span></Link ></li>
                    <li><Link href="/login" onClick={logout}><FontAwesomeIcon className="me-2" icon={faRightFromBracket} /> <span className="link-text">Logout</span></Link ></li>
                </ul>
            </div>
        </>
    );
};

export default Sidenav;