import WindowWrapper from "#hoc/WindowWrapper"
import { WindowControlls } from "#components"
import { Search } from "lucide-react"
import { locations } from "#constants"
import clsx from "clsx"
import useLocationStore from "#store/location"
import useWindowStore from "#store/window"
const Finder = () => {
    const { activeLocation, setActiveLocation } = useLocationStore();
    const { openWindow } = useWindowStore();
    const openItem = (item) => {
        if (item.fileType === "pdf") return openWindow("resume");
        if (item.kind === "folder") return setActiveLocation(item);
        if (["fig", "url"].includes(item.fileType) && item.href)
            return openWindow(item.href, "_blank");
        if (item.fileType === "txt") return openWindow("txtfile", item);
        if (item.fileType === "img") return openWindow("imgfile", item);
        openWindow(`${item.fileType}${item.kind}`, item);
    }
    return (
        <>
            <div id="window-header">
                <WindowControlls target="finder" />
                <Search className="icon" />
            </div>
            <div className="bg-white flex h-full">
                <div className="sidebar">
                    <div>
                        <h3>Favourites</h3>
                        <ul>
                            {Object.values(locations).map((item) => (
                                <li key={item.key} onClick={() => setActiveLocation(item)} className={clsx(item.id === activeLocation.id ? "active" : "not-active")}>
                                    <img src={item.icon} alt={item.name} className="w-4" />
                                    <p className="text-sm font-medium truncate">{item.name}</p>
                                </li>
                            ))}
                        </ul>
                    </div>
                    <div>
                        <h3>Work</h3>
                        <ul>
                            {locations.work.children.map((item) => (
                                <li key={item.key} onClick={() => setActiveLocation(item)} className={clsx(item.id === activeLocation.id ? "active" : "not-active")}>
                                    <img src={item.icon} alt={item.name} className="w-4" />
                                    <p className="text-sm font-medium truncate">{item.name}</p>
                                </li>
                            ))}
                        </ul>
                    </div>

                </div>
                <ul className="content">
                    {activeLocation?.children.map((item) => (
                        console.log(item),
                        <li
                            key={item.key}
                            className={item.position}
                            onClick={() => openItem(item)}
                        >
                            <img src={item.icon} alt={item.name} />
                            <p>{item.name}</p>
                        </li>
                    ))}
                </ul>

            </div>
        </>
    )
}
const FinderWindow = WindowWrapper(Finder, "finder")
export default FinderWindow; 