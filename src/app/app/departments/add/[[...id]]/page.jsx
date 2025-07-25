'use client'

import PageHeading from "@/components/common/PageHeading";
import Link from "next/link";
import { useEffect, useState } from "react";
import { useParams, useRouter } from "next/navigation";

const AddDepartment = () => {
    const [ name, setName ] = useState("");
    const [ description, setDescription ] = useState("");
    const [ employeeID, setEmployeeID ] = useState("");
    const employees = JSON.parse(localStorage.getItem("employees")) || [];

    const router = useRouter();
    const params = useParams();

    const retrieveDepartment = () => {
        if (params.id) {
            const departments = JSON.parse(localStorage.getItem("departments"));
            const department = departments.find(department => department.id == params.id);
            if (department) {
                setName(department.name);
                setDescription(department.description);
                setEmployeeID(department.employeeID);
            }
        }
    }

    useEffect(() => {
        retrieveDepartment();
    }, [params, params.id]);

    const onChangeName = (e) => setName(e.target.value);
    const onChangeDescription = (e) => setDescription(e.target.value);
    const onChangeEmployeeID = (e) => setEmployeeID(e.target.value);

    const handleSubmit = (e) => {
        e.preventDefault();
        const departments = JSON.parse(localStorage.getItem("departments")) || [];
        if (params.id) {
            console.log("updating dept")
            const currentDepartmentIndex = departments.findIndex(department => department.id == params.id)
            console.log(currentDepartmentIndex)
            if (currentDepartmentIndex != null) {
                departments[currentDepartmentIndex] = {
                    id: departments[currentDepartmentIndex].id,
                    name: name,
                    description: description,
                    employeeID: employeeID,
                }
                console.log(departments)
                localStorage.setItem("departments", JSON.stringify(departments));
                router.push("/app/departments");
            }
        } else {
            const lastItemID = departments.length === 0 ? 0 : departments[departments.length - 1].id
            const newDepartment = {
                id: lastItemID + 1,
                name: name,
                description: description,
                employeeID: employeeID,
            }
            departments.push(newDepartment);
            localStorage.setItem('departments', JSON.stringify(departments));
            router.push("/app/departments");
        }
    }

    return (
        <>
            {/* Component content */}
            <PageHeading
            title={`${params.id ? "Update": "Add"} Department`} 
            subtitle={`${params.id ? "Update a": "Add a new"} department to the organization.`}
            manageButton={{
                text: "",
                link: "",
            }}
            />

            <form onSubmit={handleSubmit}>
                <div className="form-group mb-3">
                    <label className="form-label" htmlFor="name">Department Name</label>
                    <input type="text" id="name" className="form-control background-light" placeholder="Enter department name" value={name} onChange={onChangeName} required />
                </div>
                <div className="form-group mb-3">
                    <label className="form-label" htmlFor="description">Description</label>
                    <textarea id="description" rows={6} className="form-control background-light" placeholder="Enter department description" value={description} onChange={onChangeDescription} ></textarea>
                </div>
                <div className="form-group mb-3">
                    <label className="form-label" htmlFor="head">Department Head</label>
                    <select id="head" className="form-control background-light custom-select" onChange={onChangeEmployeeID} value={employeeID}>
                        <option value="">--Select Head--</option>
                        {employees.map((employee) => (
                            <option key={employee.id} value={employee.id}>
                                {employee.name}
                            </option>
                        ))}
                    </select>
                </div>
                <div className="py-4 mt-3">
                    <Link href={"/app/departments"} className="btn btn-secondary me-2">
                        Cancel
                    </Link>
                    <button type="submit" className="btn btn-primary">{params.id ? "Update": "Add"} Department</button>
                </div>
            </form>
        </>
    );
};

export default AddDepartment;