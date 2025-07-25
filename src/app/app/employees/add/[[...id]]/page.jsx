'use client'
import Link from 'next/link';
import PageHeading from '@/components/common/PageHeading';
import { useState, useEffect } from 'react';
import { useRouter, useParams } from 'next/navigation';

const NewEmployee = () => {
    const departments = JSON.parse(localStorage.getItem("departments")) || [];
    const router = useRouter();
    const params = useParams();
    const id = params?.id?.[0]; // [[...id]] gives array or undefined

    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [position, setPosition] = useState('');
    const [departmentID, setDepartmentID] = useState('');
    const [startDate, setStartDate] = useState('');

    // Load employee data if editing
    useEffect(() => {
        if (id) {
            const employees = JSON.parse(localStorage.getItem('employees')) || [];
            const employee = employees.find(emp => emp.id == id);
            if (employee) {
                setName(employee.name || '');
                setEmail(employee.email || '');
                setPosition(employee.position || '');
                setDepartmentID(employee.departmentID || '');
                setStartDate(employee.startDate || '');
            }
        }
    }, [id]);

    const onChangeName = (e) => setName(e.target.value);
    const onChangeEmail = (e) => setEmail(e.target.value);
    const onChangePosition = (e) => setPosition(e.target.value);
    const onChangeDepartment = (e) => setDepartmentID(e.target.value);
    const onChangeStartDate = (e) => setStartDate(e.target.value);

    const handleSubmit = (e) => {
        e.preventDefault();
        const employees = JSON.parse(localStorage.getItem('employees')) || [];
        if (id) {
            // Edit mode
            const idx = employees.findIndex(emp => emp.id == id);
            if (idx !== -1) {
                employees[idx] = {
                    ...employees[idx],
                    name,
                    email,
                    position,
                    departmentID,
                    startDate
                };
            }
        } else {
            // Add mode
            const lastItemID = employees.length === 0 ? 0 : employees[employees.length - 1].id;
            const newEmployee = {
                id: lastItemID + 1,
                name,
                email,
                position,
                departmentID,
                startDate
            };
            employees.push(newEmployee);
        }
        localStorage.setItem('employees', JSON.stringify(employees));
        router.push("/app/employees");
    };

    return (
        <>
            <PageHeading
                title={id ? "Update Employee" : "Add Employee"}
                subtitle={id ? "Edit employee details." : "Add a new employee."}
                manageButton={{ text: '', link: '' }}
            />

            <form className="" onSubmit={handleSubmit}>
                <div className="mb-3">
                    <label htmlFor="name" className="form-label">Name</label>
                    <input type="text" className="form-control background-light" id="name" placeholder="Enter employee name" value={name} onChange={onChangeName} required />
                </div>
                <div className="mb-3">
                    <label htmlFor="email" className="form-label">Email</label>
                    <input type="email" className="form-control background-light" id="email" placeholder="Enter employee email" value={email} onChange={onChangeEmail} required />
                </div>
                <div className="mb-3">
                    <label htmlFor="position" className="form-label">Position</label>
                    <input type="text" className="form-control background-light" id="position" placeholder="Enter employee position" value={position} onChange={onChangePosition} />
                </div>
                <div className="mb-3">
                    <label htmlFor="department" className="form-label">Department</label>
                    <select className='form-control custom-select background-light' id='department' onChange={onChangeDepartment} value={departmentID}>
                        <option value="">--Select department--</option>
                        {departments.map((department) => (
                            <option key={department.id} value={department.id}>
                                {department.name}
                            </option>
                        ))}
                    </select>
                </div>
                <div className="mb-3">
                    <label htmlFor='start-date' className='form-label'>Start Date</label>
                    <input type='date' className='form-control background-light' id='start-date' value={startDate} onChange={onChangeStartDate} />
                </div>
                <div className='my-3 pt-3'>
                    <Link href="/app/employees" className="btn btn-secondary me-2">Cancel</Link>
                    <button type="submit" className="btn btn-primary">Save</button>
                </div>
            </form>
        </>
    );
};

export default NewEmployee;