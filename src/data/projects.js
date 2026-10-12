// category: All / Web / Mobile / Game / AR/VR（筛选按钮在 Projects.vue 里固定）
// image:    可选封面图，例如 '/projects/westara.jpg'（放在 public/projects/）
// link:     可选，线上网站。没有就不显示 "Visit Site" 按钮
// source:   可选，源码地址（GitHub 等）。没有就不显示 "Source Code" 按钮
export const projects = [
  {
    title: 'Personal Portfolio',
    category: 'Web',
    description:
      'My personal portfolio website, showcasing my education, work experience, projects and skills.',
    points: [
      'Designed and built the responsive portfolio from scratch, with a data-driven structure so content is easy to update',
      'Developed reusable Vue components, including a timeline, project cards and a project detail modal',
      'Implemented project filtering by category and a horizontally scrolling project gallery',
      'Created an animated skills marquee and a contact section linking to my GitHub, LinkedIn and email',
    ],
    tags: ['Vue 3', 'Vite', 'JavaScript', 'CSS'],
    link: '',
    source: '',
    image: '/personal-portfolio.png',
  },
  {
    title: 'BioAR',
    category: 'AR/VR',
    description:
      'An augmented reality learning application that makes complex biology concepts easier to understand through interactive 3D models, quizzes, multiplayer collaboration, and an AI chatbot.',
    points: [
      'Implemented AR surface scanning to place interactive 3D biology models into real-world environments, allowing students to explore objects and view their names and descriptions.',
      'Developed interactive quizzes to reinforce biology concepts and help students retain knowledge.',
      'Developed a shared AR learning experience using Photon Unity Networking (PUN), allowing students on separate devices to view and interact with the same 3D model in a real-world environment.',
      'Integrated an AI chatbot to support students with biology-related questions and learning assistance.',
    ],
    tags: ['Unity', 'C#', 'Augmented Reality', '3D Modeling', 'Photon PUN', 'AI Chatbot'],
    link: '',
    source: '',
    apk: 'https://drive.google.com/drive/folders/13vqSfT7RWPYOl8nn5JUnXB0B4MoNirte',
    image: '/bioar.jpeg',
  },
  {
    title: 'RapidPrint',
    category: 'Web',
    description: 'A web-based solution designed to manage printing services across both UMPSA campuses, named RapidPrint.',
    points: [
      'Developed a session-based login system for different user roles, displaying registered user names after successful authentication.',
      'Implemented CRUD functionality for managing UMPSAKoop branch information and printing packages.',
      'Developed an administrator dashboard with graphical reports to support monitoring and data analysis.',
      'Implemented printing package availability controls to restrict orders for temporarily unavailable packages.',
    ],
    tags: ['HTML', 'CSS', 'Bootstrap', 'PHP', 'JavaScript', 'MySQL'],
    link: '',
    source: 'https://github.com/winnie-12/RapidPrint.git',
    image: '/rapidprint.png',
  },
  {
    title: 'BettrHelp',
    category: 'Mobile',
    description:
      'A mobile mental wellness application designed to support Malaysian university and polytechnic students in managing their mental well-being',
    points: [
      'Developed the Mood & Stress Tracker module, enabling users to record their mood, stress level, and energy level.',
      'Designed interactive activity selection with categorized icons for emotions, events, people, school, and health, helping users identify factors that influence their emotional well-being.',
      'Integrated text input, speech-to-text using Android Speech Recognition, and photo uploads, allowing users to add personal details and context to their mood entries.',
    ],
    tags: [
      'Android Studio',
      'Java',
      'Figma',
      'Firebase',
    ],
    demo: 'https://www.youtube.com/watch?v=H1P5k0zNqeU',
    source: 'https://drive.google.com/drive/folders/1C_70xzOBIGzS6SNLSyPk7xK3He5xHoVt',
    image: '/bettrhelp.png',
  },
  {
    title: 'Task & To-Do Management System',
    category: 'Web',
    description:
      'A Laravel-based task management web application that enables administrators to manage employee accounts and assign tasks, while employees can track task progress and manage their profiles.',
    points: [
      'Developed task and user management features with role-based access control for administrators and employees.',
      'Designed a MySQL database and implemented CRUD operations using Laravel Eloquent ORM.',
      'Developed RESTful API endpoints and tested CRUD requests using Postman.'
    ],
    tags: ['Laravel', 'PHP', 'MySQL', 'REST API', 'Postman', 'Bootstrap'],
    link: '',
    source: '',
    image: '/todo.png',
  },
  {
    title: 'Yummy Match!',
    category: 'Game',
    description:
      'An educational game designed to teach children about healthy eating and balanced diets through fun and interactive gameplay.',
    points: [
      'Developed an educational game using Unity to introduce children to food groups, including carbohydrates, vegetables, protein, fruits, and junk food.',
      'Designed interactive drag-and-drop gameplay with a scoring system based on food choices, enhancing engagement and learning outcomes.',
    ],
    tags: ['Unity', 'C#'],
    play: 'https://play.unity.com/api/v1/games/game/fd29f477-96d6-4753-bccb-6f55ace76b26/build/latest/frame',
    source: '',
    image: '/yummy-match.jpg',
  },
  {
    title: 'Yue Xuan: Wrath of the NianShou - Level 3',
    category: 'Game',
    description:
      'A 2D PC adventure game that follows Yue Xuan on a quest to defeat the legendary Nianshou and protect his village.',
    points: [
      'Developed Level 3 of the 2D game using Unity, implementing gameplay mechanics, character controls, and interactive elements.',
      'Designed and integrated visual assets, character animations, and UI elements to enhance the gameplay experience.',
    ],
    tags: ['Unity', 'C#'],
    demo: 'https://www.youtube.com/watch?v=vWYyDyrLnXE',
    source: '',
    image: '/yue-xuan.png',
  },
  {
    title: 'Construction VR Training System',
    category: 'AR/VR',
    description:
      'A VR training application designed to teach construction site safety awareness and guide users through the house-building process in an immersive 3D environment.',
    points: [
      'Implemented interactive object grabbing and socket interactions for construction equipment and materials, including safety helmets, tools, steel reinforcement bars, and pipes.',
      'Developed VR interactions for construction tasks such as digging foundation holes, placing reinforcement bars, and preparing the foundation for concrete work.',
      'Implemented teleportation, ray-based UI interactions, and direct hand interactions to support navigation and object manipulation in the VR environment.',
      'Integrated audio, haptic feedback, and particle effects to enhance interaction feedback and provide a more immersive training experience.',
    ],
    tags: [
      'Unity',
      'C#',
      'VR',
    ],
    demo: 'https://www.youtube.com/watch?v=KOyAEy8903k',
    source: '',
    image: '/construction-vr.png',
  },
  {
    title: 'The Subconscious Nightmare',
    category: 'Game',
    description:
      'A psychological horror game in which players navigate Megan’s terrifying nightmare, solve puzzles, evade enemies, and uncover clues to escape.',
    points: [
      'Developed Level 2 gameplay mechanics, including a health system, healing items, player death, and level restart functionality.',
      'Implemented puzzle progression requiring players to collect 20 hidden puzzle pieces, find colour-coded keys to unlock cabinets, and obtain a clue after completing the puzzle.',
      'Developed a password-based keypad system that allows players to unlock doors using clues discovered during gameplay.',
      'Implemented enemy AI using Unity NavMesh and a Finite State Machine, enabling enemies to patrol, detect and chase the player, attack, and respond to stun effects.',
      'Developed player defence mechanics, including hiding in lockers to evade enemies and using a camera flash to temporarily stun nearby enemies.',
    ],
    tags: [
      'Unity',
      'C#',
      'Animation',
    ],
    link: '',
    source: 'https://drive.google.com/drive/folders/1bbjb7jC2bW8Udi7z_GP0KnVbQ0-AVeYQ',
    image: '/nightmare.png',
  }

]
