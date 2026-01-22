import { Navbar,Welcome,Dock } from "#components";
import {Draggable} from "gsap/Draggable";
import {TerminalWindow,Safari} from "#windows";
import gsap from "gsap";

gsap.registerPlugin(Draggable);

const App = () => {
    return (
        <main>
          <Navbar/>
          <Welcome/>
          <Dock/>

          <TerminalWindow/>
          <Safari/>
        </main>
    );
};
export default App;