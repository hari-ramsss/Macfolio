import { Navbar, Welcome, Dock, Home } from "#components";
import { Draggable } from "gsap/Draggable";
import { TerminalWindow, SafariWindow, ResumeWindow, FinderWindow, TextWindow, ImageWindow, ContactWindow, PhotosWindow, GithubFileWindow } from "#windows";
import gsap from "gsap";

gsap.registerPlugin(Draggable);

const App = () => {
  return (
    <>
      <video
        src="/background/background4.mp4"
        autoPlay
        loop
        muted
        playsInline
        style={{
          position: 'fixed',
          top: '0',
          left: '0',
          width: '100vw',
          height: '100vh',
          objectFit: 'cover',
          zIndex: 0,
          pointerEvents: 'none',
        }}
      />
      <main style={{ position: 'relative', zIndex: 1 }}>
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
    </>
  );
};
export default App;