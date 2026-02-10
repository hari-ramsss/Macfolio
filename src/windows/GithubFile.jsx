import WindowWrapper from "#hoc/WindowWrapper"
import { WindowControlls } from "#components"
import useWindowStore from "#store/window"
import { fetchFileContent } from "../hooks/useGithubRepos"
import { useState, useEffect } from "react"
import { Loader2 } from "lucide-react"

const GithubFile = () => {
    const { windows } = useWindowStore();
    const data = windows.githubfile?.data;
    const [content, setContent] = useState('');
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        if (!data?.downloadUrl) return;

        setLoading(true);
        setError(null);

        fetchFileContent(data.downloadUrl)
            .then((text) => {
                setContent(text);
                setLoading(false);
            })
            .catch((err) => {
                setError(err.message);
                setLoading(false);
            });
    }, [data?.downloadUrl]);

    if (!data) return null;

    return (
        <>
            <div id="window-header">
                <WindowControlls target="githubfile" />
                <h2>{data.name}</h2>
            </div>
            <div className="github-file-content">
                {loading ? (
                    <div className="github-file-loading">
                        <Loader2 className="w-6 h-6 animate-spin text-gray-400" />
                    </div>
                ) : error ? (
                    <div className="github-file-error">
                        <p>Failed to load file content</p>
                    </div>
                ) : (
                    <pre><code>{content}</code></pre>
                )}
            </div>
        </>
    )
}

const GithubFileWindow = WindowWrapper(GithubFile, "githubfile")
export default GithubFileWindow 
