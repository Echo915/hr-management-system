'use client';

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import('bootstrap/dist/js/bootstrap.bundle.min.js');

import PageHeading from "@/components/common/PageHeading";
import Table from "@/components/common/Table";

const Departments = () => {
  const router = useRouter();

  const [data, setData] = useState([]);
  const [toDelete, setToDelete] = useState('');

  // Load departments from localStorage
  useEffect(() => {
    const storedDepartments = localStorage.getItem('departments');
    if (storedDepartments) {
      setData(JSON.parse(storedDepartments));
    }
  }, []);

  const initializeDelete = (e) => {
    setToDelete(e.target.id);
  };

  const handleDelete = () => {
    const stored = localStorage.getItem("departments");
    const departments = stored ? JSON.parse(stored) : [];
    const updated = departments.filter(department => department.id !== toDelete);
    localStorage.setItem("departments", JSON.stringify(updated));
    setData(updated); // Update UI immediately
  };

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
          <button
            className="btn"
            data-bs-toggle="modal"
            data-bs-target="#exampleModal"
            id={row.id}
            onClick={initializeDelete}
          >
            Delete
          </button>
        </>
      ),
    }
  ];

  return (
    <>
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
      <div className="modal fade" id="exampleModal" tabIndex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
        <div className="modal-dialog modal-dialog-centered">
          <div className="modal-content">
            <div className="modal-header">
              <h1 className="modal-title fs-5" id="exampleModalLabel">Delete Department</h1>
              <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
            </div>
            <div className="modal-body">
              This will completely erase all records of this department. Proceed?
            </div>
            <div className="modal-footer">
              <button type="button" className="btn btn-secondary" data-bs-dismiss="modal">Cancel</button>
              <button type="button" className="btn btn-primary" data-bs-dismiss="modal" onClick={handleDelete}>Yes</button>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Departments;
