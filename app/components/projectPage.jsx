"use client";

import React from 'react';

export default function ProjectPage({ project }) {
    if (!project) {
        return <div className="p-10">Please select a project to see more details</div>;
    }

    return (
        <div className="p-6 md:p-10 h-full">
            <h2 className="text-2xl font-bold">{project.name}</h2>
            <p className="mt-2">Date: {project.date}</p>
            <p>Project type: {project.type}</p>
            <a href= {project.link} className=' inline-block mt-2 focus:outline-none text-white bg-red-700 hover:bg-red-800 focus:ring-2 focus:ring-red-300 rounded-lg px-5 py-2.5 me-2 mb-2 dark:bg-red-600 dark:hover:bg-red-700 dark:focus:ring-red-900'>View Project</a>
            <p className="m-6 leading-7 text-justify" dangerouslySetInnerHTML={{ __html: project.description }} />
            <div className='flex flex-col w-full'>
                <img className='m-4 object-cover rounded-lg max-w-full drop-shadow-md' 
                    onClick={() => window.open(project.img[0], '_blank')}
                    src={project.img[0]}
                    alt=""
                />
                <img className='m-4 object-cover rounded-lg max-w-full drop-shadow-md'
                    onClick={() => window.open(project.img[1], '_blank')}
                    src={project.img[1]}
                    alt=""
                />
                <img className='m-4 object-cover rounded-lg max-w-full drop-shadow-md'
                    onClick={() => window.open(project.img[2], '_blank')}
                    src={project.img[2]}
                    alt=""
                />
            </div>
        </div>
    );
}
