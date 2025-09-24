import React, { useMemo, useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
const BASE = import.meta.env.BASE_URL ||'/';
// Dark mode toggle with persistence and system preference
function useTheme() {
  const [theme, setTheme] = useState(() => {
    const saved = localStorage.getItem('theme')
    if (saved) return saved
    const prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches
    return prefersDark ? 'dark' : 'light'
  })
  useEffect(() => {
    const root = document.documentElement
    if (theme === 'dark') root.classList.add('dark')
    else root.classList.remove('dark')
    localStorage.setItem('theme', theme)
  }, [theme])
  return [theme, setTheme]
}

const ABOUT = {
  name: 'Rafal Dlugopolski',
  role: 'Mechanical Engineer',
  location: 'Chicago, IL',
  bio: "I'm a mechanical engineer who has built a few things here and there. I enjoy turning sketches into reliable hardware. This site is a place for me to showcase some of the work I've done over the years.",
  skills: [
    'CAD: SolidWorks, Inventor, Siemens NX',
    'Analysis: Ansys, tolerance stacks, DFM',
    'Build: Machine Tools, 3D prints, CNC, shop tooling',
    'Manufacturing: sheet metal, weldments, machining',
  ],
  avatar: `${BASE}avatar.png`,
}

const GALLERY = [
  // Replace with your own images (URLs or local files placed in /public and referenced as `${BASE}filename.jpg`)
  {type: 'image', src: `${BASE}img1.jpeg`, alt: 'First exposure to mechatronics. ' },
  {type: 'image', src: `${BASE}img2.jpeg`, alt: 'CDR concept sent to customer.' },
  {type: 'image', src: `${BASE}img3.jpeg`, alt: 'Weldments arriving.' },
  {type: 'image', src: `${BASE}img4.jpeg`, alt: 'Blanchard ground base.' },
  {type: 'image', src: `${BASE}img5.jpeg`, alt: 'Assembly begining.' },
  {type: 'image', src: `${BASE}img6.jpeg`, alt: 'Machine begins taking shape.' },
  {type: 'image', src: `${BASE}img7.jpeg`, alt: 'Tank installed, testing starts.' },
  {type: 'image', src: `${BASE}img8.jpeg`, alt: 'Look at all those servo amps.' },
  {type: 'video', src: `${BASE}vid1.mp4`, alt: 'System demo in the lab.' }, 
  {type: 'image', src: `${BASE}img9.jpeg`, alt: 'My first machine tool completed.' },
  {type: 'image', src: `${BASE}img10.jpeg`, alt: 'Retrofit on customers older machines.' },
  {type: 'image', src: `${BASE}img11.jpeg`, alt: 'Designing a test bench system.' },
  {type: 'image', src: `${BASE}img12.jpeg`, alt: 'T-slot table inside the tank.' },
  {type: 'image', src: `${BASE}img13.jpeg`, alt: 'Completed assembly.' },
  {type: 'video', src: `${BASE}vid2.mp4`, alt: 'Proof of concept demo in D.I water.' },
  {type: 'video', src: `${BASE}vid3.mp4`, alt: 'Yes, that is water.' },
  {type: 'image', src: `${BASE}img14.jpeg`, alt: 'F.A.T with customer benchmarking machine.' },
  {type: 'image', src: `${BASE}img15.jpeg`, alt: 'continuted F.A.T.' },
  {type: 'image', src: `${BASE}img16.jpeg`, alt: '3d printed Ti-6 coupons off the previous machine.' },
  {type: 'image', src: `${BASE}img17.jpeg`, alt: 'Small diameter wire-feeder w/ straigthtener.' },
  {type: 'image', src: `${BASE}img18.jpeg`, alt: 'servo driven system.' },
  {type: 'image', src: `${BASE}img19.jpeg`, alt: 'Electron beam machine in assembly.' },
  {type: 'image', src: `${BASE}img20.jpeg`, alt: 'Interior of vacuum chamber without motion system.' },
  {type: 'image', src: `${BASE}img21.jpeg`, alt: 'Motion system in assembly - 6 axis system.' },
  {type: 'image', src: `${BASE}img22.jpeg`, alt: 'Wire-feed system with siemens motor.' },
  {type: 'image', src: `${BASE}img23.jpeg`, alt: 'R&D E.B.A.M Machine in assembly.' },
  {type: 'image', src: `${BASE}img24.jpeg`, alt: 'E.B.A.M (Electron beam additive manufacturing).' },
  {type: 'image', src: `${BASE}img25.jpeg`, alt: 'Assembly of E.B Gun and wire-feeder system.' },
  {type: 'image', src: `${BASE}img26.jpeg`, alt: 'Machine is ready for testing.' },
  {type: 'video', src: `${BASE}vid4.mp4`, alt: 'Quick look on the inside.' },
  {type: 'image', src: `${BASE}img27.jpeg`, alt: 'Gantry motion system - human for scale.' },
  {type: 'image', src: `${BASE}img28.jpeg`, alt: 'This is going inside the largest EBAM machine.' },
  {type: 'video', src: `${BASE}vid5.mp4`, alt: 'Testing the x-axis motion after assembly.' },
  {type: 'video', src: `${BASE}vid6.mp4`, alt: 'Another view.' },
  {type: 'video', src: `${BASE}vid7.mp4`, alt: 'This system goes inside the vacuum chamber.' },
  {type: 'image', src: `${BASE}img29.jpeg`, alt: 'Me in front of the largest machine I designed. ' }, 
  {type: 'image', src: `${BASE}img30.jpeg`, alt: 'RF cavity with welding taking place.' },
  {type: 'image', src: `${BASE}img31.jpeg`, alt: 'A close up of the center casting.' },
  {type: 'image', src: `${BASE}img32.jpeg`, alt: 'Sections of Argonne APS being presented.' },
  {type: 'image', src: `${BASE}img33.jpeg`, alt: 'Argonne National Lab Advanced Photon Source.' },
  {type: 'image', src: `${BASE}img34.jpeg`, alt: 'Last parts before being disassembled.' },
  {type: 'image', src: `${BASE}img35.jpeg`, alt: 'Latest project RF recycler cavity.' },
]
function Section({ id, title, children, subtitle }) {
  return (
    <section id={id} className="scroll-mt-24">
      <div className="mx-auto max-w-6xl px-5 py-12">
        <motion.h2
          initial={{ opacity: 0, y: 10 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.4 }}
          className="text-2xl md:text-3xl font-semibold tracking-tight"
        >
          {title}
        </motion.h2>
        {subtitle && <p className="mt-2 text-sm text-muted-foreground">{subtitle}</p>}
        <div className="mt-6">{children}</div>
      </div>
    </section>
  )
}

function Navbar({ theme, setTheme }) {
  const [open, setOpen] = useState(false)
  return (
    <header className="sticky top-0 z-40 backdrop-blur bg-white/70 dark:bg-neutral-900/70 border-b border-black/5 dark:border-white/10">
      <div className="mx-auto max-w-6xl px-5 h-16 flex items-center justify-between">
        <a href="#top" className="font-semibold tracking-tight">{ABOUT.name}</a>
        <nav className="hidden md:flex gap-6 text-sm">
          <a href="#about" className="hover:opacity-70">About</a>
          <a href="#gallery" className="hover:opacity-70">Gallery</a>
        </nav>
        <div className="flex items-center gap-2">
          <button
            className="rounded-xl border px-3 py-1 text-sm"
            onClick={() => setTheme(theme === 'dark' ? 'light' : 'dark')}
            aria-label="Toggle theme"
            title="Toggle theme"
          >
            {theme === 'dark' ? '☀️ Light' : '🌙 Dark'}
          </button>
          <button
            className="md:hidden inline-flex items-center rounded-xl border px-3 py-1 text-sm"
            onClick={() => setOpen(s=>!s)}
            aria-label="Toggle Menu"
          >
            Menu
          </button>
        </div>
      </div>
      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: 'auto', opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            className="md:hidden border-t border-black/5 dark:border-white/10"
          >
            <div className="mx-auto max-w-6xl px-5 py-3 flex flex-col gap-2 text-sm">
              <a href="#about" onClick={() => setOpen(false)}>About</a>
              <a href="#gallery" onClick={() => setOpen(false)}>Gallery</a>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  )
}

function Hero() {
  return (
    <div className="relative overflow-hidden">
      <div className="mx-auto max-w-6xl px-5 pt-16 pb-10">
        <div className="grid md:grid-cols-[1fr,280px] gap-8 items-center">
          <div>
            <motion.h1
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
              className="text-3xl md:text-5xl font-semibold tracking-tight"
            >
              {ABOUT.role}
            </motion.h1>
            <p className="mt-4 text-base md:text-lg text-muted-foreground">
              {ABOUT.bio}
            </p>
            <div className="mt-6 flex flex-wrap gap-2">
              {ABOUT.skills.map(h => (
                <span key={h} className="rounded-full border px-3 py-1 text-xs md:text-sm">
                  {h}
                </span>
              ))}
            </div>
          </div>
          <motion.img
            initial={{ opacity: 0, scale: 0.98 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.5, delay: 0.05 }}
            src={ABOUT.avatar}
            alt={`${ABOUT.name} portrait`}
            className="size-40 md:size-64 rounded-3xl object-cover justify-self-center shadow-lg"
          />
        </div>
      </div>
    </div>
  )
}

function About() {
  return (
    <Section id="about" title="About Me">
      <div className="grid md:grid-cols-3 gap-6 items-start">
        <div className="md:col-span-2">
          <p className="leading-relaxed">
            Hi, I'm <strong>{ABOUT.name}</strong>, a {ABOUT.role.toLowerCase()} based in {ABOUT.location}. I work end-to-end: requirements → CAD → drawings → builds → tests. 
            I collaborate closely with EE/SW for mechatronics assemblies and focus on clear documentation and safe, hands-on execution.
          </p>
          <ul className="mt-4 space-y-2 list-disc list-inside">
            <li>Design for manufacture (DFM/DFA) and GD&T</li>
            <li>Rapid prototyping and test planning</li>
            <li>Supplier collaboration and BOM control</li>
          </ul>
        <p className="mt-4 leading-relaxed">
              In my free time, you'll find me exploring new fabrication techniques,
              mentoring junior engineers, and sharing my passion for precision machine design. Outside of engineering, I enjoy spending time with my wonderful family and trying to finish the never-ending honey-do-list. 
          </p>
          </div>
          <div className="rounded-3xl border p-4 shadow-sm self-start max-w-xs md:justify-self-end">
          <h3 className="font-medium">Contact</h3>
          <div className="mt-2 text-sm">
            <p>Email: <a className="underline" href="mailto:dlugopolski99@gmail.com">dlugopolski99@gmail.com</a></p>
            <p>LinkedIn: <a className="underline" href="https://www.linkedin.com/in/rafaldlugopolski" target="_blank" rel="noreferrer">/in/rafaldlugopolski</a></p>
            <p>Resume: <a className="underline" href={`${BASE}Resume-2025.pdf`}>Download PDF</a></p>
          </div>
        </div>
      </div>
    </Section>
  );
}
function Lightbox({ open, onClose, item, onPrev, onNext }) {
  const overlayRef = React.useRef(null);

  // Focus overlay when opened (helps some browsers)
  useEffect(() => {
    if (open && overlayRef.current) overlayRef.current.focus();
  }, [open]);

  // Key handler (capture) so video controls don't swallow arrows
  useEffect(() => {
    if (!open) return;
    const onKey = (e) => {
      if (e.key === 'Escape') { e.preventDefault(); onClose?.(); }
      else if (e.key === 'ArrowLeft') { e.preventDefault(); onPrev?.(); }
      else if (e.key === 'ArrowRight') { e.preventDefault(); onNext?.(); }
    };
    const opts = { capture: true };
    window.addEventListener('keydown', onKey, opts);
    return () => window.removeEventListener('keydown', onKey, opts);
  }, [open, onClose, onPrev, onNext]);

  if (!open || !item) return null;

  return (
    <AnimatePresence>
      <motion.div
        ref={overlayRef}
        tabIndex={-1}
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        role="dialog"
        aria-modal="true"
        className="fixed inset-0 z-50 bg-black/80 p-6 md:p-12"
        onClick={onClose}
      >
        <div
          className="mx-auto max-w-6xl h-full flex items-center justify-center"
          onClick={(e) => e.stopPropagation()}
        >
          {item.type === 'video' ? (
            <video
              src={item.src}
              controls
              className="max-h-[80vh] max-w-[90vw] rounded-xl shadow-lg"
            />
          ) : (
            <img
              src={item.src}
              alt={item.alt}
              className="max-h-[80vh] max-w-[90vw] rounded-xl shadow-lg object-contain"
            />
          )}

          {/* Prev / Next */}
          <button
            className="absolute left-4 md:left-8 top-1/2 -translate-y-1/2 rounded-full border px-3 py-2 bg-white/90 hover:bg-white text-sm"
            onClick={(e) => { e.stopPropagation(); onPrev?.(); }}
            aria-label="Previous"
          >‹</button>
          <button
            className="absolute right-4 md:right-8 top-1/2 -translate-y-1/2 rounded-full border px-3 py-2 bg-white/90 hover:bg-white text-sm"
            onClick={(e) => { e.stopPropagation(); onNext?.(); }}
            aria-label="Next"
          >›</button>
        </div>

        <button
          className="absolute top-4 right-4 rounded-full border px-3 py-1 text-sm bg-white/90 hover:bg-white"
          onClick={(e) => { e.stopPropagation(); onClose?.(); }}
        >
          Close
        </button>
      </motion.div>
    </AnimatePresence>
  );
}
function Gallery() {
  const items = useMemo(() => GALLERY, []);
  const [open, setOpen] = useState(false);
  const [idx, setIdx] = useState(0);

  const mod = (n, m) => ((n % m) + m) % m;
  const openAt = (i) => { setIdx(i); setOpen(true); };
  const onPrev = () => setIdx((i) => mod(i - 1, items.length));
  const onNext = () => setIdx((i) => mod(i + 1, items.length));
  const current = open ? items[idx] : null;

  return (
    <Section id="gallery" title="Gallery" subtitle="Photos of prototypes, tests, and shipped parts">
      <div className="mt-6 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
        {items.map((it, i) => (
          <motion.div
            key={`${it.src}-${i}`}
            initial={{ opacity: 0, y: 8 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.35 }}
            className="group"
          >
            {it.type === 'video' ? (
              // Keep controls in-card; open lightbox via small link
              <div className="relative w-full overflow-hidden rounded-2xl border shadow-sm">
                <video src={it.src} controls className="aspect-video w-full" />
              </div>
            ) : (
              <button
                className="block w-full overflow-hidden rounded-2xl border shadow-sm"
                onClick={() => openAt(i)}
              >
                <img
                  src={it.src}
                  alt={it.alt}
                  className="aspect-video w-full object-cover group-hover:scale-[1.02] transition"
                  loading="lazy"
                />
              </button>
            )}
            <div className="p-3 text-sm text-muted-foreground truncate">{it.alt}</div>
            {it.type === 'video' && (
              <button className="text-xs underline mt-1" onClick={() => openAt(i)}>
                Open in lightbox
              </button>
            )}
          </motion.div>
        ))}
      </div>

      <Lightbox
        open={open}
        onClose={() => setOpen(false)}
        item={current}
        onPrev={onPrev}
        onNext={onNext}
      />
    </Section>
  );
}

function Footer() {
  return (
    <footer className="border-t mt-10">
      <div className="mx-auto max-w-6xl px-5 py-10 text-sm text-muted-foreground">
        <div className="flex flex-col md:flex-row items-center justify-between gap-3">
          <div>© {new Date().getFullYear()} {ABOUT.name}. All rights reserved.</div>
          <div className="flex gap-3">
            <a href="#about" className="hover:opacity-70">About</a>
            <a href="#gallery" className="hover:opacity-70">Gallery</a>
          </div>
        </div>
      </div>
    </footer>
  )
}

export default function App() {
  const [theme, setTheme] = useTheme()
  return (
    <div id="top" className="bg-white text-black dark:bg-neutral-950 dark:text-white">
      <Navbar theme={theme} setTheme={setTheme} />
      <Hero />
      <About />
      <Gallery />
      <Footer />
    </div>
  )
}