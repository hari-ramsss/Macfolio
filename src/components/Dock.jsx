import { useRef } from "react";
import { dockApps } from "#constants";
import { Tooltip } from "react-tooltip";
import { useGSAP } from "@gsap/react";
import useWindowStore from "#store/window";
import gsap from "gsap";
import clsx from "clsx";
const Dock = () => {
    const dockRef = useRef(null);
    const { openWindow, closeWindow, windows } = useWindowStore();
    useGSAP(() => {
        const dock = dockRef.current;
        if (!dock) return;
        const icons = dock.querySelectorAll(".dock-icon");

        const animateIcons = (mouseX) => {
            const { left } = dock.getBoundingClientRect();
            icons.forEach((icon) => {
                const { left: iconLeft, width } = icon.getBoundingClientRect();
                const center = iconLeft - left + width / 2;
                const distance = Math.abs(mouseX - center);
                const intensity = Math.exp(-(distance ** 2.5) / 20000);
                gsap.to(icon, {
                    scale: 1 + 0.25 * intensity,
                    y: -15 * intensity,
                    duration: 0.2,
                    ease: "power1.out",
                })
            })
        }

        const handleMouseMove = (e) => {
            const { left } = dock.getBoundingClientRect();
            animateIcons(e.clientX - left);
        }
        const resetIcons = () => icons.forEach((icon) => gsap.to(icon, {
            scale: 1,
            y: 0,
            duration: 0.3,
            ease: "power1.out",
        }))
        dock.addEventListener("mousemove", handleMouseMove);
        dock.addEventListener("mouseleave", resetIcons);
        return () => {
            dock.removeEventListener("mousemove", handleMouseMove);
            dock.removeEventListener("mouseleave", resetIcons);
        }
    }, [])

    const toggleApp = (app) => {
        if (!app.canOpen) return;
        const window = windows[app.id];
        if (window.isOpen) {
            closeWindow(app.id);
        } else {
            openWindow(app.id);
        }
    };

    return (
        <section id="dock" className="max-sm:fixed max-sm:bottom-5 max-sm:left-1/2 max-sm:-translate-x-1/2 max-sm:w-[90%] max-sm:justify-center max-sm:h-auto">
            <div ref={dockRef} className="dock-container max-sm:bg-white/20 max-sm:backdrop-blur-xl max-sm:rounded-3xl max-sm:px-4 max-sm:py-3 max-sm:gap-2 max-sm:flex max-sm:flex-row max-sm:items-center">
                {dockApps.map(({ id, name, icon, canOpen },index) => (
                    <div key={id} className={clsx("relative flex justify-center",index >=4 && "max-sm:hidden")}>
                        <button
                            type="button"
                            className="dock-icon"
                            aria-label={name}
                            data-tooltip-id="dock-tooltip"
                            data-tooltip-content={name}
                            data-tooltip-delay-show={150}
                            disabled={!canOpen}
                            onClick={() => toggleApp({ id, canOpen })}
                        >
                            <img src={`/images/${icon}`}
                                alt={name}
                                loading="lazy"
                                className={clsx(canOpen ? "" : "opacity-60", "max-sm:w-25 max-sm:h-25")} />
                        </button></div>

                ))}
                <Tooltip id="dock-tooltip" place="top" className="tooltip" />
            </div>
        </section>
    )
}

export default Dock