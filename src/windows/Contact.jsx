import WindowWrapper from "#hoc/WindowWrapper";
import useWindowStore from "#store/window";
import { WindowControlls } from "#components";
import { socials } from "#constants";
import { Copy, Linkedin, Mail, Phone, Check } from "lucide-react";
import { useState } from "react";

function Contact() {
    const [copiedItem, setCopiedItem] = useState(null);

    const handleCopy = async (text, itemId) => {
        try {
            await navigator.clipboard.writeText(text);
            setCopiedItem(itemId);
            setTimeout(() => setCopiedItem(null), 2000);
        } catch (err) {
            console.error("Failed to copy:", err);
        }
    };

    const contactDetails = [
        { id: "email", icon: Mail, value: "hariramsathya2@gmail.com" },
        { id: "phone", icon: Phone, value: "+91 8122117747" },
        { id: "linkedin", icon: Linkedin, value: "www.linkedin.com/in/hari-ram-73179b2b5" },
    ];

    return (
        <>
            <div id="window-header">
                <WindowControlls target="contact" />
                <h2>Contact Me</h2>
            </div>
            <div className="p-5 space-y-5">
                <img src="/images/pfp_sterlingpic.jpeg" alt="Hariram"
                    className="w-20 rounded-full"
                />
                <h3>Let's Connect</h3>
                <p>Partner with me to design, develop, and deploy robust digital systems.</p>
                <div className="flex flex-col gap-3 mt-4">
                    {contactDetails.map(({ id, icon: Icon, value }) => (
                        <div
                            key={id}
                            className="flex items-center gap-3 bg-white/5 rounded-lg hover:bg-white/10 transition-colors"
                        >
                            <Icon className="icon" />
                            <p className="flex-1 text-sm break-all">{value}</p>
                            <button
                                onClick={() => handleCopy(value, id)}
                                className="p-2 rounded-md hover:bg-white/10 transition-colors relative group"
                                title="Copy to clipboard"
                            >
                                {copiedItem === id ? (
                                    <Check className="w-4 h-4 text-green-400" />
                                ) : (
                                    <Copy className="w-4 h-4 text-gray-400 group-hover:text-gray-600" />
                                )}
                            </button>
                        </div>
                    ))}
                </div>
                <ul>
                    {socials.map(({ id, bg, link, icon, text }) => (
                        <li key={id} style={{ backgroundColor: bg }}>
                            <a href={link} target="_blank" rel="noopener noreferrer" title={text}>
                                <img src={icon} alt={text} className="size-5" />
                                <p>{text}</p>
                            </a>
                        </li>
                    ))}
                </ul>
            </div>
        </>
    )
}
const ContactWindow = WindowWrapper(Contact, "contact")

export default ContactWindow