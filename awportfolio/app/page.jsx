"use client";

import React, { useState, useEffect } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { IoMdMail } from 'react-icons/io';
import { FaGithub, FaLinkedin } from 'react-icons/fa';
import Menu from './components/menu';
import ProjectPage from './components/projectPage';

const projects = [
  {
    id: 1,
    name: 'catify.site',
    date: '03 - 2024',
    type: 'Web Application',
    description: `catify.site is an app that makes cute cat characters based on your Spotify music. It's a simple way to let the user share a visual representation of their music taste - taking inspiration from other web application such as 
                <a class="text-blue-600 dark:text-blue-500 hover:underline" href="https://receiptify.herokuapp.com">receiptify</a> and <a class="text-blue-600 dark:text-blue-500 hover:underline" href="https://pudding.cool/2021/10/judge-my-music/">How Bad is your Music Taste</a>.
                The app takes the users top 3 artists and puts them into a category, like "Hip Hop" or "Pop." Then, it dresses up a cat with clothes that match those categories. 
                <br><br>
                The web app requires the user to sign into spotify, selecting customization options to their liking and then sharing the image. 
                catify.site also has distinct views for mobile and desktop and common outputs for consistant sharing across resolutions. <br><br>
                This web application was created in collaboration with <a class="text-blue-600 dark:text-blue-500 hover:underline" href="https://github.com/WillDoyle">Will Doyle</a>.`,
    link: 'https://www.catify.site',
    img: ['./img/catify-home.png', './img/catify-customize.png', './img/catify-customize-pc.png'],
  },
  {
    id: 2,
    name: 'SYNTHEASEL',
    date: '11 - 2023',
    type: 'Web Application',
    description: `SYNTHEASEL was created for my final year university project. The project was largely self governed and ran over the term of one semester. SYNTHEASEL’s 
    primary objective is to provide users with creative tools to craft unique music visualizations that enhance their emotional connection and interaction with music. 
    This web application draws inspiration from common art programs and applies real-time effects to brushes based on the song’s attributes. Our design philosophy is rooted 
    in ludic and short, focused interactions, aiming to bring users closer to their favorite songs, promote relaxation, and spark creativity featuring, User-driven music 
    visualizations, Real-time brush interactions, Dynamic color palettes based on key and mode and Brush behavior linked to tempo and frequencies. <br><br>SYNTHEASEL’s 
    design is the result of extensive user research into drawing observations and individual musical analysis. This research ensures that the tools provided are 
    both accurate and enjoyable for users. The project is hosted on GitHub pages and is built using front-end languages, including HTML, CSS, and JavaScript, 
    with a strong emphasis on the p5.js and p5.sound libraries. SYNTHEASEL is an interactive music visualization web application that bridges the gap between 
    music and visual art. By enabling users to create personalized visualizations, it adds a new dimension to the music experience. Each interaction is a 
    journey of self-expression and exploration, fostering a deeper connection between users and the music they love. 
    <br><br><a class="text-blue-600 dark:text-blue-500 hover:underline" href="https://interaction.2023.qutdesignfestival.com.au/projects/syntheasel/" target="_blank"> Check out the QUT Design Festival Entry Here!</a>
    `,
    link: 'staticSites/SYNTHEASEL/syntheaselhome.html',
    img: ['./img/synth-homepage.png', './img/synth-eg.png', './img/synth-eg-backup.png'],
  },
];

export default function Page() {
  const [selectedProject, setSelectedProject] = useState(null); // No project selected initially
  const [isVisible, setIsVisible] = useState(true); // For project fade in/out
  const [isPageVisible, setIsPageVisible] = useState(false); // For page fade-in effect
  const [pendingProject, setPendingProject] = useState(null); // Holds next project

  // Trigger fade-out, change project, then fade-in
  const handleProjectChange = (project) => {
    setIsVisible(false); // Start fade-out
    setPendingProject(project); // Store new project to update later
  };

  // Page fade-in effect on load
  useEffect(() => {
    setTimeout(() => {
      setIsPageVisible(true); // Fade in the entire page on load
    }, 100); // Small delay for a smoother effect
  }, []);

  // Project fade-out and switch
  useEffect(() => {
    // If fading out and pendingProject is set, switch to the new project
    if (!isVisible && pendingProject !== null) {
      const timeout = setTimeout(() => {
        setSelectedProject(pendingProject); // Update the project
        setPendingProject(null); // Clear pending project
        setIsVisible(true); // Fade back in
      }, 300); // Match fade-out duration
      return () => clearTimeout(timeout); // Clean up timeout
    }
  }, [isVisible, pendingProject]);

  return (
    <div
      className={`transition-opacity duration-700 ${isPageVisible ? 'opacity-100' : 'opacity-0'}`}
    >
      <div className="flex flex-col h-screen">
        {/* Main Container */}
        <div className="flex flex-col md:flex-row flex-grow overflow-y-auto">
          {/* Sidebar / Project List */}
          <div className="flex flex-col max-w-full md:max-w-[33%] w-full bg-white">
            <div className="flex m-8 flex-col p-2">
              <h1 className="text-3xl font-semibold md:text-4xl">alexWportfolio.com</h1>
              <h2 className="text-red-700 text-l font-semibold md:text-xl">!Under construction!</h2>
              <ul className="flex gap-x-2">
                <li>
                  <Link className="flex items-center gap-x-1 text-sm md:text-base hover:underline" href={"mailto:alexward103@gmail.com"}>
                    <IoMdMail /> Mail
                  </Link>
                </li>
                <li>
                  <Link className="flex items-center gap-x-1 text-sm md:text-base hover:underline" href={"https://www.linkedin.com/in/alex-ward-032b441b6/"}>
                    <FaLinkedin /> LinkedIn
                  </Link>
                </li>
                <li>
                  <Link className="flex items-center gap-x-1 text-sm md:text-base hover:underline" href={"https://github.com/AWARD220"}>
                    <FaGithub /> GitHub
                  </Link>
                </li>
              </ul>
            </div>

            {/* Menu Component */}
            <Menu projects={projects} onSelect={handleProjectChange} />

            <footer className="m-8"> Alex Ward @ 2024 </footer>
          </div>

          {/* Project Page Section */}
          <main className="flex-grow bg-gray-100 shadow-inner p-4 overflow-y-auto">
            <div
              className={`transition-opacity duration-500 ${isVisible ? 'opacity-100' : 'opacity-0'}`}
            >
              <ProjectPage project={selectedProject} />
            </div>
          </main>
        </div>
      </div>
    </div>

  );
}
