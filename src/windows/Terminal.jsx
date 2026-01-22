import { techStack } from "#constants";
import { Check,Flag } from "lucide-react";
import {WindowControlls} from "#components"
import WindowWrapper from "#hoc/WindowWrapper"
function Terminal() {
  return (
    <>
    <div id="window-header">
        <WindowControlls target = "terminal"/>
        <h2>Tech Stack</h2>
    </div>
    <div className="techstack">
        <p>
            <span className="font-bold">@Hari_Ram_%</span>
            show tech stack
        </p>
        <div className="label">
        <p className="w-32">Category</p>
        <p>Technologies</p>
    </div>
    <ul className="content">
        {techStack.map(({category,items})=>(
            <li key={category} className="flex items-center">
                <Check className="check" size={20}/>
                <h3>{category}</h3>
                <ul>{items.map((item,i)=>(
                    <li key={i}>{item} {i<items.length-1?',':""}</li> 
                ))}</ul>
            </li>
        ))}
    </ul>
    <div className="footnote">
        <p>
            <Check size={20}/>5 of 5 loaded successfully (100%)
        </p>
        <p className="text-black">
            <Flag size={20} fill="black"/>
            Render Time:2.3ms
        </p>
    </div>
    </div>
    
    </>
  )
}

const TerminalWindow = WindowWrapper(Terminal,"terminal");


export default TerminalWindow;