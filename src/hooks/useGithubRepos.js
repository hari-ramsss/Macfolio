import { useState, useEffect } from 'react';

const GITHUB_USERNAME = 'hari-ramsss';
const GITHUB_API_URL = `https://api.github.com/users/${GITHUB_USERNAME}/repos`;
const GITHUB_CONTENTS_URL = `https://api.github.com/repos/${GITHUB_USERNAME}`;

const useGithubRepos = (options = {}) => {
    const { sort = 'updated', perPage = 30 } = options;
    const [repos, setRepos] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchRepos = async () => {
            try {
                setLoading(true);
                setError(null);

                const response = await fetch(
                    `${GITHUB_API_URL}?sort=${sort}&per_page=${perPage}`
                );

                if (!response.ok) {
                    throw new Error(`GitHub API error: ${response.status}`);
                }

                const data = await response.json();

                const transformedRepos = data.map((repo) => ({
                    id: repo.id,
                    name: repo.name,
                    description: repo.description || 'No description',
                    icon: '/images/folder.png',
                    kind: 'file',
                    fileType: 'url',
                    href: repo.html_url,
                    homepage: repo.homepage,
                    language: repo.language,
                    stars: repo.stargazers_count,
                    forks: repo.forks_count,
                    updatedAt: new Date(repo.updated_at).toLocaleDateString(),
                }));

                setRepos(transformedRepos);
            } catch (err) {
                setError(err);
                console.error('Failed to fetch GitHub repos:', err);
            } finally {
                setLoading(false);
            }
        };

        fetchRepos();
    }, [sort, perPage]);

    return { repos, loading, error };
};

const fetchRepoContents = async (repoName, path = '') => {
    const url = path
        ? `${GITHUB_CONTENTS_URL}/${repoName}/contents/${path}`
        : `${GITHUB_CONTENTS_URL}/${repoName}/contents`;

    const response = await fetch(url);

    if (!response.ok) {
        throw new Error(`GitHub API error: ${response.status}`);
    }

    const data = await response.json();

    const items = Array.isArray(data) ? data : [data];

    return items
        .map((item) => ({
            name: item.name,
            type: item.type,
            path: item.path,
            size: item.size,
            downloadUrl: item.download_url,
            icon: item.type === 'dir' ? '/images/folder.png' : '/images/txt.png',
        }))
        .sort((a, b) => {
            if (a.type === 'dir' && b.type !== 'dir') return -1;
            if (a.type !== 'dir' && b.type === 'dir') return 1;
            return a.name.localeCompare(b.name);
        });
};

const fetchFileContent = async (downloadUrl) => {
    const response = await fetch(downloadUrl);

    if (!response.ok) {
        throw new Error(`Failed to fetch file: ${response.status}`);
    }

    return await response.text();
};

export { useGithubRepos, fetchRepoContents, fetchFileContent };
