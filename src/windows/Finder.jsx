import WindowWrapper from "#hoc/WindowWrapper"
import { WindowControlls } from "#components"
import { Search, Github, Loader2, ChevronRight } from "lucide-react"
import { locations } from "#constants"
import clsx from "clsx"
import useLocationStore from "#store/location"
import useWindowStore from "#store/window"
import { useGithubRepos, fetchRepoContents } from "../hooks/useGithubRepos"
import { useState } from "react"

const FILE_ICON = "/images/txt.png"
const FOLDER_ICON = "/images/folder.png"

const Finder = () => {
    const { activeLocation, setActiveLocation } = useLocationStore();
    const { openWindow } = useWindowStore();
    const { repos, loading, error } = useGithubRepos({ sort: 'updated', perPage: 20 });

    const [showGithub, setShowGithub] = useState(false);
    const [githubPath, setGithubPath] = useState([]);        
    const [githubContents, setGithubContents] = useState([]); 
    const [githubLoading, setGithubLoading] = useState(false);
    const [githubError, setGithubError] = useState(null);
    const [activeRepoName, setActiveRepoName] = useState('');

    const openItem = (item) => {
        if (item.fileType === "pdf") return openWindow("resume");
        if (item.kind === "folder") return setActiveLocation(item);
        if (["fig", "url"].includes(item.fileType) && item.href)
            return window.open(item.href, "_blank");
        if (item.fileType === "txt") return openWindow("txtfile", item);
        if (item.fileType === "img") return openWindow("imgfile", item);
        openWindow(`${item.fileType}${item.kind}`, item);
    }

    const handleGithubClick = () => {
        setShowGithub(true);
        setGithubPath([]);
        setGithubContents([]);
        setActiveRepoName('');
    }

    const handleLocationClick = (item) => {
        setShowGithub(false);
        setGithubPath([]);
        setGithubContents([]);
        setActiveRepoName('');
        setActiveLocation(item);
    }

    const browseRepo = async (repoName, path = '') => {
        setGithubLoading(true);
        setGithubError(null);
        try {
            const contents = await fetchRepoContents(repoName, path);
            setGithubContents(contents);
        } catch (err) {
            setGithubError(err.message);
            setGithubContents([]);
        } finally {
            setGithubLoading(false);
        }
    }

    const handleRepoClick = (repo) => {
        setActiveRepoName(repo.name);
        setGithubPath([{ name: repo.name, path: '' }]);
        browseRepo(repo.name);
    }

    const handleGithubItemClick = (item) => {
        if (item.type === 'dir') {
            setGithubPath(prev => [...prev, { name: item.name, path: item.path }]);
            browseRepo(activeRepoName, item.path);
        } else {
            openWindow("githubfile", {
                name: item.name,
                downloadUrl: item.downloadUrl,
                repoName: activeRepoName,
            });
        }
    }

    const handleBreadcrumbClick = (index) => {
        if (index === 0 && githubPath.length > 0) {
            // Click on repo name → go back to repo root
            const newPath = [githubPath[0]];
            setGithubPath(newPath);
            browseRepo(activeRepoName, '');
        } else if (index < githubPath.length - 1) {
            const newPath = githubPath.slice(0, index + 1);
            setGithubPath(newPath);
            browseRepo(activeRepoName, newPath[newPath.length - 1].path);
        }
    }

    const handleBackToRepos = () => {
        setGithubPath([]);
        setGithubContents([]);
        setActiveRepoName('');
    }

    // Determine what to show in content area
    const isInsideRepo = showGithub && githubPath.length > 0;
    const isRepoList = showGithub && githubPath.length === 0;

    return (
        <>
            <div id="window-header">
                <WindowControlls target="finder" />
                {isInsideRepo && (
                    <div className="github-breadcrumb">
                        <span className="breadcrumb-back" onClick={handleBackToRepos}>Repos</span>
                        {githubPath.map((crumb, i) => (
                            <span key={i}>
                                <ChevronRight className="w-3 h-3 inline text-gray-400" />
                                <span
                                    className={clsx(
                                        "breadcrumb-item",
                                        i === githubPath.length - 1 && "active"
                                    )}
                                    onClick={() => handleBreadcrumbClick(i)}
                                >
                                    {crumb.name}
                                </span>
                            </span>
                        ))}
                    </div>
                )}
                {!isInsideRepo && <Search className="icon" />}
            </div>
            <div className="finder-body">
                <div className="sidebar">
                    <div>
                        <h3>Favourites</h3>
                        <ul>
                            {Object.values(locations).map((item) => (
                                <li
                                    key={item.id}
                                    onClick={() => handleLocationClick(item)}
                                    className={clsx(!showGithub && item.id === activeLocation.id ? "active" : "not-active")}
                                >
                                    <img src={item.icon} alt={item.name} className="w-4" />
                                    <p className="text-sm font-medium truncate">{item.name}</p>
                                </li>
                            ))}
                        </ul>
                    </div>
                    <div>
                        <h3>Online</h3>
                        <ul>
                            <li
                                onClick={handleGithubClick}
                                className={clsx(showGithub ? "active" : "not-active")}
                            >
                                <Github className="w-4 h-4" />
                                <p className="text-sm font-medium">GitHub Repos</p>
                            </li>
                        </ul>
                    </div>
                </div>

                <ul className="content">
                    {isRepoList ? (
                        // Repo list view
                        loading ? (
                            <li className="loading-state">
                                <Loader2 className="w-8 h-8 animate-spin text-gray-400" />
                            </li>
                        ) : error ? (
                            <li className="error-state">Failed to load repos</li>
                        ) : (
                            repos.map((repo) => (
                                <li
                                    key={repo.id}
                                    onClick={() => handleRepoClick(repo)}
                                    title={`${repo.description}\n⭐ ${repo.stars} | ${repo.language || 'N/A'}`}
                                >
                                    <img src={FOLDER_ICON} alt={repo.name} />
                                    <p>{repo.name}</p>
                                </li>
                            ))
                        )
                    ) : isInsideRepo ? (
                        // Repo contents view
                        githubLoading ? (
                            <li className="loading-state">
                                <Loader2 className="w-8 h-8 animate-spin text-gray-400" />
                            </li>
                        ) : githubError ? (
                            <li className="error-state">Failed to load contents</li>
                        ) : (
                            githubContents.map((item) => (
                                <li
                                    key={item.path}
                                    onClick={() => handleGithubItemClick(item)}
                                >
                                    <img src={item.type === 'dir' ? FOLDER_ICON : FILE_ICON} alt={item.name} />
                                    <p>{item.name}</p>
                                </li>
                            ))
                        )
                    ) : (
                        activeLocation?.children?.map((item) => (
                            <li
                                key={item.id}
                                onClick={() => openItem(item)}
                            >
                                <img src={item.icon} alt={item.name} />
                                <p>{item.name}</p>
                            </li>
                        ))
                    )}
                </ul>
            </div>
        </>
    )
}

const FinderWindow = WindowWrapper(Finder, "finder")
export default FinderWindow;