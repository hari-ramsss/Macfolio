import { useState, useRef, useEffect } from "react";
import { techStack, socials, locations } from "#constants";
import { Check, Flag } from "lucide-react";
import { WindowControlls } from "#components";
import WindowWrapper from "#hoc/WindowWrapper";

// Terminal commands configuration
const terminalCommands = {
    help: {
        description: "Show available commands",
        execute: () => [
            "Available commands:",
            "  help      - Show this message",
            "  about     - Learn about me",
            "  skills    - Display tech stack",
            "  projects  - List my projects",
            "  contact   - Contact information",
            "  clear     - Clear the terminal",
            "  date      - Show current date/time",
            "  whoami    - Display user info",
            "  echo      - Echo back your message",
        ],
    },
    about: {
        description: "About me",
        execute: () => [
            "Hey! I'm Hari Ram 👋",
            "A passionate web developer specializing in React & Next.js.",
            "I love building sleek, interactive web experiences.",
            "Currently exploring new technologies and creating cool projects!",
        ],
    },
    skills: {
        description: "Display tech stack",
        execute: () => {
            const lines = ["My Tech Stack:", ""];
            techStack.forEach(({ category, items }) => {
                lines.push(`  ${category}: ${items.join(", ")}`);
            });
            return lines;
        },
    },
    projects: {
        description: "List projects",
        execute: () => {
            const lines = ["My Projects:", ""];
            // Get projects from the work location in constants
            const projects = locations.work.children || [];
            projects.forEach((project, index) => {
                lines.push(`  ${index + 1}. ${project.name}`);
            });
            lines.push("");
            lines.push("Type 'open finder' or click Portfolio in dock for details.");
            return lines;
        },
    },
    contact: {
        description: "Contact info",
        execute: () => {
            const lines = ["Get in touch:", ""];
            // Generate from socials constant
            socials.forEach(({ text, link }) => {
                lines.push(`  ${text.padEnd(10)}: ${link}`);
            });
            return lines;
        },
    },

    date: {
        description: "Show current date/time",
        execute: () => {
            const now = new Date();
            return [now.toLocaleString()];
        },
    },
    whoami: {
        description: "Display user info",
        execute: () => ["hari_ram", "Portfolio Visitor @ macOS-Portfolio"],
    },
    echo: {
        description: "Echo back message",
        execute: (args) => [args || ""],
    },
    clear: {
        description: "Clear terminal",
        execute: () => "CLEAR",
    },
};

function Terminal() {
    const [commandHistory, setCommandHistory] = useState([]);
    const [inputValue, setInputValue] = useState("");
    const [historyIndex, setHistoryIndex] = useState(-1);
    const [inputHistory, setInputHistory] = useState([]);
    const outputRef = useRef(null);
    const inputRef = useRef(null);

    // Auto-scroll to bottom when new output is added
    useEffect(() => {
        if (outputRef.current) {
            outputRef.current.scrollTop = outputRef.current.scrollHeight;
        }
    }, [commandHistory]);

    const executeCommand = (input) => {
        const trimmedInput = input.trim();
        if (!trimmedInput) return;

        const [cmd, ...args] = trimmedInput.toLowerCase().split(" ");
        const argsString = args.join(" ");

        let output;
        if (cmd === "clear") {
            setCommandHistory([]);
            setInputValue("");
            return;
        } else if (terminalCommands[cmd]) {
            output = terminalCommands[cmd].execute(argsString);
        } else {
            output = [`zsh: command not found: ${cmd}`, "Type 'help' for available commands."];
        }

        setCommandHistory((prev) => [
            ...prev,
            { command: trimmedInput, output: Array.isArray(output) ? output : [output] },
        ]);
        setInputHistory((prev) => [...prev, trimmedInput]);
        setHistoryIndex(-1);
        setInputValue("");
    };

    const handleKeyDown = (e) => {
        if (e.key === "Enter") {
            executeCommand(inputValue);
        } else if (e.key === "ArrowUp") {
            e.preventDefault();
            if (inputHistory.length > 0) {
                const newIndex = historyIndex === -1 ? inputHistory.length - 1 : Math.max(0, historyIndex - 1);
                setHistoryIndex(newIndex);
                setInputValue(inputHistory[newIndex]);
            }
        } else if (e.key === "ArrowDown") {
            e.preventDefault();
            if (historyIndex !== -1) {
                const newIndex = historyIndex + 1;
                if (newIndex >= inputHistory.length) {
                    setHistoryIndex(-1);
                    setInputValue("");
                } else {
                    setHistoryIndex(newIndex);
                    setInputValue(inputHistory[newIndex]);
                }
            }
        }
    };

    const focusInput = () => {
        inputRef.current?.focus();
    };

    return (
        <>
            <div id="window-header">
                <WindowControlls target="terminal" />
                <h2>Tech Stack</h2>
            </div>

            {/* Static Tech Stack Section */}
            <div className="techstack">
                <p>
                    <span className="font-bold">@Hari_Ram_% </span>
                    show tech stack
                </p>
                <div className="label">
                    <p className="w-32">Category</p>
                    <p>Technologies</p>
                </div>
                <ul className="content">
                    {techStack.map(({ category, items }) => (
                        <li key={category} className="flex items-center">
                            <Check className="check" size={20} />
                            <h3>{category}</h3>
                            <ul>
                                {items.map((item, i) => (
                                    <li key={i}>
                                        {item}
                                        {i < items.length - 1 ? "," : ""}
                                    </li>
                                ))}
                            </ul>
                        </li>
                    ))}
                </ul>
                <div className="footnote">
                    <p>
                        <Check size={20} />5 of 5 loaded successfully (100%)
                    </p>
                    <p className="text-black dark:text-gray-200">
                        <Flag size={20} fill="black" />
                        Render Time:2.3ms
                    </p>
                </div>
            </div>

            {/* Interactive Terminal Section */}
            <div className="bg-white dark:bg-gray-950 text-gray-800 dark:text-green-300 font-roboto text-sm p-5 cursor-text max-h-[180px] flex flex-col" onClick={focusInput}>
                <div className="terminal-output flex-1 overflow-y-auto max-h-[120px] space-y-3" ref={outputRef}>
                    {commandHistory.map((entry, idx) => (
                        <div key={idx} className="space-y-1">
                            <p className="text-black dark:text-green-300">
                                <span className="text-black dark:text-green-300 font-bold mr-2">@Hari_Ram_%</span> {entry.command}
                            </p>
                            <div className="text-gray-700 dark:text-green-300/80">
                                {entry.output.map((line, lineIdx) => (
                                    <p key={lineIdx} className="leading-relaxed">{line}</p>
                                ))}
                            </div>
                        </div>
                    ))}
                </div>
                <div className="flex items-center mt-3 pt-3 border-t border-gray-700 dark:border-green-900/50">
                    <span className="text-black dark:text-green-300 font-bold mr-2">@Hari_Ram_%</span>
                    <input
                        ref={inputRef}
                        type="text"
                        value={inputValue}
                        onChange={(e) => setInputValue(e.target.value)}
                        onKeyDown={handleKeyDown}
                        spellCheck={false}
                        autoComplete="off"
                        placeholder="Type 'help' for commands..."
                        className="bg-transparent border-none text-gray-800 dark:text-green-300 outline-none flex-1 font-roboto placeholder:text-gray-600 dark:placeholder:text-green-800"
                    />
                </div>
            </div>
        </>
    );
}

const TerminalWindow = WindowWrapper(Terminal, "terminal");

export default TerminalWindow;