import { Navbar, Welcome, Dock, Home } from "#components";
import { Draggable } from "gsap/Draggable";
import { TerminalWindow, SafariWindow, ResumeWindow, FinderWindow, TextWindow, ImageWindow, ContactWindow, PhotosWindow, GithubFileWindow } from "#windows";
import gsap from "gsap";

gsap.registerPlugin(Draggable);

const App = () => {
  return (
    <main>
      <Navbar />
      <Welcome />
      <Dock />
      <Home />
      <TerminalWindow />
      <SafariWindow />
      <ResumeWindow />
      <FinderWindow />
      <PhotosWindow />
      <TextWindow />
      <ImageWindow />
      <ContactWindow />
      <GithubFileWindow />
    </main>
  );
};
export default App;