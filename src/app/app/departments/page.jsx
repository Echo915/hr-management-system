'use client';

import('bootstrap/dist/js/bootstrap.bundle.min.js');
import PageHeading from "@/components/common/PageHeading";
import Table from "@/components/common/Table";
import { useRouter } from "next/navigation";
import { useState } from "react";

const Departments = () => {
    const router = useRouter();
    const [data, setData] = useState([]);
    const [toDelete, setToDelete] = useState('');

    // Load departments from localStorage on client side
    React.useEffect(() => {
        if (typeof window !== "undefined") {
            const departments = JSON.parse(localStorage.getItem('departments')) || [];
            setData(departments);
        }
    }, []);

    const initializeDelete = (e) => {
        setToDelete(e.target.id);
    }

    const handleDelete = () => {
        if (typeof window !== "undefined") {
            const departments = JSON.parse(localStorage.getItem("departments")) || [];
            const updatedDepartments = departments.filter(department => department.id != toDelete);
            localStorage.setItem("departments", JSON.stringify(updatedDepartments));
            setData(updatedDepartments);
            router.push("/app/departments");
        }
    }

    const columns = [
        {
            name: 'Name',
            selector: (row) => row.name,
            sortable: true,
        },
        {
            name: 'Description',
            selector: (row) => row.description,
        },
        {
            name: 'Action',
            cell: (row) => (
                <>
                    <button className="btn" onClick={() => router.push(`/app/departments/add/${row.id}`)}>
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
            title="Departments"
            subtitle="Manage all departments in the organization."
            manageButton={{
                text: "Add Department",
                link: "/app/departments/add",
            }}
            />

            <Table data={data} columns={columns} />

             {/* Modal */}
            <div class="modal fade" id="exampleModal" tabindex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
                <div class="modal-dialog modal-dialog-centered">
                    <div class="modal-content">
                    <div class="modal-header">
                        <h1 class="modal-title fs-5" id="exampleModalLabel">Delete Department</h1>
                        <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                    </div>
                    <div class="modal-body">
                        This will completely erase all records of this department. Proceed?
                    </div>
                    <div class="modal-footer">
                        <button type="button" class="btn btn-secondary" data-bs-dismiss="modal">Cancel</button>
                        <button type="button" class="btn btn-primary" data-bs-dismiss='modal' onClick={handleDelete}>Yes</button>
                    </div>
                    </div>
                </div>
            </div>
        </>
    );
};

export default Departments;