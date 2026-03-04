
import { useState, useEffect, useRef } from "react";

// ─── Inline styles & CSS ───────────────────────────────────────────────
const GlobalStyles = () => (
  <style>{`
    @import url('https://fonts.googleapis.com/css2?family=Syne:wght@400;600;700;800&family=DM+Sans:ital,opsz,wght@0,9..40,300;0,9..40,400;0,9..40,500;1,9..40,300&display=swap');

    *, *::before, *::after { box-sizing: border-box; margin: 0; padding: 0; }

    :root {
      --bg: #07070f;
      --bg2: #0f0f1c;
      --bg3: #16162a;
      --primary: #7c6fff;
      --primary-glow: rgba(124,111,255,0.35);
      --cyan: #22d3ee;
      --cyan-glow: rgba(34,211,238,0.3);
      --text: #e2e2f0;
      --text-muted: #7878a0;
      --glass: rgba(255,255,255,0.04);
      --glass-border: rgba(255,255,255,0.07);
      --card: rgba(22,22,42,0.8);
      --radius: 16px;
      --font-display: 'Syne', sans-serif;
      --font-body: 'DM Sans', sans-serif;
    }

    html, body, #root { height: 100%; width: 100%; }
    body {
      background: var(--bg);
      color: var(--text);
      font-family: var(--font-body);
      overflow-x: hidden;
      line-height: 1.6;
    }

    ::-webkit-scrollbar { width: 5px; }
    ::-webkit-scrollbar-track { background: transparent; }
    ::-webkit-scrollbar-thumb { background: var(--primary); border-radius: 99px; }

    /* Animations */
    @keyframes shimmer {
      0% { background-position: -200% center; }
      100% { background-position: 200% center; }
    }
    @keyframes float {
      0%,100% { transform: translateY(0px) rotate(0deg); }
      33% { transform: translateY(-18px) rotate(2deg); }
      66% { transform: translateY(-8px) rotate(-1deg); }
    }
    @keyframes pulse-glow {
      0%,100% { box-shadow: 0 0 20px var(--primary-glow); }
      50% { box-shadow: 0 0 40px var(--primary-glow), 0 0 80px var(--primary-glow); }
    }
    @keyframes slideUp {
      from { opacity: 0; transform: translateY(24px); }
      to   { opacity: 1; transform: translateY(0); }
    }
    @keyframes fadeIn {
      from { opacity: 0; }
      to   { opacity: 1; }
    }
    @keyframes typing {
      0%,60%,100% { opacity: 0.3; transform: translateY(0); }
      30% { opacity: 1; transform: translateY(-6px); }
    }
    @keyframes countUp {
      from { opacity: 0; transform: scale(0.8); }
      to   { opacity: 1; transform: scale(1); }
    }
    @keyframes spin {
      to { transform: rotate(360deg); }
    }
    @keyframes borderPulse {
      0%,100% { border-color: rgba(124,111,255,0.3); }
      50% { border-color: rgba(124,111,255,0.8); }
    }
    @keyframes gradientShift {
      0% { background-position: 0% 50%; }
      50% { background-position: 100% 50%; }
      100% { background-position: 0% 50%; }
    }
    @keyframes cursorTrail {
      0% { opacity: 0.8; transform: scale(1); }
      100% { opacity: 0; transform: scale(0.2); }
    }
    @keyframes waveform {
      0%,100% { height: 6px; }
      50% { height: 20px; }
    }

    .animate-slideUp { animation: slideUp 0.5s ease forwards; }
    .animate-fadeIn  { animation: fadeIn 0.4s ease forwards; }

    /* Glass card */
    .glass {
      background: var(--glass);
      border: 1px solid var(--glass-border);
      backdrop-filter: blur(24px);
      -webkit-backdrop-filter: blur(24px);
    }

    /* Gradient text */
    .gradient-text {
      background: linear-gradient(135deg, var(--primary) 0%, var(--cyan) 100%);
      background-size: 200% auto;
      -webkit-background-clip: text;
      -webkit-text-fill-color: transparent;
      background-clip: text;
      animation: shimmer 3s linear infinite;
    }

    /* Buttons */
    .btn-primary {
      background: linear-gradient(135deg, var(--primary), #5a4fff);
      border: none;
      color: white;
      padding: 12px 28px;
      border-radius: 12px;
      font-family: var(--font-display);
      font-weight: 600;
      font-size: 15px;
      cursor: pointer;
      transition: all 0.25s ease;
      position: relative;
      overflow: hidden;
    }
    .btn-primary::before {
      content: '';
      position: absolute;
      inset: 0;
      background: linear-gradient(135deg, #8b85ff, var(--cyan));
      opacity: 0;
      transition: opacity 0.25s;
    }
    .btn-primary:hover::before { opacity: 1; }
    .btn-primary:hover { transform: translateY(-2px); box-shadow: 0 8px 30px var(--primary-glow); }
    .btn-primary span { position: relative; z-index: 1; }

    .btn-ghost {
      background: var(--glass);
      border: 1px solid var(--glass-border);
      color: var(--text);
      padding: 12px 28px;
      border-radius: 12px;
      font-family: var(--font-display);
      font-weight: 600;
      font-size: 15px;
      cursor: pointer;
      transition: all 0.25s ease;
      backdrop-filter: blur(12px);
    }
    .btn-ghost:hover {
      border-color: var(--primary);
      color: var(--primary);
      transform: translateY(-2px);
    }

    /* Typing dots */
    .typing-dot {
      width: 7px; height: 7px;
      background: var(--primary);
      border-radius: 50%;
      animation: typing 1.2s ease infinite;
    }
    .typing-dot:nth-child(2) { animation-delay: 0.2s; }
    .typing-dot:nth-child(3) { animation-delay: 0.4s; }

    /* Feature cards hover */
    .feature-card {
      transition: transform 0.3s ease, box-shadow 0.3s ease, border-color 0.3s ease;
    }
    .feature-card:hover {
      transform: translateY(-6px);
      box-shadow: 0 20px 60px rgba(124,111,255,0.15);
      border-color: rgba(124,111,255,0.3) !important;
    }

    /* Sidebar nav item */
    .nav-item {
      display: flex;
      align-items: center;
      gap: 12px;
      padding: 10px 14px;
      border-radius: 10px;
      cursor: pointer;
      transition: all 0.2s ease;
      color: var(--text-muted);
      font-size: 14px;
      font-weight: 500;
    }
    .nav-item:hover { background: var(--glass); color: var(--text); }
    .nav-item.active {
      background: linear-gradient(135deg, rgba(124,111,255,0.2), rgba(34,211,238,0.1));
      color: var(--primary);
      border: 1px solid rgba(124,111,255,0.2);
    }

    /* Message bubble */
    .msg-user {
      background: linear-gradient(135deg, var(--primary), #5a4fff);
      color: white;
      border-radius: 18px 18px 4px 18px;
      padding: 12px 16px;
      max-width: 70%;
      margin-left: auto;
      animation: slideUp 0.3s ease;
    }
    .msg-ai {
      background: var(--bg3);
      border: 1px solid var(--glass-border);
      border-radius: 18px 18px 18px 4px;
      padding: 14px 16px;
      max-width: 80%;
      animation: slideUp 0.3s ease;
    }

    /* Code block in messages */
    .msg-ai pre {
      background: #0a0a1a;
      border: 1px solid var(--glass-border);
      border-radius: 8px;
      padding: 12px;
      overflow-x: auto;
      font-size: 13px;
      margin-top: 10px;
    }

    /* Input bar */
    .chat-input {
      background: var(--bg3);
      border: 1px solid var(--glass-border);
      border-radius: 14px;
      color: var(--text);
      font-family: var(--font-body);
      font-size: 15px;
      padding: 14px 18px;
      resize: none;
      outline: none;
      width: 100%;
      transition: border-color 0.2s;
      line-height: 1.5;
    }
    .chat-input:focus { border-color: var(--primary); }
    .chat-input::placeholder { color: var(--text-muted); }

    /* Progress bar */
    .progress-bar {
      height: 6px;
      background: var(--bg3);
      border-radius: 99px;
      overflow: hidden;
    }
    .progress-fill {
      height: 100%;
      border-radius: 99px;
      background: linear-gradient(90deg, var(--primary), var(--cyan));
      transition: width 1s ease;
    }

    /* Tag chip */
    .chip {
      display: inline-flex;
      align-items: center;
      gap: 6px;
      padding: 4px 12px;
      border-radius: 99px;
      font-size: 12px;
      font-weight: 600;
      background: rgba(124,111,255,0.12);
      color: var(--primary);
      border: 1px solid rgba(124,111,255,0.2);
    }

    /* Waveform animation for voice */
    .waveform-bar {
      width: 4px;
      background: var(--primary);
      border-radius: 99px;
      animation: waveform 0.8s ease infinite;
    }
    .waveform-bar:nth-child(2) { animation-delay: 0.1s; height: 14px; }
    .waveform-bar:nth-child(3) { animation-delay: 0.2s; }
    .waveform-bar:nth-child(4) { animation-delay: 0.15s; height: 16px; }
    .waveform-bar:nth-child(5) { animation-delay: 0.05s; }

    /* Stars bg */
    .stars {
      position: fixed; inset: 0; pointer-events: none;
      background-image:
        radial-gradient(1px 1px at 20% 30%, rgba(255,255,255,0.4) 0%, transparent 100%),
        radial-gradient(1px 1px at 80% 10%, rgba(255,255,255,0.3) 0%, transparent 100%),
        radial-gradient(1.5px 1.5px at 60% 70%, rgba(255,255,255,0.2) 0%, transparent 100%),
        radial-gradient(1px 1px at 40% 90%, rgba(255,255,255,0.25) 0%, transparent 100%),
        radial-gradient(1px 1px at 10% 60%, rgba(255,255,255,0.3) 0%, transparent 100%),
        radial-gradient(1.5px 1.5px at 90% 50%, rgba(255,255,255,0.2) 0%, transparent 100%);
    }

    /* Onboarding step */
    .step-card {
      transition: all 0.2s ease;
      cursor: pointer;
    }
    .step-card:hover { transform: translateY(-4px); }
    .step-card.selected {
      border-color: var(--primary) !important;
      background: rgba(124,111,255,0.12) !important;
    }

    /* Stat card */
    .stat-card {
      animation: countUp 0.6s ease forwards;
    }

    /* Mobile responsive */
    .mobile-topbar { display: none !important; }
    @media (max-width: 768px) {
      .sidebar { display: none !important; }
      .sidebar.open { display: flex !important; position: fixed; z-index: 100; width: 260px !important; height: 100vh; top: 0; left: 0; }
      .mobile-topbar { display: flex !important; }
    }
  `}</style>
);

// ─── Canvas Background (Math Symbols) ──────────────────────────────────
const MathBackground = () => {
  const canvasRef = useRef(null);
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    let animId;
    let mouse = { x: 0, y: 0 };
    const symbols = "∫ π Σ √ Δ ∞ x² ∂ λ φ θ ≈ ∇ ℝ ∈".split(" ");
    let particles = [];

    const resize = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    };
    resize();
    window.addEventListener("resize", resize);

    for (let i = 0; i < 28; i++) {
      particles.push({
        x: Math.random() * window.innerWidth,
        y: Math.random() * window.innerHeight,
        vx: (Math.random() - 0.5) * 0.3,
        vy: (Math.random() - 0.5) * 0.3,
        symbol: symbols[Math.floor(Math.random() * symbols.length)],
        size: Math.random() * 14 + 10,
        opacity: Math.random() * 0.25 + 0.05,
        phase: Math.random() * Math.PI * 2,
      });
    }

    const draw = (t) => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      particles.forEach((p) => {
        p.x += p.vx + (mouse.x / canvas.width - 0.5) * 0.15;
        p.y += p.vy + (mouse.y / canvas.height - 0.5) * 0.15;
        if (p.x < -50) p.x = canvas.width + 50;
        if (p.x > canvas.width + 50) p.x = -50;
        if (p.y < -50) p.y = canvas.height + 50;
        if (p.y > canvas.height + 50) p.y = -50;
        const bob = Math.sin(t * 0.0008 + p.phase) * 8;
        ctx.save();
        ctx.globalAlpha = p.opacity + Math.sin(t * 0.001 + p.phase) * 0.05;
        ctx.font = `${p.size}px 'Syne', monospace`;
        ctx.fillStyle = Math.random() > 0.5 ? "#7c6fff" : "#22d3ee";
        ctx.fillText(p.symbol, p.x, p.y + bob);
        ctx.restore();
      });
      animId = requestAnimationFrame(draw);
    };

    const onMouseMove = (e) => { mouse.x = e.clientX; mouse.y = e.clientY; };
    window.addEventListener("mousemove", onMouseMove);
    animId = requestAnimationFrame(draw);
    return () => {
      cancelAnimationFrame(animId);
      window.removeEventListener("resize", resize);
      window.removeEventListener("mousemove", onMouseMove);
    };
  }, []);
  return <canvas ref={canvasRef} style={{ position: "fixed", inset: 0, pointerEvents: "none", zIndex: 0 }} />;
};

// ─── Cursor Trail ────────────────────────────────────────────────────────
const CursorTrail = () => {
  const [trails, setTrails] = useState([]);
  const idRef = useRef(0);
  useEffect(() => {
    const onMove = (e) => {
      const id = idRef.current++;
      setTrails(t => [...t.slice(-18), { id, x: e.clientX, y: e.clientY }]);
      setTimeout(() => setTrails(t => t.filter(p => p.id !== id)), 600);
    };
    window.addEventListener("mousemove", onMove);
    return () => window.removeEventListener("mousemove", onMove);
  }, []);
  return (
    <div style={{ position: "fixed", inset: 0, pointerEvents: "none", zIndex: 9999 }}>
      {trails.map((t, i) => (
        <div key={t.id} style={{
          position: "absolute",
          left: t.x - 4, top: t.y - 4,
          width: 8, height: 8,
          borderRadius: "50%",
          background: `rgba(124,111,255,${(i / trails.length) * 0.6})`,
          animation: "cursorTrail 0.6s ease forwards",
          pointerEvents: "none",
        }} />
      ))}
    </div>
  );
};

// ─── Typing Indicator ────────────────────────────────────────────────────
const TypingIndicator = () => (
  <div style={{ display: "flex", alignItems: "center", gap: 8, padding: "12px 16px", background: "var(--bg3)", border: "1px solid var(--glass-border)", borderRadius: "18px 18px 18px 4px", width: "fit-content", animation: "slideUp 0.3s ease" }}>
    <div style={{ width: 28, height: 28, borderRadius: "50%", background: "linear-gradient(135deg,var(--primary),var(--cyan))", display: "flex", alignItems: "center", justifyContent: "center", fontSize: 14 }}>🤖</div>
    <div style={{ display: "flex", gap: 5, alignItems: "center" }}>
      {[0,1,2].map(i => <div key={i} className="typing-dot" style={{ animationDelay: `${i*0.2}s` }} />)}
    </div>
  </div>
);

// ─── Streaming Text ──────────────────────────────────────────────────────
const StreamingText = ({ text }) => {
  const [displayed, setDisplayed] = useState("");
  useEffect(() => {
    setDisplayed("");
    let i = 0;
    const interval = setInterval(() => {
      if (i < text.length) { setDisplayed(text.slice(0, ++i)); }
      else clearInterval(interval);
    }, 12);
    return () => clearInterval(interval);
  }, [text]);
  return <span>{displayed}<span style={{ borderRight: "2px solid var(--primary)", animation: "typing 1s infinite", marginLeft: 2 }} /></span>;
};

// ─── Main App ────────────────────────────────────────────────────────────
export default function App() {
  const [page, setPage] = useState("landing"); // landing | onboarding | app
  const [appTab, setAppTab] = useState("chat"); // chat | dashboard | group | profile
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [user, setUser] = useState(null);

  const handleStart = () => setPage("onboarding");
  const handleOnboardDone = (data) => {
    setUser({ name: data.name || "Student", ...data });
    setPage("app");
  };

  return (
    <>
      <GlobalStyles />
      <div className="stars" />
      <MathBackground />
      <CursorTrail />
      {page === "landing" && <LandingPage onStart={handleStart} />}
      {page === "onboarding" && <OnboardingFlow onDone={handleOnboardDone} />}
      {page === "app" && (
        <AppShell
          user={user}
          appTab={appTab}
          setAppTab={setAppTab}
          sidebarOpen={sidebarOpen}
          setSidebarOpen={setSidebarOpen}
        />
      )}
    </>
  );
}

// ─── Landing Page ────────────────────────────────────────────────────────
const FEATURES = [
  { icon: "🧠", title: "Adaptive AI", desc: "Remembers your weak topics and customizes every explanation to your learning gaps." },
  { icon: "📷", title: "Image Solver", desc: "Snap any question — handwritten or printed. AI reads and solves it instantly." },
  { icon: "🎯", title: "Hint Mode", desc: "Get guided nudges instead of direct answers to build real understanding." },
  { icon: "👥", title: "Group Study", desc: "Study with friends in real-time AI-moderated rooms. Quiz each other live." },
  { icon: "🌐", title: "Hindi / Tamil / Telugu", desc: "Ask in your language. AI responds fluently in 4 Indian languages." },
  { icon: "📊", title: "Progress Tracker", desc: "Visual dashboards showing mastery per topic, streaks, and exam readiness." },
];

const STATS = [
  { value: "2M+", label: "JEE/NEET Students" },
  { value: "95%", label: "Feel More Confident" },
  { value: "4", label: "Indian Languages" },
  { value: "36%", label: "Learn Better with AI" },
];

function LandingPage({ onStart }) {
  const [visible, setVisible] = useState(false);
  useEffect(() => { setTimeout(() => setVisible(true), 100); }, []);

  return (
    <div style={{ position: "relative", zIndex: 1, minHeight: "100vh" }}>
      {/* Navbar */}
      <nav style={{ display: "flex", alignItems: "center", justifyContent: "space-between", padding: "20px 40px", borderBottom: "1px solid var(--glass-border)" }} className="glass">
        <div style={{ fontFamily: "var(--font-display)", fontWeight: 800, fontSize: 22, display: "flex", alignItems: "center", gap: 10 }}>
          <span style={{ fontSize: 28 }}>⚡</span>
          <span className="gradient-text">StudyAI</span>
        </div>
        <div style={{ display: "flex", gap: 12, alignItems: "center" }}>
          <div style={{ display: "flex", gap: 24, color: "var(--text-muted)", fontSize: 14 }}>
            {["Features","Pricing","Blog"].map(l => (
              <span key={l} style={{ cursor: "pointer", transition: "color 0.2s" }} onMouseEnter={e => e.target.style.color="var(--text)"} onMouseLeave={e => e.target.style.color="var(--text-muted)"}>{l}</span>
            ))}
          </div>
          <button className="btn-primary" onClick={onStart} style={{ padding: "9px 20px", fontSize: 14 }}><span>Get Started Free</span></button>
        </div>
      </nav>

      {/* Hero */}
      <section style={{ minHeight: "90vh", display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center", textAlign: "center", padding: "60px 20px", position: "relative" }}>
        <div className="chip" style={{ marginBottom: 24, animation: "slideUp 0.6s ease" }}>
          ✨ India's First Adaptive AI Study Platform
        </div>
        <h1 style={{
          fontFamily: "var(--font-display)", fontWeight: 800,
          fontSize: "clamp(2.5rem, 6vw, 5rem)", lineHeight: 1.1,
          marginBottom: 24, opacity: visible ? 1 : 0,
          transform: visible ? "translateY(0)" : "translateY(30px)",
          transition: "all 0.8s ease",
        }}>
          Your AI Study<br />
          <span className="gradient-text">Companion</span>
        </h1>
        <p style={{ color: "var(--text-muted)", fontSize: "clamp(1rem, 2vw, 1.2rem)", maxWidth: 600, marginBottom: 16, opacity: visible ? 1 : 0, transition: "all 0.8s ease 0.2s" }}>
          Adaptive intelligence for JEE · NEET · CUET · Board Exams · Coding
        </p>
        <p style={{ color: "var(--text-muted)", fontSize: 14, marginBottom: 40, opacity: visible ? 1 : 0, transition: "all 0.8s ease 0.3s" }}>
          Ask in Hindi · Tamil · Telugu · English
        </p>
        <div style={{ display: "flex", gap: 14, flexWrap: "wrap", justifyContent: "center", opacity: visible ? 1 : 0, transition: "all 0.8s ease 0.4s" }}>
          <button className="btn-primary" onClick={onStart} style={{ padding: "14px 36px", fontSize: 16 }}>
            <span>🚀 Start Learning Free</span>
          </button>
          <button className="btn-ghost" style={{ padding: "14px 36px", fontSize: 16 }}>
            ▶ Watch Demo
          </button>
        </div>

        {/* Glow orbs */}
        <div style={{ position: "absolute", width: 400, height: 400, background: "radial-gradient(circle, rgba(124,111,255,0.12) 0%, transparent 70%)", borderRadius: "50%", top: "20%", left: "10%", pointerEvents: "none" }} />
        <div style={{ position: "absolute", width: 300, height: 300, background: "radial-gradient(circle, rgba(34,211,238,0.08) 0%, transparent 70%)", borderRadius: "50%", bottom: "10%", right: "15%", pointerEvents: "none" }} />
      </section>

      {/* Stats */}
      <section style={{ padding: "40px 40px", display: "flex", justifyContent: "center", gap: 40, flexWrap: "wrap", borderTop: "1px solid var(--glass-border)", borderBottom: "1px solid var(--glass-border)" }}>
        {STATS.map(s => (
          <div key={s.label} className="stat-card" style={{ textAlign: "center" }}>
            <div style={{ fontFamily: "var(--font-display)", fontWeight: 800, fontSize: "2.5rem", background: "linear-gradient(135deg, var(--primary), var(--cyan))", WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent" }}>{s.value}</div>
            <div style={{ color: "var(--text-muted)", fontSize: 14, marginTop: 4 }}>{s.label}</div>
          </div>
        ))}
      </section>

      {/* Features */}
      <section style={{ padding: "80px 40px", maxWidth: 1100, margin: "0 auto" }}>
        <h2 style={{ fontFamily: "var(--font-display)", fontWeight: 800, fontSize: "clamp(1.8rem, 3vw, 2.5rem)", textAlign: "center", marginBottom: 12 }}>
          Everything you need to <span className="gradient-text">ace your exams</span>
        </h2>
        <p style={{ color: "var(--text-muted)", textAlign: "center", marginBottom: 50, fontSize: 16 }}>Built specifically for Indian students with adaptive intelligence</p>
        <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(300px, 1fr))", gap: 24 }}>
          {FEATURES.map((f, i) => (
            <div key={i} className="glass feature-card" style={{
              borderRadius: "var(--radius)", padding: 28,
              border: "1px solid var(--glass-border)",
              animation: `slideUp 0.6s ease ${i * 0.1}s both`,
            }}>
              <div style={{ fontSize: 36, marginBottom: 14 }}>{f.icon}</div>
              <div style={{ fontFamily: "var(--font-display)", fontWeight: 700, fontSize: 18, marginBottom: 8 }}>{f.title}</div>
              <div style={{ color: "var(--text-muted)", fontSize: 14, lineHeight: 1.6 }}>{f.desc}</div>
            </div>
          ))}
        </div>
      </section>

      {/* CTA Banner */}
      <section style={{ margin: "0 40px 80px", borderRadius: 24, background: "linear-gradient(135deg, rgba(124,111,255,0.15), rgba(34,211,238,0.08))", border: "1px solid rgba(124,111,255,0.2)", padding: "60px 40px", textAlign: "center", position: "relative", overflow: "hidden" }}>
        <div style={{ position: "absolute", inset: 0, background: "radial-gradient(ellipse at center, rgba(124,111,255,0.1) 0%, transparent 70%)", pointerEvents: "none" }} />
        <h2 style={{ fontFamily: "var(--font-display)", fontWeight: 800, fontSize: "clamp(1.6rem, 3vw, 2.2rem)", marginBottom: 16, position: "relative" }}>
          Ready to ace your exams?
        </h2>
        <p style={{ color: "var(--text-muted)", marginBottom: 32, fontSize: 16, position: "relative" }}>
          Join 2M+ students who study smarter with AI
        </p>
        <button className="btn-primary" onClick={onStart} style={{ padding: "16px 48px", fontSize: 17, position: "relative" }}>
          <span>✨ Start For Free — No Credit Card Needed</span>
        </button>
      </section>

      {/* Footer */}
      <footer style={{ borderTop: "1px solid var(--glass-border)", padding: "30px 40px", textAlign: "center", color: "var(--text-muted)", fontSize: 13 }}>
        <div style={{ fontFamily: "var(--font-display)", fontWeight: 700, marginBottom: 8, display: "flex", alignItems: "center", gap: 8, justifyContent: "center" }}>
          <span>⚡</span><span className="gradient-text">StudyAI</span>
        </div>
        India's AI-powered exam preparation platform · JEE · NEET · CUET · Board Exams
      </footer>
    </div>
  );
}

// ─── Onboarding ──────────────────────────────────────────────────────────
const GRADES = ["Class 9", "Class 10", "Class 11", "Class 12", "Dropper / Repeater", "College"];
const EXAMS  = ["JEE Main", "JEE Advanced", "NEET", "CUET", "Board Exams", "GATE / Coding"];
const LANGS  = [{ flag: "🇮🇳", name: "Hindi" }, { flag: "🇮🇳", name: "Tamil" }, { flag: "🇮🇳", name: "Telugu" }, { flag: "🇬🇧", name: "English" }];
const SUBJECTS = ["Physics", "Chemistry", "Mathematics", "Biology", "Computer Science", "English"];
const STYLES = [
  { icon: "💡", title: "Give me hints", desc: "Guide me, don't just solve it" },
  { icon: "📖", title: "Step-by-step", desc: "Show full detailed solution" },
  { icon: "⚡", title: "Quick answers", desc: "Just give me the answer fast" },
];

function OnboardingFlow({ onDone }) {
  const [step, setStep] = useState(0);
  const [data, setData] = useState({ name: "", grade: "", exams: [], lang: "English", subjects: [], style: "" });

  const steps = ["Name", "Grade & Exam", "Language", "Subjects", "Style"];
  const pct = ((step) / (steps.length - 1)) * 100;

  const update = (key, val) => setData(d => ({ ...d, [key]: val }));
  const toggleArr = (key, val) => setData(d => ({ ...d, [key]: d[key].includes(val) ? d[key].filter(x => x !== val) : [...d[key], val] }));

  const canNext = () => {
    if (step === 0) return data.name.trim().length > 0;
    if (step === 1) return data.grade && data.exams.length > 0;
    if (step === 2) return data.lang;
    if (step === 3) return data.subjects.length > 0;
    if (step === 4) return data.style;
    return true;
  };

  return (
    <div style={{ minHeight: "100vh", display: "flex", alignItems: "center", justifyContent: "center", padding: 20, position: "relative", zIndex: 1 }}>
      <div style={{ width: "100%", maxWidth: 540, animation: "slideUp 0.5s ease" }}>
        {/* Progress */}
        <div style={{ marginBottom: 32 }}>
          <div style={{ display: "flex", justifyContent: "space-between", marginBottom: 10, color: "var(--text-muted)", fontSize: 13 }}>
            <span>{steps[step]}</span>
            <span>{step + 1}/{steps.length}</span>
          </div>
          <div className="progress-bar">
            <div className="progress-fill" style={{ width: `${pct}%` }} />
          </div>
        </div>

        <div className="glass" style={{ borderRadius: 24, padding: "36px 32px", border: "1px solid var(--glass-border)" }}>
          {step === 0 && (
            <div style={{ animation: "slideUp 0.4s ease" }}>
              <div style={{ fontSize: 48, marginBottom: 16 }}>👋</div>
              <h2 style={{ fontFamily: "var(--font-display)", fontWeight: 800, fontSize: 26, marginBottom: 8 }}>What's your name?</h2>
              <p style={{ color: "var(--text-muted)", marginBottom: 24 }}>Let's personalize your experience</p>
              <input
                value={data.name}
                onChange={e => update("name", e.target.value)}
                placeholder="Enter your name..."
                style={{ width: "100%", background: "var(--bg3)", border: "1px solid var(--glass-border)", borderRadius: 12, padding: "14px 16px", color: "var(--text)", fontSize: 16, outline: "none", fontFamily: "var(--font-body)", transition: "border-color 0.2s" }}
                onFocus={e => e.target.style.borderColor = "var(--primary)"}
                onBlur={e => e.target.style.borderColor = "var(--glass-border)"}
              />
            </div>
          )}

          {step === 1 && (
            <div style={{ animation: "slideUp 0.4s ease" }}>
              <div style={{ fontSize: 48, marginBottom: 16 }}>🎓</div>
              <h2 style={{ fontFamily: "var(--font-display)", fontWeight: 800, fontSize: 26, marginBottom: 20 }}>Grade & Target Exam</h2>
              <p style={{ color: "var(--text-muted)", marginBottom: 14, fontSize: 14 }}>Your grade</p>
              <div style={{ display: "flex", flexWrap: "wrap", gap: 10, marginBottom: 24 }}>
                {GRADES.map(g => (
                  <div key={g} className={`step-card glass ${data.grade === g ? "selected" : ""}`}
                    style={{ padding: "8px 16px", borderRadius: 10, border: "1px solid var(--glass-border)", fontSize: 14, fontWeight: 500 }}
                    onClick={() => update("grade", g)}>{g}</div>
                ))}
              </div>
              <p style={{ color: "var(--text-muted)", marginBottom: 14, fontSize: 14 }}>Target exams (pick all that apply)</p>
              <div style={{ display: "flex", flexWrap: "wrap", gap: 10 }}>
                {EXAMS.map(e => (
                  <div key={e} className={`step-card glass ${data.exams.includes(e) ? "selected" : ""}`}
                    style={{ padding: "8px 16px", borderRadius: 10, border: "1px solid var(--glass-border)", fontSize: 14, fontWeight: 500 }}
                    onClick={() => toggleArr("exams", e)}>{e}</div>
                ))}
              </div>
            </div>
          )}

          {step === 2 && (
            <div style={{ animation: "slideUp 0.4s ease" }}>
              <div style={{ fontSize: 48, marginBottom: 16 }}>🌐</div>
              <h2 style={{ fontFamily: "var(--font-display)", fontWeight: 800, fontSize: 26, marginBottom: 20 }}>Preferred Language</h2>
              <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 14 }}>
                {LANGS.map(l => (
                  <div key={l.name} className={`step-card glass ${data.lang === l.name ? "selected" : ""}`}
                    style={{ padding: 20, borderRadius: 14, border: "1px solid var(--glass-border)", textAlign: "center" }}
                    onClick={() => update("lang", l.name)}>
                    <div style={{ fontSize: 32, marginBottom: 8 }}>{l.flag}</div>
                    <div style={{ fontWeight: 600, fontSize: 16 }}>{l.name}</div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {step === 3 && (
            <div style={{ animation: "slideUp 0.4s ease" }}>
              <div style={{ fontSize: 48, marginBottom: 16 }}>📚</div>
              <h2 style={{ fontFamily: "var(--font-display)", fontWeight: 800, fontSize: 26, marginBottom: 8 }}>Your Subjects</h2>
              <p style={{ color: "var(--text-muted)", marginBottom: 20 }}>Which subjects do you need help with?</p>
              <div style={{ display: "flex", flexWrap: "wrap", gap: 10 }}>
                {SUBJECTS.map(s => (
                  <div key={s} className={`step-card glass ${data.subjects.includes(s) ? "selected" : ""}`}
                    style={{ padding: "10px 18px", borderRadius: 12, border: "1px solid var(--glass-border)", fontSize: 14, fontWeight: 500 }}
                    onClick={() => toggleArr("subjects", s)}>{s}</div>
                ))}
              </div>
            </div>
          )}

          {step === 4 && (
            <div style={{ animation: "slideUp 0.4s ease" }}>
              <div style={{ fontSize: 48, marginBottom: 16 }}>⚙️</div>
              <h2 style={{ fontFamily: "var(--font-display)", fontWeight: 800, fontSize: 26, marginBottom: 8 }}>Learning Style</h2>
              <p style={{ color: "var(--text-muted)", marginBottom: 20 }}>How do you prefer the AI to help you?</p>
              <div style={{ display: "flex", flexDirection: "column", gap: 14 }}>
                {STYLES.map(s => (
                  <div key={s.title} className={`step-card glass ${data.style === s.title ? "selected" : ""}`}
                    style={{ padding: "18px 20px", borderRadius: 14, border: "1px solid var(--glass-border)", display: "flex", alignItems: "center", gap: 16 }}
                    onClick={() => update("style", s.title)}>
                    <span style={{ fontSize: 28 }}>{s.icon}</span>
                    <div>
                      <div style={{ fontWeight: 600, fontSize: 16 }}>{s.title}</div>
                      <div style={{ color: "var(--text-muted)", fontSize: 13, marginTop: 2 }}>{s.desc}</div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          <div style={{ display: "flex", gap: 12, marginTop: 32 }}>
            {step > 0 && (
              <button className="btn-ghost" style={{ flex: 1 }} onClick={() => setStep(s => s - 1)}>← Back</button>
            )}
            <button
              className="btn-primary"
              style={{ flex: 2, opacity: canNext() ? 1 : 0.5 }}
              disabled={!canNext()}
              onClick={() => step < steps.length - 1 ? setStep(s => s + 1) : onDone(data)}
            >
              <span>{step === steps.length - 1 ? "🚀 Start Learning!" : "Continue →"}</span>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

// ─── App Shell ────────────────────────────────────────────────────────────
function AppShell({ user, appTab, setAppTab, sidebarOpen, setSidebarOpen }) {
  const navItems = [
    { id: "chat",      icon: "💬", label: "AI Chat" },
    { id: "dashboard", icon: "📊", label: "Dashboard" },
    { id: "group",     icon: "👥", label: "Group Study" },
    { id: "profile",   icon: "👤", label: "Profile" },
  ];

  return (
    <div style={{ display: "flex", height: "100vh", position: "relative", zIndex: 1 }}>
      {/* Sidebar overlay (mobile) */}
      {sidebarOpen && (
        <div onClick={() => setSidebarOpen(false)} style={{ position: "fixed", inset: 0, background: "rgba(0,0,0,0.5)", zIndex: 99 }} />
      )}

      {/* Sidebar */}
      <aside className={`glass sidebar ${sidebarOpen ? "open" : ""}`} style={{
        width: 240, minHeight: "100vh", borderRight: "1px solid var(--glass-border)",
        display: "flex", flexDirection: "column", padding: "20px 14px", gap: 6,
        flexShrink: 0,
      }}>
        <div style={{ display: "flex", alignItems: "center", gap: 10, padding: "8px 10px", marginBottom: 20 }}>
          <span style={{ fontSize: 26 }}>⚡</span>
          <span style={{ fontFamily: "var(--font-display)", fontWeight: 800, fontSize: 20 }} className="gradient-text">StudyAI</span>
        </div>

        <div style={{ fontSize: 11, fontWeight: 700, color: "var(--text-muted)", textTransform: "uppercase", letterSpacing: "0.1em", padding: "0 10px", marginBottom: 6 }}>Navigation</div>
        {navItems.map(n => (
          <div key={n.id} className={`nav-item ${appTab === n.id ? "active" : ""}`} onClick={() => { setAppTab(n.id); setSidebarOpen(false); }}>
            <span style={{ fontSize: 18 }}>{n.icon}</span>
            <span>{n.label}</span>
          </div>
        ))}

        <div style={{ flex: 1 }} />

        <div style={{ borderTop: "1px solid var(--glass-border)", paddingTop: 14 }}>
          <div style={{ display: "flex", alignItems: "center", gap: 10, padding: "8px 10px" }}>
            <div style={{ width: 36, height: 36, borderRadius: "50%", background: "linear-gradient(135deg, var(--primary), var(--cyan))", display: "flex", alignItems: "center", justifyContent: "center", fontWeight: 700, fontSize: 14 }}>
              {(user?.name || "S")[0].toUpperCase()}
            </div>
            <div>
              <div style={{ fontWeight: 600, fontSize: 14 }}>{user?.name || "Student"}</div>
              <div style={{ color: "var(--text-muted)", fontSize: 12 }}>{user?.grade || "Class 11"}</div>
            </div>
          </div>
        </div>
      </aside>

      {/* Main content */}
      <main style={{ flex: 1, overflow: "hidden", display: "flex", flexDirection: "column" }}>
        {/* Top bar (mobile) */}
        <div className="glass mobile-topbar" style={{ alignItems: "center", justifyContent: "space-between", padding: "14px 20px", borderBottom: "1px solid var(--glass-border)" }}>
          <button onClick={() => setSidebarOpen(true)} style={{ background: "none", border: "none", color: "var(--text)", fontSize: 22, cursor: "pointer" }}>☰</button>
          <span style={{ fontFamily: "var(--font-display)", fontWeight: 800 }} className="gradient-text">StudyAI</span>
          <div style={{ width: 32 }} />
        </div>

        {appTab === "chat"      && <ChatPage user={user} />}
        {appTab === "dashboard" && <DashboardPage user={user} />}
        {appTab === "group"     && <GroupStudyPage />}
        {appTab === "profile"   && <ProfilePage user={user} />}
      </main>
    </div>
  );
}

// ─── Chat Page ────────────────────────────────────────────────────────────
const SUBJECTS_CHAT = ["All", "Physics", "Chemistry", "Maths", "Biology", "Coding"];

const OPENROUTER_API_URL = "https://openrouter.ai/api/v1/chat/completions";
const OPENROUTER_API_KEY =
  process.env.REACT_APP_OPENROUTER_API_KEY ||
  "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";

// Free models tried in order — skippable statuses move to the next model automatically
const FREE_MODELS = [
  ...new Set([
    process.env.REACT_APP_OPENROUTER_MODEL,
    "meta-llama/llama-3.2-3b-instruct:free",
    "qwen/qwen3-4b:free",
    "google/gemma-3-4b-it:free",
    "liquid/lfm-2.5-1.2b-instruct:free",
    "mistralai/mistral-small-3.1-24b-instruct:free",
    "meta-llama/llama-3.3-70b-instruct:free",
    "nousresearch/hermes-3-llama-3.1-405b:free",
  ].filter(Boolean)),
];

// Statuses that mean "this model can't serve right now, try the next one"
const SKIP_STATUSES = new Set([400, 404, 429, 502, 503]);

async function callOpenRouterModel({ model, messages, maxTokens, temperature }) {
  const response = await fetch(OPENROUTER_API_URL, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${OPENROUTER_API_KEY}`,
      "HTTP-Referer": window.location.origin,
      "X-Title": "StudyAI",
    },
    body: JSON.stringify({
      model,
      messages,
      max_tokens: maxTokens,
      temperature,
    }),
  });

  const data = await response.json();

  if (!response.ok) {
    const err = new Error(data?.error?.message || `HTTP ${response.status}`);
    err.status = response.status;
    console.warn(`[OpenRouter] model=${model} status=${response.status}`, data?.error);
    throw err;
  }

  return data?.choices?.[0]?.message?.content || "Sorry, I couldn't process that. Please try again.";
}

async function callOpenRouter({ messages, maxTokens = 1000, temperature = 0.7 }) {
  let lastErr;
  for (const model of FREE_MODELS) {
    try {
      return await callOpenRouterModel({ model, messages, maxTokens, temperature });
    } catch (err) {
      lastErr = err;
      if (!SKIP_STATUSES.has(err.status)) throw err; // real error, don't hide it
      console.warn(`[OpenRouter] skipping ${model} (${err.status}), trying next...`);
    }
  }
  throw new Error(`All models unavailable. Last error: ${lastErr?.message}`);
}

const WELCOME_MSGS = [
  "What is Newton's second law?",
  "Explain photosynthesis step by step",
  "Solve: ∫x² dx from 0 to 3",
  "What is the difference between mitosis and meiosis?",
  "Explain how recursion works in Python",
  "JEE 2024: If log₂x + log₄x = 6, find x",
];

function ChatPage({ user }) {
  const [messages, setMessages] = useState([
    { role: "ai", text: `Namaste ${user?.name || ""}! 👋 I'm your AI study companion. Ask me anything about Physics, Chemistry, Maths, Biology, or Coding. I'll help you ace **${(user?.exams || ["JEE"]).join(", ")}**!\n\nYou can also:\n• 📷 Upload a question image\n• 🎯 Toggle Hint Mode for guided learning\n• 🌐 Ask in Hindi or Tamil` }
  ]);
  const [input, setInput] = useState("");
  const [isTyping, setIsTyping] = useState(false);
  const [streamingMsg, setStreamingMsg] = useState(null);
  const [hintMode, setHintMode] = useState(false);
  const [selectedSubject, setSelectedSubject] = useState("All");
  const [isRecording, setIsRecording] = useState(false);
  const [imagePreview, setImagePreview] = useState(null);
  const messagesEndRef = useRef(null);
  const fileInputRef = useRef(null);

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages, isTyping, streamingMsg]);

  const sendMessage = async (text) => {
    if (!text.trim() && !imagePreview) return;
    const userMsg = { role: "user", text: imagePreview ? `[Image uploaded] ${text || "Solve this question"}` : text };
    setMessages(m => [...m, userMsg]);
    setInput("");
    setImagePreview(null);
    setIsTyping(true);

    try {
      const systemPrompt = `You are StudyAI, an expert Indian exam preparation tutor specializing in JEE, NEET, CUET and Board Exams. The student's name is ${user?.name || "Student"}, grade: ${user?.grade || "Class 11"}, target exams: ${(user?.exams || ["JEE"]).join(", ")}.

${hintMode ? "HINT MODE IS ON: Do NOT give the full answer. Give 2-3 helpful hints that guide the student toward the answer. Ask them to think step by step." : "Give a clear, detailed step-by-step explanation with the final answer."}

Subject focus: ${selectedSubject !== "All" ? selectedSubject : "any subject"}.
Keep responses concise but thorough. Use Indian curriculum references (NCERT, JEE patterns). Format nicely with steps numbered. Encourage the student. End with a follow-up question to check understanding.`;

      const reply = await callOpenRouter({
        messages: [
          { role: "system", content: systemPrompt },
          ...messages.slice(-6).map(m => ({
            role: m.role === "ai" ? "assistant" : "user",
            content: m.text,
          })),
          { role: "user", content: text },
        ],
        maxTokens: 1000,
        temperature: 0.7,
      });
      setIsTyping(false);
      setStreamingMsg(reply);
      setTimeout(() => {
        setMessages(m => [...m, { role: "ai", text: reply }]);
        setStreamingMsg(null);
      }, reply.length * 12 + 200);
    } catch (err) {
      console.error("[Chat sendMessage error]", err);
      setIsTyping(false);
      setMessages(m => [...m, { role: "ai", text: `⚠️ Error: ${err.message || "Connection failed. Please check your network and try again."}` }]);
    }
  };

  const handleKeyDown = (e) => {
    if (e.key === "Enter" && !e.shiftKey) { e.preventDefault(); sendMessage(input); }
  };

  const handleImageUpload = (e) => {
    const file = e.target.files[0];
    if (!file) return;
    const reader = new FileReader();
    reader.onload = () => setImagePreview(reader.result);
    reader.readAsDataURL(file);
  };

  const formatMsg = (text) => {
    return text.split("\n").map((line, i) => {
      if (line.startsWith("**") && line.endsWith("**")) {
        return <div key={i} style={{ fontWeight: 700, marginTop: 8 }}>{line.slice(2, -2)}</div>;
      }
      if (line.match(/^\d+\./)) {
        return <div key={i} style={{ paddingLeft: 16, marginTop: 4, display: "flex", gap: 8 }}><span style={{ color: "var(--primary)", fontWeight: 700 }}>{line.split(".")[0]}.</span><span>{line.split(".").slice(1).join(".")}</span></div>;
      }
      if (line.startsWith("•")) {
        return <div key={i} style={{ paddingLeft: 16, marginTop: 4 }}><span style={{ color: "var(--cyan)" }}>• </span>{line.slice(1)}</div>;
      }
      return <div key={i} style={{ marginTop: line === "" ? 8 : 0 }}>{line}</div>;
    });
  };

  return (
    <div style={{ display: "flex", flexDirection: "column", height: "100%", overflow: "hidden" }}>
      {/* Header */}
      <div className="glass" style={{ padding: "16px 24px", borderBottom: "1px solid var(--glass-border)", display: "flex", alignItems: "center", justifyContent: "space-between", flexShrink: 0 }}>
        <div>
          <div style={{ fontFamily: "var(--font-display)", fontWeight: 700, fontSize: 18 }}>AI Chat</div>
          <div style={{ color: "var(--text-muted)", fontSize: 12, marginTop: 2 }}>Powered by OpenRouter · Ask anything</div>
        </div>
        <div style={{ display: "flex", gap: 10, alignItems: "center" }}>
          <button
            onClick={() => setHintMode(h => !h)}
            style={{ display: "flex", alignItems: "center", gap: 8, padding: "7px 16px", borderRadius: 10, border: `1px solid ${hintMode ? "var(--primary)" : "var(--glass-border)"}`, background: hintMode ? "rgba(124,111,255,0.15)" : "transparent", color: hintMode ? "var(--primary)" : "var(--text-muted)", cursor: "pointer", fontSize: 13, fontWeight: 600, transition: "all 0.2s" }}
          >
            🎯 Hint Mode {hintMode ? "ON" : "OFF"}
          </button>
        </div>
      </div>

      {/* Subject filter */}
      <div style={{ padding: "12px 24px", borderBottom: "1px solid var(--glass-border)", display: "flex", gap: 8, overflowX: "auto", flexShrink: 0 }}>
        {SUBJECTS_CHAT.map(s => (
          <button key={s} onClick={() => setSelectedSubject(s)} style={{
            padding: "5px 14px", borderRadius: 99, border: `1px solid ${selectedSubject === s ? "var(--primary)" : "var(--glass-border)"}`,
            background: selectedSubject === s ? "rgba(124,111,255,0.15)" : "transparent",
            color: selectedSubject === s ? "var(--primary)" : "var(--text-muted)",
            cursor: "pointer", fontSize: 13, fontWeight: 500, whiteSpace: "nowrap", transition: "all 0.2s",
          }}>{s}</button>
        ))}
      </div>

      {/* Messages */}
      <div style={{ flex: 1, overflowY: "auto", padding: "24px", display: "flex", flexDirection: "column", gap: 16 }}>
        {/* Welcome suggestions */}
        {messages.length === 1 && (
          <div style={{ display: "flex", flexWrap: "wrap", gap: 10, marginBottom: 8 }}>
            {WELCOME_MSGS.map((m, i) => (
              <button key={i} onClick={() => sendMessage(m)} style={{
                background: "var(--bg3)", border: "1px solid var(--glass-border)", borderRadius: 10,
                color: "var(--text-muted)", padding: "8px 14px", fontSize: 13, cursor: "pointer",
                transition: "all 0.2s", textAlign: "left",
              }}
                onMouseEnter={e => { e.target.style.borderColor = "var(--primary)"; e.target.style.color = "var(--text)"; }}
                onMouseLeave={e => { e.target.style.borderColor = "var(--glass-border)"; e.target.style.color = "var(--text-muted)"; }}
              >{m}</button>
            ))}
          </div>
        )}

        {messages.map((m, i) => (
          <div key={i} style={{ display: "flex", flexDirection: "column", alignItems: m.role === "user" ? "flex-end" : "flex-start" }}>
            {m.role === "ai" && (
              <div style={{ display: "flex", alignItems: "flex-start", gap: 10 }}>
                <div style={{ width: 32, height: 32, borderRadius: "50%", background: "linear-gradient(135deg,var(--primary),var(--cyan))", display: "flex", alignItems: "center", justifyContent: "center", fontSize: 16, flexShrink: 0 }}>🤖</div>
                <div className="msg-ai" style={{ fontSize: 14, lineHeight: 1.7 }}>{formatMsg(m.text)}</div>
              </div>
            )}
            {m.role === "user" && (
              <div className="msg-user" style={{ fontSize: 14 }}>{m.text}</div>
            )}
          </div>
        ))}

        {isTyping && (
          <div style={{ display: "flex", gap: 10, alignItems: "flex-start" }}>
            <div style={{ width: 32, height: 32, borderRadius: "50%", background: "linear-gradient(135deg,var(--primary),var(--cyan))", display: "flex", alignItems: "center", justifyContent: "center", fontSize: 16, flexShrink: 0, animation: "pulse-glow 1.5s infinite" }}>🤖</div>
            <TypingIndicator />
          </div>
        )}
        {streamingMsg && (
          <div style={{ display: "flex", gap: 10, alignItems: "flex-start" }}>
            <div style={{ width: 32, height: 32, borderRadius: "50%", background: "linear-gradient(135deg,var(--primary),var(--cyan))", display: "flex", alignItems: "center", justifyContent: "center", fontSize: 16, flexShrink: 0 }}>🤖</div>
            <div className="msg-ai" style={{ fontSize: 14, lineHeight: 1.7 }}>
              <StreamingText text={streamingMsg} />
            </div>
          </div>
        )}
        <div ref={messagesEndRef} />
      </div>

      {/* Image preview */}
      {imagePreview && (
        <div style={{ padding: "0 24px 12px", display: "flex", alignItems: "center", gap: 10 }}>
          <img src={imagePreview} alt="upload" style={{ width: 60, height: 60, borderRadius: 10, objectFit: "cover", border: "1px solid var(--glass-border)" }} />
          <button onClick={() => setImagePreview(null)} style={{ background: "none", border: "none", color: "var(--text-muted)", cursor: "pointer", fontSize: 18 }}>✕</button>
          <span style={{ fontSize: 13, color: "var(--text-muted)" }}>Image ready to solve</span>
        </div>
      )}

      {/* Input bar */}
      <div className="glass" style={{ padding: "16px 24px", borderTop: "1px solid var(--glass-border)", flexShrink: 0 }}>
        <div style={{ display: "flex", gap: 10, alignItems: "flex-end" }}>
          <div style={{ flex: 1, position: "relative" }}>
            <textarea
              className="chat-input"
              rows={1}
              value={input}
              onChange={e => setInput(e.target.value)}
              onKeyDown={handleKeyDown}
              placeholder={hintMode ? "Ask for hints on any problem... (Shift+Enter for new line)" : "Ask any question... (Shift+Enter for new line)"}
              style={{ minHeight: 48, maxHeight: 140 }}
            />
          </div>
          <input ref={fileInputRef} type="file" accept="image/*" onChange={handleImageUpload} style={{ display: "none" }} />
          <button onClick={() => fileInputRef.current?.click()} style={{ width: 46, height: 46, borderRadius: 12, background: "var(--bg3)", border: "1px solid var(--glass-border)", color: "var(--text-muted)", cursor: "pointer", fontSize: 18, display: "flex", alignItems: "center", justifyContent: "center", flexShrink: 0, transition: "all 0.2s" }}
            onMouseEnter={e => { e.currentTarget.style.borderColor="var(--primary)"; e.currentTarget.style.color="var(--primary)"; }}
            onMouseLeave={e => { e.currentTarget.style.borderColor="var(--glass-border)"; e.currentTarget.style.color="var(--text-muted)"; }}
          >📷</button>
          <button
            onClick={() => setIsRecording(r => !r)}
            style={{ width: 46, height: 46, borderRadius: 12, background: isRecording ? "rgba(239,68,68,0.15)" : "var(--bg3)", border: `1px solid ${isRecording ? "rgb(239,68,68)" : "var(--glass-border)"}`, color: isRecording ? "rgb(239,68,68)" : "var(--text-muted)", cursor: "pointer", fontSize: 18, display: "flex", alignItems: "center", justifyContent: "center", flexShrink: 0, transition: "all 0.2s" }}
          >
            {isRecording ? (
              <div style={{ display: "flex", gap: 2, alignItems: "center", height: 20 }}>
                {[0,1,2,3,4].map(i => <div key={i} className="waveform-bar" style={{ animationDelay: `${i*0.1}s` }} />)}
              </div>
            ) : "🎤"}
          </button>
          <button
            className="btn-primary"
            onClick={() => sendMessage(input)}
            disabled={!input.trim() && !imagePreview}
            style={{ width: 46, height: 46, padding: 0, borderRadius: 12, display: "flex", alignItems: "center", justifyContent: "center", fontSize: 18, flexShrink: 0, opacity: (!input.trim() && !imagePreview) ? 0.5 : 1 }}
          ><span>→</span></button>
        </div>
        <div style={{ textAlign: "center", color: "var(--text-muted)", fontSize: 11, marginTop: 10 }}>
          {hintMode ? "🎯 Hint Mode — AI will guide, not solve directly" : "Press Enter to send · Shift+Enter for new line"}
        </div>
      </div>
    </div>
  );
}

// ─── Dashboard Page ────────────────────────────────────────────────────────
const WEAK_TOPICS = [
  { subject: "Physics", topic: "Rotational Dynamics", score: 42, color: "#ef4444" },
  { subject: "Chemistry", topic: "Electrochemistry", score: 55, color: "#f97316" },
  { subject: "Mathematics", topic: "Integration by Parts", score: 63, color: "#eab308" },
  { subject: "Physics", topic: "Wave Optics", score: 71, color: "#22c55e" },
];

const RECENT_TOPICS = ["Newton's Laws", "Quadratic Equations", "Organic Chemistry", "Trigonometry", "Cell Biology"];

function DashboardPage({ user }) {
  const [streakDays] = useState([true,true,true,false,true,true,true]);
  return (
    <div style={{ flex: 1, overflowY: "auto", padding: 24 }}>
      {/* Welcome banner */}
      <div style={{ borderRadius: 20, background: "linear-gradient(135deg, rgba(124,111,255,0.18), rgba(34,211,238,0.08))", border: "1px solid rgba(124,111,255,0.2)", padding: "28px 32px", marginBottom: 24, position: "relative", overflow: "hidden" }}>
        <div style={{ position: "absolute", right: 24, top: "50%", transform: "translateY(-50%)", fontSize: 80, opacity: 0.15 }}>🎓</div>
        <div style={{ fontFamily: "var(--font-display)", fontWeight: 800, fontSize: 22, marginBottom: 6 }}>
          Welcome back, <span className="gradient-text">{user?.name || "Student"}</span>! 🔥
        </div>
        <div style={{ color: "var(--text-muted)", fontSize: 14, marginBottom: 16 }}>
          {user?.exams?.length ? `Preparing for: ${user.exams.join(", ")}` : "Keep up the great work!"}
        </div>
        <div style={{ display: "flex", gap: 8, alignItems: "center" }}>
          <span style={{ fontSize: 13, color: "var(--text-muted)" }}>Weekly streak:</span>
          {streakDays.map((active, i) => (
            <div key={i} style={{ width: 28, height: 28, borderRadius: 8, background: active ? "var(--primary)" : "var(--bg3)", border: `1px solid ${active ? "var(--primary)" : "var(--glass-border)"}`, display: "flex", alignItems: "center", justifyContent: "center", fontSize: 14 }}>
              {active ? "🔥" : ""}
            </div>
          ))}
          <span className="chip">6 day streak!</span>
        </div>
      </div>

      {/* Stats */}
      <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(160px, 1fr))", gap: 16, marginBottom: 24 }}>
        {[
          { icon: "💬", label: "Questions Asked", value: "284", sub: "+12 today" },
          { icon: "✅", label: "Topics Mastered", value: "47", sub: "out of 120" },
          { icon: "⏱️", label: "Study Hours", value: "38h", sub: "this month" },
          { icon: "🎯", label: "Exam Readiness", value: "72%", sub: "JEE Main" },
        ].map((s, i) => (
          <div key={i} className="glass" style={{ borderRadius: 16, padding: "20px 18px", border: "1px solid var(--glass-border)", animation: `slideUp 0.5s ease ${i * 0.1}s both` }}>
            <div style={{ fontSize: 28, marginBottom: 10 }}>{s.icon}</div>
            <div style={{ fontFamily: "var(--font-display)", fontWeight: 800, fontSize: 26, marginBottom: 2 }}>{s.value}</div>
            <div style={{ fontSize: 13, fontWeight: 600, marginBottom: 2 }}>{s.label}</div>
            <div style={{ color: "var(--text-muted)", fontSize: 12 }}>{s.sub}</div>
          </div>
        ))}
      </div>

      <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 20 }}>
        {/* Weak Topics */}
        <div className="glass" style={{ borderRadius: 20, padding: 24, border: "1px solid var(--glass-border)" }}>
          <div style={{ fontFamily: "var(--font-display)", fontWeight: 700, fontSize: 16, marginBottom: 20, display: "flex", alignItems: "center", gap: 8 }}>
            ⚠️ Weak Topics — Focus Here
          </div>
          <div style={{ display: "flex", flexDirection: "column", gap: 16 }}>
            {WEAK_TOPICS.map((t, i) => (
              <div key={i}>
                <div style={{ display: "flex", justifyContent: "space-between", marginBottom: 6, fontSize: 13 }}>
                  <div>
                    <span style={{ fontWeight: 600 }}>{t.topic}</span>
                    <span style={{ color: "var(--text-muted)", marginLeft: 8 }}>{t.subject}</span>
                  </div>
                  <span style={{ color: t.color, fontWeight: 700 }}>{t.score}%</span>
                </div>
                <div className="progress-bar">
                  <div style={{ height: "100%", borderRadius: 99, background: t.color, width: `${t.score}%`, transition: "width 1s ease" }} />
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Recent Activity */}
        <div className="glass" style={{ borderRadius: 20, padding: 24, border: "1px solid var(--glass-border)" }}>
          <div style={{ fontFamily: "var(--font-display)", fontWeight: 700, fontSize: 16, marginBottom: 20, display: "flex", alignItems: "center", gap: 8 }}>
            📚 Recently Studied
          </div>
          <div style={{ display: "flex", flexDirection: "column", gap: 12 }}>
            {RECENT_TOPICS.map((t, i) => (
              <div key={i} style={{ display: "flex", alignItems: "center", gap: 12, padding: "10px 14px", background: "var(--bg3)", borderRadius: 12, border: "1px solid var(--glass-border)" }}>
                <div style={{ width: 8, height: 8, borderRadius: "50%", background: "var(--primary)", flexShrink: 0 }} />
                <span style={{ fontSize: 14 }}>{t}</span>
                <span style={{ marginLeft: "auto", color: "var(--text-muted)", fontSize: 12 }}>{i + 1}d ago</span>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Subject Progress */}
      <div className="glass" style={{ borderRadius: 20, padding: 24, border: "1px solid var(--glass-border)", marginTop: 20 }}>
        <div style={{ fontFamily: "var(--font-display)", fontWeight: 700, fontSize: 16, marginBottom: 20 }}>📈 Subject Mastery</div>
        <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(200px, 1fr))", gap: 20 }}>
          {[
            { subject: "Physics", pct: 68, color: "#6c63ff" },
            { subject: "Chemistry", pct: 74, color: "#22d3ee" },
            { subject: "Mathematics", pct: 81, color: "#10b981" },
            { subject: "Biology", pct: 59, color: "#f59e0b" },
          ].map(s => (
            <div key={s.subject}>
              <div style={{ display: "flex", justifyContent: "space-between", marginBottom: 8, fontSize: 14 }}>
                <span style={{ fontWeight: 600 }}>{s.subject}</span>
                <span style={{ color: s.color, fontWeight: 700 }}>{s.pct}%</span>
              </div>
              <div className="progress-bar" style={{ height: 8 }}>
                <div style={{ height: "100%", borderRadius: 99, background: s.color, width: `${s.pct}%`, transition: "width 1.2s ease" }} />
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

// ─── Group Study Page ──────────────────────────────────────────────────────
function GroupStudyPage() {
  const [joined, setJoined] = useState(false);
  const [roomCode, setRoomCode] = useState("");
  const [inputCode, setInputCode] = useState("");
  const [messages, setMessages] = useState([
    { user: "Arjun", msg: "Hey everyone! Let's solve the rotational dynamics problems from yesterday's JEE paper.", time: "10:02", avatar: "A" },
    { user: "Priya", msg: "Sure! I was stuck on the angular momentum question. Can the AI help explain?", time: "10:03", avatar: "P" },
    { user: "AI Moderator", msg: "Great question Priya! Angular momentum is conserved when net external torque = 0. Let me give an example from JEE 2023...", time: "10:03", avatar: "🤖", isAI: true },
  ]);
  const [chatInput, setChatInput] = useState("");
  const [isAITyping, setIsAITyping] = useState(false);
  const messagesEndRef = useRef(null);

  useEffect(() => { messagesEndRef.current?.scrollIntoView({ behavior: "smooth" }); }, [messages]);

  const createRoom = () => {
    const code = Math.random().toString(36).substring(2, 8).toUpperCase();
    setRoomCode(code);
    setJoined(true);
  };

  const joinRoom = () => {
    if (inputCode.trim()) { setRoomCode(inputCode.toUpperCase()); setJoined(true); }
  };

  const sendGroupMsg = async () => {
    if (!chatInput.trim()) return;
    const msg = { user: "You", msg: chatInput, time: new Date().toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" }), avatar: "Y" };
    setMessages(m => [...m, msg]);
    setChatInput("");

    // If message seems like a question, have AI respond
    if (chatInput.includes("?") || chatInput.toLowerCase().includes("explain") || chatInput.toLowerCase().includes("how") || chatInput.toLowerCase().includes("what")) {
      setIsAITyping(true);
      try {
        const reply = await callOpenRouter({
          messages: [
            {
              role: "system",
              content: "You are an AI study moderator in a group study room for JEE/NEET students.",
            },
            {
              role: "user",
              content: `Answer this question briefly (2-4 sentences): ${chatInput}`,
            },
          ],
          maxTokens: 300,
          temperature: 0.7,
        });
        setTimeout(() => {
          setIsAITyping(false);
          setMessages(m => [...m, { user: "AI Moderator", msg: reply, time: new Date().toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" }), avatar: "🤖", isAI: true }]);
        }, 1500);
      } catch {
        setIsAITyping(false);
      }
    }
  };

  if (!joined) {
    return (
      <div style={{ flex: 1, display: "flex", alignItems: "center", justifyContent: "center", padding: 24 }}>
        <div style={{ width: "100%", maxWidth: 480, animation: "slideUp 0.5s ease" }}>
          <div style={{ textAlign: "center", marginBottom: 32 }}>
            <div style={{ fontSize: 64, marginBottom: 16 }}>👥</div>
            <h2 style={{ fontFamily: "var(--font-display)", fontWeight: 800, fontSize: 28, marginBottom: 8 }}>Group Study</h2>
            <p style={{ color: "var(--text-muted)" }}>Study with friends — AI moderates and answers questions in real-time</p>
          </div>
          <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 16 }}>
            <div className="glass feature-card" style={{ borderRadius: 20, padding: 28, border: "1px solid var(--glass-border)", textAlign: "center", cursor: "pointer" }} onClick={createRoom}>
              <div style={{ fontSize: 40, marginBottom: 12 }}>✨</div>
              <div style={{ fontFamily: "var(--font-display)", fontWeight: 700, fontSize: 16, marginBottom: 6 }}>Create Room</div>
              <div style={{ color: "var(--text-muted)", fontSize: 13 }}>Start a new group session</div>
            </div>
            <div className="glass" style={{ borderRadius: 20, padding: 28, border: "1px solid var(--glass-border)", textAlign: "center", display: "flex", flexDirection: "column", gap: 12 }}>
              <div style={{ fontSize: 40 }}>🔗</div>
              <div style={{ fontFamily: "var(--font-display)", fontWeight: 700, fontSize: 16 }}>Join Room</div>
              <input
                value={inputCode}
                onChange={e => setInputCode(e.target.value)}
                placeholder="Enter room code..."
                style={{ background: "var(--bg3)", border: "1px solid var(--glass-border)", borderRadius: 10, padding: "10px 14px", color: "var(--text)", fontSize: 14, outline: "none", textAlign: "center", letterSpacing: "0.1em", fontFamily: "var(--font-display)", fontWeight: 700 }}
              />
              <button className="btn-primary" onClick={joinRoom} style={{ width: "100%", padding: "10px 0" }}><span>Join</span></button>
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div style={{ display: "flex", flexDirection: "column", height: "100%" }}>
      {/* Room header */}
      <div className="glass" style={{ padding: "16px 24px", borderBottom: "1px solid var(--glass-border)", display: "flex", alignItems: "center", justifyContent: "space-between" }}>
        <div style={{ display: "flex", alignItems: "center", gap: 12 }}>
          <div style={{ width: 10, height: 10, borderRadius: "50%", background: "#22c55e", animation: "pulse-glow 2s infinite" }} />
          <div>
            <div style={{ fontFamily: "var(--font-display)", fontWeight: 700 }}>Room: {roomCode}</div>
            <div style={{ color: "var(--text-muted)", fontSize: 12 }}>3 members · AI Moderator active</div>
          </div>
        </div>
        <div style={{ display: "flex", gap: 8 }}>
          <div className="chip">🤖 AI Active</div>
          <button className="btn-ghost" style={{ padding: "6px 14px", fontSize: 13 }} onClick={() => setJoined(false)}>Leave</button>
        </div>
      </div>

      {/* Members */}
      <div style={{ padding: "12px 24px", borderBottom: "1px solid var(--glass-border)", display: "flex", gap: 12 }}>
        {[{ name: "You", color: "var(--primary)" }, { name: "Arjun", color: "#22c55e" }, { name: "Priya", color: "var(--cyan)" }].map(m => (
          <div key={m.name} style={{ display: "flex", alignItems: "center", gap: 8 }}>
            <div style={{ width: 28, height: 28, borderRadius: "50%", background: m.color, display: "flex", alignItems: "center", justifyContent: "center", fontSize: 12, fontWeight: 700 }}>{m.name[0]}</div>
            <span style={{ fontSize: 13, color: "var(--text-muted)" }}>{m.name}</span>
          </div>
        ))}
        <div className="chip" style={{ marginLeft: "auto" }}>📤 Share: {roomCode}</div>
      </div>

      {/* Messages */}
      <div style={{ flex: 1, overflowY: "auto", padding: 24, display: "flex", flexDirection: "column", gap: 14 }}>
        {messages.map((m, i) => (
          <div key={i} style={{ display: "flex", gap: 10, alignItems: "flex-start", animation: "slideUp 0.3s ease" }}>
            <div style={{ width: 32, height: 32, borderRadius: "50%", background: m.isAI ? "linear-gradient(135deg, var(--primary), var(--cyan))" : "var(--bg3)", border: "1px solid var(--glass-border)", display: "flex", alignItems: "center", justifyContent: "center", fontSize: m.isAI ? 16 : 13, fontWeight: 700, flexShrink: 0 }}>
              {m.avatar}
            </div>
            <div>
              <div style={{ display: "flex", gap: 8, alignItems: "baseline", marginBottom: 4 }}>
                <span style={{ fontWeight: 700, fontSize: 13, color: m.isAI ? "var(--primary)" : "var(--text)" }}>{m.user}</span>
                <span style={{ color: "var(--text-muted)", fontSize: 11 }}>{m.time}</span>
              </div>
              <div style={{ background: m.isAI ? "rgba(124,111,255,0.08)" : "var(--bg3)", border: `1px solid ${m.isAI ? "rgba(124,111,255,0.2)" : "var(--glass-border)"}`, borderRadius: "12px 12px 12px 4px", padding: "10px 14px", fontSize: 14, lineHeight: 1.6, maxWidth: 520 }}>
                {m.msg}
              </div>
            </div>
          </div>
        ))}
        {isAITyping && (
          <div style={{ display: "flex", gap: 10, alignItems: "flex-start" }}>
            <div style={{ width: 32, height: 32, borderRadius: "50%", background: "linear-gradient(135deg, var(--primary), var(--cyan))", display: "flex", alignItems: "center", justifyContent: "center", fontSize: 16, flexShrink: 0 }}>🤖</div>
            <div style={{ padding: "10px 14px", background: "rgba(124,111,255,0.08)", border: "1px solid rgba(124,111,255,0.2)", borderRadius: "12px 12px 12px 4px" }}>
              <TypingIndicator />
            </div>
          </div>
        )}
        <div ref={messagesEndRef} />
      </div>

      {/* Group input */}
      <div className="glass" style={{ padding: "16px 24px", borderTop: "1px solid var(--glass-border)" }}>
        <div style={{ display: "flex", gap: 10 }}>
          <input
            value={chatInput}
            onChange={e => setChatInput(e.target.value)}
            onKeyDown={e => e.key === "Enter" && sendGroupMsg()}
            placeholder="Message the group... (AI will answer questions automatically)"
            style={{ flex: 1, background: "var(--bg3)", border: "1px solid var(--glass-border)", borderRadius: 12, padding: "12px 16px", color: "var(--text)", fontSize: 14, outline: "none", fontFamily: "var(--font-body)", transition: "border-color 0.2s" }}
            onFocus={e => e.target.style.borderColor = "var(--primary)"}
            onBlur={e => e.target.style.borderColor = "var(--glass-border)"}
          />
          <button className="btn-primary" onClick={sendGroupMsg} style={{ padding: "12px 20px" }}><span>Send</span></button>
        </div>
      </div>
    </div>
  );
}

// ─── Profile Page ──────────────────────────────────────────────────────────
function ProfilePage({ user }) {
  return (
    <div style={{ flex: 1, overflowY: "auto", padding: 24 }}>
      {/* Profile header */}
      <div className="glass" style={{ borderRadius: 20, padding: 28, border: "1px solid var(--glass-border)", marginBottom: 24, display: "flex", alignItems: "center", gap: 24 }}>
        <div style={{ width: 72, height: 72, borderRadius: "50%", background: "linear-gradient(135deg, var(--primary), var(--cyan))", display: "flex", alignItems: "center", justifyContent: "center", fontSize: 28, fontWeight: 800, flexShrink: 0, animation: "pulse-glow 3s infinite" }}>
          {(user?.name || "S")[0].toUpperCase()}
        </div>
        <div style={{ flex: 1 }}>
          <div style={{ fontFamily: "var(--font-display)", fontWeight: 800, fontSize: 22, marginBottom: 4 }}>{user?.name || "Student"}</div>
          <div style={{ color: "var(--text-muted)", fontSize: 14, marginBottom: 8 }}>{user?.grade || "Class 11"} · {(user?.exams || ["JEE"]).join(", ")}</div>
          <div style={{ display: "flex", gap: 8 }}>
            <span className="chip">🌐 {user?.lang || "English"}</span>
            <span className="chip">⚡ Free Plan</span>
            <span className="chip">🔥 6 day streak</span>
          </div>
        </div>
        <button className="btn-ghost" style={{ padding: "8px 20px", fontSize: 14 }}>Edit Profile</button>
      </div>

      {/* Pricing */}
      <div style={{ marginBottom: 24 }}>
        <div style={{ fontFamily: "var(--font-display)", fontWeight: 700, fontSize: 18, marginBottom: 16 }}>📦 Your Plan</div>
        <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 20 }}>
          {/* Free */}
          <div className="glass" style={{ borderRadius: 20, padding: 28, border: "2px solid var(--primary)", position: "relative", overflow: "hidden" }}>
            <div style={{ position: "absolute", top: 12, right: 12 }} className="chip">Current Plan</div>
            <div style={{ fontFamily: "var(--font-display)", fontWeight: 800, fontSize: 22, marginBottom: 4 }}>Free</div>
            <div style={{ fontFamily: "var(--font-display)", fontWeight: 800, fontSize: 36, marginBottom: 20 }}>₹0<span style={{ fontSize: 16, fontWeight: 400, color: "var(--text-muted)" }}>/mo</span></div>
            {[
              "20 questions/day",
              "1 group study room",
              "3 PDF exports/month",
              "English only",
              "Basic weak topic tracking",
              "5 image uploads/day",
            ].map((f, i) => (
              <div key={i} style={{ display: "flex", alignItems: "center", gap: 10, marginBottom: 10, fontSize: 14, color: "var(--text-muted)" }}>
                <span style={{ color: "#22c55e" }}>✓</span> {f}
              </div>
            ))}
          </div>
          {/* Pro */}
          <div style={{ borderRadius: 20, padding: 28, border: "1px solid rgba(124,111,255,0.3)", background: "linear-gradient(135deg, rgba(124,111,255,0.1), rgba(34,211,238,0.05))", position: "relative", overflow: "hidden" }}>
            <div style={{ fontFamily: "var(--font-display)", fontWeight: 800, fontSize: 22, marginBottom: 4 }}>Pro ✨</div>
            <div style={{ fontFamily: "var(--font-display)", fontWeight: 800, fontSize: 36, marginBottom: 20 }}>₹199<span style={{ fontSize: 16, fontWeight: 400, color: "var(--text-muted)" }}>/mo</span></div>
            {[
              "Unlimited questions",
              "10 group study rooms",
              "Unlimited PDF exports",
              "All 4 Indian languages",
              "Advanced AI coaching",
              "Voice input 🎤",
              "Unlimited image uploads",
            ].map((f, i) => (
              <div key={i} style={{ display: "flex", alignItems: "center", gap: 10, marginBottom: 10, fontSize: 14 }}>
                <span style={{ color: "var(--primary)" }}>⚡</span> {f}
              </div>
            ))}
            <button className="btn-primary" style={{ width: "100%", marginTop: 8, padding: "12px 0" }}>
              <span>Upgrade to Pro →</span>
            </button>
          </div>
        </div>
      </div>

      {/* Settings */}
      <div className="glass" style={{ borderRadius: 20, padding: 24, border: "1px solid var(--glass-border)" }}>
        <div style={{ fontFamily: "var(--font-display)", fontWeight: 700, fontSize: 16, marginBottom: 20 }}>⚙️ Preferences</div>
        <div style={{ display: "flex", flexDirection: "column", gap: 0 }}>
          {[
            { label: "Hint Mode by default", desc: "AI gives hints instead of direct answers", key: "hintMode" },
            { label: "Daily reminder notifications", desc: "Get reminded to study every day", key: "notif" },
            { label: "Show weak topic warnings", desc: "Alert when a topic needs more practice", key: "weakAlert" },
          ].map((s, i) => (
            <div key={i} style={{ display: "flex", alignItems: "center", justifyContent: "space-between", padding: "16px 0", borderBottom: i < 2 ? "1px solid var(--glass-border)" : "none" }}>
              <div>
                <div style={{ fontWeight: 600, fontSize: 14 }}>{s.label}</div>
                <div style={{ color: "var(--text-muted)", fontSize: 12, marginTop: 2 }}>{s.desc}</div>
              </div>
              <ToggleSwitch defaultOn={i === 2} />
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

function ToggleSwitch({ defaultOn }) {
  const [on, setOn] = useState(defaultOn);
  return (
    <div onClick={() => setOn(v => !v)} style={{ width: 46, height: 26, borderRadius: 99, background: on ? "var(--primary)" : "var(--bg3)", border: `1px solid ${on ? "var(--primary)" : "var(--glass-border)"}`, cursor: "pointer", position: "relative", transition: "all 0.25s", flexShrink: 0 }}>
      <div style={{ position: "absolute", width: 20, height: 20, borderRadius: "50%", background: "white", top: 2, left: on ? 22 : 2, transition: "left 0.25s ease", boxShadow: "0 1px 4px rgba(0,0,0,0.3)" }} />
    </div>
  );
}
