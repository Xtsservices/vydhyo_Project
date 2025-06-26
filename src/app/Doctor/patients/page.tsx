"use client";
import React from "react";
import AppHeader from "../components/header";
import SiderHeader from "../components/sideheader";

const patients = [
    {
        id: 1,
        name: "John Doe",
        age: 34,
        gender: "Male",
        condition: "Diabetes",
        lastVisit: "2024-05-20",
    },
    {
        id: 2,
        name: "Jane Smith",
        age: 28,
        gender: "Female",
        condition: "Hypertension",
        lastVisit: "2024-06-01",
    },
    {
        id: 3,
        name: "Michael Brown",
        age: 45,
        gender: "Male",
        condition: "Asthma",
        lastVisit: "2024-05-15",
    },
];

export default function PatientsPage() {
    return (
        <>
        <AppHeader />
        <div className="flex mt-15">
            <SiderHeader />
            <div className="flex-1 min-h-screen bg-[#f6f8fa] p-8">
            <div className="max-w-4xl mx-auto">
            <h1 className="text-3xl font-bold text-[#1a237e] mb-6">Patients</h1>
            <div className="bg-white rounded-xl shadow-md overflow-hidden">
            <table className="min-w-full">
                <thead className="bg-[#e3eafc]">
                <tr>
                <th className="py-3 px-6 text-left text-sm font-semibold text-[#1a237e]">Name</th>
                <th className="py-3 px-6 text-left text-sm font-semibold text-[#1a237e]">Age</th>
                <th className="py-3 px-6 text-left text-sm font-semibold text-[#1a237e]">Gender</th>
                <th className="py-3 px-6 text-left text-sm font-semibold text-[#1a237e]">Condition</th>
                <th className="py-3 px-6 text-left text-sm font-semibold text-[#1a237e]">Last Visit</th>
                </tr>
                </thead>
                <tbody>
                {patients.map((patient, idx) => (
                <tr
                key={patient.id}
                className={idx % 2 === 0 ? "bg-white" : "bg-[#f0f4ff]"}
                >
                <td className="py-4 px-6 text-[#263238] font-medium">{patient.name}</td>
                <td className="py-4 px-6 text-[#263238]">{patient.age}</td>
                <td className="py-4 px-6 text-[#263238]">{patient.gender}</td>
                <td className="py-4 px-6 text-[#1976d2]">{patient.condition}</td>
                <td className="py-4 px-6 text-[#263238]">{patient.lastVisit}</td>
                </tr>
                ))}
                </tbody>
            </table>
            </div>
            </div>
            </div>
        </div>
        </>
        
    );
}