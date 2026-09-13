export const profile = {
  name: "Oussama El Hassouni",
  email: "oelhasso@student.1337.ma",
  phone: "+212 698 792 058",
  github: "https://github.com/alemdaar",
  linkedin: "https://www.linkedin.com/in/oussama-el-hassouni-024228362/",
};
export const coreUrl =
  "https://github.com/alemdaar/1337---Common-Core-Projects";
export const projects = [
  {
    id: "transcendence",
    number: "04",
    category: "Backend",
    name: "ft_transcendence",
    status: "In progress",
    subtitle: "A multiplayer game, built as a team.",
    description:
      "An in-progress multiplayer tic-tac-toe platform built with a four-person team. My scope covers the game engine, real-time communication, spectator mode, and a Minimax AI opponent.",
    tags: ["Node.js", "Express", "PostgreSQL", "WebSocket"],
    path: null,
    challenge:
      "Design a server-authoritative game backend that keeps remote players and spectators synchronized while integrating with the team's user and application services.",
    details: [
      "Planned stack: Node.js, Express, PostgreSQL, and WebSocket.",
      "My responsibility: game state, move validation, and result handling.",
      "Planned real-time features: remote play and spectator updates.",
      "Planned AI opponent: Minimax for tic-tac-toe.",
    ],
    takeaway:
      "The focus is on clear service boundaries, a consistent game state, and reliable communication between the game backend and the rest of the application.",
  },
  {
    id: "inception",
    number: "02",
    category: "Infrastructure",
    name: "Inception",
    subtitle: "Separate services. One coherent system.",
    description:
      "A containerized web stack with custom images, encrypted connections, persistent storage, and reproducible initialization.",
    tags: ["Docker", "NGINX", "MariaDB"],
    path: "Circle_05/Inception",
    challenge:
      "Make a multi-service environment reproducible while separating networking, application processes and persistent data.",
    details: [
      "Custom Debian-based images orchestrated with Docker Compose.",
      "NGINX with TLS in front of WordPress and PHP-FPM.",
      "MariaDB storage with persistent volumes and automated initialization.",
      "Redis, FTP and Adminer extend the service environment.",
    ],
    takeaway:
      "Infrastructure is part of the application: service boundaries, startup order and data persistence all shape its behavior.",
  },
  {
    id: "minishell",
    number: "03",
    category: "Systems",
    name: "Minishell",
    subtitle: "A prompt. A parser. A world of processes.",
    description:
      "A Unix shell in C that turns command-line input into processes, pipelines, redirections, and built-in commands.",
    tags: ["C", "POSIX", "Processes"],
    path: "Circle_03/minishell",
    challenge:
      "Translate shell syntax into predictable process behavior while managing memory, file descriptors and signals.",
    details: [
      "Command parsing, environment expansion and PATH resolution.",
      "Pipelines and redirections connect processes through file descriptors.",
      "Process creation and execution with fork() and execve().",
      "Built-in commands and POSIX signal handling.",
    ],
    takeaway:
      "A shell brings parsing and operating-system interfaces together, where resource ownership matters at every step.",
  },
];
export const curriculum = [
  ["libft", "A foundational C library", "Circle_00/libft"],
  [
    "ft_printf",
    "Formatted output and variadic functions",
    "Circle_01/ft_printf",
  ],
  [
    "get_next_line",
    "Buffered, line-by-line file reading",
    "Circle_01/get_next_line",
  ],
  [
    "Born2beroot",
    "Linux administration and virtualization",
    "Circle_01/Born2beroot",
  ],
  ["pipex", "Pipes and process execution", "Circle_02/pipex"],
  ["so_long", "A small 2D game in C", "Circle_02/so_long"],
  ["push_swap", "Sorting with constrained operations", "Circle_02/push_swap"],
  ["philosophers", "Threads and synchronization", "Circle_03/philosophers"],
  ["Cub3D", "Raycasting and real-time rendering", "Circle_04/Cub3d"],
  [
    "NetPractice",
    "IP addressing and network configuration",
    "Circle_04/net_practice",
  ],
  ["C++ Modules 00–09", "OOP, templates and the STL", "Circle_04"],
];
