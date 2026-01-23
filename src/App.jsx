import { Navbar,Welcome,Dock } from "#components";
import {Draggable} from "gsap/Draggable";
import {TerminalWindow,SafariWindow,ResumeWindow} from "#windows";
import gsap from "gsap";

gsap.registerPlugin(Draggable);

const App = () => {
    return (
        <main>
          <Navbar/>
          <Welcome/>
          <Dock/>

          <TerminalWindow/>
          <SafariWindow/>
          <ResumeWindow/>
        </main>
    );
};
export default App;