import "@fontsource/dm-sans/latin-400.css";
import "@fontsource/dm-sans/latin-500.css";
import "@fontsource/dm-sans/latin-600.css";
import "@fontsource/dm-sans/latin-700.css";
import "@fontsource/dm-serif-display/latin-400.css";
import "@fontsource/dm-serif-display/latin-400-italic.css";
import "@fontsource/ibm-plex-mono/latin-400.css";
import "@fontsource/ibm-plex-mono/latin-500.css";
import React, { useState, useEffect, useRef } from "react";
import { createRoot } from "react-dom/client";
import {
  ArrowUpRight,
  ArrowRight,
  ArrowDown,
  Github,
  Linkedin,
  Mail,
  Menu,
  X,
  Copy,
  Check,
  MapPin,
  Terminal,
  Layers,
  Code2,
  Plus,
  Minus,
  RotateCcw,
} from "lucide-react";
import { profile, projects, curriculum, coreUrl } from "./data";
import "./styles.css";
const External = ({ href, children, ...props }) => (
  <a href={href} target="_blank" rel="noopener noreferrer" {...props}>
    {children}
  </a>
);
function SectionLabel({ number, children }) {
  return (
    <p className="eyebrow">
      <span>{number} /</span> {children}
    </p>
  );
}
function ProjectArt({ kind }) {
  if (kind === "transcendence") {
    return (
      <div className="project-art minishell" aria-hidden="true">
        <div className="art-top">
          <span>○ ○ ○</span>
          <span>FT_TRANSCENDENCE · IN PROGRESS</span>
        </div>

        <div className="shell-art">
          <p><b>PROJECT</b> Multiplayer tic-tac-toe</p>
          <p className="muted">Backend architecture in development.</p>
          <p><b>01</b> Game engine</p>
          <p><b>02</b> Real-time communication</p>
          <p><b>03</b> Spectator mode</p>
          <p><b>04</b> Minimax AI</p>
        </div>

        <span className="art-caption">
          Node.js / Express / PostgreSQL / WebSocket
        </span>
      </div>
    );
  }
  return (
    <div className={"project-art " + kind} aria-hidden="true">
      <div className="art-top">
        <span>○ ○ ○</span>
        <span>
          {kind === "webserv"
            ? "REQUEST LIFECYCLE"
            : kind === "inception"
              ? "SERVICE ARCHITECTURE"
              : "~/minishell"}
        </span>
      </div>
      {kind === "webserv" ? (
        <div className="http-art">
          <div className="request">
            <span>REQUEST</span>
            <code>
              <b>GET</b> /index.html
            </code>
            <small>HTTP/1.1</small>
          </div>
          <div className="flow-line">
            <i />
          </div>
          <div className="server-node">
            <Layers size={26} />
            <span>poll()</span>
            <small>EVENT LOOP</small>
          </div>
          <div className="response">
            <span className="dot" /> 200 OK <span>→</span>
          </div>
        </div>
      ) : kind === "inception" ? (
        <div className="infra-art">
          <div className="infra-node">
            NGINX <small>:443 / TLS</small>
          </div>
          <div className="connector" />
          <div className="infra-node wide">
            WordPress <small>PHP-FPM</small>
          </div>
          <div className="connector" />
          <div className="infra-bottom">
            <div>
              MariaDB <small>DATA</small>
            </div>
            <div>
              Redis <small>CACHE</small>
            </div>
          </div>
        </div>
      ) : (
        <div className="shell-art">
          <p>
            <b>➜</b> <span>~</span> ./minishell
          </p>
          <p className="muted">A little closer to the machine.</p>
          <p>
            <b>$</b> echo hello | cat
          </p>
          <p>hello</p>
          <p>
            <b>$</b> export IDEA=build
          </p>
          <p>
            <b>$</b> echo $IDEA
          </p>
          <p>
            build
            <span className="cursor" />
          </p>
        </div>
      )}
      <span className="art-caption">
        {kind === "webserv"
          ? "01 socket → parse → respond"
          : kind === "inception"
            ? "02 isolated by design"
            : "03 built from first principles"}
      </span>
    </div>
  );
}
function ProjectModal({ project, onClose }) {
  const ref = useRef(null);
  useEffect(() => {
    ref.current.showModal();
    const old = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    return () => {
      document.body.style.overflow = old;
    };
  }, []);
  return (
    <dialog
      ref={ref}
      onCancel={onClose}
      onClick={(e) => {
        if (e.target === ref.current) onClose();
      }}
      aria-labelledby="project-title"
    >
      <div className="modal-inner">
        <button
          className="icon-button close"
          onClick={onClose}
          aria-label="Close project"
        >
          <X />
        </button>
        <SectionLabel number={project.number}>
          {project.category} / Project notes
        </SectionLabel>
        <h2 id="project-title">{project.name}</h2>
        <p className="modal-lead">{project.subtitle}</p>
        <h3>The challenge</h3>
        <p>{project.challenge}</p>
        <h3>
          {project.status ? "Scope & planned implementation" : "Inside the implementation"}
        </h3>
        <ul>
          {project.details.map((d) => (
            <li key={d}>{d}</li>
          ))}
        </ul>
        <div className="takeaway">
          <span className="eyebrow">Engineering perspective</span>
          <p>{project.takeaway}</p>
        </div>
        {project.path ? (
          <External
            href={`${coreUrl}/tree/main/${project.path}`}
            className="button dark"
          >
            Explore the source <Github size={17} />
          </External>
        ) : (
          <p>In development — source link coming soon.</p>
        )}
      </div>
    </dialog>
  );
}
function Game() {
  const [board, setBoard] = useState(Array(9).fill(null));
  const [next, setNext] = useState("X");
  const lines = [
    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8],
    [0, 3, 6],
    [1, 4, 7],
    [2, 5, 8],
    [0, 4, 8],
    [2, 4, 6],
  ];
  const win = lines.find(
    ([a, b, c]) => board[a] && board[a] === board[b] && board[a] === board[c],
  );
  const winner = win ? board[win[0]] : null;
  const full = board.every(Boolean);
  return (
    <div className="game">
      <div className="game-head">
        <span>PLAY A LITTLE.</span>
        <button
          onClick={() => {
            setBoard(Array(9).fill(null));
            setNext("X");
          }}
          aria-label="Reset game"
        >
          <RotateCcw size={16} />
        </button>
      </div>
      <div className="board">
        {board.map((v, i) => (
          <button
            key={i}
            className={win?.includes(i) ? "winning" : ""}
            disabled={!!v || !!winner}
            aria-label={`Cell ${i + 1}${v ? `, ${v}` : ", empty"}`}
            onClick={() => {
              if (full || winner || board[i]) return;
              setBoard(board.map((x, j) => (j === i ? next : x)));
              setNext(next === "X" ? "O" : "X");
            }}
          >
            {v}
          </button>
        ))}
      </div>
      <p aria-live="polite">
        {winner
          ? `${winner} wins. Well played.`
          : full
            ? "A draw. Another round?"
            : `${next}'s turn · local two-player`}
      </p>
    </div>
  );
}
function Contact() {
  const [copied, setCopied] = useState(false);
  const [copyError, setCopyError] = useState(false);
  useEffect(() => {
    if (!copied) return;
    const t = setTimeout(() => setCopied(false), 2200);
    return () => clearTimeout(t);
  }, [copied]);
  return (
    <section id="contact" className="contact section">
      <div className="contact-copy">
        <SectionLabel number="04">LET’S CONNECT</SectionLabel>
        <h2>
          Good software starts
          <br />
          with a <em>conversation.</em>
        </h2>
        <p>
          Have an internship opportunity, a project in mind, or an interesting
          problem? I’d love to hear about it.
        </p>
        <a className="email-link" href={`mailto:${profile.email}`}>
          {profile.email}
          <ArrowUpRight size={20} />
        </a>
        <div className="contact-actions">
          <button
            className="text-button"
            onClick={async () => {
              try {
                await navigator.clipboard.writeText(profile.email);
                setCopied(true);
                setCopyError(false);
              } catch {
                setCopyError(true);
              }
            }}
          >
            {copied ? <Check size={16} /> : <Copy size={16} />}{" "}
            {copied ? "Copied email" : "Copy email"}
          </button>
          <a href="tel:+212698792058">{profile.phone}</a>
        </div>
        {copyError && (
          <p role="status">Please select and copy the email address above.</p>
        )}
        <div className="socials">
          <External href={profile.github}>
            <Github size={17} />
            GitHub <ArrowUpRight size={14} />
          </External>
          <External href={profile.linkedin}>
            <Linkedin size={17} />
            LinkedIn <ArrowUpRight size={14} />
          </External>
        </div>
      </div>
      <form
        className="contact-form"
        action={`https://formsubmit.co/${profile.email}`}
        method="POST"
      >
        <h3>
          Send a message <ArrowUpRight size={20} />
        </h3>
        <div className="form-row">
          <label>
            Your name
            <input
              autoComplete="name"
              name="name"
              placeholder="Alex Morgan"
              required
              maxLength={100}
            />
          </label>
          <label>
            Email address
            <input
              autoComplete="email"
              type="email"
              name="email"
              placeholder="alex@company.com"
              required
              maxLength={254}
            />
          </label>
        </div>
        <label>
          Subject
          <input
            name="_subject"
            placeholder="Let’s build something together"
            required
            maxLength={160}
          />
        </label>
        <label>
          Message
          <textarea
            name="message"
            placeholder="Tell me a little about what you have in mind…"
            required
            minLength={10}
            maxLength={5000}
            rows={4}
          />
        </label>
        <input
          type="text"
          name="_honey"
          className="honeypot"
          tabIndex="-1"
          autoComplete="off"
          aria-hidden="true"
        />
        <input type="hidden" name="_template" value="table" />
        <button className="button dark" type="submit">
          Send message <ArrowUpRight size={18} />
        </button>
        <p className="form-note">
          Your message is processed by{" "}
          <External href="https://formsubmit.co/privacy.pdf">
            FormSubmit
          </External>{" "}
          and sent to my inbox. You’ll continue to a secure verification page.
        </p>
      </form>
    </section>
  );
}
function App() {
  const [menu, setMenu] = useState(false);
  const [filter, setFilter] = useState("All work");
  const [selected, setSelected] = useState(null);
  const [expanded, setExpanded] = useState(false);
  const [active, setActive] = useState("");
  useEffect(() => {
    const obs = new IntersectionObserver(
      (entries) =>
        entries.forEach((e) => {
          if (e.isIntersecting) setActive(e.target.id);
        }),
      { rootMargin: "-15% 0px -55% 0px" },
    );
    document
      .querySelectorAll("main section[id]")
      .forEach((el) => obs.observe(el));
    return () => obs.disconnect();
  }, []);
  useEffect(() => {
    const fn = (e) => {
      if (e.key === "Escape") setMenu(false);
    };
    window.addEventListener("keydown", fn);
    return () => window.removeEventListener("keydown", fn);
  }, []);
  return (
    <>
      <a href="#main" className="skip-link">
        Skip to content
      </a>
      <header>
        <div className="nav-wrap">
          <a
            href="#home"
            className="logo"
            aria-label="Oussama El Hassouni home"
          >
            oe<span>.</span>
          </a>
          <span className="nav-name">OUSSAMA EL HASSOUNI</span>
          <button
            className="menu-toggle icon-button"
            onClick={() => setMenu(!menu)}
            aria-expanded={menu}
            aria-controls="navigation"
            aria-label={menu ? "Close navigation" : "Open navigation"}
          >
            {menu ? <X /> : <Menu />}
          </button>
          <nav id="navigation" className={menu ? "open" : ""}>
            {[
              ["projects", "Work"],
              ["about", "About"],
              ["expertise", "Expertise"],
              ["contact", "Contact"],
            ].map(([id, label]) => (
              <a
                key={id}
                href={"#" + id}
                onClick={() => setMenu(false)}
                className={active === id ? "active" : ""}
              >
                {label}
              </a>
            ))}
            <a className="nav-contact" href={`mailto:${profile.email}`}>
              Let’s talk <ArrowUpRight size={15} />
            </a>
          </nav>
        </div>
      </header>
      <main id="main">
        <section id="home" className="hero">
          <div className="hero-top">
            <span className="availability">
              <span className="dot" /> OPEN TO WORK
            </span>
            <span className="location">
              <MapPin size={13} /> TETOUAN, MOROCCO
            </span>
          </div>
          <div className="hero-grid">
            <div className="hero-copy">
              <p className="eyebrow">SOFTWARE DEVELOPER</p>
              <h1>
                Built on curiosity.
                <br />
                Engineered
                <br />
                from the <span className="serif">ground up.</span>
              </h1>
              <p className="hero-description">
              I’m Oussama, a software developer focused on backend development.
              I’m building my skills in APIs, databases, and real-time applications,
              while exploring artificial intelligence and data.
              </p>
              <div className="hero-buttons">
                <a className="button dark" href="#projects">
                  Explore my work <ArrowDown size={17} />
                </a>
                <External href={profile.github} className="button outline">
                  <Github size={17} /> GitHub <ArrowUpRight size={15} />
                </External>
              </div>
              <div className="hero-school">
                <span className="school-mark">1337</span>
                <span>
                  Learning by building.
                  <br />
                  <b>42 Network · UM6P</b>
                </span>
              </div>
            </div>
            <div className="hero-visual">
              <div className="visual-label">
                <span className="dot" /> THE ENGINEERING MINDSET{" "}
                <span>01—03</span>
              </div>
              <div className="system-drawing">
                <div className="orbital orbit-one" />
                <div className="orbital orbit-two" />
                <div className="orbital orbit-three" />
                <div className="core-block">
                  <Code2 size={42} strokeWidth={1.2} />
                  <span>
                    BUILD.
                    <br />
                    UNDERSTAND.
                    <br />
                    ITERATE.
                  </span>
                </div>
                <div className="floating-tag tag-one">
                  <Terminal size={14} /> systems.c
                </div>
                <div className="floating-tag tag-two">
                  <Layers size={14} /> infrastructure
                </div>
                <div className="floating-tag tag-three">
                  <span className="dot" /> always learning
                </div>
                <span className="axis-label">C / C++ / JAVA</span>
              </div>
              <div className="visual-footer">
                <span>
                  Complex problems.
                  <br />
                  <b>Thoughtful solutions.</b>
                </span>
                <ArrowUpRight size={32} strokeWidth={1} />
              </div>
            </div>
          </div>
          <div className="hero-bottom">
            <span>BACKEND DEVELOPMENT · EXPLORING AI & DATA</span>

            <div>
              {[
                "JavaScript",
                "Node.js & Express",
                "Python",
                "Java & Spring Boot",
                "PostgreSQL",
                "Docker",
                "C & C++",
              ].map((technology) => (
                <span key={technology}>{technology}</span>
              ))}
            </div>
              
            <a href="#projects" aria-label="Scroll to selected work">
              <ArrowDown size={17} />
            </a>
          </div>
        </section>
        <section id="projects" className="section projects">
          <div className="section-heading">
            <div>
              <SectionLabel number="01">SELECTED WORK</SectionLabel>
              <h2>
                Proof, in the <em>projects.</em>
              </h2>
            </div>
            <p>
              Real implementations. Clear decisions.
              <br />A closer look at how I build.
            </p>
          </div>
          <div className="filters" aria-label="Filter projects">
            {["All work", "Backend", "Systems", "Infrastructure"].map((f) => (
              <button
                aria-pressed={filter === f}
                key={f}
                onClick={() => setFilter(f)}
                className={filter === f ? "selected" : ""}
              >
                {f}
                {f === "All work" && (
                  <span>{String(projects.length).padStart(2, "0")}</span>
                )}
              </button>
            ))}
          </div>
          <div className="project-grid">
            {projects
              .filter((p) => filter === "All work" || p.category === filter)
              .map((p) => (
                <article className="project-card" key={p.id}>
                  <button
                    className="art-button"
                    onClick={() => setSelected(p)}
                    aria-label={`Explore ${p.name}`}
                  >
                    <ProjectArt kind={p.id} />
                  </button>
                  <div className="project-meta">
                  <span>
                    {p.category}
                    {p.status ? ` · ${p.status}` : ""}
                  </span>
                    <span>/{p.number}</span>
                  </div>
                  <h3>
                    <button onClick={() => setSelected(p)}>
                      {p.name}
                      <ArrowUpRight size={23} />
                    </button>
                  </h3>
                  <p>{p.description}</p>
                  <div className="tags">
                    {p.tags.map((t) => (
                      <span key={t}>{t}</span>
                    ))}
                  </div>
                  <button
                    className="project-detail"
                    onClick={() => setSelected(p)}
                  >
                    Explore project <ArrowRight size={16} />
                  </button>
                </article>
              ))}
          </div>
          <div className="repo-line">
            <span>Every abstraction has a story. These are mine.</span>
            <External href={profile.github}>
              All repositories <ArrowUpRight size={16} />
            </External>
          </div>
        </section>
        <section id="about" className="section about">
          <div className="about-photo">
            <img
              src="/oelhasso.jpg"
              alt="Oussama El Hassouni"
              loading="lazy"
              width="720"
              height="900"
            />
            <span className="photo-caption">
              OUSSAMA EL HASSOUNI <span>35.57° N / 5.37° W</span>
            </span>
            <div className="photo-badge">
              The person
              <br />
              behind the code.
              <ArrowDown size={21} />
            </div>
          </div>
          <div className="about-copy">
            <SectionLabel number="02">A LITTLE ABOUT ME</SectionLabel>
            <h2>
              I like knowing
              <br />
              <em>what’s underneath.</em>
            </h2>
            <p>
              I’m a software engineering student at{" "}
              <strong>1337, part of the 42 Network and UM6P</strong>, in
              Tetouan, Morocco. My foundation is in C and C++: memory,
              processes, networks, and the details that make software work.
            </p>
            <p>
              At 1337, learning means building, debugging, and defending your
              decisions with peers. That experience shapes how I approach a
              problem: understand the fundamentals, make deliberate choices, and
              keep improving.
            </p>
            <p>
              I’m now developing my backend skills with{" "}
              <strong>Java and Spring Boot</strong>, with a growing interest in
              AI and data.
            </p>
            <div className="about-facts">
              <div>
                <span>EDUCATION</span>
                <b>1337 · 42 Network</b>
                <small>Project-based, peer-to-peer learning</small>
              </div>
              <div>
                <span>FOCUS</span>
                <b>Backend · AI & Data</b>
                <small>Building backends. Exploring AI and data.</small>
              </div>
            </div>
            <External href="https://1337.ma/" className="text-link">
              Discover my learning environment <ArrowUpRight size={16} />
            </External>
          </div>
        </section>
        <section id="expertise" className="section expertise">
          <div className="section-heading">
            <div>
              <SectionLabel number="03">TOOLS & FOUNDATIONS</SectionLabel>
              <h2>
                Depth before <em>buzzwords.</em>
              </h2>
            </div>
            <p>
              A systems foundation.
              <br />A backend direction.
            </p>
          </div>
          <div className="skills-grid">
            {[
              [
                <Terminal />,
                "01",
                "Systems programming",
                "Working close to the operating system.",
                [
                  "C",
                  "C++",
                  "POSIX",
                  "Linux",
                  "Signals",
                  "Multithreading",
                  "Memory management",
                ],
              ],
              [
                <Code2 />,
                "02",
                "Backend development",
                "Building on a strong foundation.",
                [
                  "Java · learning",
                  "Spring Boot · learning",
                  "Python",
                  "REST APIs",
                  "HTTP",
                  "Sockets",
                ],
              ],
              [
                <Layers />,
                "03",
                "Infrastructure & tools",
                "Connecting code to its environment.",
                [
                  "Docker",
                  "Docker Compose",
                  "NGINX",
                  "MariaDB",
                  "MySQL",
                  "Git",
                  "Bash",
                ],
              ],
            ].map(([icon, n, title, desc, tags]) => (
              <div className="skill-card" key={n}>
                <div className="skill-top">
                  {icon}
                  <span>{n}</span>
                </div>
                <h3>{title}</h3>
                <p>{desc}</p>
                <div className="tags">
                  {tags.map((t) => (
                    <span key={t}>{t}</span>
                  ))}
                </div>
              </div>
            ))}
          </div>
          <div className="curriculum">
            <button
              className="curriculum-toggle"
              aria-expanded={expanded}
              aria-controls="curriculum-list"
              onClick={() => setExpanded(!expanded)}
            >
              <span>
                <b>The foundation: 42 Common Core</b>
                <small>
                  Algorithms, concurrency, graphics, networking, and
                  object-oriented programming.
                </small>
              </span>
              {expanded ? <Minus /> : <Plus />}
            </button>
            {expanded && (
              <div id="curriculum-list" className="curriculum-list">
                {curriculum.map(([name, desc, path]) => (
                  <External key={name} href={`${coreUrl}/tree/main/${path}`}>
                    <b>{name}</b>
                    <span>{desc}</span>
                    <ArrowUpRight size={15} />
                  </External>
                ))}
                <div className="in-progress">
                  <b>ft_transcendence</b>
                  <span>Real-time multiplayer platform</span>
                  <small>IN PROGRESS</small>
                </div>
              </div>
            )}
          </div>
        </section>
        <section className="section playground">
          <div>
            <p className="eyebrow">OFF THE CRITICAL PATH</p>
            <h2>
              Curiosity doesn’t
              <br />
              <em>clock out.</em>
            </h2>
            <p className="playground-intro">
              Small experiments. Useful tools. Ideas worth exploring.
            </p>
            <div className="side-projects">
              <External href="https://github.com/alemdaar/Freere">
                <div>
                  <h3>
                    Freere <span>C / DEVELOPER TOOLS</span>
                  </h3>
                  <p>
                    A lightweight memory diagnostic tool for leaks, double
                    frees, and invalid frees.
                  </p>
                </div>
                <ArrowUpRight />
              </External>
              <External href="https://github.com/alemdaar/X-O">
                <div>
                  <h3>
                    X-O <span>C / GAME LOGIC</span>
                  </h3>
                  <p>
                    A terminal-based tic-tac-toe game with player and AI modes.
                    Try the local web edition here.
                  </p>
                </div>
                <ArrowUpRight />
              </External>
              <div className="roya">
                <div>
                  <h3>
                    Roya <span>IN PROGRESS</span>
                  </h3>
                  <p>
                    Exploring live visualization of C code, memory, pointers,
                    and function calls.
                  </p>
                </div>
              </div>
            </div>
          </div>
          <Game />
        </section>
        <Contact />
      </main>
      <footer>
        <a className="logo" href="#home">
          oe<span>.</span>
        </a>
        <span>© {new Date().getFullYear()} Oussama El Hassouni</span>
        <span>Built with intention. And React.</span>
        <a href="#home">Back to top ↑</a>
      </footer>
      {selected && (
        <ProjectModal project={selected} onClose={() => setSelected(null)} />
      )}
    </>
  );
}
createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <App />
  </React.StrictMode>,
);
