'use client';

import('bootstrap/dist/js/bootstrap.bundle.min.js');
import Table from '@/components/common/Table';
import PageHeading from '@/components/common/PageHeading';
import { useRouter } from 'next/navigation';
import { useState } from 'react';

const Home = () => {  
    const data = JSON.parse(localStorage.getItem("employees"));
    const router = useRouter();
    const [ toDelete, setToDelete ] = useState('');

    const initializeDelete = (e) => {
        setToDelete(e.target.id);
    }

    const handleDelete = (e) => {
        const employees = JSON.parse(localStorage.getItem("employees"));
        const updatedEmployees = employees.filter(emp => emp.id != toDelete);
        localStorage.setItem("employees", JSON.stringify(updatedEmployees));
        router.push("/app/employees");
    }

    const columns = [
    {
        name: 'Name',
        selector: (row) => row.name,
        sortable: true,
    },
    {
        name: 'Email',
        selector: (row) => row.email,
        sortable: true,
    },
    {
        name: 'Position',
        selector: (row) => row.position,
        sortable: true,
    },
    {
        name: 'Department',
        selector: (row) => row.department,
        sortable: true,
    },
    {
        name: 'Action',
        cell: (row) => (
            <>
            <button className="btn" onClick={() => router.push(`/app/employees/add/${row.id}`)}>
                Edit
            </button>
            <button className="btn" data-bs-toggle="modal" data-bs-target="#exampleModal" id={row.id} onClick={initializeDelete}>
                Delete
            </button>
            </>
        ),
    }
    ]; 
    return (
        <>
            {/* Component content */}
            <PageHeading 
                title="Employees"
                subtitle="List of all employees in the organization."
                manageButton={{ text: 'Add Employee', link: '/app/employees/add' }}
             />
            
            <Table data={data} columns={columns} />

             {/* Modal */}
            <div className="modal fade" id="exampleModal" tabindex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
                <div className="modal-dialog modal-dialog-centered">
                    <div className="modal-content">
                    <div className="modal-header">
                        <h1 className="modal-title fs-5" id="exampleModalLabel">Delete Employee</h1>
                        <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                    </div>
                    <div className="modal-body">
                        This will completely erase all records of this employee. Proceed?
                    </div>
                    <div className="modal-footer">
                        <button type="button" className="btn btn-secondary" data-bs-dismiss="modal">Cancel</button>
                        <button type="button" className="btn btn-primary" data-bs-dismiss='modal' onClick={handleDelete}>Yes</button>
                    </div>
                    </div>
                </div>
            </div>
        </>
    );
};

export default Home;