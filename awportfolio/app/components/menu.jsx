"use client";

import React from 'react';

export default function Menu({ projects, onSelect }) {
    return (
        <div className="flex m-10 flex-col p-2">
            <table className="w-full">
                <thead>
                    <tr>
                        <th className="text-left text-sm md:text-base">Project</th>
                        <th className="text-left text-sm md:text-base">Date</th>
                        <th className="text-left text-sm md:text-base">Type</th>
                    </tr>
                </thead>
                <tbody>
                    {projects.map((project) => (
                        <tr
                            key={project.id}
                            className="hover:underline hover:cursor-pointer"
                            onClick={() => onSelect(project)}
                        >
                            <td className="text-xs md:text-sm">{project.name}</td>
                            <td className="text-xs md:text-sm">{project.date}</td>
                            <td className="text-xs md:text-sm">{project.type}</td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
}
