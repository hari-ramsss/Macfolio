const navLinks = [
  {
    id: 1,
    name: "Projects",
    type: "finder",
  },
  {
    id: 3,
    name: "Contact",
    type: "contact",
  },
  {
    id: 4,
    name: "Resume",
    type: "resume",
  },
];

const navIcons = [
  {
    id: 1,
    img: "/icons/wifi.svg",
  },
  {
    id: 2,
    img: "/icons/search.svg",
  },
  {
    id: 3,
    img: "/icons/user.svg",
  },
  {
    id: 4,
    img: "/icons/mode.svg",
  },
];

const dockApps = [
  {
    id: "finder",
    name: "Portfolio", // was "Finder"
    icon: "finder.png",
    canOpen: true,
  },
  {
    id: "safari",
    name: "Articles", // was "Safari"
    icon: "safari.png",
    canOpen: true,
  },
  {
    id: "photos",
    name: "Gallery", // was "Photos"
    icon: "photos.png",
    canOpen: true,
  },
  {
    id: "contact",
    name: "Contact", // or "Get in touch"
    icon: "contact.png",
    canOpen: true,
  },
  {
    id: "terminal",
    name: "Skills", // was "Terminal"
    icon: "terminal.png",
    canOpen: true,
  },
  {
    id: "trash",
    name: "Archive", // was "Trash"
    icon: "trash.png",
    canOpen: false,
  },
];

const blogPosts = [
  {
    id: 1,
    status: "complete(live)",
    title:
      "A decentralized marketplace for buying and selling vouchers, coupons, and gift cards with zero fraud using AI-powered validation and blockchain-powered escrow.",
    image: "/images/blog1.png",
    link: "https://couponmarch-seven.vercel.app/",
  },
  {
    id: 2,
    status: "complete(live)",
    title: "Assembly Endgame - Word Guessing Game",
    image: "/images/blog2.png",
    link: "https://hari-ramsss.github.io/word_guess-react_game-/",
  },
  {
    id: 3,
    status: "complete(live)",
    title: "StillPoint - Interactive Fantasy Adventure Experience",
    image: "/images/blog3.png",
    link: "https://hari-ramsss.github.io/stillpoint/",
  },
];

const techStack = [
  {
    category: "Frontend",
    items: ["React.js", "Next.js", "TypeScript"],
  },
  {
    category: "Mobile",
    items: ["React Native", "Expo"],
  },
  {
    category: "Styling",
    items: ["Tailwind CSS", "Sass", "CSS"],
  },
  {
    category: "Backend",
    items: ["Node.js", "Express", "NestJS", "Hono"],
  },
  {
    category: "Database",
    items: ["MongoDB", "PostgreSQL"],
  },
  {
    category: "Dev Tools",
    items: ["Git", "GitHub", "Docker"],
  },
];

const socials = [
  {
    id: 1,
    text: "Github",
    icon: "/icons/github.svg",
    bg: "#f4656b",
    link: "https://github.com/hari-ramsss",
  },
  {
    id: 2,
    text: "Duolingo",
    icon: "/icons/duolingo.svg",
    bg: "#4bcb63",
    link: "https://www.duolingo.com/profile/HariRam190993?via=share_profile_link",
  },
  {
    id: 3,
    text: "Instagram",
    icon: "/icons/instagram.svg",
    bg: "#e1306c",
    link: "https://www.instagram.com/fforfunart/",
  },
  {
    id: 4,
    text: "LinkedIn",
    icon: "/icons/linkedin.svg",
    bg: "#05b6f6",
    link: "https://www.linkedin.com/in/hari-ram-73179b2b5",
  },
];

const photosLinks = [
  {
    id: 1,
    icon: "/icons/gicon1.svg",
    title: "Library",
  },
  {
    id: 2,
    icon: "/icons/gicon2.svg",
    title: "Memories",
  },
  {
    id: 3,
    icon: "/icons/file.svg",
    title: "Places",
  },
  {
    id: 4,
    icon: "/icons/gicon4.svg",
    title: "People",
  },
  {
    id: 5,
    icon: "/icons/gicon5.svg",
    title: "Favorites",
  },
];

const gallery = [
  {
    id: 1,
    img: "/images/gallery_pfp.jpeg",
  },
  {
    id: 2,
    img: "/images/gallery_paris_pfp.png",
  },
  {
    id: 3,
    img: "/images/gallery_paris_group.jpeg",
  },
  {
    id: 4,
    img: "/images/gallery_eiffel_tower.jpeg",
  },
  {
    id: 5,
    img: "/images/gallery_machine_de_lille.jpeg",
  },
  {
    id: 6,
    img: "/images/gallery_mont_saint_michelle.jpeg",
  },
];

export {
  navLinks,
  navIcons,
  dockApps,
  blogPosts,
  techStack,
  socials,
  photosLinks,
  gallery,
};

const WORK_LOCATION = {
  id: 1,
  type: "work",
  name: "Work",
  icon: "/icons/work.svg",
  kind: "folder",
  children: [
    // ▶ Project 1
    {
      id: 5,
      name: "Coupon_marche",
      icon: "/images/folder.png",
      kind: "folder",
      position: "top-10 left-5",
      windowPosition: "top-[5vh] left-5",
      children: [
        {
          id: 1,
          name: "Coupon_marche.txt",
          icon: "/images/txt.png",
          kind: "file",
          fileType: "txt",
          position: "top-5 left-10",
          description: [
            "A decentralized marketplace for buying and selling vouchers, coupons, and gift cards with zero fraud using AI-powered validation and blockchain-powered escrow.",
            "Upload voucher images, logos, and metadata to IPFS (Pinata) with image processing (thumbnails, blur, resize) 🔧",
            "Interact with smart contracts (marketplace & escrow) using ethers and the built-in lib/contracts.ts config ⚖️",
            "The frontend is a standard Next.js app and can be deployed on Vercel or any Node host that supports Next.js.",
          ],
        },
        {
          id: 2,
          name: "couponmarch-seven.vercel.app",
          icon: "/images/safari.png",
          kind: "file",
          fileType: "url",
          href: "https://couponmarch-seven.vercel.app/",
          position: "top-10 right-20",
        },
        {
          id: 4,
          name: "logo.png",
          icon: "/images/blog1.png",
          kind: "file",
          fileType: "img",
          position: "top-52 right-80",
          imageUrl: "/images/blog1.png",
        },
      ],
    },

    // ▶ Project 2
    {
      id: 6,
      name: "Word_guess_game",
      icon: "/images/folder.png",
      kind: "folder",
      position: "top-52 right-80",
      windowPosition: "top-[20vh] left-7",
      children: [
        {
          id: 1,
          name: "Word_guess_game.txt",
          icon: "/images/txt.png",
          kind: "file",
          fileType: "txt",
          position: "top-5 right-10",
          description: [
            "A fun word guessing game where you must save programming languages from extinction!",
            "HOW TO PLAY",
            "1.Guess letters to reveal the hidden word",
            "2.Each wrong guess eliminates a programming language",
            "3.You have 8 attempts before you're stuck with Assembly!",
            "4.Click letters on the keyboard to make guesses",
          ],
        },
        {
          id: 2,
          name: "WORD_GUESS_GAME",
          icon: "/images/safari.png",
          kind: "file",
          fileType: "url",
          href: "https://hari-ramsss.github.io/word_guess-react_game-/",
          position: "top-20 left-15",
        },
        {
          id: 4,
          name: "Word_guess_game.png",
          icon: "/images/blog2.png",
          kind: "file",
          fileType: "img",
          position: "top-52 left-80",
          imageUrl: "/images/blog2.png",
        },
      ],
    },

    // ▶ Project 3
    {
      id: 7,
      name: "Stillpoint",
      icon: "/images/folder.png",
      kind: "folder",
      position: "top-10 left-80",
      windowPosition: "top-[33vh] left-7",
      children: [
        {
          id: 1,
          name: "Stillpoint.txt",
          icon: "/images/txt.png",
          kind: "file",
          fileType: "txt",
          position: "top-5 left-10",
          description: [
            "StillPoint is an immersive, interactive fantasy web experience that transports users into the mystical world of Aethel.",
            "This creative project combines storytelling, character exploration, and interactive mapping to create a unique digital adventure.",
            "Digital Book Experience: Navigate through an animated book with page-turning effects",
            "Character Backstories: Discover the origins of heroes like Eryn and Lira",
          ],
        },
        {
          id: 2,
          name: "stillpoint.com",
          icon: "/images/safari.png",
          kind: "file",
          fileType: "url",
          href: "https://hari-ramsss.github.io/stillpoint/",
          position: "top-10 right-20",
        },
        {
          id: 4,
          name: "stillpoint.png",
          icon: "/images/blog3.png",
          kind: "file",
          fileType: "img",
          position: "top-52 right-80",
          imageUrl: "/images/blog3.png",
        },
      ],
    },
  ],
};

const ABOUT_LOCATION = {
  id: 2,
  type: "about",
  name: "About me",
  icon: "/icons/info.svg",
  kind: "folder",
  children: [
    {
      id: 1,
      name: "me.png",
      icon: "/images/image.png",
      kind: "file",
      fileType: "img",
      position: "top-10 left-5",
      imageUrl: "/images/gallery_pfp.jpeg",
    },
    {
      id: 2,
      name: "casual-me.png",
      icon: "/images/image.png",
      kind: "file",
      fileType: "img",
      position: "top-28 right-72",
      imageUrl: "/images/pfp_sterlingpic.jpeg",
    },
    {
      id: 3,
      name: "about-me.txt",
      icon: "/images/txt.png",
      kind: "file",
      fileType: "txt",
      position: "top-60 left-5",
      subtitle: "Meet the Developer Behind the Code",
      image: "/images/gallery_paris_pfp.png",
      description: [
        "Hey! I’m Hari 👋, a developer who loves turning ideas into real, working systems.",
        "I build web apps with JavaScript, React, and Node.js—focused on performance and clean architecture.",
        "I enjoy solving problems step by step, whether it’s AI chatbots, backend logic, or system design.",
        "When I’m not coding, I’m refining UI details or building the next ambitious project I probably overplanned 🚀",
      ],
    },
  ],
};

const RESUME_LOCATION = {
  id: 3,
  type: "resume",
  name: "Resume",
  icon: "/icons/file.svg",
  kind: "folder",
  children: [
    {
      id: 1,
      name: "Resume.pdf",
      icon: "/images/pdf.png",
      kind: "file",
      fileType: "pdf",
      // you can add `href` if you want to open a hosted resume
      // href: "/your/resume/path.pdf",
    },
  ],
};

const TRASH_LOCATION = {
  id: 4,
  type: "trash",
  name: "Trash",
  icon: "/icons/trash.svg",
  kind: "folder",
  children: [
    {
      id: 1,
      name: "trash1.png",
      icon: "/images/image.png",
      kind: "file",
      fileType: "img",
      position: "top-10 left-10",
      imageUrl: "/images/trash-1.png",
    },
    {
      id: 2,
      name: "trash2.png",
      icon: "/images/image.png",
      kind: "file",
      fileType: "img",
      position: "top-40 left-80",
      imageUrl: "/images/trash-2.png",
    },
  ],
};

export const locations = {
  work: WORK_LOCATION,
  about: ABOUT_LOCATION,
  resume: RESUME_LOCATION,
  trash: TRASH_LOCATION,
};

const INITIAL_Z_INDEX = 1000;

const WINDOW_CONFIG = {
  finder: { isOpen: false, zIndex: INITIAL_Z_INDEX, data: null },
  contact: { isOpen: false, zIndex: INITIAL_Z_INDEX, data: null },
  resume: { isOpen: false, zIndex: INITIAL_Z_INDEX, data: null },
  safari: { isOpen: false, zIndex: INITIAL_Z_INDEX, data: null },
  photos: { isOpen: false, zIndex: INITIAL_Z_INDEX, data: null },
  terminal: { isOpen: false, zIndex: INITIAL_Z_INDEX, data: null },
  txtfile: { isOpen: false, zIndex: INITIAL_Z_INDEX, data: null },
  imgfile: { isOpen: false, zIndex: INITIAL_Z_INDEX, data: null },
  githubfile: { isOpen: false, zIndex: INITIAL_Z_INDEX, data: null },
};

export { INITIAL_Z_INDEX, WINDOW_CONFIG };