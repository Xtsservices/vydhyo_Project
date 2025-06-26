import React from "react";

const doctorAccounts = [
    {
        id: 1,
        name: "Dr. John Doe",
        specialty: "Cardiologist",
        email: "john.doe@example.com",
        phone: "+1 234 567 8901",
    },
    {
        id: 2,
        name: "Dr. Jane Smith",
        specialty: "Dermatologist",
        email: "jane.smith@example.com",
        phone: "+1 234 567 8902",
    },
    // Add more doctor accounts as needed
];

const AccountsPage: React.FC = () => {
    return (
        <div className="container mx-auto p-6">
            <h1 className="text-2xl font-bold mb-6">Doctor Accounts</h1>
            <table className="min-w-full bg-white border border-gray-200">
                <thead>
                    <tr>
                        <th className="py-2 px-4 border-b">Name</th>
                        <th className="py-2 px-4 border-b">Specialty</th>
                        <th className="py-2 px-4 border-b">Email</th>
                        <th className="py-2 px-4 border-b">Phone</th>
                    </tr>
                </thead>
                <tbody>
                    {doctorAccounts.map((doctor) => (
                        <tr key={doctor.id}>
                            <td className="py-2 px-4 border-b">{doctor.name}</td>
                            <td className="py-2 px-4 border-b">{doctor.specialty}</td>
                            <td className="py-2 px-4 border-b">{doctor.email}</td>
                            <td className="py-2 px-4 border-b">{doctor.phone}</td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
};

export default AccountsPage;