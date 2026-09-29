// All visible text lives here so EN/ES stay in sync.

export const GITHUB_USER = "Afaguayo";
export const BIRTHDAY = { year: 2002, month: 11, day: 30 }; // Nov 30, 2002

// Repos to hide from the live GitHub list (the profile README repo, etc.).
export const HIDDEN_REPOS = ["Afaguayo"];

export const CONTACT = {
  location: "Chihuahua, Chihuahua, MX",
  phoneDisplay: "+52 614 154 2124",
  phoneHref: "tel:+526141542124",
  email: "angelaguayo78@outlook.com",
  github: "https://github.com/Afaguayo",
  resume: "/Angel%20Aguayo%20Resume.pdf",
};

export const skills = [
  "Python", "TypeScript", "JavaScript", "Java", "C", "PHP", "Kotlin",
  "React", "Next.js", "Node.js", "Flask", "Tailwind CSS",
  "SQL", "MySQL", "MongoDB", "Firebase",
  "AWS", "Google Cloud", "Docker", "CI/CD", "Git",
  "Linux", "Bash", "PowerShell", "System Calls",
  "Machine Learning", "Deep Learning", "TensorFlow", "PyTorch", "scikit-learn", "Pandas", "NumPy",
  "Penetration Testing", "OAuth", "System Design", "Testing",
];

type Lang = "en" | "es";

export const t = {
  en: {
    boot: [
      "MAGI SYSTEM v3.02  (c) 2002-2026",
      "MELCHIOR-1 ............ ONLINE",
      "BALTHASAR-2 ........... ONLINE",
      "CASPER-3 .............. ONLINE",
      "SCANNING SECTOR 614 ... PATTERN BLUE",
      ">> ANGEL CONFIRMED. SYNC START.",
    ],
    skip: "press any key to skip",
    alert: "ANGEL DETECTED ◆ PATTERN BLUE ◆ 天使 ◆ SYNC RATIO 100% ◆ ALL SYSTEMS NOMINAL ◆",
    cards: {
      stats: { ep: "EPISODE:01", card: "PILOT DATA", kanji: "記録" },
      music: { ep: "EPISODE:02", card: "SOUND ONLY", kanji: "音" },
      projects: { ep: "EPISODE:03", card: "UNITS DEPLOYED", kanji: "機体" },
      log: { ep: "EPISODE:04", card: "MEMORY", kanji: "記憶" },
      contact: { ep: "EPISODE:05", card: "OPEN CHANNEL", kanji: "通信" },
    },
    nav: { home: "HOME", stats: "STATS", music: "MUSIC", projects: "PROJECTS", log: "LOG", contact: "CONTACT" },
    tagline: "software_engineer --cybersecurity --ai",
    role: "CS GRADUATE · SOFTWARE ENGINEER",
    start: "PRESS START",
    stats: {
      title: "PLAYER.STATS",
      level: "LV.",
      levelNote: (days: number) => (days === 0 ? "level up today!" : `next level-up in ${days} days`),
      class: "CLASS",
      classValue: "CS Graduate",
      base: "BASE",
      status: "STATUS",
      online: "ONLINE",
      langs: "LANGUAGES",
      langsValue: "English · Español",
      skills: "SKILLS.DAT",
    },
    music: {
      title: "NOW_SPINNING.TOP5",
      sub: "my most-played tracks this month, straight from Spotify",
      offline: "signal lost: spotify feed offline",
      updated: "updated",
    },
    projects: {
      title: "PROJECTS.EXE",
      sub: "pulled live from github.com/Afaguayo",
      loading: "reading memory unit...",
      error: "github.net unreachable. browse the repos directly:",
      open: "OPEN REPO",
      demo: "LIVE DEMO",
      updated: "updated",
      all: "VIEW ALL ON GITHUB",
      noDesc: "no description yet",
    },
    log: {
      title: "JOURNEY.LOG",
      journey: [
        ["2020", "Started coding."],
        ["2021", "Got into UTEP and learned Java."],
        ["2022", "Learned Python, C, databases and operating systems."],
        ["2023", "Joined AI4ALL; learned ML and AI development."],
        ["2024", "Studied neural networks and modern AI."],
        ["2025", "Went deep into cybersecurity."],
        ["NOW", "CS graduate, shipping AI, security and desktop tools from Chihuahua."],
      ],
      expTitle: "EXPERIENCE.SYS",
      expRole: "AI4ALL, Instructor Assistant",
      exp: [
        "Designed and built a server-automation bot to streamline registrations.",
        "Managed and maintained the program's servers so operations ran smoothly.",
        "Helped organize the AI4ALL College Pathways program, supporting staff and participants.",
      ],
    },
    contact: {
      title: "CONTACT.CFG",
      sub: "open to work, collabs and good conversations",
      location: "location",
      phone: "phone",
      email: "email",
      github: "github",
      resume: "DOWNLOAD RESUME",
    },
    footer: "GOD'S IN HIS HEAVEN. ALL'S RIGHT WITH THE WORLD.",
  },
  es: {
    boot: [
      "SISTEMA MAGI v3.02  (c) 2002-2026",
      "MELCHIOR-1 ............ EN LÍNEA",
      "BALTHASAR-2 ........... EN LÍNEA",
      "CASPER-3 .............. EN LÍNEA",
      "ESCANEANDO SECTOR 614 . PATRÓN AZUL",
      ">> ÁNGEL CONFIRMADO. INICIANDO SINCRONÍA.",
    ],
    skip: "presiona cualquier tecla para saltar",
    alert: "ÁNGEL DETECTADO ◆ PATRÓN AZUL ◆ 天使 ◆ SINCRONÍA 100% ◆ SISTEMAS EN ORDEN ◆",
    cards: {
      stats: { ep: "EPISODIO:01", card: "DATOS DEL PILOTO", kanji: "記録" },
      music: { ep: "EPISODIO:02", card: "SOLO SONIDO", kanji: "音" },
      projects: { ep: "EPISODIO:03", card: "UNIDADES DESPLEGADAS", kanji: "機体" },
      log: { ep: "EPISODIO:04", card: "MEMORIA", kanji: "記憶" },
      contact: { ep: "EPISODIO:05", card: "CANAL ABIERTO", kanji: "通信" },
    },
    nav: { home: "INICIO", stats: "STATS", music: "MÚSICA", projects: "PROYECTOS", log: "LOG", contact: "CONTACTO" },
    tagline: "ingeniero_de_software --ciberseguridad --ia",
    role: "EGRESADO CS · INGENIERO DE SOFTWARE",
    start: "PRESIONA START",
    stats: {
      title: "JUGADOR.STATS",
      level: "NV.",
      levelNote: (days: number) => (days === 0 ? "¡sube de nivel hoy!" : `siguiente nivel en ${days} días`),
      class: "CLASE",
      classValue: "Egresado de Ciencias de la Computación",
      base: "BASE",
      status: "ESTADO",
      online: "EN LÍNEA",
      langs: "IDIOMAS",
      langsValue: "Español · English",
      skills: "HABILIDADES.DAT",
    },
    music: {
      title: "SONANDO.TOP5",
      sub: "mis canciones más escuchadas del mes, directo de Spotify",
      offline: "señal perdida: spotify sin conexión",
      updated: "actualizado",
    },
    projects: {
      title: "PROYECTOS.EXE",
      sub: "en vivo desde github.com/Afaguayo",
      loading: "leyendo memory unit...",
      error: "github.net no responde. mira los repos directamente:",
      open: "ABRIR REPO",
      demo: "DEMO",
      updated: "actualizado",
      all: "VER TODO EN GITHUB",
      noDesc: "sin descripción aún",
    },
    log: {
      title: "TRAYECTORIA.LOG",
      journey: [
        ["2020", "Empecé a programar."],
        ["2021", "Entré a UTEP y aprendí Java."],
        ["2022", "Aprendí Python, C, bases de datos y sistemas operativos."],
        ["2023", "Me uní a AI4ALL; aprendí desarrollo de ML e IA."],
        ["2024", "Estudié redes neuronales e IA moderna."],
        ["2025", "Me metí de lleno a la ciberseguridad."],
        ["HOY", "Egresado de CS, creando herramientas de IA, seguridad y escritorio desde Chihuahua."],
      ],
      expTitle: "EXPERIENCIA.SYS",
      expRole: "AI4ALL, Asistente de Instructor",
      exp: [
        "Diseñé y construí un bot de automatización de servidores para agilizar registros.",
        "Administré y mantuve los servidores del programa para que todo funcionara sin problemas.",
        "Ayudé a organizar el programa AI4ALL College Pathways, apoyando al equipo y a participantes.",
      ],
    },
    contact: {
      title: "CONTACTO.CFG",
      sub: "abierto a trabajo, colaboraciones y buenas pláticas",
      location: "ubicación",
      phone: "teléfono",
      email: "correo",
      github: "github",
      resume: "DESCARGAR CV",
    },
    footer: "DIOS ESTÁ EN SU CIELO. TODO ESTÁ BIEN EN EL MUNDO.",
  },
} satisfies Record<Lang, unknown>;

export type Copy = (typeof t)["en"];
export type { Lang };
