import WindowWrapper from "#hoc/WindowWrapper";
import useWindowStore from "#store/window";
import { WindowControlls } from "#components";
import { socials } from "#constants";
import { Copy, Mail } from "lucide-react";
function Contact() {
  return (
    <>
    <div id="window-header">
        <WindowControlls target="contact" />
        <h2>Contact Me</h2>
    </div>
    <div className="p-5 space-y-5">
        <img src="/images/adrian.jpg" alt="adrian" 
        className="w-20 rounded-full"
        />
        <h3>Let's Connect</h3>
        <p>Partner with me to design, develop, and deploy robust digital systems.</p>
        <div className="flex">
            <Mail className="icon"/>---<p>hariramsathya2@gmail.com</p>---<Copy className="icon"/>
        </div>
        <ul>
            {socials.map(({id,bg,link,icon,text})=>(
                <li key ={id} style={{backgroundColor:bg}}>
                    <a href={link} target="_blank" rel="noopener noreferrer" title={text}>
                        <img src={icon} alt={text} className="size-5"/>
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