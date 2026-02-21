import { locations } from "#constants"
import { useGSAP } from "@gsap/react";
import Draggable from "gsap/Draggable";
import clsx from "clsx";
import useLocationStore from "#store/location";
import useWindowStore from "#store/window";
const projects = locations.work?.children ?? [];
const mobileApps = [
    {
        id: "terminal", name: "Skills", icon: "/images/terminal.png", canOpen: true
    },
    {
        id: "resume", name: "Resume", icon: "/images/resume.png", canOpen: true
    }
]
const Home = () => {
    const { openWindow } = useWindowStore();
    const { setActiveLocation } = useLocationStore();
    const handleOpenProjectFinder = (project) => {
        setActiveLocation(project)
        openWindow("finder")
    }
    useGSAP(() => {
        Draggable.create(".folder")
    }, [])
    return (
        <section id="home">
            <ul className="max-sm:hidden">
                {projects.map((project) => (
                    <li key={project.id} className={clsx("group folder", project.windowPosition)} onClick={() => handleOpenProjectFinder(project)}>
                        <img src="/images/folder.png" alt={project.name} />
                        <p>{project.name}</p>
                    </li>
                ))}
            </ul>
            <ul className="sm:hidden">
                {mobileApps.map((app) => (
                    <li key={app.id} className="group" onClick={() => openWindow(app.id)}>
                        <img src={app.icon} alt={app.name} />
                        <p>{app.name}</p>
                    </li>
                ))}
            </ul>
        </section>
    )
}

export default Home