import { useState, useEffect, useRef } from "react";
import gymlinkLogo from "./assets/gymlink_logo.png";

const BG = "radial-gradient(ellipse at 80% 10%, #2F6DFF 0%, #123D9B 35%, #081A3A 70%, #040e22 100%)";

const C = {
  blue: "#2F6DFF", blueDark: "#1E5BFF", blueLight: "rgba(47,109,255,0.15)",
  white: "#FFFFFF", bg: "#081A3A", card: "rgba(255,255,255,0.06)",
  text: "#FFFFFF", muted: "rgba(255,255,255,0.55)", border: "rgba(255,255,255,0.1)",
  success: "#22C55E", warning: "#F59E0B", danger: "#FF2A2A", green: "#22C55E",
  red: "#FF2A2A",
};

const styles = {
  app: { fontFamily: "'Montserrat', 'Segoe UI', sans-serif", maxWidth: 430, margin: "0 auto", minHeight: "100vh", background: BG, color: '#FFFFFF', position: "relative", overflow: "hidden" },
  screen: { minHeight: "100vh", background: BG, display: "flex", flexDirection: "column", color: "#FFFFFF" },
  btn: (variant = "primary", size = "md") => ({
    display: "flex", alignItems: "center", justifyContent: "center", gap: 8,
    padding: size === "sm" ? "8px 14px" : "14px 24px",
    borderRadius: 12, border: "none",
    fontSize: size === "sm" ? 12 : 14, fontWeight: 700, cursor: "pointer", transition: "all 0.18s ease",
    background: variant === "primary" ? "#FF2A2A" : variant === "outline" ? "transparent" : variant === "ghost" ? "transparent" : variant === "danger" ? "#FF2A2A" : "rgba(255,255,255,0.08)",
    color: "#FFFFFF",
    border: variant === "outline" ? "1.5px solid rgba(255,255,255,0.2)" : "none",
    width: "100%", letterSpacing: "0.5px",
  }),
  input: { width: "100%", padding: "13px 16px", borderRadius: 12, border: "1px solid rgba(255,255,255,0.12)", fontSize: 14, background: "rgba(255,255,255,0.07)", color: "#FFFFFF", outline: "none", boxSizing: "border-box", fontFamily: "inherit", transition: "border 0.2s" },
  label: { fontSize: 11, fontWeight: 700, color: "rgba(255,255,255,0.45)", marginBottom: 6, display: "block", letterSpacing: 1.2, textTransform: "uppercase" },
  card: { background: "rgba(255,255,255,0.06)", borderRadius: 16, padding: 16, border: "1px solid rgba(255,255,255,0.09)", boxShadow: "0 4px 24px rgba(0,0,0,0.25)" },
  chip: (active) => ({ padding: "7px 14px", borderRadius: 20, border: `1.5px solid ${active ? "#FF2A2A" : "rgba(255,255,255,0.15)"}`, background: active ? "rgba(255,42,42,0.15)" : "rgba(255,255,255,0.05)", color: active ? "#FF2A2A" : "rgba(255,255,255,0.6)", fontSize: 12, fontWeight: 600, cursor: "pointer", transition: "all 0.15s" }),
};

const MOCK_PROFILES = [
  { id: 1, name: "Marcus Reid", age: 28, gender: "Male", level: "Advanced", gym: "PureGym Shoreditch", bio: "5 days a week lifter. Love hypertrophy and powerlifting.", score: 91, avatar: "MR", color: "#FF6B6B", lookingFor: "Long-term training partner", days: ["Mon", "Wed", "Fri"] },
  { id: 2, name: "Jade Thompson", age: 25, gender: "Female", level: "Intermediate", gym: "Fitness First Canary Wharf", bio: "CrossFit enthusiast + yoga. Happy to train with anyone positive!", score: 76, avatar: "JT", color: "#4ECDC4", lookingFor: "GymLink for Today", days: ["Tue", "Thu", "Sat"] },
  { id: 3, name: "Darius Osei", age: 31, gender: "Male", level: "Pro", gym: "The Gym Group Brixton", bio: "Personal best chaser. Former rugby player. Powerlifting focus.", score: 88, avatar: "DO", color: "#A78BFA", lookingFor: "Long-term training partner", days: ["Mon", "Tue", "Thu", "Sat"] },
  { id: 4, name: "Amara Diallo", age: 22, gender: "Female", level: "Beginner", gym: "Nuffield Health Islington", bio: "Just started my fitness journey! Looking for a supportive partner.", score: 65, avatar: "AD", color: "#FCA5A5", lookingFor: "GymLink for Future Date", days: ["Wed", "Fri"] },
  { id: 5, name: "Leo Marchetti", age: 34, gender: "Male", level: "Intermediate", gym: "Better Gym Hackney", bio: "Calisthenics and HIIT. Let's grind together!", score: 83, avatar: "LM", color: "#34D399", lookingFor: "GymLink for Today", days: ["Mon", "Wed", "Fri", "Sun"] },
];

const MOCK_TRAINERS = [
  { id: 101, name: "Serena Blake", specialty: ["Weight Loss", "HIIT", "Strength"], gym: "PureGym Victoria", rating: 4.9, reviews: 47, bio: "10 years experience. Certified PT and nutrition coach.", avatar: "SB", color: "#F472B6", price: "£55/hr", verified: true },
  { id: 102, name: "Kwame Asante", specialty: ["Powerlifting", "Bodybuilding", "Sports Conditioning"], gym: "Anytime Fitness Clapham", rating: 4.8, reviews: 31, bio: "Ex-athlete, UKSCA qualified. Strength and athletic performance.", avatar: "KA", color: "#60A5FA", price: "£65/hr", verified: true },
  { id: 103, name: "Priya Nair", specialty: ["Yoga", "Pilates", "Mobility"], gym: "Nuffield Health Marylebone", rating: 5.0, reviews: 22, bio: "Holistic movement specialist. Mind-body approach to fitness.", avatar: "PN", color: "#A78BFA", price: "£50/hr", verified: true },
];

const MOCK_MATCHES = [
  { id: 1, name: "Marcus Reid", avatar: "MR", color: "#FF6B6B", lastMsg: "Sounds good! See you at 6pm 💪", time: "2m", unread: 2 },
  { id: 2, name: "Jade Thompson", avatar: "JT", color: "#4ECDC4", lastMsg: "What days work for you?", time: "1h", unread: 0 },
];

const WORKOUT_HISTORY = [
  { date: "Mon 25 Mar", partner: "Marcus Reid", gym: "PureGym Shoreditch", outcome: "attended" },
  { date: "Fri 21 Mar", partner: "Jade Thompson", gym: "Fitness First Canary Wharf", outcome: "attended" },
  { date: "Wed 19 Mar", partner: "Leo Marchetti", gym: "Better Gym Hackney", outcome: "cancelled" },
  { date: "Mon 17 Mar", partner: "Darius Osei", gym: "The Gym Group Brixton", outcome: "attended" },
  { date: "Fri 14 Mar", partner: "Amara Diallo", gym: "Nuffield Health Islington", outcome: "no-show" },
];

const LONDON_GYMS = [
  "PureGym Shoreditch", "PureGym Victoria", "PureGym Elephant & Castle",
  "Fitness First Canary Wharf", "Fitness First Oxford Circus",
  "The Gym Group Brixton", "The Gym Group Stratford",
  "Better Gym Hackney", "Better Gym Lewisham",
  "Nuffield Health Islington", "Nuffield Health Marylebone",
  "Anytime Fitness Clapham", "Anytime Fitness Wimbledon",
  "Virgin Active Barbican", "David Lloyd Finchley",
  "JD Gyms Whitechapel", "KOBOX Boxing Gym",
  "Barry's Bootcamp London Bridge",
];

const WORKOUT_TYPES = ["HIIT", "Strength", "Cardio", "Yoga", "Pilates", "Bootcamp", "Boxing", "CrossFit", "Mobility", "Other"];

const NEARBY_GYMS_BY_POSTCODE = {
  default: [
    { name: "PureGym Shoreditch", distance: "0.3 miles", matches: 12, levels: { Advanced: 4, Intermediate: 6, Beginner: 2 } },
    { name: "Better Gym Hackney", distance: "0.8 miles", matches: 8, levels: { Advanced: 2, Intermediate: 4, Beginner: 2 } },
    { name: "The Gym Group Stratford", distance: "1.2 miles", matches: 5, levels: { Advanced: 1, Intermediate: 3, Beginner: 1 } },
    { name: "Nuffield Health Islington", distance: "1.5 miles", matches: 9, levels: { Advanced: 3, Intermediate: 4, Beginner: 2 } },
    { name: "Fitness First Canary Wharf", distance: "2.1 miles", matches: 6, levels: { Advanced: 2, Intermediate: 3, Beginner: 1 } },
  ],
  E: [
    { name: "PureGym Shoreditch", distance: "0.2 miles", matches: 14, levels: { Advanced: 5, Intermediate: 7, Beginner: 2 } },
    { name: "JD Gyms Whitechapel", distance: "0.4 miles", matches: 9, levels: { Advanced: 3, Intermediate: 4, Beginner: 2 } },
    { name: "Better Gym Hackney", distance: "0.9 miles", matches: 7, levels: { Advanced: 2, Intermediate: 3, Beginner: 2 } },
    { name: "Fitness First Canary Wharf", distance: "1.8 miles", matches: 11, levels: { Advanced: 4, Intermediate: 5, Beginner: 2 } },
    { name: "The Gym Group Stratford", distance: "1.4 miles", matches: 4, levels: { Advanced: 1, Intermediate: 2, Beginner: 1 } },
  ],
  SW: [
    { name: "Anytime Fitness Clapham", distance: "0.4 miles", matches: 10, levels: { Advanced: 3, Intermediate: 5, Beginner: 2 } },
    { name: "PureGym Elephant & Castle", distance: "0.7 miles", matches: 7, levels: { Advanced: 2, Intermediate: 4, Beginner: 1 } },
    { name: "Virgin Active Barbican", distance: "1.6 miles", matches: 8, levels: { Advanced: 3, Intermediate: 3, Beginner: 2 } },
    { name: "Anytime Fitness Wimbledon", distance: "1.1 miles", matches: 5, levels: { Advanced: 1, Intermediate: 3, Beginner: 1 } },
    { name: "David Lloyd Finchley", distance: "2.3 miles", matches: 4, levels: { Advanced: 1, Intermediate: 2, Beginner: 1 } },
  ],
  N: [
    { name: "Nuffield Health Islington", distance: "0.3 miles", matches: 11, levels: { Advanced: 4, Intermediate: 5, Beginner: 2 } },
    { name: "David Lloyd Finchley", distance: "1.2 miles", matches: 8, levels: { Advanced: 3, Intermediate: 3, Beginner: 2 } },
    { name: "PureGym Victoria", distance: "0.9 miles", matches: 6, levels: { Advanced: 2, Intermediate: 3, Beginner: 1 } },
    { name: "The Gym Group Brixton", distance: "2.0 miles", matches: 7, levels: { Advanced: 2, Intermediate: 4, Beginner: 1 } },
    { name: "Better Gym Lewisham", distance: "1.8 miles", matches: 5, levels: { Advanced: 1, Intermediate: 3, Beginner: 1 } },
  ],
  W: [
    { name: "Virgin Active Barbican", distance: "0.5 miles", matches: 9, levels: { Advanced: 3, Intermediate: 4, Beginner: 2 } },
    { name: "Fitness First Oxford Circus", distance: "0.8 miles", matches: 12, levels: { Advanced: 5, Intermediate: 5, Beginner: 2 } },
    { name: "PureGym Victoria", distance: "1.1 miles", matches: 7, levels: { Advanced: 2, Intermediate: 3, Beginner: 2 } },
    { name: "KOBOX Boxing Gym", distance: "1.4 miles", matches: 5, levels: { Advanced: 2, Intermediate: 2, Beginner: 1 } },
    { name: "Nuffield Health Marylebone", distance: "0.6 miles", matches: 8, levels: { Advanced: 3, Intermediate: 3, Beginner: 2 } },
  ],
  SE: [
    { name: "The Gym Group Brixton", distance: "0.4 miles", matches: 10, levels: { Advanced: 3, Intermediate: 5, Beginner: 2 } },
    { name: "Better Gym Lewisham", distance: "0.9 miles", matches: 6, levels: { Advanced: 2, Intermediate: 3, Beginner: 1 } },
    { name: "PureGym Elephant & Castle", distance: "1.2 miles", matches: 8, levels: { Advanced: 3, Intermediate: 4, Beginner: 1 } },
    { name: "Barry's Bootcamp London Bridge", distance: "1.5 miles", matches: 7, levels: { Advanced: 3, Intermediate: 3, Beginner: 1 } },
    { name: "Anytime Fitness Clapham", distance: "2.0 miles", matches: 5, levels: { Advanced: 1, Intermediate: 3, Beginner: 1 } },
  ],
};




// ── TAPPABLE DATE/TIME PICKER ─────────────────────────────────────────────────
function PickerField({ label, type, value, onChange, min, max }) {
  const id = "pf-" + type + "-" + (label || "").replace(/\s/g,"");
  return (
    <div>
      {label && <label htmlFor={id} style={styles.label}>{label}</label>}
      <input
        id={id}
        type={type}
        value={value}
        onChange={onChange}
        min={min}
        max={max}
        style={{ ...styles.input, colorScheme: "dark", WebkitAppearance: "auto", cursor: "pointer", width: "100%" }}
      />
    </div>
  );
}

// ── HELPERS ───────────────────────────────────────────────────────────────────
function Avatar({ initials, color, size = 48 }) {
  return (
    <div style={{ width: size, height: size, borderRadius: size / 2, background: color || "#2F6DFF", display: "flex", alignItems: "center", justifyContent: "center", color: "#fff", fontWeight: 700, fontSize: size * 0.33, flexShrink: 0 }}>{initials}</div>
  );
}

function ScoreBadge({ score }) {
  const cat = score >= 80 ? { label: "Very Reliable", color: "#22C55E" } : score >= 60 ? { label: "Reliable", color: "#2F6DFF" } : score >= 40 ? { label: "Inconsistent", color: C.warning } : { label: "Low Reliability", color: C.danger };
  return (
    <div style={{ display: "flex", flexDirection: "column", alignItems: "center", gap: 4 }}>
      <div style={{ background: "rgba(255,255,255,0.08)", border: "1px solid rgba(255,255,255,0.15)", borderRadius: 12, padding: "6px 14px", display: "flex", alignItems: "center", gap: 8 }}>
        <span style={{ fontSize: 16, fontWeight: 800, color: "#FFFFFF" }}>{score}</span>
        <span style={{ fontSize: 11, color: cat.color, fontWeight: 600 }}>/ 100</span>
      </div>
      <span style={{ fontSize: 11, color: "rgba(255,255,255,0.6)", fontWeight: 600 }}>{cat.label}</span>
    </div>
  );
}

function VerifiedBadge() {
  return <span style={{ background: "rgba(34,197,94,0.15)", color: "#22C55E", fontSize: 10, fontWeight: 700, padding: "3px 9px", borderRadius: 8, border: "1px solid rgba(34,197,94,0.3)", letterSpacing: "0.5px" }}>✓ Verified</span>;
}

function StarRating({ rating }) {
  return <span style={{ color: "#F59E0B", fontWeight: 700, fontSize: 14 }}>{"★".repeat(Math.round(rating))}{"☆".repeat(5 - Math.round(rating))} <span style={{ color: "rgba(255,255,255,0.4)", fontWeight: 400 }}>{rating}</span></span>;
}

function TopBar({ title, onBack, rightAction }) {
  return (
    <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", padding: "16px 20px 12px", background: "rgba(8,26,58,0.95)", borderBottom: "1px solid rgba(255,255,255,0.08)", position: "sticky", top: 0, zIndex: 10, backdropFilter: "blur(10px)" }}>
      <div style={{ width: 40 }}>{onBack && <button onClick={onBack} style={{ background: "none", border: "none", cursor: "pointer", fontSize: 22, color: "#FFFFFF", padding: 0, display: "flex", alignItems: "center" }}>←</button>}</div>
      <span style={{ fontSize: 16, fontWeight: 700, color: "#FFFFFF" }}>{title}</span>
      <div style={{ width: 40, display: "flex", justifyContent: "flex-end" }}>{rightAction}</div>
    </div>
  );
}

function BottomNav({ tab, setTab, isTrainer, unreadCount }) {
  const items = isTrainer
    ? [{ id: "discover", icon: "🏋️", label: "Dashboard" }, { id: "notifications", icon: "🔔", label: "Alerts" }, { id: "profile", icon: "👤", label: "Profile" }]
    : [{ id: "discover", icon: "🔍", label: "Discover" }, { id: "matches", icon: "💬", label: "Matches" }, { id: "requests", icon: "📅", label: "Requests" }, { id: "notifications", icon: "🔔", label: "Alerts" }, { id: "profile", icon: "👤", label: "Profile" }];
  return (
    <div style={{ position: "fixed", bottom: 0, left: "50%", transform: "translateX(-50%)", width: "100%", maxWidth: 430, background: "rgba(4,14,34,0.97)", borderTop: "1px solid rgba(255,255,255,0.08)", display: "flex", justifyContent: "space-around", padding: "8px 0 20px", zIndex: 100, boxShadow: "0 -4px 20px rgba(0,0,0,0.06)" }}>
      {items.map(it => (
        <button key={it.id} onClick={() => setTab(it.id)} style={{ display: "flex", flexDirection: "column", alignItems: "center", gap: 3, background: "none", border: "none", cursor: "pointer", padding: "4px 12px", flex: 1, position: "relative" }}>
          <div style={{ position: "relative" }}>
            <span style={{ fontSize: 22 }}>{it.icon}</span>
            {it.id === "notifications" && unreadCount > 0 && (
              <div style={{ position: "absolute", top: -4, right: -6, background: "#FF2A2A", color: "#fff", width: 16, height: 16, borderRadius: 8, fontSize: 9, fontWeight: 800, display: "flex", alignItems: "center", justifyContent: "center", border: "2px solid #fff" }}>{unreadCount > 9 ? "9+" : unreadCount}</div>
            )}
          </div>
          <span style={{ fontSize: 10, fontWeight: tab === it.id ? 700 : 500, color: tab === it.id ? '#FF2A2A' : 'rgba(255,255,255,0.4)', letterSpacing: 0.3 }}>{it.label}</span>
          {tab === it.id && <div style={{ width: 16, height: 2, borderRadius: 1, background: '#FF2A2A', marginTop: 1 }} />}
        </button>
      ))}
    </div>
  );
}

// ── SAFETY POLICY SCREEN ─────────────────────────────────────────────────────
function SafetyPolicyScreen({ onBack }) {
  const [showReport, setShowReport] = useState(false);
  const [reportForm, setReportForm] = useState({ target: "", description: "", file: null, fileName: "" });
  const [reportSubmitted, setReportSubmitted] = useState(false);
  const reportFileRef = useRef();

  const sections = [
    { icon: "🏟️", title: "Meeting Guidelines", color: "#2F6DFF", intro: "We strongly advise all users to:", bullets: ["Arrange to meet inside a gym or public fitness facility", "Avoid meeting in private or unfamiliar locations", "Inform someone you trust about your plans if needed"], note: "GymLink is designed to facilitate connections within safe, public environments, and we encourage all interactions to begin and remain within those spaces." },
    { icon: "💬", title: "Communication Outside the Platform", color: "#F59E0B", intro: "While users may choose to exchange personal contact details, please note:", bullets: ["This is done entirely at your own discretion", "GymLink does not monitor or control communication outside the app", "We are not responsible for any interactions or outcomes outside the platform"] },
    { icon: "🤝", title: "User Responsibility", color: "#7C3AED", intro: "By using GymLink, you agree to:", bullets: ["Act respectfully and responsibly towards other users", "Use your own judgement when meeting others", "Report any suspicious or inappropriate behaviour through the app"] },
    { icon: "🚩", title: "Reporting & Support", color: "#FF2A2A", intro: null, bullets: [], note: "If you experience or witness any concerning behaviour, you can report it through the app. All reports will be reviewed and appropriate action will be taken." },
  ];

  return (
    <div style={{ ...styles.screen, background: "rgba(255,255,255,0.04)" }}>
      <div style={{ background: "rgba(255,255,255,0.06)", padding: "50px 20px 16px", borderBottom: "1px solid rgba(255,255,255,0.08)", display: "flex", alignItems: "center", gap: 12 }}>
        <button onClick={onBack} style={{ background: "none", border: "none", fontSize: 22, cursor: "pointer", color: "#FFFFFF" }}>←</button>
        <div style={{ flex: 1 }}>
          <h2 style={{ margin: 0, fontSize: 18, fontWeight: 800 }}>Safety & Reporting</h2>
          <p style={{ margin: 0, fontSize: 12, color: "rgba(255,255,255,0.55)" }}>GymLink Safety & Responsibility Policy</p>
        </div>
        <span style={{ fontSize: 22 }}>🛡️</span>
      </div>

      <div style={{ flex: 1, overflow: "auto", padding: "20px 16px 40px" }}>
        <div style={{ background: `linear-gradient(135deg, ${"#2F6DFF"}15, ${"#2F6DFF"}05)`, border: `1.5px solid ${"#2F6DFF"}25`, borderRadius: 20, padding: "18px", marginBottom: 20 }}>
          <div style={{ display: "flex", alignItems: "center", gap: 10, marginBottom: 10 }}>
            <span style={{ fontSize: 22 }}>🛡️</span>
            <h3 style={{ margin: 0, fontSize: 16, fontWeight: 800, color: "#2F6DFF" }}>GymLink Safety & Responsibility Policy</h3>
          </div>
          <p style={{ margin: 0, fontSize: 14, color: "#FFFFFF", lineHeight: 1.7 }}>At GymLink, your safety is our priority. We are committed to creating a secure and respectful environment where users can find training partners and connect through fitness. To support this, we require identity verification for all users.</p>
          <p style={{ margin: "10px 0 0", fontSize: 14, color: "rgba(255,255,255,0.55)", fontStyle: "italic" }}>However, it is important to understand the following:</p>
        </div>

        {sections.map((s, i) => (
          <div key={i} style={{ background: "rgba(255,255,255,0.06)", borderRadius: 18, padding: "18px", marginBottom: 12, border: "1.5px solid rgba(255,255,255,0.12)" }}>
            <div style={{ display: "flex", alignItems: "center", gap: 10, marginBottom: 12 }}>
              <div style={{ width: 38, height: 38, borderRadius: 12, background: s.color + "15", display: "flex", alignItems: "center", justifyContent: "center", fontSize: 18, flexShrink: 0 }}>{s.icon}</div>
              <h4 style={{ margin: 0, fontSize: 15, fontWeight: 800, color: "#FFFFFF" }}>{s.title}</h4>
            </div>
            {s.intro && <p style={{ margin: "0 0 10px", fontSize: 13, color: "rgba(255,255,255,0.55)", lineHeight: 1.6 }}>{s.intro}</p>}
            {s.bullets.length > 0 && (
              <div style={{ display: "flex", flexDirection: "column", gap: 8, marginBottom: s.note ? 12 : 0 }}>
                {s.bullets.map((b, bi) => (
                  <div key={bi} style={{ display: "flex", alignItems: "flex-start", gap: 10 }}>
                    <div style={{ width: 6, height: 6, borderRadius: 3, background: s.color, flexShrink: 0, marginTop: 6 }} />
                    <span style={{ fontSize: 13, color: "#FFFFFF", lineHeight: 1.6 }}>{b}</span>
                  </div>
                ))}
              </div>
            )}
            {s.note && <div style={{ background: s.color + "10", border: `1px solid ${s.color}20`, borderRadius: 10, padding: "10px 12px" }}><p style={{ margin: 0, fontSize: 13, color: "#FFFFFF", lineHeight: 1.6 }}>{s.note}</p></div>}
          </div>
        ))}

        <div style={{ background: C.text, borderRadius: 18, padding: "18px 20px", marginBottom: 20 }}>
          <p style={{ margin: "0 0 10px", fontSize: 13, color: "rgba(255,255,255,0.75)", lineHeight: 1.7 }}>GymLink provides tools to help people connect through fitness, but personal safety ultimately relies on individual awareness and responsibility.</p>
          <p style={{ margin: 0, fontSize: 15, fontWeight: 800, color: "#FFFFFF" }}>Train smart. Stay safe. Respect others.</p>
        </div>

        <button onClick={() => { setShowReport(true); setReportSubmitted(false); setReportForm({ target: "", description: "", file: null, fileName: "" }); }} style={{ width: "100%", display: "flex", alignItems: "center", gap: 14, background: "rgba(255,255,255,0.06)", border: `2px solid ${C.danger}30`, borderRadius: 18, padding: "16px 18px", cursor: "pointer" }}>
          <div style={{ width: 44, height: 44, borderRadius: 14, background: "#FEF2F2", display: "flex", alignItems: "center", justifyContent: "center", fontSize: 22, flexShrink: 0 }}>🚨</div>
          <div style={{ textAlign: "left", flex: 1 }}>
            <div style={{ fontWeight: 800, fontSize: 15, color: C.danger }}>Report an Incident</div>
            <div style={{ fontSize: 12, color: "rgba(255,255,255,0.55)", marginTop: 2 }}>All reports are reviewed confidentially</div>
          </div>
          <span style={{ color: "rgba(255,255,255,0.55)", fontSize: 20 }}>›</span>
        </button>
      </div>

      {showReport && (
        <div style={{ position: "fixed", inset: 0, background: "rgba(0,0,0,0.5)", zIndex: 400, display: "flex", alignItems: "flex-end" }} onClick={() => !reportSubmitted && setShowReport(false)}>
          <div onClick={e => e.stopPropagation()} style={{ background: "rgba(255,255,255,0.06)", borderRadius: "24px 24px 0 0", width: "100%", maxWidth: 430, margin: "0 auto", maxHeight: "90vh", overflow: "auto", padding: "24px 24px 48px" }}>
            <div style={{ display: "flex", justifyContent: "center", marginBottom: 20 }}><div style={{ width: 40, height: 4, borderRadius: 2, background: "rgba(255,255,255,0.12)" }} /></div>
            {reportSubmitted ? (
              <div style={{ textAlign: "center" }}>
                <div style={{ width: 72, height: 72, borderRadius: 22, background: "#22C55E" + "15", display: "flex", alignItems: "center", justifyContent: "center", fontSize: 34, margin: "0 auto 20px" }}>✅</div>
                <h3 style={{ margin: "0 0 8px", fontSize: 20, fontWeight: 800 }}>Report submitted</h3>
                <p style={{ margin: "0 0 24px", fontSize: 14, color: "rgba(255,255,255,0.55)" }}>Our team will review this confidentially and take appropriate action.</p>
                <button style={{ ...styles.btn(), borderRadius: 14 }} onClick={() => setShowReport(false)}>Done</button>
              </div>
            ) : (
              <>
                <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", marginBottom: 20 }}>
                  <div><h3 style={{ margin: "0 0 4px", fontSize: 19, fontWeight: 800 }}>🚨 Report an Incident</h3><p style={{ margin: 0, fontSize: 13, color: "rgba(255,255,255,0.55)" }}>All reports are reviewed confidentially</p></div>
                  <button onClick={() => setShowReport(false)} style={{ background: "rgba(255,255,255,0.04)", border: "none", borderRadius: 10, width: 32, height: 32, cursor: "pointer", fontSize: 16, display: "flex", alignItems: "center", justifyContent: "center", flexShrink: 0 }}>✕</button>
                </div>
                <div style={{ display: "flex", flexDirection: "column", gap: 16 }}>
                  <div>
                    <label style={styles.label}>Who are you reporting?</label>
                    <select style={styles.input} value={reportForm.target} onChange={e => setReportForm(f => ({ ...f, target: e.target.value }))}>
                      <option value="">Select a user or class…</option>
                      <optgroup label="Users"><option value="u1">Marcus Reid</option><option value="u2">Jade Thompson</option><option value="u3">Darius Osei</option><option value="u4">Amara Diallo</option><option value="other">Other user…</option></optgroup>
                      <optgroup label="Classes"><option value="c1">Morning HIIT Bootcamp</option><option value="c2">Strength & Conditioning</option></optgroup>
                    </select>
                  </div>
                  <div>
                    <label style={styles.label}>What happened?</label>
                    <textarea style={{ ...styles.input, minHeight: 110, resize: "none", lineHeight: 1.5 }} placeholder="Please describe the incident in as much detail as possible." value={reportForm.description} onChange={e => setReportForm(f => ({ ...f, description: e.target.value }))} />
                  </div>
                  <div>
                    <label style={styles.label}>Evidence (optional)</label>
                    <input ref={reportFileRef} type="file" accept="image/*,video/*" style={{ display: "none" }} onChange={e => { const f = e.target.files[0]; if (f) setReportForm(rf => ({ ...rf, file: f, fileName: f.name })); }} />
                    {reportForm.fileName
                      ? <div style={{ display: "flex", alignItems: "center", gap: 10, background: "rgba(47,109,255,0.12)", borderRadius: 12, padding: "10px 14px" }}><span style={{ fontSize: 18 }}>📎</span><span style={{ fontSize: 13, color: "#2F6DFF", fontWeight: 600, flex: 1 }}>{reportForm.fileName}</span><button onClick={() => setReportForm(f => ({ ...f, file: null, fileName: "" }))} style={{ background: "none", border: "none", cursor: "pointer", color: "rgba(255,255,255,0.55)", fontSize: 16 }}>✕</button></div>
                      : <button onClick={() => reportFileRef.current.click()} style={{ width: "100%", padding: "14px", borderRadius: 12, border: `2px dashed ${"rgba(255,255,255,0.1)"}`, background: "rgba(255,255,255,0.04)", cursor: "pointer", color: "rgba(255,255,255,0.55)", fontSize: 13, fontWeight: 600 }}>📷 Upload screenshot (optional)</button>
                    }
                  </div>
                  <div style={{ background: "#FFF7ED", border: "1px solid #FED7AA", borderRadius: 12, padding: "12px 14px", display: "flex", gap: 8 }}>
                    <span style={{ fontSize: 16, flexShrink: 0 }}>⚠️</span>
                    <p style={{ margin: 0, fontSize: 12, color: "#F59E0B", lineHeight: 1.5 }}>If you are in immediate danger, please contact emergency services. GymLink reports are not monitored in real time.</p>
                  </div>
                  <button style={{ ...styles.btn("danger"), borderRadius: 14, padding: "15px 24px", opacity: reportForm.target && reportForm.description ? 1 : 0.45 }} onClick={() => { if (reportForm.target && reportForm.description) setReportSubmitted(true); }} disabled={!reportForm.target || !reportForm.description}>Submit Report</button>
                </div>
              </>
            )}
          </div>
        </div>
      )}
    </div>
  );
}

// ── NOTIFICATIONS SCREEN ─────────────────────────────────────────────────────
function NotificationsScreen({ notifications, onRead, onReadAll, isTrainer }) {
  const [pushEnabled, setPushEnabled] = useState(false);
  const [filter, setFilter] = useState("all");

  const typeConfig = {
    joined: { icon: "🎉", color: "#22C55E", label: "Join" },
    enquiry: { icon: "💬", color: "#2F6DFF", label: "Enquiry" },
    updated: { icon: "✏️", color: "#F59E0B", label: "Update" },
    cancelled: { icon: "🚫", color: "#FF2A2A", label: "Cancel" },
    message: { icon: "📣", color: "#7C3AED", label: "Message" },
    match: { icon: "💪", color: "#2F6DFF", label: "Match" },
    reminder: { icon: "⏰", color: "#F59E0B", label: "Reminder" },
  };

  const filtered = filter === "all" ? notifications : filter === "unread" ? notifications.filter(n => !n.read) : notifications.filter(n => n.type === filter);
  const unread = notifications.filter(n => !n.read).length;

  return (
    <div style={{ ...styles.screen, paddingBottom: 90 }}>
      <div style={{ background: "rgba(255,255,255,0.06)", padding: "50px 20px 0", borderBottom: "1px solid rgba(255,255,255,0.08)" }}>
        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", paddingBottom: 14 }}>
          <div>
            <h2 style={{ margin: 0, fontSize: 22, fontWeight: 900 }}>Notifications</h2>
            {unread > 0 && <p style={{ margin: "2px 0 0", fontSize: 13, color: "rgba(255,255,255,0.55)" }}>{unread} unread</p>}
          </div>
          {unread > 0 && <button onClick={onReadAll} style={{ background: "rgba(47,109,255,0.12)", border: "none", borderRadius: 10, padding: "6px 12px", cursor: "pointer", color: "#2F6DFF", fontWeight: 700, fontSize: 12 }}>Mark all read</button>}
        </div>
        <div style={{ display: "flex", gap: 6, overflowX: "auto", paddingBottom: 12, flexWrap: "nowrap", msOverflowStyle: "none", scrollbarWidth: "none" }}>
          {[{ id: "all", label: "All" }, { id: "unread", label: `Unread${unread > 0 ? ` (${unread})` : ""}` },
            ...(isTrainer ? [{ id: "joined", label: "Joins" }, { id: "enquiry", label: "Enquiries" }, { id: "updated", label: "Updates" }, { id: "message", label: "Messages" }]
              : [{ id: "updated", label: "Updates" }, { id: "match", label: "Matches" }, { id: "reminder", label: "Reminders" }])
          ].map(f => (
            <div key={f.id} onClick={() => setFilter(f.id)} style={{ padding: "6px 14px", borderRadius: 20, whiteSpace: "nowrap", background: filter === f.id ? "#FF2A2A" : "rgba(255,255,255,0.05)", color: filter === f.id ? "#fff" : "rgba(255,255,255,0.5)", fontSize: 12, fontWeight: 700, cursor: "pointer", border: `1.5px solid ${filter === f.id ? "#2F6DFF" : "rgba(255,255,255,0.1)"}`, flexShrink: 0 }}>{f.label}</div>
          ))}
        </div>
      </div>

      <div style={{ background: "rgba(255,255,255,0.06)", margin: "12px 16px 0", borderRadius: 16, padding: "14px 16px", border: "1px solid rgba(255,255,255,0.09)", display: "flex", alignItems: "center", gap: 12 }}>
        <div style={{ width: 40, height: 40, borderRadius: 12, background: pushEnabled ? "rgba(47,109,255,0.15)" : "rgba(255,255,255,0.04)", display: "flex", alignItems: "center", justifyContent: "center", fontSize: 20, flexShrink: 0 }}>🔔</div>
        <div style={{ flex: 1 }}><div style={{ fontWeight: 700, fontSize: 14 }}>Push Notifications</div><div style={{ fontSize: 12, color: "rgba(255,255,255,0.55)" }}>Get alerts even when app is closed</div></div>
        <div onClick={() => setPushEnabled(v => !v)} style={{ width: 48, height: 28, borderRadius: 14, cursor: "pointer", background: pushEnabled ? "#2F6DFF" : "rgba(255,255,255,0.1)", position: "relative", transition: "background 0.2s", flexShrink: 0 }}>
          <div style={{ width: 22, height: 22, borderRadius: 11, background: "#fff", position: "absolute", top: 3, left: pushEnabled ? 23 : 3, transition: "left 0.2s", boxShadow: "0 1px 4px rgba(0,0,0,0.2)" }} />
        </div>
      </div>

      <div style={{ padding: "12px 16px", display: "flex", flexDirection: "column", gap: 8 }}>
        {filtered.length === 0
          ? <div style={{ textAlign: "center", padding: "60px 20px", color: "rgba(255,255,255,0.55)" }}><div style={{ fontSize: 52, marginBottom: 12 }}>🔕</div><p style={{ margin: 0, fontWeight: 600, fontSize: 15 }}>No notifications here</p><p style={{ margin: "6px 0 0", fontSize: 13 }}>You're all caught up!</p></div>
          : filtered.map(n => {
            const cfg = typeConfig[n.type] || { icon: "📌", color: "rgba(255,255,255,0.55)", label: "Info" };
            return (
              <div key={n.id} onClick={() => onRead(n.id)} style={{ background: n.read ? "rgba(255,255,255,0.04)" : "rgba(47,109,255,0.1)", border: `1.5px solid ${n.read ? "rgba(255,255,255,0.08)" : "rgba(47,109,255,0.35)"}`, borderRadius: 16, padding: "14px 16px", cursor: "pointer", display: "flex", gap: 14, alignItems: "flex-start", position: "relative", transition: "all 0.2s" }}>
                {!n.read && <div style={{ position: "absolute", top: 14, right: 14, width: 8, height: 8, borderRadius: 4, background: "#FF2A2A" }} />}
                <div style={{ width: 44, height: 44, borderRadius: 14, background: cfg.color + "18", border: `1.5px solid ${cfg.color}25`, display: "flex", alignItems: "center", justifyContent: "center", fontSize: 20, flexShrink: 0 }}>{cfg.icon}</div>
                <div style={{ flex: 1, paddingRight: 16 }}>
                  <div style={{ display: "flex", alignItems: "center", gap: 6, marginBottom: 4 }}>
                    <span style={{ background: cfg.color + "18", color: cfg.color, fontSize: 10, fontWeight: 800, padding: "2px 7px", borderRadius: 6, letterSpacing: 0.3, textTransform: "uppercase" }}>{cfg.label}</span>
                    <span style={{ fontSize: 11, color: "rgba(255,255,255,0.55)" }}>{n.time}</span>
                  </div>
                  <p style={{ margin: "0 0 2px", fontWeight: n.read ? 500 : 700, fontSize: 14, color: "#FFFFFF", lineHeight: 1.4 }}>{n.title}</p>
                  {n.body && <p style={{ margin: 0, fontSize: 13, color: "rgba(255,255,255,0.55)", lineHeight: 1.4 }}>{n.body}</p>}
                </div>
              </div>
            );
          })}
      </div>
    </div>
  );
}

// ── SPLASH ────────────────────────────────────────────────────────────────────
function SplashScreen({ onNext }) {
  return (
    <div style={{ ...styles.screen, alignItems: "center", justifyContent: "center", position: "relative", overflow: "hidden" }}>
      <div style={{ position: "absolute", top: 0, right: 0, width: 320, height: 320, borderRadius: "50%", background: "radial-gradient(circle,rgba(47,109,255,0.2) 0%,transparent 70%)", pointerEvents: "none" }} />
      <div style={{ position: "absolute", bottom: 0, left: 0, width: 280, height: 280, borderRadius: "50%", background: "radial-gradient(circle,rgba(255,42,42,0.07) 0%,transparent 70%)", pointerEvents: "none" }} />
      <div style={{ textAlign: "center", zIndex: 1, padding: "0 32px", display: "flex", flexDirection: "column", alignItems: "center" }}>
        <div style={{ position: "relative", marginBottom: 12 }}>
          <div style={{ position: "absolute", top: "50%", left: "50%", transform: "translate(-50%,-50%)", width: 240, height: 180, background: "radial-gradient(ellipse,rgba(47,109,255,0.35) 0%,transparent 70%)", pointerEvents: "none" }} />
          <img src={gymlinkLogo} alt="GymLink" style={{ width: 220, position: "relative", zIndex: 1, filter: "drop-shadow(0 0 24px rgba(47,109,255,0.4))" }} />
        </div>
        <div style={{ display: "flex", alignItems: "center", gap: 10, marginBottom: 12 }}>
          <div style={{ width: 28, height: 1.5, background: "#FF2A2A", borderRadius: 1 }} />
          <p style={{ color: "rgba(255,255,255,0.35)", fontSize: 9, fontWeight: 600, letterSpacing: 3.5, textTransform: "uppercase", margin: 0 }}>Train Together. Stay Consistent.</p>
          <div style={{ width: 28, height: 1.5, background: "#FF2A2A", borderRadius: 1 }} />
        </div>
      </div>
      <div style={{ position: "absolute", bottom: 0, left: 0, right: 0, padding: "32px 28px 52px", zIndex: 1 }}>
        <button onClick={() => onNext("login")} style={{ width: "100%", padding: "16px 24px", borderRadius: 14, border: "none", background: "#FF2A2A", color: "#fff", fontSize: 15, fontWeight: 800, cursor: "pointer", letterSpacing: 1.5, boxShadow: "0 8px 32px rgba(255,42,42,0.4)" }}>
          SIGN IN
        </button>
        <p style={{ color: "rgba(255,255,255,0.25)", fontSize: 10, textAlign: "center", margin: "16px 0 0", fontWeight: 600, letterSpacing: 2 }}>SAFE · VERIFIED · TRUSTED</p>
      </div>
    </div>
  );
}

// ── LOGIN — unified: inline account type + credentials in one screen ───────────
function LoginScreen({ onBack, onLogin, accountType: initialAccountType }) {
  const [accountType, setAccountType] = useState(initialAccountType || null);
  const [email, setEmail] = useState("");
  const [pass, setPass] = useState("");
  const [showPass, setShowPass] = useState(false);
  const [err, setErr] = useState("");
  const [showForgot, setShowForgot] = useState(false);
  const [forgotEmail, setForgotEmail] = useState("");
  const [forgotState, setForgotState] = useState("idle");

  const isTrainer = accountType === "trainer";
  const accentColor = isTrainer ? "#7C3AED" : "#2F6DFF";

  const handle = () => {
    if (!accountType) { setErr("Please select your account type first."); return; }
    if (!email || !pass) { setErr("Please fill in all fields."); return; }
    setErr("");
    onLogin({ email, accountType });
  };

  const handleForgot = () => {
    if (!forgotEmail || !forgotEmail.includes("@")) { setForgotState("error"); return; }
    setForgotState("sending");
    setTimeout(() => setForgotState("sent"), 1400);
  };
  const closeForgot = () => { setShowForgot(false); setForgotEmail(""); setForgotState("idle"); };

  return (
    <div style={styles.screen}>
      <div style={{ height: 5, background: `linear-gradient(90deg, ${accountType ? accentColor : "#2F6DFF"}, ${isTrainer ? "#A855F7" : "#2F6DFF"})` }} />
      <div style={{ padding: "36px 24px 40px", flex: 1, overflow: "auto" }}>
        <button onClick={onBack} style={{ background: "none", border: "none", fontSize: 22, cursor: "pointer", marginBottom: 24, padding: 0, display: "flex", alignItems: "center", gap: 6, color: "#FFFFFF" }}>
          ← <span style={{ fontSize: 14, fontWeight: 600, color: "rgba(255,255,255,0.55)" }}>Back</span>
        </button>

        <h2 style={{ fontSize: 28, fontWeight: 900, color: "#FFFFFF", margin: "0 0 4px", letterSpacing: -0.5 }}>Welcome back 👋</h2>
        <p style={{ color: "rgba(255,255,255,0.55)", margin: "0 0 24px", fontSize: 15 }}>Sign in to your GymLink account</p>

        {/* Inline account type — tap instantly selects, no extra step */}
        <div style={{ marginBottom: 24 }}>
          <label style={styles.label}>I am a…</label>
          <div style={{ display: "flex", gap: 10 }}>
            {[
              { id: "user",    icon: "💪", label: "Gym Member",       accent: "#2F6DFF", accentL: "rgba(47,109,255,0.15)" },
              { id: "trainer", icon: "⚡", label: "Personal Trainer", accent: "#7C3AED", accentL: "rgba(124,58,237,0.15)" },
            ].map(t => (
              <div key={t.id} onClick={() => { setAccountType(t.id); setErr(""); }}
                style={{ flex: 1, padding: "14px 12px", borderRadius: 16, cursor: "pointer", border: `2px solid ${accountType === t.id ? t.accent : "rgba(255,255,255,0.1)"}`, background: accountType === t.id ? t.accentL : "rgba(255,255,255,0.05)", display: "flex", flexDirection: "column", alignItems: "center", gap: 6, transition: "all 0.15s", boxShadow: accountType === t.id ? `0 4px 16px ${t.accent}20` : "none" }}>
                <span style={{ fontSize: 28 }}>{t.icon}</span>
                <span style={{ fontSize: 13, fontWeight: 700, color: accountType === t.id ? t.accent : "rgba(255,255,255,0.5)", textAlign: "center" }}>{t.label}</span>
                {accountType === t.id && <div style={{ width: 20, height: 20, borderRadius: 10, background: t.accent, display: "flex", alignItems: "center", justifyContent: "center" }}><span style={{ color: "#fff", fontSize: 11, fontWeight: 800 }}>✓</span></div>}
              </div>
            ))}
          </div>
        </div>

        {/* Credentials — dimmed until type chosen, then interactive */}
        <div style={{ display: "flex", flexDirection: "column", gap: 16, opacity: accountType ? 1 : 0.4, transition: "opacity 0.25s", pointerEvents: accountType ? "auto" : "none" }}>
          <div>
            <label style={styles.label}>Email Address</label>
            <input style={styles.input} placeholder="your@email.com" value={email} onChange={e => { setEmail(e.target.value); setErr(""); }} />
          </div>
          <div>
            <label style={styles.label}>Password</label>
            <div style={{ position: "relative" }}>
              <input style={{ ...styles.input, paddingRight: 48 }} type={showPass ? "text" : "password"} placeholder="••••••••" value={pass} onChange={e => { setPass(e.target.value); setErr(""); }} />
              <button onClick={() => setShowPass(v => !v)} style={{ position: "absolute", right: 14, top: "50%", transform: "translateY(-50%)", background: "none", border: "none", cursor: "pointer", fontSize: 18, color: "rgba(255,255,255,0.55)" }}>{showPass ? "🙈" : "👁️"}</button>
            </div>
            <div style={{ textAlign: "right", marginTop: 8 }}>
              <button onClick={() => setShowForgot(true)} style={{ background: "none", border: "none", cursor: "pointer", fontSize: 13, color: accentColor, fontWeight: 700, padding: 0 }}>Forgot password?</button>
            </div>
          </div>
          {err && (
            <div style={{ background: "#FF2A2A" + "10", border: `1px solid ${C.danger}30`, borderRadius: 10, padding: "10px 14px", display: "flex", gap: 8 }}>
              <span style={{ fontSize: 14 }}>⚠️</span>
              <span style={{ color: "#FF2A2A", fontSize: 13, fontWeight: 500 }}>{err}</span>
            </div>
          )}
          <button style={{ ...styles.btn(), background: accentColor, padding: "16px 24px", fontSize: 16, borderRadius: 16 }} onClick={handle}>Sign In</button>
          <div style={{ display: "flex", alignItems: "center", gap: 12 }}>
            <div style={{ flex: 1, height: 1, background: "rgba(255,255,255,0.12)" }} />
            <span style={{ color: "rgba(255,255,255,0.55)", fontSize: 13 }}>or</span>
            <div style={{ flex: 1, height: 1, background: "rgba(255,255,255,0.12)" }} />
          </div>
          <button style={{ ...styles.btn("outline"), gap: 10, borderColor: accentColor, color: accentColor, borderRadius: 16, padding: "14px 24px" }} onClick={() => onLogin({ email: "gmail@user.com", accountType: accountType || "user" })}>
            <span style={{ fontSize: 18, fontWeight: 900 }}>G</span> Continue with Gmail
          </button>
          <p style={{ textAlign: "center", color: "rgba(255,255,255,0.55)", fontSize: 13, margin: 0 }}>New to GymLink? <span style={{ color: accentColor, fontWeight: 700, cursor: "pointer" }}>Create an account</span></p>
        </div>
      </div>

      {showForgot && (
        <div style={{ position: "fixed", inset: 0, background: "rgba(0,0,0,0.45)", zIndex: 300, display: "flex", alignItems: "flex-end" }} onClick={closeForgot}>
          <div onClick={e => e.stopPropagation()} style={{ background: "rgba(255,255,255,0.06)", borderRadius: "24px 24px 0 0", width: "100%", maxWidth: 430, margin: "0 auto", padding: "28px 24px 48px" }}>
            <div style={{ display: "flex", justifyContent: "center", marginBottom: 20 }}><div style={{ width: 40, height: 4, borderRadius: 2, background: "rgba(255,255,255,0.12)" }} /></div>
            {forgotState !== "sent" ? (
              <>
                <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", marginBottom: 20 }}>
                  <div><h3 style={{ margin: "0 0 4px", fontSize: 20, fontWeight: 800 }}>Reset your password</h3><p style={{ margin: 0, fontSize: 14, color: "rgba(255,255,255,0.55)" }}>Enter your email to receive a reset link</p></div>
                  <button onClick={closeForgot} style={{ background: "rgba(255,255,255,0.04)", border: "none", borderRadius: 10, width: 32, height: 32, cursor: "pointer", fontSize: 16, display: "flex", alignItems: "center", justifyContent: "center", flexShrink: 0 }}>✕</button>
                </div>
                <div style={{ display: "flex", flexDirection: "column", gap: 16 }}>
                  <div>
                    <label style={styles.label}>Email Address</label>
                    <input style={{ ...styles.input, borderColor: forgotState === "error" ? C.danger : "rgba(255,255,255,0.1)" }} placeholder="your@email.com" value={forgotEmail} onChange={e => { setForgotEmail(e.target.value); setForgotState("idle"); }} autoFocus />
                    {forgotState === "error" && <p style={{ color: "#FF2A2A", fontSize: 13, margin: "6px 0 0" }}>Please enter a valid email address.</p>}
                  </div>
                  <button style={{ ...styles.btn(), background: accentColor, padding: "15px 24px", fontSize: 15, borderRadius: 14, opacity: forgotState === "sending" ? 0.7 : 1 }} onClick={handleForgot} disabled={forgotState === "sending"}>{forgotState === "sending" ? "Sending…" : "Send Reset Link"}</button>
                </div>
              </>
            ) : (
              <div style={{ textAlign: "center" }}>
                <div style={{ width: 72, height: 72, borderRadius: 22, background: "#22C55E" + "15", display: "flex", alignItems: "center", justifyContent: "center", fontSize: 34, margin: "0 auto 20px" }}>📬</div>
                <h3 style={{ fontSize: 20, fontWeight: 800, margin: "0 0 8px" }}>Check your inbox!</h3>
                <p style={{ color: "rgba(255,255,255,0.55)", fontSize: 14, margin: "0 0 6px" }}>Reset link sent to</p>
                <p style={{ color: "#FFFFFF", fontWeight: 700, fontSize: 14, margin: "0 0 24px" }}>{forgotEmail}</p>
                <button style={{ ...styles.btn(), background: accentColor, padding: "15px 24px", fontSize: 15, borderRadius: 14 }} onClick={closeForgot}>Back to Sign In</button>
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  );
}

// ── EMAIL VERIFICATION ────────────────────────────────────────────────────────
function EmailVerificationScreen({ email, accountType, onVerified, onBack }) {
  const [resent, setResent] = useState(false);
  const [resending, setResending] = useState(false);
  const [checking, setChecking] = useState(false);
  const isTrainer = accountType === "trainer";
  const accentColor = isTrainer ? "#7C3AED" : "#2F6DFF";
  const accentLight = isTrainer ? "rgba(124,58,237,0.15)" : "rgba(47,109,255,0.12)";

  const handleResend = () => { setResending(true); setTimeout(() => { setResending(false); setResent(true); setTimeout(() => setResent(false), 4000); }, 1200); };
  const handleCheckVerified = () => { setChecking(true); setTimeout(() => { setChecking(false); onVerified(); }, 1500); };

  return (
    <div style={{ ...styles.screen, background: "rgba(255,255,255,0.04)" }}>
      <div style={{ height: 5, background: `linear-gradient(90deg, ${accentColor}, ${isTrainer ? "#A855F7" : "#38BFFF"})` }} />
      <div style={{ flex: 1, display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center", padding: "40px 28px", textAlign: "center" }}>
        <div style={{ width: 96, height: 96, borderRadius: 28, background: accentLight, border: `2px solid ${accentColor}30`, display: "flex", alignItems: "center", justifyContent: "center", fontSize: 46, marginBottom: 28 }}>📧</div>
        <h2 style={{ fontSize: 26, fontWeight: 900, color: "#FFFFFF", margin: "0 0 10px", letterSpacing: -0.5 }}>Check your email</h2>
        <div style={{ background: "#FFF7ED", border: "1.5px solid #FED7AA", borderRadius: 14, padding: "12px 16px", marginBottom: 20, display: "flex", gap: 10, alignItems: "flex-start", textAlign: "left", width: "100%" }}>
          <span style={{ fontSize: 16, flexShrink: 0 }}>⚠️</span>
          <p style={{ margin: 0, fontSize: 13, color: "#F59E0B", lineHeight: 1.5, fontWeight: 500 }}>Please verify your email before continuing.</p>
        </div>
        <p style={{ color: "rgba(255,255,255,0.55)", fontSize: 15, margin: "0 0 6px" }}>We sent a verification link to</p>
        <p style={{ color: "#FFFFFF", fontSize: 15, fontWeight: 700, margin: "0 0 32px", wordBreak: "break-all" }}>{email}</p>
        <div style={{ width: "100%", background: "rgba(255,255,255,0.06)", borderRadius: 18, padding: "18px 20px", marginBottom: 28, border: "1px solid rgba(255,255,255,0.09)", textAlign: "left" }}>
          {[{ n: "1", text: "Open the email we sent you" }, { n: "2", text: "Click the verification link" }, { n: "3", text: "Return here and tap below" }].map(s => (
            <div key={s.n} style={{ display: "flex", alignItems: "center", gap: 14, padding: "10px 0", borderBottom: s.n !== "3" ? `1px solid ${"rgba(255,255,255,0.1)"}` : "none" }}>
              <div style={{ width: 28, height: 28, borderRadius: 14, background: accentColor, display: "flex", alignItems: "center", justifyContent: "center", color: "#fff", fontSize: 13, fontWeight: 800, flexShrink: 0 }}>{s.n}</div>
              <span style={{ fontSize: 14, color: "#FFFFFF", fontWeight: 500 }}>{s.text}</span>
            </div>
          ))}
        </div>
        <div style={{ width: "100%", display: "flex", flexDirection: "column", gap: 12 }}>
          <button style={{ ...styles.btn(), background: accentColor, padding: "16px 24px", fontSize: 16, borderRadius: 16, opacity: checking ? 0.75 : 1 }} onClick={handleCheckVerified} disabled={checking}>{checking ? "Checking…" : "I've verified my email ✓"}</button>
          <button style={{ ...styles.btn("outline"), borderColor: accentColor, color: accentColor, borderRadius: 16, padding: "14px 24px", fontSize: 15, opacity: resending ? 0.6 : 1 }} onClick={handleResend} disabled={resending}>{resending ? "Sending…" : "Resend verification email"}</button>
          {resent && <div style={{ background: "#22C55E" + "15", border: `1px solid ${C.success}`, borderRadius: 12, padding: "10px 14px", display: "flex", gap: 8, alignItems: "center" }}><span style={{ fontSize: 16 }}>✅</span><span style={{ fontSize: 13, color: "#22C55E", fontWeight: 600 }}>Verification email resent!</span></div>}
          <button onClick={onBack} style={{ background: "none", border: "none", cursor: "pointer", color: "rgba(255,255,255,0.55)", fontSize: 13, fontWeight: 600, padding: "8px 0" }}>← Use a different email</button>
        </div>
      </div>
    </div>
  );
}

// ── RESET PASSWORD ────────────────────────────────────────────────────────────
function ResetPasswordScreen({ onDone }) {
  const [pass, setPass] = useState("");
  const [confirm, setConfirm] = useState("");
  const [errors, setErrors] = useState({});
  const [done, setDone] = useState(false);
  const [showPass, setShowPass] = useState(false);
  const [showConfirm, setShowConfirm] = useState(false);

  const validatePass = (p) => {
    const errs = [];
    if (p.length < 8) errs.push("At least 8 characters");
    if (!/[A-Z]/.test(p)) errs.push("One uppercase letter");
    if (!/[0-9]/.test(p)) errs.push("One number");
    if (!/[^A-Za-z0-9]/.test(p)) errs.push("One special character");
    return errs;
  };
  const passChecks = validatePass(pass);
  const allRulesMet = passChecks.length === 0 && pass.length > 0;

  const handleSubmit = () => {
    const errs = validatePass(pass);
    if (errs.length) { setErrors({ pass: errs }); return; }
    if (pass !== confirm) { setErrors({ confirm: "Passwords don't match" }); return; }
    setErrors({}); setDone(true);
  };

  if (done) return (
    <div style={{ ...styles.screen, background: "rgba(255,255,255,0.04)", alignItems: "center", justifyContent: "center", padding: "40px 28px", textAlign: "center" }}>
      <div style={{ width: 88, height: 88, borderRadius: 28, background: "#22C55E" + "18", display: "flex", alignItems: "center", justifyContent: "center", fontSize: 44, marginBottom: 24 }}>🔐</div>
      <h2 style={{ fontSize: 26, fontWeight: 900, color: "#FFFFFF", margin: "0 0 10px" }}>Password reset!</h2>
      <p style={{ color: "rgba(255,255,255,0.55)", fontSize: 15, lineHeight: 1.6, margin: "0 0 32px" }}>Your password has been updated. You can now sign in with your new password.</p>
      <button style={{ ...styles.btn(), padding: "16px 24px", fontSize: 16, borderRadius: 16, width: "100%" }} onClick={onDone}>Back to Sign In →</button>
    </div>
  );

  return (
    <div style={{ ...styles.screen, background: "rgba(255,255,255,0.04)" }}>
      <div style={{ height: 5, background: `linear-gradient(90deg, ${"#2F6DFF"}, #38BFFF)` }} />
      <div style={{ padding: "40px 24px 24px", flex: 1 }}>
        <div style={{ width: 56, height: 56, borderRadius: 18, background: "rgba(47,109,255,0.12)", display: "flex", alignItems: "center", justifyContent: "center", fontSize: 26, marginBottom: 24 }}>🔑</div>
        <h2 style={{ fontSize: 26, fontWeight: 900, color: "#FFFFFF", margin: "0 0 8px" }}>Create new password</h2>
        <p style={{ color: "rgba(255,255,255,0.55)", margin: "0 0 32px", fontSize: 15 }}>Choose a strong password for your account</p>
        <div style={{ display: "flex", flexDirection: "column", gap: 18 }}>
          <div>
            <label style={styles.label}>New Password</label>
            <div style={{ position: "relative" }}>
              <input style={{ ...styles.input, paddingRight: 48, borderColor: errors.pass ? C.danger : allRulesMet ? C.success : "rgba(255,255,255,0.1)" }} type={showPass ? "text" : "password"} placeholder="••••••••" value={pass} onChange={e => { setPass(e.target.value); setErrors({}); }} />
              <button onClick={() => setShowPass(v => !v)} style={{ position: "absolute", right: 14, top: "50%", transform: "translateY(-50%)", background: "none", border: "none", cursor: "pointer", fontSize: 18, color: "rgba(255,255,255,0.55)" }}>{showPass ? "🙈" : "👁️"}</button>
            </div>
            {pass.length > 0 && (
              <div style={{ marginTop: 10, background: "rgba(255,255,255,0.04)", borderRadius: 12, padding: "12px 14px", display: "flex", flexDirection: "column", gap: 6 }}>
                {[{ rule: "At least 8 characters", ok: pass.length >= 8 }, { rule: "One uppercase letter", ok: /[A-Z]/.test(pass) }, { rule: "One number", ok: /[0-9]/.test(pass) }, { rule: "One special character", ok: /[^A-Za-z0-9]/.test(pass) }].map(({ rule, ok }) => (
                  <div key={rule} style={{ display: "flex", alignItems: "center", gap: 8 }}>
                    <div style={{ width: 18, height: 18, borderRadius: 9, background: ok ? C.success : "rgba(255,255,255,0.1)", display: "flex", alignItems: "center", justifyContent: "center", flexShrink: 0 }}>{ok && <span style={{ color: "#fff", fontSize: 11, fontWeight: 800 }}>✓</span>}</div>
                    <span style={{ fontSize: 13, color: ok ? C.success : C.muted, fontWeight: ok ? 600 : 400 }}>{rule}</span>
                  </div>
                ))}
              </div>
            )}
          </div>
          <div>
            <label style={styles.label}>Confirm New Password</label>
            <div style={{ position: "relative" }}>
              <input style={{ ...styles.input, paddingRight: 48, borderColor: errors.confirm ? C.danger : (confirm && confirm === pass) ? C.success : "rgba(255,255,255,0.1)" }} type={showConfirm ? "text" : "password"} placeholder="••••••••" value={confirm} onChange={e => { setConfirm(e.target.value); setErrors({}); }} />
              <button onClick={() => setShowConfirm(v => !v)} style={{ position: "absolute", right: 14, top: "50%", transform: "translateY(-50%)", background: "none", border: "none", cursor: "pointer", fontSize: 18, color: "rgba(255,255,255,0.55)" }}>{showConfirm ? "🙈" : "👁️"}</button>
            </div>
            {errors.confirm && <p style={{ color: "#FF2A2A", fontSize: 13, margin: "6px 0 0" }}>{errors.confirm}</p>}
            {confirm && confirm === pass && <p style={{ color: "#22C55E", fontSize: 13, margin: "6px 0 0", fontWeight: 600 }}>✓ Passwords match</p>}
          </div>
          <button style={{ ...styles.btn(), padding: "16px 24px", fontSize: 16, borderRadius: 16, opacity: allRulesMet && confirm ? 1 : 0.5, marginTop: 4 }} onClick={handleSubmit}>Reset Password</button>
        </div>
      </div>
    </div>
  );
}

// ── SIGNUP ────────────────────────────────────────────────────────────────────
function SignupScreen({ onBack, onSignup }) {
  const [step, setStep] = useState(1);
  const [accountType, setAccountType] = useState("user");
  const [form, setForm] = useState({ email: "", pass: "", confirm: "" });
  const [errors, setErrors] = useState({});
  const [safetyAccepted, setSafetyAccepted] = useState(false);
  const [idVerified, setIdVerified] = useState(false);
  const [profileComplete, setProfileComplete] = useState(false);
  const [showDailyGymLink, setShowDailyGymLink] = useState(true); // show on app open

  const validatePass = (p) => {
    const errs = [];
    if (p.length < 8) errs.push("At least 8 characters");
    if (!/[A-Z]/.test(p)) errs.push("One uppercase letter");
    if (!/[0-9]/.test(p)) errs.push("One number");
    if (!/[^A-Za-z0-9]/.test(p)) errs.push("One special character");
    return errs;
  };

  const handleNext = () => {
    if (step === 1) { setStep(2); return; }
    if (step === 2) {
      const passErrs = validatePass(form.pass);
      if (!form.email) { setErrors({ email: "Required" }); return; }
      if (passErrs.length) { setErrors({ pass: passErrs }); return; }
      if (form.pass !== form.confirm) { setErrors({ confirm: "Passwords don't match" }); return; }
      setStep(3); return;
    }
    if (step === 3) { if (!safetyAccepted) return; onSignup({ email: form.email, accountType }); }
  };

  const passChecks = validatePass(form.pass);

  return (
    <div style={styles.screen}>
      <div style={{ padding: "60px 24px 24px", flex: 1, overflow: "auto" }}>
        <button onClick={step === 1 ? onBack : () => setStep(s => s - 1)} style={{ background: "none", border: "none", fontSize: 24, cursor: "pointer", marginBottom: 24 }}>←</button>

        {step === 1 && (
          <>
            <h2 style={{ fontSize: 28, fontWeight: 800, color: "#FFFFFF", margin: "0 0 8px" }}>Join GymLink 🏋️</h2>
            <p style={{ color: "rgba(255,255,255,0.55)", margin: "0 0 32px" }}>Choose your account type</p>
            <div style={{ display: "flex", flexDirection: "column", gap: 16 }}>
              {[{ id: "user", icon: "💪", title: "Gym Member", desc: "Find training partners & book trainers" }, { id: "trainer", icon: "⚡", title: "Personal Trainer", desc: "Offer sessions & grow your client base" }].map(t => (
                <div key={t.id} onClick={() => setAccountType(t.id)} style={{ ...styles.card, border: `2px solid ${accountType === t.id ? "#2F6DFF" : "rgba(255,255,255,0.1)"}`, cursor: "pointer", display: "flex", gap: 16, alignItems: "center", background: accountType === t.id ? "rgba(47,109,255,0.15)" : "rgba(255,255,255,0.05)" }}>
                  <span style={{ fontSize: 36 }}>{t.icon}</span>
                  <div><div style={{ fontWeight: 700, color: "#FFFFFF" }}>{t.title}</div><div style={{ fontSize: 13, color: "rgba(255,255,255,0.55)" }}>{t.desc}</div></div>
                  {accountType === t.id && <span style={{ marginLeft: "auto", color: "#2F6DFF", fontSize: 20 }}>✓</span>}
                </div>
              ))}
              <button style={styles.btn()} onClick={handleNext}>Continue</button>
              <button style={{ ...styles.btn("outline"), gap: 10 }} onClick={() => setStep(3)}><span style={{ fontSize: 18 }}>G</span> Continue with Gmail</button>
            </div>
          </>
        )}

        {step === 2 && (
          <>
            <h2 style={{ fontSize: 28, fontWeight: 800, color: "#FFFFFF", margin: "0 0 8px" }}>Create account</h2>
            <p style={{ color: "rgba(255,255,255,0.55)", margin: "0 0 32px" }}>Set up your credentials</p>
            <div style={{ display: "flex", flexDirection: "column", gap: 16 }}>
              <div>
                <label style={styles.label}>Email Address</label>
                <input style={{ ...styles.input, borderColor: errors.email ? C.danger : "rgba(255,255,255,0.1)" }} placeholder="your@email.com" value={form.email} onChange={e => setForm({ ...form, email: e.target.value })} />
                {errors.email && <p style={{ color: "#FF2A2A", fontSize: 12, margin: "4px 0 0" }}>{errors.email}</p>}
              </div>
              <div>
                <label style={styles.label}>Password</label>
                <input style={{ ...styles.input, borderColor: errors.pass ? C.danger : "rgba(255,255,255,0.1)" }} type="password" placeholder="••••••••" value={form.pass} onChange={e => setForm({ ...form, pass: e.target.value })} />
                {form.pass.length > 0 && (
                  <div style={{ marginTop: 8, display: "flex", flexDirection: "column", gap: 4 }}>
                    {["At least 8 characters", "One uppercase letter", "One number", "One special character"].map(rule => {
                      const ok = !passChecks.includes(rule);
                      return <div key={rule} style={{ fontSize: 12, color: ok ? C.success : C.muted, display: "flex", gap: 6 }}><span>{ok ? "✓" : "○"}</span>{rule}</div>;
                    })}
                  </div>
                )}
              </div>
              <div>
                <label style={styles.label}>Confirm Password</label>
                <input style={{ ...styles.input, borderColor: errors.confirm ? C.danger : "rgba(255,255,255,0.1)" }} type="password" placeholder="••••••••" value={form.confirm} onChange={e => setForm({ ...form, confirm: e.target.value })} />
                {errors.confirm && <p style={{ color: "#FF2A2A", fontSize: 12, margin: "4px 0 0" }}>{errors.confirm}</p>}
              </div>
              <button style={styles.btn()} onClick={handleNext}>Continue</button>
            </div>
          </>
        )}

        {step === 3 && (
          <>
            <div style={{ display: "flex", alignItems: "center", gap: 10, marginBottom: 20 }}>
              <div style={{ width: 44, height: 44, borderRadius: 14, background: "rgba(47,109,255,0.12)", display: "flex", alignItems: "center", justifyContent: "center", fontSize: 22, flexShrink: 0 }}>🛡️</div>
              <div><h2 style={{ fontSize: 22, fontWeight: 800, color: "#FFFFFF", margin: 0 }}>Safety Policy</h2><p style={{ margin: 0, fontSize: 13, color: "rgba(255,255,255,0.55)" }}>Please read before continuing</p></div>
            </div>
            <div style={{ background: "#FFF7ED", border: "1.5px solid #FED7AA", borderRadius: 18, padding: "18px", marginBottom: 20 }}>
              <div style={{ display: "flex", gap: 10, alignItems: "flex-start" }}>
                <span style={{ fontSize: 20, flexShrink: 0 }}>⚠️</span>
                <p style={{ margin: 0, fontSize: 14, color: "#F59E0B", lineHeight: 1.7, fontWeight: 500 }}>GymLink strongly recommends meeting inside gyms or public fitness spaces. Any communication or meetings outside the platform are at your own discretion, and GymLink is not responsible for outcomes beyond the app.</p>
              </div>
            </div>
            <div style={{ display: "flex", flexDirection: "column", gap: 10, marginBottom: 24 }}>
              {[{ icon: "🏟️", color: "#2F6DFF", text: "Always meet inside a gym or public fitness facility" }, { icon: "👁️", color: "#F59E0B", text: "GymLink does not monitor communication outside the app" }, { icon: "🤝", color: "#7C3AED", text: "Act respectfully and use your own judgement at all times" }, { icon: "🚨", color: "#FF2A2A", text: "Report any suspicious behaviour through the app" }].map((p, i) => (
                <div key={i} style={{ display: "flex", alignItems: "flex-start", gap: 12, background: "rgba(255,255,255,0.06)", borderRadius: 14, padding: "12px 14px", border: "1px solid rgba(255,255,255,0.09)" }}>
                  <div style={{ width: 34, height: 34, borderRadius: 10, background: p.color + "15", display: "flex", alignItems: "center", justifyContent: "center", fontSize: 17, flexShrink: 0 }}>{p.icon}</div>
                  <p style={{ margin: 0, fontSize: 13, color: "#FFFFFF", lineHeight: 1.5 }}>{p.text}</p>
                </div>
              ))}
            </div>
            <div onClick={() => setSafetyAccepted(v => !v)} style={{ display: "flex", alignItems: "flex-start", gap: 14, cursor: "pointer", padding: "14px", background: safetyAccepted ? "rgba(47,109,255,0.15)" : "rgba(255,255,255,0.04)", borderRadius: 14, border: `2px solid ${safetyAccepted ? "#2F6DFF" : "rgba(255,255,255,0.1)"}`, marginBottom: 20, transition: "all 0.2s" }}>
              <div style={{ width: 22, height: 22, borderRadius: 6, border: `2px solid ${safetyAccepted ? "#2F6DFF" : "rgba(255,255,255,0.1)"}`, background: safetyAccepted ? "#2F6DFF" : "#FFFFFF", display: "flex", alignItems: "center", justifyContent: "center", flexShrink: 0, marginTop: 1 }}>{safetyAccepted && <span style={{ color: "#fff", fontSize: 13, fontWeight: 800 }}>✓</span>}</div>
              <p style={{ margin: 0, fontSize: 13, color: safetyAccepted ? "#2F6DFF" : C.text, fontWeight: safetyAccepted ? 700 : 400, lineHeight: 1.5 }}>I agree to the GymLink Safety Policy and understand my responsibilities as a user.</p>
            </div>
            <button style={{ ...styles.btn(), opacity: safetyAccepted ? 1 : 0.4, cursor: safetyAccepted ? "pointer" : "not-allowed", borderRadius: 14, padding: "15px 24px", fontSize: 15 }} onClick={handleNext} disabled={!safetyAccepted}>{safetyAccepted ? "Create Account →" : "Accept Safety Policy to continue"}</button>
            <p style={{ textAlign: "center", fontSize: 12, color: "rgba(255,255,255,0.55)", marginTop: 14 }}>By continuing you agree to our <span style={{ color: "#2F6DFF", fontWeight: 600 }}>Terms of Service</span> and <span style={{ color: "#2F6DFF", fontWeight: 600 }}>Privacy Policy</span>.</p>
          </>
        )}
      </div>
    </div>
  );
}

// ── ID VERIFICATION ───────────────────────────────────────────────────────────
function IDVerificationScreen({ accountType, onComplete, onSkip }) {
  const [idFile, setIdFile] = useState(null);
  const [selfieFile, setSelfieFile] = useState(null);
  const [idPreview, setIdPreview] = useState(null);
  const [selfiePreview, setSelfiePreview] = useState(null);
  const [submitting, setSubmitting] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [extracting, setExtracting] = useState(false);
  const [extracted, setExtracted] = useState(null);
  const [extractFailed, setExtractFailed] = useState(false);
  const [manualName, setManualName] = useState("");
  const [manualDob, setManualDob] = useState("");
  const idRef = useRef();
  const selfieRef = useRef();

  const isTrainer = accountType === "trainer";
  const accentColor = isTrainer ? "#7C3AED" : "#2F6DFF";
  const accentLight = isTrainer ? "rgba(124,58,237,0.15)" : "rgba(47,109,255,0.12)";

  const handleFile = (file, type) => {
    if (!file) return;
    const url = URL.createObjectURL(file);
    if (type === "id") {
      setIdFile(file); setIdPreview(url); setExtracted(null); setExtractFailed(false);
      setExtracting(true);
      setTimeout(() => {
        setExtracting(false);
        if (Math.random() > 0.2) setExtracted({ name: "Alex Johnson", dob: "1995-06-14" });
        else setExtractFailed(true);
      }, 1800);
    } else { setSelfieFile(file); setSelfiePreview(url); }
  };

  const canSubmit = idFile && selfieFile && (extracted || (manualName && manualDob));
  const handleSubmit = () => { if (!canSubmit) return; setSubmitting(true); setTimeout(() => { setSubmitting(false); setSubmitted(true); }, 1800); };

  if (submitted) return (
    <div style={{ ...styles.screen, alignItems: "center", justifyContent: "center", padding: "40px 28px", textAlign: "center", background: "rgba(255,255,255,0.04)" }}>
      <div style={{ width: 88, height: 88, borderRadius: 44, background: "rgba(47,109,255,0.15)", border: "2.5px solid rgba(47,109,255,0.5)", display: "flex", alignItems: "center", justifyContent: "center", fontSize: 40, marginBottom: 24 }}>🪪</div>
      <h2 style={{ fontSize: 26, fontWeight: 900, color: "#FFFFFF", margin: "0 0 12px" }}>Documents Submitted</h2>
      <p style={{ color: "rgba(255,255,255,0.55)", fontSize: 15, lineHeight: 1.6, margin: "0 0 32px" }}>Your ID is under review. You'll be notified once verified.</p>
      <div style={{ ...styles.card, width: "100%", background: accentLight, border: `1.5px solid ${accentColor}30`, marginBottom: 24 }}>
        {[{ icon: "✅", label: "ID Document", sub: idFile?.name || "Uploaded" }, { icon: "✅", label: "Selfie Photo", sub: selfieFile?.name || "Uploaded" }].map(r => (
          <div key={r.label} style={{ display: "flex", alignItems: "center", gap: 12, marginBottom: 8 }}><span style={{ fontSize: 20 }}>{r.icon}</span><div><div style={{ fontWeight: 700, fontSize: 14 }}>{r.label}</div><div style={{ fontSize: 12, color: "rgba(255,255,255,0.55)" }}>{r.sub}</div></div></div>
        ))}
      </div>
      <button style={{ ...styles.btn(), background: accentColor, padding: "16px 24px", fontSize: 16, borderRadius: 16 }} onClick={onComplete}>Continue to App →</button>
    </div>
  );

  return (
    <div style={{ ...styles.screen, background: "rgba(255,255,255,0.04)" }}>
      <div style={{ height: 5, background: `linear-gradient(90deg, ${accentColor}, ${isTrainer ? "#A855F7" : "#38BFFF"})` }} />
      <div style={{ background: "rgba(255,255,255,0.06)", padding: "32px 24px 24px", borderBottom: "1px solid rgba(255,255,255,0.08)" }}>
        <div style={{ display: "inline-flex", alignItems: "center", gap: 6, background: accentLight, borderRadius: 20, padding: "6px 14px", marginBottom: 18 }}>
          <span style={{ fontSize: 15 }}>{isTrainer ? "⚡" : "💪"}</span>
          <span style={{ fontSize: 13, fontWeight: 700, color: accentColor }}>{isTrainer ? "Personal Trainer" : "Gym Member"}</span>
        </div>
        <h2 style={{ fontSize: 26, fontWeight: 900, color: "#FFFFFF", margin: "0 0 10px" }}>ID Verification</h2>
        <div style={{ background: "#FFF7ED", border: "1.5px solid #FED7AA", borderRadius: 14, padding: "13px 16px", display: "flex", gap: 10, alignItems: "flex-start" }}>
          <span style={{ fontSize: 18, flexShrink: 0 }}>🛡️</span>
          <p style={{ margin: 0, fontSize: 13, color: "#F59E0B", lineHeight: 1.5, fontWeight: 500 }}>ID verification is required to ensure safety for all users.</p>
        </div>
      </div>

      <div style={{ flex: 1, padding: "24px", overflow: "auto", paddingBottom: 110, display: "flex", flexDirection: "column", gap: 16 }}>
        {/* ID upload card */}
        <div style={{ ...styles.card, border: `2px solid ${idFile ? accentColor : "rgba(255,255,255,0.1)"}`, background: idFile ? accentLight : "rgba(255,255,255,0.05)", transition: "all 0.2s" }}>
          <div style={{ display: "flex", alignItems: "center", gap: 12, marginBottom: 14 }}>
            <div style={{ width: 44, height: 44, borderRadius: 14, background: idFile ? accentColor : "rgba(255,255,255,0.04)", display: "flex", alignItems: "center", justifyContent: "center", fontSize: 22, flexShrink: 0 }}>🪪</div>
            <div style={{ flex: 1 }}><div style={{ fontWeight: 800, fontSize: 16 }}>Government-issued ID</div><div style={{ fontSize: 12, color: "rgba(255,255,255,0.55)", marginTop: 2 }}>Passport, driving licence, or national ID</div></div>
            {idFile && <span style={{ color: accentColor, fontSize: 20, fontWeight: 800 }}>✓</span>}
          </div>
          {idPreview ? (
            <div style={{ position: "relative" }}>
              <img src={idPreview} alt="ID" style={{ width: "100%", height: 140, objectFit: "cover", borderRadius: 12, display: "block" }} />
              <button onClick={() => { setIdFile(null); setIdPreview(null); setExtracted(null); setExtractFailed(false); }} style={{ position: "absolute", top: 8, right: 8, background: "rgba(0,0,0,0.55)", border: "none", borderRadius: 20, width: 28, height: 28, cursor: "pointer", color: "#fff", fontSize: 14, display: "flex", alignItems: "center", justifyContent: "center" }}>✕</button>
              <div style={{ marginTop: 8, fontSize: 12, color: "rgba(255,255,255,0.55)" }}>📄 {idFile.name}</div>
              {extracting && <div style={{ marginTop: 12, background: "rgba(47,109,255,0.12)", borderRadius: 12, padding: "12px 14px", display: "flex", gap: 10, alignItems: "center" }}><span style={{ fontSize: 16 }}>🔍</span><span style={{ fontSize: 13, color: "#2F6DFF", fontWeight: 600 }}>Reading your ID details…</span></div>}
              {extracted && !extracting && (
                <div style={{ marginTop: 12, background: "#22C55E" + "12", border: `1px solid ${C.success}30`, borderRadius: 12, padding: "12px 14px" }}>
                  <div style={{ display: "flex", alignItems: "center", gap: 6, marginBottom: 10 }}><span style={{ fontSize: 15 }}>✅</span><span style={{ fontSize: 13, fontWeight: 700, color: "#22C55E" }}>Details extracted automatically</span></div>
                  <div style={{ display: "flex", flexDirection: "column", gap: 8 }}>
                    <div><label style={{ ...styles.label, color: "#22C55E" }}>Name</label><input style={{ ...styles.input, background: "#22C55E" + "08", borderColor: C.success + "40" }} value={extracted.name} onChange={e => setExtracted(x => ({ ...x, name: e.target.value }))} /></div>
                    <PickerField label="Date of Birth" type="date" value={extracted.dob} onChange={e => setExtracted(x => ({ ...x, dob: e.target.value }))} />
                  </div>
                </div>
              )}
              {extractFailed && !extracting && (
                <div style={{ marginTop: 12, background: "#FFF7ED", border: "1px solid #FED7AA", borderRadius: 12, padding: "12px 14px" }}>
                  <div style={{ display: "flex", alignItems: "center", gap: 6, marginBottom: 10 }}><span>⚠️</span><span style={{ fontSize: 13, fontWeight: 700, color: "#F59E0B" }}>Please confirm your details</span></div>
                  <p style={{ margin: "0 0 10px", fontSize: 12, color: "#F59E0B" }}>We couldn't read your ID automatically. Please enter your details below.</p>
                  <div style={{ display: "flex", flexDirection: "column", gap: 8 }}>
                    <div><label style={styles.label}>Full Name</label><input style={styles.input} placeholder="As shown on ID" value={manualName} onChange={e => setManualName(e.target.value)} /></div>
                    <PickerField label="Date of Birth" type="date" value={manualDob} onChange={e => setManualDob(e.target.value)} />
                  </div>
                </div>
              )}
            </div>
          ) : (
            <button onClick={() => idRef.current.click()} style={{ width: "100%", padding: "20px", borderRadius: 14, border: `2px dashed ${accentColor}60`, background: "transparent", cursor: "pointer", display: "flex", flexDirection: "column", alignItems: "center", gap: 6 }}>
              <span style={{ fontSize: 28 }}>📤</span>
              <span style={{ fontSize: 14, fontWeight: 700, color: accentColor }}>Tap to upload ID</span>
              <span style={{ fontSize: 12, color: "rgba(255,255,255,0.55)" }}>JPG, PNG or PDF · Max 10MB</span>
            </button>
          )}
          <input ref={idRef} type="file" accept="image/*,.pdf" style={{ display: "none" }} onChange={e => handleFile(e.target.files[0], "id")} />
        </div>

        {/* Selfie card */}
        <div style={{ ...styles.card, border: `2px solid ${selfieFile ? accentColor : "rgba(255,255,255,0.1)"}`, background: selfieFile ? accentLight : "rgba(255,255,255,0.05)", transition: "all 0.2s" }}>
          <div style={{ display: "flex", alignItems: "center", gap: 12, marginBottom: 14 }}>
            <div style={{ width: 44, height: 44, borderRadius: 14, background: selfieFile ? accentColor : "rgba(255,255,255,0.04)", display: "flex", alignItems: "center", justifyContent: "center", fontSize: 22, flexShrink: 0 }}>🤳</div>
            <div style={{ flex: 1 }}><div style={{ fontWeight: 800, fontSize: 16 }}>Selfie Photo</div><div style={{ fontSize: 12, color: "rgba(255,255,255,0.55)", marginTop: 2 }}>Clear photo of your face, good lighting</div></div>
            {selfieFile && <span style={{ color: accentColor, fontSize: 20, fontWeight: 800 }}>✓</span>}
          </div>
          {selfiePreview ? (
            <div style={{ position: "relative" }}>
              <img src={selfiePreview} alt="Selfie" style={{ width: "100%", height: 140, objectFit: "cover", borderRadius: 12, display: "block" }} />
              <button onClick={() => { setSelfieFile(null); setSelfiePreview(null); }} style={{ position: "absolute", top: 8, right: 8, background: "rgba(0,0,0,0.55)", border: "none", borderRadius: 20, width: 28, height: 28, cursor: "pointer", color: "#fff", fontSize: 14, display: "flex", alignItems: "center", justifyContent: "center" }}>✕</button>
              <div style={{ marginTop: 8, fontSize: 12, color: "rgba(255,255,255,0.55)" }}>📸 {selfieFile.name}</div>
            </div>
          ) : (
            <button onClick={() => selfieRef.current.click()} style={{ width: "100%", padding: "20px", borderRadius: 14, border: `2px dashed ${accentColor}60`, background: "transparent", cursor: "pointer", display: "flex", flexDirection: "column", alignItems: "center", gap: 6 }}>
              <span style={{ fontSize: 28 }}>📷</span>
              <span style={{ fontSize: 14, fontWeight: 700, color: accentColor }}>Tap to upload selfie</span>
              <span style={{ fontSize: 12, color: "rgba(255,255,255,0.55)" }}>JPG or PNG · Max 10MB</span>
            </button>
          )}
          <input ref={selfieRef} type="file" accept="image/*" capture="user" style={{ display: "none" }} onChange={e => handleFile(e.target.files[0], "selfie")} />
        </div>

        <div style={{ background: "rgba(255,255,255,0.04)", borderRadius: 16, padding: "14px 16px", border: "1px solid rgba(255,255,255,0.09)" }}>
          <div style={{ fontSize: 12, fontWeight: 700, color: "rgba(255,255,255,0.55)", textTransform: "uppercase", letterSpacing: 0.4, marginBottom: 10 }}>Tips for approval</div>
          {["All text on your ID must be clearly readable", "No glare, blur or cropped edges", "Selfie must show your full face clearly", "Documents must be valid and not expired"].map((tip, i) => (
            <div key={i} style={{ display: "flex", gap: 8, alignItems: "flex-start", marginBottom: 6 }}>
              <span style={{ color: accentColor, fontSize: 13, fontWeight: 800, flexShrink: 0 }}>·</span>
              <span style={{ fontSize: 13, color: "rgba(255,255,255,0.55)", lineHeight: 1.4 }}>{tip}</span>
            </div>
          ))}
        </div>
      </div>

      <div style={{ position: "fixed", bottom: 0, left: "50%", transform: "translateX(-50%)", width: "100%", maxWidth: 430, padding: "16px 20px 36px", background: "rgba(255,255,255,0.06)", borderTop: "1px solid rgba(255,255,255,0.08)" }}>
        <div style={{ display: "flex", gap: 8, marginBottom: 14 }}>
          {[{ label: "ID Document", done: !!idFile }, { label: "Selfie", done: !!selfieFile }].map((s, i) => (
            <div key={i} style={{ flex: 1, display: "flex", alignItems: "center", gap: 6 }}>
              <div style={{ width: 20, height: 20, borderRadius: 10, background: s.done ? accentColor : "rgba(255,255,255,0.1)", display: "flex", alignItems: "center", justifyContent: "center", flexShrink: 0 }}>{s.done && <span style={{ color: "#fff", fontSize: 11, fontWeight: 800 }}>✓</span>}</div>
              <span style={{ fontSize: 12, fontWeight: 600, color: s.done ? accentColor : C.muted }}>{s.label}</span>
            </div>
          ))}
        </div>
        <button style={{ ...styles.btn(), background: canSubmit ? accentColor : "rgba(255,255,255,0.1)", color: canSubmit ? "#FFFFFF" : C.muted, padding: "16px 24px", fontSize: 16, borderRadius: 16, opacity: submitting ? 0.75 : 1, cursor: canSubmit ? "pointer" : "not-allowed" }} onClick={handleSubmit} disabled={!canSubmit || submitting}>
          {submitting ? "Submitting…" : canSubmit ? "Submit for Verification →" : "Upload both documents to continue"}
        </button>
        {onSkip && <button onClick={onSkip} style={{ width: "100%", background: "none", border: "none", cursor: "pointer", color: "rgba(255,255,255,0.35)", fontSize: 13, fontWeight: 600, padding: "10px 0 0" }}>Skip for now — browse only, matching unavailable</button>}
      </div>
    </div>
  );
}

// ── USER PROFILE SETUP ────────────────────────────────────────────────────────
function UserProfileSetup({ onComplete }) {
  const [step, setStep] = useState(1);
  const [form, setForm] = useState({
    name: "", age: "", gender: "", level: "", lookingFor: "",
    preferredDays: [], preferredTime: "",
    partnerLevel: "", partnerGender: "", ageMin: "18", ageMax: "50",
    postcode: "", gym: "", homeGym: "",
    sessionDate: "", sessionTime: "", sessionDuration: "45 min",
  });
  const [postcodeSearched, setPostcodeSearched] = useState(false);
  const [searching, setSearching] = useState(false);
  const [nearbyGyms, setNearbyGyms] = useState([]);
  const [lookingForModal, setLookingForModal] = useState(null);

  const total = 4;
  const up = (k, v) => setForm(f => ({ ...f, [k]: v }));
  const toggleDay = d => up("preferredDays", form.preferredDays.includes(d) ? form.preferredDays.filter(x => x !== d) : [...form.preferredDays, d]);

  const canNext = () => {
    if (step === 1) return form.name && form.age && form.gender;
    if (step === 2) return form.level && form.lookingFor;
    if (step === 3) return true;
    if (step === 4) return !!form.gym && !!form.sessionTime && !!form.sessionDuration;
    return false;
  };

  const handlePostcodeSearch = () => {
    if (!form.postcode) return;
    setSearching(true);
    setTimeout(() => {
      const prefix = form.postcode.trim().toUpperCase().replace(/\d.*/, "").slice(0, 2);
      const gyms = NEARBY_GYMS_BY_POSTCODE[prefix] || NEARBY_GYMS_BY_POSTCODE["E"] || NEARBY_GYMS_BY_POSTCODE.default;
      setNearbyGyms(gyms);
      setPostcodeSearched(true);
      setSearching(false);
    }, 1200);
  };

  return (
    <div style={styles.screen}>
      <div style={{ background: "#FF2A2A", padding: "50px 24px 24px" }}>
        <h2 style={{ color: "#FFFFFF", fontSize: 22, fontWeight: 800, margin: "0 0 4px" }}>Set up your profile</h2>
        <p style={{ color: "rgba(255,255,255,0.8)", fontSize: 14, margin: "0 0 16px" }}>Step {step} of {total}</p>
        <div style={{ display: "flex", gap: 6 }}>
          {Array.from({ length: total }).map((_, i) => (
            <div key={i} style={{ flex: 1, height: 4, borderRadius: 2, background: i < step ? "#FFFFFF" : "rgba(255,255,255,0.3)" }} />
          ))}
        </div>
      </div>

      <div style={{ flex: 1, padding: "24px", overflow: "auto", paddingBottom: 100 }}>

        {/* ── STEP 1: Basic Info ── */}
        {step === 1 && (
          <div style={{ display: "flex", flexDirection: "column", gap: 18 }}>
            <h3 style={{ margin: 0, fontSize: 20, fontWeight: 800 }}>Basic Info</h3>
            <div><label style={styles.label}>Full Name</label><input style={styles.input} placeholder="Your name" value={form.name} onChange={e => up("name", e.target.value)} /></div>
            <div><label style={styles.label}>Age</label><input style={styles.input} type="number" placeholder="e.g. 25" value={form.age} onChange={e => up("age", e.target.value)} /></div>
            <div>
              <label style={styles.label}>Gender</label>
              <div style={{ display: "flex", gap: 8, flexWrap: "wrap" }}>
                {["Male", "Female", "Non-binary", "Prefer not to say"].map(g => (
                  <div key={g} onClick={() => up("gender", g)} style={{ ...styles.chip(form.gender === g), flex: 1, textAlign: "center", fontSize: 12 }}>{g}</div>
                ))}
              </div>
            </div>
          </div>
        )}

        {/* ── STEP 2: Fitness + Looking For ── */}
        {step === 2 && (
          <div style={{ display: "flex", flexDirection: "column", gap: 18 }}>
            <h3 style={{ margin: 0, fontSize: 20, fontWeight: 800 }}>Fitness Details</h3>
            <div>
              <label style={styles.label}>Fitness Level</label>
              <div style={{ display: "flex", flexWrap: "wrap", gap: 10 }}>
                {["Beginner", "Intermediate", "Advanced", "Pro"].map(l => (
                  <div key={l} onClick={() => up("level", l)} style={styles.chip(form.level === l)}>{l}</div>
                ))}
              </div>
            </div>
            <div>
              <label style={styles.label}>What are you looking for?</label>
              <div style={{ display: "flex", flexDirection: "column", gap: 10 }}>
                {[
                  { id: "GymLink for Today", icon: "⚡", sub: "Find a training partner right now" },
                  { id: "GymLink for Future Date", icon: "📅", sub: "Plan a session on a specific date" },
                ].map(opt => {
                  const isSelected = form.lookingFor === opt.id;
                  return (
                    <div key={opt.id}>
                      <div onClick={() => up("lookingFor", opt.id)}
                        style={{ borderRadius: 16, border: `2px solid ${isSelected ? "#FF2A2A" : "rgba(255,255,255,0.1)"}`, background: isSelected ? "rgba(255,42,42,0.12)" : "rgba(255,255,255,0.05)", padding: "14px 16px", cursor: "pointer", display: "flex", alignItems: "center", gap: 14, transition: "all 0.18s", boxShadow: isSelected ? "0 2px 16px rgba(255,42,42,0.2)" : "none" }}>
                        <div style={{ width: 42, height: 42, borderRadius: 13, background: isSelected ? "#FF2A2A" : "rgba(255,255,255,0.08)", display: "flex", alignItems: "center", justifyContent: "center", fontSize: 20, flexShrink: 0 }}>{opt.icon}</div>
                        <div style={{ flex: 1 }}>
                          <div style={{ fontWeight: 700, fontSize: 14, color: "#FFFFFF" }}>{opt.id}</div>
                          <div style={{ fontSize: 12, color: "rgba(255,255,255,0.5)", marginTop: 2 }}>{opt.sub}</div>
                        </div>
                        {isSelected && <button onClick={e => { e.stopPropagation(); setLookingForModal(opt.id); }} style={{ background: "rgba(255,255,255,0.1)", border: "1px solid rgba(255,255,255,0.2)", borderRadius: 8, padding: "4px 10px", color: "#fff", fontSize: 11, fontWeight: 600, cursor: "pointer" }}>Set details</button>}
                        {isSelected && <span style={{ color: "#FF2A2A", fontSize: 18, fontWeight: 800 }}>✓</span>}
                      </div>
                      {isSelected && (form.sessionTime || form.sessionDate) && (
                        <div style={{ marginTop: 6, marginLeft: 8, display: "flex", gap: 6, flexWrap: "wrap" }}>
                          {form.sessionDate && <span style={{ background: "rgba(255,42,42,0.15)", color: "#FF2A2A", fontSize: 11, fontWeight: 600, padding: "3px 10px", borderRadius: 8 }}>📅 {form.sessionDate}</span>}
                          {form.sessionTime && <span style={{ background: "rgba(255,42,42,0.15)", color: "#FF2A2A", fontSize: 11, fontWeight: 600, padding: "3px 10px", borderRadius: 8 }}>🕐 {form.sessionTime}</span>}
                        </div>
                      )}
                    </div>
                  );
                })}
              </div>
            </div>
          </div>
        )}

        {/* GymLink for Today modal */}
        {lookingForModal === "GymLink for Today" && (
          <div style={{ position: "fixed", inset: 0, background: "rgba(0,0,0,0.6)", zIndex: 300, display: "flex", alignItems: "flex-end" }} onClick={() => setLookingForModal(null)}>
            <div onClick={e => e.stopPropagation()} style={{ background: "#0D1E4A", borderRadius: "24px 24px 0 0", width: "100%", maxWidth: 430, margin: "0 auto", padding: "24px 24px 40px", border: "1px solid rgba(255,255,255,0.1)" }}>
              <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 20 }}>
                <div><h3 style={{ margin: 0, fontSize: 19, fontWeight: 800 }}>⚡ GymLink for Today</h3><p style={{ margin: "4px 0 0", fontSize: 13, color: "rgba(255,255,255,0.5)" }}>When are you training?</p></div>
                <button onClick={() => setLookingForModal(null)} style={{ background: "rgba(255,255,255,0.08)", border: "none", borderRadius: 10, width: 32, height: 32, cursor: "pointer", color: "#fff", fontSize: 16 }}>✕</button>
              </div>
              <div style={{ display: "flex", flexDirection: "column", gap: 16 }}>
                <PickerField label="Time" type="time" value={form.sessionTime} onChange={e => up("sessionTime", e.target.value)} />
                <button style={styles.btn()} onClick={() => setLookingForModal(null)}>Confirm →</button>
              </div>
            </div>
          </div>
        )}

        {/* GymLink for Future Date modal */}
        {lookingForModal === "GymLink for Future Date" && (
          <div style={{ position: "fixed", inset: 0, background: "rgba(0,0,0,0.6)", zIndex: 300, display: "flex", alignItems: "flex-end" }} onClick={() => setLookingForModal(null)}>
            <div onClick={e => e.stopPropagation()} style={{ background: "#0D1E4A", borderRadius: "24px 24px 0 0", width: "100%", maxWidth: 430, margin: "0 auto", padding: "24px 24px 40px", border: "1px solid rgba(255,255,255,0.1)" }}>
              <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 20 }}>
                <div><h3 style={{ margin: 0, fontSize: 19, fontWeight: 800 }}>📅 GymLink for Future Date</h3><p style={{ margin: "4px 0 0", fontSize: 13, color: "rgba(255,255,255,0.5)" }}>Pick your date and time</p></div>
                <button onClick={() => setLookingForModal(null)} style={{ background: "rgba(255,255,255,0.08)", border: "none", borderRadius: 10, width: 32, height: 32, cursor: "pointer", color: "#fff", fontSize: 16 }}>✕</button>
              </div>
              <div style={{ display: "flex", flexDirection: "column", gap: 16 }}>
                <PickerField label="Date" type="date" min={new Date().toISOString().split("T")[0]} max={(() => { const d = new Date(); d.setDate(d.getDate() + 14); return d.toISOString().split("T")[0]; })()} value={form.sessionDate} onChange={e => up("sessionDate", e.target.value)} />
                <PickerField label="Time" type="time" value={form.sessionTime} onChange={e => up("sessionTime", e.target.value)} />
                <button style={styles.btn()} onClick={() => setLookingForModal(null)}>Confirm →</button>
              </div>
            </div>
          </div>
        )}

        {/* ── STEP 3: Partner Preferences ── */}
        {step === 3 && (
          <div style={{ display: "flex", flexDirection: "column", gap: 18 }}>
            <h3 style={{ margin: 0, fontSize: 20, fontWeight: 800 }}>Partner Preferences</h3>
            <div>
              <label style={styles.label}>Preferred Partner Level</label>
              <div style={{ display: "flex", flexWrap: "wrap", gap: 10 }}>
                {["Any", "Beginner", "Intermediate", "Advanced", "Pro"].map(l => <div key={l} onClick={() => up("partnerLevel", l)} style={styles.chip(form.partnerLevel === l)}>{l}</div>)}
              </div>
            </div>
            <div>
              <label style={styles.label}>Preferred Partner Gender (optional)</label>
              <div style={{ display: "flex", gap: 10 }}>
                {["Any", "Male", "Female", "Non-binary"].map(g => <div key={g} onClick={() => up("partnerGender", g)} style={{ ...styles.chip(form.partnerGender === g), flex: 1, textAlign: "center", fontSize: 12 }}>{g}</div>)}
              </div>
            </div>
            <div>
              <label style={styles.label}>Partner Age Range</label>
              <div style={{ display: "flex", gap: 12, alignItems: "center" }}>
                <input style={{ ...styles.input, width: "45%" }} type="number" placeholder="Min" value={form.ageMin} onChange={e => up("ageMin", e.target.value)} />
                <span style={{ color: "rgba(255,255,255,0.55)" }}>to</span>
                <input style={{ ...styles.input, width: "45%" }} type="number" placeholder="Max" value={form.ageMax} onChange={e => up("ageMax", e.target.value)} />
              </div>
            </div>
          </div>
        )}

        {/* ── STEP 4: Gym + Time + Duration + Results ── */}
        {step === 4 && (
          <div style={{ display: "flex", flexDirection: "column", gap: 18 }}>
            <div>
              <h3 style={{ margin: "0 0 4px", fontSize: 20, fontWeight: 800 }}>Find Your Gym</h3>
              <p style={{ margin: 0, fontSize: 13, color: "rgba(255,255,255,0.5)" }}>Enter your postcode, set your time and duration to see matches near you</p>
            </div>

            {/* Postcode */}
            <div>
              <label style={styles.label}>Your Postcode</label>
              <div style={{ display: "flex", gap: 10 }}>
                <input style={{ ...styles.input, flex: 1 }} placeholder="e.g. E1 6RF" value={form.postcode} onChange={e => { up("postcode", e.target.value); setPostcodeSearched(false); up("gym", ""); }} />
                <button onClick={handlePostcodeSearch} disabled={!form.postcode || searching}
                  style={{ ...styles.btn(), width: "auto", padding: "0 18px", borderRadius: 12, opacity: form.postcode ? 1 : 0.4, flexShrink: 0, fontSize: 13 }}>
                  {searching ? "..." : "Search"}
                </button>
              </div>
            </div>

            {/* Time + Duration (shown after postcode searched) */}
            {postcodeSearched && !searching && (
              <>
                <PickerField label="What time are you training?" type="time" value={form.sessionTime} onChange={e => up("sessionTime", e.target.value)} />
                <div>
                  <label style={styles.label}>Session Duration</label>
                  <div style={{ display: "flex", gap: 8 }}>
                    {["45 min", "1 hour", "1h 15min", "1h 30min"].map(d => (
                      <div key={d} onClick={() => up("sessionDuration", d)} style={{ ...styles.chip(form.sessionDuration === d), flex: 1, textAlign: "center", fontSize: 11 }}>{d}</div>
                    ))}
                  </div>
                </div>
              </>
            )}

            {/* Searching */}
            {searching && (
              <div style={{ textAlign: "center", padding: "24px", color: "rgba(255,255,255,0.5)" }}>
                <div style={{ fontSize: 32, marginBottom: 8 }}>📍</div>
                <p style={{ margin: 0, fontSize: 14 }}>Finding gyms near you…</p>
              </div>
            )}

            {/* Gym results */}
            {postcodeSearched && !searching && nearbyGyms.length > 0 && (
              <div style={{ display: "flex", flexDirection: "column", gap: 10 }}>
                <label style={styles.label}>Gyms Near {form.postcode.toUpperCase()}</label>
                {nearbyGyms.map((g, i) => {
                  const isSelected = form.gym === g.name;
                  const isHome = form.homeGym === g.name;
                  return (
                    <div key={g.name} onClick={() => up("gym", g.name)}
                      style={{ borderRadius: 16, border: `2px solid ${isSelected ? "#FF2A2A" : "rgba(255,255,255,0.1)"}`, background: isSelected ? "rgba(255,42,42,0.1)" : "rgba(255,255,255,0.04)", padding: "14px 16px", cursor: "pointer", transition: "all 0.15s" }}>
                      <div style={{ display: "flex", alignItems: "flex-start", justifyContent: "space-between", marginBottom: 8 }}>
                        <div style={{ flex: 1 }}>
                          <div style={{ display: "flex", alignItems: "center", gap: 8, marginBottom: 3, flexWrap: "wrap" }}>
                            {i === 0 && <span style={{ background: "#FF2A2A", color: "#fff", fontSize: 9, fontWeight: 800, padding: "2px 7px", borderRadius: 6 }}>CLOSEST</span>}
                            {isHome && <span style={{ background: "rgba(34,197,94,0.2)", color: "#22C55E", fontSize: 9, fontWeight: 800, padding: "2px 7px", borderRadius: 6 }}>🏠 HOME GYM</span>}
                            <span style={{ fontSize: 14, fontWeight: 700 }}>{g.name}</span>
                          </div>
                          <div style={{ display: "flex", gap: 10, flexWrap: "wrap" }}>
                            <span style={{ fontSize: 12, color: "rgba(255,255,255,0.45)" }}>📍 {g.distance}</span>
                            {g.entryCost && <span style={{ fontSize: 12, color: "rgba(255,255,255,0.45)" }}>💷 {g.entryCost} day pass</span>}
                          </div>
                        </div>
                        <div style={{ textAlign: "right", flexShrink: 0 }}>
                          <div style={{ fontSize: 22, fontWeight: 900, color: isSelected ? "#FF2A2A" : "#FFFFFF", lineHeight: 1 }}>{g.matches}</div>
                          <div style={{ fontSize: 10, color: "rgba(255,255,255,0.45)" }}>GymLinks</div>
                        </div>
                      </div>
                      <div style={{ display: "flex", gap: 6, flexWrap: "wrap", marginBottom: isSelected ? 10 : 0 }}>
                        {Object.entries(g.levels).map(([level, count]) => (
                          <span key={level} style={{ background: "rgba(255,255,255,0.07)", borderRadius: 8, padding: "3px 9px", fontSize: 11, color: "rgba(255,255,255,0.55)", fontWeight: 600 }}>{count} {level}</span>
                        ))}
                      </div>
                      {isSelected && (
                        <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", marginTop: 8, paddingTop: 10, borderTop: "1px solid rgba(255,42,42,0.2)" }}>
                          <span style={{ fontSize: 12, color: "#FF2A2A", fontWeight: 600 }}>✓ Selected as your gym</span>
                          <button onClick={e => { e.stopPropagation(); up("homeGym", isHome ? "" : g.name); }}
                            style={{ background: isHome ? "rgba(34,197,94,0.15)" : "rgba(255,255,255,0.08)", border: `1px solid ${isHome ? "rgba(34,197,94,0.3)" : "rgba(255,255,255,0.15)"}`, borderRadius: 8, padding: "5px 10px", cursor: "pointer", fontSize: 11, fontWeight: 700, color: isHome ? "#22C55E" : "rgba(255,255,255,0.7)" }}>
                            {isHome ? "🏠 Home Gym" : "Set as Home Gym"}
                          </button>
                        </div>
                      )}
                    </div>
                  );
                })}
              </div>
            )}

            {!postcodeSearched && !searching && (
              <div style={{ textAlign: "center", padding: "32px 20px", background: "rgba(255,255,255,0.04)", borderRadius: 16, border: "1px dashed rgba(255,255,255,0.1)" }}>
                <div style={{ fontSize: 40, marginBottom: 12 }}>📍</div>
                <p style={{ margin: 0, fontSize: 14, color: "rgba(255,255,255,0.5)" }}>Enter your postcode to find gyms and GymLinks near you</p>
              </div>
            )}
          </div>
        )}

      </div>

      <div style={{ position: "fixed", bottom: 0, left: "50%", transform: "translateX(-50%)", width: "100%", maxWidth: 430, padding: "16px 24px 32px", background: "rgba(4,14,34,0.97)", borderTop: "1px solid rgba(255,255,255,0.08)" }}>
        <div style={{ display: "flex", gap: 12 }}>
          {step > 1 && <button style={{ ...styles.btn("outline"), flex: 0.5 }} onClick={() => setStep(s => s - 1)}>Back</button>}
          <button style={{ ...styles.btn(), opacity: canNext() ? 1 : 0.5 }} onClick={() => step < total ? setStep(s => s + 1) : onComplete(form)}>
            {step === total ? "Complete Setup ✓" : "Continue →"}
          </button>
        </div>
      </div>
    </div>
  );
}


// ── TRAINER PROFILE SETUP ─────────────────────────────────────────────────────
function TrainerProfileSetup({ onComplete }) {
  const [form, setForm] = useState({ name: "", bio: "", specialties: [], price: "", gyms: [] });
  const up = (k, v) => setForm(f => ({ ...f, [k]: v }));
  const toggleSpec = s => up("specialties", form.specialties.includes(s) ? form.specialties.filter(x => x !== s) : [...form.specialties, s]);

  // Profile photo
  const [profilePhoto, setProfilePhoto] = useState(null);
  const [profilePhotoUrl, setProfilePhotoUrl] = useState(null);
  const profilePhotoRef = useRef();





  const handleProfilePhoto = (e) => {
    const file = e.target.files[0];
    if (!file) return;
    setProfilePhoto(file);
    setProfilePhotoUrl(URL.createObjectURL(file));
  };





  return (
    <div style={styles.screen}>
      <div style={{ background: "rgba(8,14,34,0.6)", padding: "50px 24px 20px", borderBottom: "1px solid rgba(255,255,255,0.08)" }}>
        <h2 style={{ color: "#FFFFFF", fontSize: 22, fontWeight: 800, margin: "0 0 4px" }}>Trainer Profile Setup</h2>
        <p style={{ color: "rgba(255,255,255,0.5)", fontSize: 13 }}>Help clients find and trust you</p>
      </div>

      <div style={{ flex: 1, padding: "24px", overflow: "auto", paddingBottom: 120, display: "flex", flexDirection: "column", gap: 22 }}>

        {/* ── Profile Photo ── */}
        <div>
          <label style={styles.label}>Profile Photo</label>
          <div style={{ display: "flex", alignItems: "center", gap: 16 }}>
            <div style={{ width: 80, height: 80, borderRadius: 20, background: profilePhotoUrl ? "transparent" : "rgba(255,255,255,0.06)", border: `2px solid ${profilePhotoUrl ? "#FF2A2A" : "rgba(255,255,255,0.15)"}`, overflow: "hidden", flexShrink: 0, display: "flex", alignItems: "center", justifyContent: "center" }}>
              {profilePhotoUrl
                ? <img src={profilePhotoUrl} alt="Profile" style={{ width: "100%", height: "100%", objectFit: "cover" }} />
                : <span style={{ fontSize: 28 }}>👤</span>
              }
            </div>
            <div style={{ flex: 1 }}>
              <input ref={profilePhotoRef} type="file" accept="image/*" style={{ display: "none" }} onChange={handleProfilePhoto} />
              <button
                onClick={() => profilePhotoRef.current.click()}
                style={{ ...styles.btn("outline"), marginBottom: 6 }}
              >
                {profilePhotoUrl ? "Change Photo" : "📷 Upload Photo"}
              </button>
              {profilePhotoUrl && (
                <div style={{ fontSize: 11, color: "#22C55E", fontWeight: 600 }}>✓ Photo uploaded</div>
              )}
              <div style={{ fontSize: 11, color: "rgba(255,255,255,0.35)", marginTop: 4 }}>JPG or PNG · Clear face photo</div>
            </div>
          </div>
        </div>

        {/* ── Full Name ── */}
        <div>
          <label style={styles.label}>Full Name</label>
          <input style={styles.input} placeholder="Your name" value={form.name} onChange={e => up("name", e.target.value)} />
        </div>

        {/* ── Bio ── */}
        <div>
          <label style={styles.label}>Bio</label>
          <textarea style={{ ...styles.input, minHeight: 90, resize: "none" }} placeholder="Tell clients about yourself, your approach and experience..." value={form.bio} onChange={e => up("bio", e.target.value)} />
        </div>

        {/* ── Specialties ── */}
        <div>
          <label style={styles.label}>Specialties</label>
          <div style={{ display: "flex", flexWrap: "wrap", gap: 8 }}>
            {["Weight Loss", "Strength", "HIIT", "Bodybuilding", "Powerlifting", "Yoga", "Pilates", "Mobility", "Sports Conditioning", "Nutrition"].map(s => (
              <div key={s} onClick={() => toggleSpec(s)} style={styles.chip(form.specialties.includes(s))}>{s}</div>
            ))}
          </div>
        </div>

        {/* ── Gyms (multi-select) ── */}
        <div>
          <label style={styles.label}>Your Gyms</label>
          <p style={{ margin: "0 0 10px", fontSize: 12, color: "rgba(255,255,255,0.4)" }}>Select all gyms where you train clients</p>
          <div style={{ display: "flex", flexDirection: "column", gap: 6, maxHeight: 240, overflowY: "auto" }}>
            {LONDON_GYMS.map(g => {
              const selected = form.gyms && form.gyms.includes(g);
              return (
                <div
                  key={g}
                  onClick={() => {
                    const current = form.gyms || [];
                    up("gyms", selected ? current.filter(x => x !== g) : [...current, g]);
                  }}
                  style={{ display: "flex", alignItems: "center", gap: 12, padding: "11px 14px", borderRadius: 12, border: `1.5px solid ${selected ? "#FF2A2A" : "rgba(255,255,255,0.1)"}`, background: selected ? "rgba(255,42,42,0.1)" : "rgba(255,255,255,0.04)", cursor: "pointer", transition: "all 0.15s" }}
                >
                  <div style={{ width: 20, height: 20, borderRadius: 6, border: `2px solid ${selected ? "#FF2A2A" : "rgba(255,255,255,0.2)"}`, background: selected ? "#FF2A2A" : "transparent", display: "flex", alignItems: "center", justifyContent: "center", flexShrink: 0 }}>
                    {selected && <span style={{ color: "#fff", fontSize: 12, fontWeight: 800 }}>✓</span>}
                  </div>
                  <span style={{ fontSize: 13, fontWeight: selected ? 600 : 400, color: selected ? "#FFFFFF" : "rgba(255,255,255,0.6)" }}>{g}</span>
                </div>
              );
            })}
          </div>
          {form.gyms && form.gyms.length > 0 && (
            <div style={{ marginTop: 10, display: "flex", flexWrap: "wrap", gap: 6 }}>
              {form.gyms.map(g => (
                <span key={g} style={{ background: "rgba(255,42,42,0.15)", border: "1px solid rgba(255,42,42,0.3)", borderRadius: 20, padding: "4px 10px", fontSize: 11, fontWeight: 600, color: "#FF2A2A" }}>{g}</span>
              ))}
            </div>
          )}
        </div>
        <div>
          <label style={styles.label}>Hourly Rate</label>
          <input style={styles.input} placeholder="e.g. £55/hr" value={form.price} onChange={e => up("price", e.target.value)} />
        </div>



      </div>

      <div style={{ position: "fixed", bottom: 0, left: "50%", transform: "translateX(-50%)", width: "100%", maxWidth: 430, padding: "16px 24px 32px", background: "rgba(4,14,34,0.97)", borderTop: "1px solid rgba(255,255,255,0.08)" }}>
        <button style={styles.btn()} onClick={() => onComplete({ ...form, profilePhotoUrl })}>Complete Profile ✓</button>
      </div>
    </div>
  );
}

// ── DISCOVER / SWIPE ──────────────────────────────────────────────────────────
function DiscoverScreen({ user, onGoToChat, profileComplete, idVerified, onCompleteProfile, onVerifyId, showDailyModal, onDismissDaily }) {
  const [mode, setMode] = useState(null);
  const [idx, setIdx] = useState(0);
  const [swipeDir, setSwipeDir] = useState(null);
  const [filters, setFilters] = useState({ level: "", gender: "" });
  const [showFilters, setShowFilters] = useState(false);
  const [startX, setStartX] = useState(null);
  const [dragX, setDragX] = useState(0);
  const [isDragging, setIsDragging] = useState(false);
  const [viewProfile, setViewProfile] = useState(null);
  const [selectedTrainer, setSelectedTrainer] = useState(null);
  const [bookingItem, setBookingItem] = useState(null);
  const [bookingConfirmed, setBookingConfirmed] = useState(false);
  const [dailyMode, setDailyMode] = useState(null); // "today" | "future"
  const [dailyTime, setDailyTime] = useState("");
  const [dailyDate, setDailyDate] = useState("");
  const [dailyDuration, setDailyDuration] = useState("45 min");
  const [dailyStep, setDailyStep] = useState(1); // 1=choice 2=prefs 3=matches
  const [showDailySheet, setShowDailySheet] = useState(showDailyModal);
  const [showGate, setShowGate] = useState(false);
  const canMatch = profileComplete && idVerified;
  const DURATIONS = ["45 min", "1 hour", "1h 15min", "1h 30min"];
  const DAILY_MATCHES = [
    { id: 1, name: "Marcus Reid", avatar: "MR", color: "#FF6B6B", level: "Advanced", gym: "PureGym Shoreditch", score: 91, bio: "5 days a week lifter." },
    { id: 2, name: "Jade Thompson", avatar: "JT", color: "#4ECDC4", level: "Intermediate", gym: "Fitness First Canary Wharf", score: 76, bio: "CrossFit enthusiast." },
    { id: 3, name: "Leo Marchetti", avatar: "LM", color: "#34D399", level: "Intermediate", gym: "Better Gym Hackney", score: 83, bio: "HIIT and calisthenics." },
  ];
  const [matchIdx, setMatchIdx] = useState(0);
  const [matchDragX, setMatchDragX] = useState(0);
  const [matchStartX, setMatchStartX] = useState(null);
  const currentMatch = DAILY_MATCHES[matchIdx];

  const handleMatchSwipe = (dir) => {
    if (dir === "right" && currentMatch) { onGoToChat && onGoToChat(currentMatch); }
    if (matchIdx + 1 >= DAILY_MATCHES.length) { setShowDailySheet(false); onDismissDaily && onDismissDaily(); }
    else setMatchIdx(i => i + 1);
    setMatchDragX(0);
  };
  const onMatchTouchStart = (e) => setMatchStartX(e.touches[0].clientX);
  const onMatchTouchMove = (e) => { if (matchStartX !== null) setMatchDragX(e.touches[0].clientX - matchStartX); };
  const onMatchTouchEnd = () => {
    if (matchDragX > 70) handleMatchSwipe("right");
    else if (matchDragX < -70) handleMatchSwipe("left");
    else setMatchDragX(0);
    setMatchStartX(null);
  };

  const tryAction = (action) => { if (canMatch) action(); else setShowGate(true); };

  const filtered = MOCK_PROFILES.filter(p => (!filters.level || p.level === filters.level) && (!filters.gender || p.gender === filters.gender));
  const current = filtered[idx];
  const catColor = (level) => ({ Beginner: "#10B981", Intermediate: "#2F6DFF", Advanced: "#F59E0B", Pro: "#EF4444" }[level] || "#2F6DFF");

  const handleSwipe = (dir) => {
    setSwipeDir(dir);
    setTimeout(() => {
      if (dir === "right" && current) { onGoToChat && onGoToChat(current); }
      setIdx(i => i + 1); setSwipeDir(null); setDragX(0);
    }, 350);
  };
  const onTouchStart = (e) => { setStartX(e.touches[0].clientX); setIsDragging(true); };
  const onTouchMove = (e) => { if (startX !== null) setDragX(e.touches[0].clientX - startX); };
  const onTouchEnd = () => {
    setIsDragging(false);
    if (dragX > 80) handleSwipe("right");
    else if (dragX < -80) handleSwipe("left");
    else setDragX(0);
    setStartX(null);
  };

  // ── HUB VIEW ──────────────────────────────────────────────────
  if (!mode) return (
    <div style={{ ...styles.screen, paddingBottom: 80 }}>
      <div style={{ background: "rgba(4,14,34,0.9)", padding: "50px 20px 16px", borderBottom: "1px solid rgba(255,255,255,0.08)", display: "flex", justifyContent: "space-between", alignItems: "center" }}>
        <img src={gymlinkLogo} alt="GymLink" style={{ height: 34 }} />
        <div style={{ fontSize: 12, color: "rgba(255,255,255,0.4)", fontWeight: 600 }}>What are you looking for?</div>
      </div>

      <div style={{ flex: 1, padding: "20px 16px", overflow: "auto", display: "flex", flexDirection: "column", gap: 14 }}>

        {/* Top 3 cards */}
        <label style={{ ...styles.label, marginBottom: 4 }}>Sessions & Training</label>
        <div style={{ display: "flex", flexDirection: "column", gap: 12 }}>

          {/* Personal Trainers */}
          <div onClick={() => setMode("trainers")}
            style={{ borderRadius: 20, overflow: "hidden", cursor: "pointer", background: "linear-gradient(135deg, rgba(47,109,255,0.25), rgba(18,61,155,0.35))", border: "1px solid rgba(47,109,255,0.3)", padding: "20px", display: "flex", alignItems: "center", gap: 16 }}>
            <div style={{ width: 56, height: 56, borderRadius: 16, background: "rgba(47,109,255,0.3)", border: "1.5px solid rgba(47,109,255,0.5)", display: "flex", alignItems: "center", justifyContent: "center", fontSize: 28, flexShrink: 0 }}>🏋️</div>
            <div style={{ flex: 1 }}>
              <div style={{ fontSize: 17, fontWeight: 800, color: "#FFFFFF", marginBottom: 3 }}>Personal Trainers</div>
              <div style={{ fontSize: 13, color: "rgba(255,255,255,0.55)" }}>1-to-1 indoor sessions · Book a PT</div>
              <div style={{ display: "flex", gap: 6, marginTop: 8 }}>
                <span style={{ background: "rgba(47,109,255,0.2)", color: "#2F6DFF", fontSize: 10, fontWeight: 700, padding: "3px 8px", borderRadius: 6 }}>3 trainers nearby</span>
              </div>
            </div>
            <span style={{ color: "rgba(255,255,255,0.4)", fontSize: 22 }}>›</span>
          </div>

          {/* Bootcamps */}
          <div onClick={() => setMode("bootcamp")}
            style={{ borderRadius: 20, overflow: "hidden", cursor: "pointer", background: "linear-gradient(135deg, rgba(34,197,94,0.2), rgba(16,113,52,0.25))", border: "1px solid rgba(34,197,94,0.25)", padding: "20px", display: "flex", alignItems: "center", gap: 16 }}>
            <div style={{ width: 56, height: 56, borderRadius: 16, background: "rgba(34,197,94,0.2)", border: "1.5px solid rgba(34,197,94,0.4)", display: "flex", alignItems: "center", justifyContent: "center", fontSize: 28, flexShrink: 0 }}>🌳</div>
            <div style={{ flex: 1 }}>
              <div style={{ fontSize: 17, fontWeight: 800, color: "#FFFFFF", marginBottom: 3 }}>Outdoor Bootcamps</div>
              <div style={{ fontSize: 13, color: "rgba(255,255,255,0.55)" }}>Parks & outdoor spaces · Group training</div>
              <div style={{ display: "flex", gap: 6, marginTop: 8 }}>
                <span style={{ background: "rgba(34,197,94,0.15)", color: "#22C55E", fontSize: 10, fontWeight: 700, padding: "3px 8px", borderRadius: 6 }}>2 sessions this week</span>
              </div>
            </div>
            <span style={{ color: "rgba(255,255,255,0.4)", fontSize: 22 }}>›</span>
          </div>

          {/* Group Classes */}
          <div onClick={() => setMode("group")}
            style={{ borderRadius: 20, overflow: "hidden", cursor: "pointer", background: "linear-gradient(135deg, rgba(124,58,237,0.25), rgba(79,22,174,0.3))", border: "1px solid rgba(124,58,237,0.3)", padding: "20px", display: "flex", alignItems: "center", gap: 16 }}>
            <div style={{ width: 56, height: 56, borderRadius: 16, background: "rgba(124,58,237,0.2)", border: "1.5px solid rgba(124,58,237,0.4)", display: "flex", alignItems: "center", justifyContent: "center", fontSize: 28, flexShrink: 0 }}>👥</div>
            <div style={{ flex: 1 }}>
              <div style={{ fontSize: 17, fontWeight: 800, color: "#FFFFFF", marginBottom: 3 }}>Indoor Group Classes</div>
              <div style={{ fontSize: 13, color: "rgba(255,255,255,0.55)" }}>Gym-based · HIIT, Strength, Yoga & more</div>
              <div style={{ display: "flex", gap: 6, marginTop: 8 }}>
                <span style={{ background: "rgba(124,58,237,0.2)", color: "#A78BFA", fontSize: 10, fontWeight: 700, padding: "3px 8px", borderRadius: 6 }}>5 classes available</span>
              </div>
            </div>
            <span style={{ color: "rgba(255,255,255,0.4)", fontSize: 22 }}>›</span>
          </div>
        </div>

        {/* Divider */}
        <div style={{ display: "flex", alignItems: "center", gap: 12, margin: "4px 0" }}>
          <div style={{ flex: 1, height: 1, background: "rgba(255,255,255,0.08)" }} />
          <span style={{ fontSize: 11, color: "rgba(255,255,255,0.3)", fontWeight: 600, letterSpacing: 1 }}>OR</span>
          <div style={{ flex: 1, height: 1, background: "rgba(255,255,255,0.08)" }} />
        </div>

        {/* Long-term Partner CTA */}
        <div onClick={() => tryAction(() => setMode("partner"))}
          style={{ borderRadius: 20, border: "2px solid #FF2A2A", background: "rgba(255,42,42,0.08)", padding: "20px", display: "flex", alignItems: "center", gap: 16, cursor: "pointer" }}>
          <div style={{ width: 56, height: 56, borderRadius: 16, background: "#FF2A2A", display: "flex", alignItems: "center", justifyContent: "center", fontSize: 28, flexShrink: 0 }}>🤝</div>
          <div style={{ flex: 1 }}>
            <div style={{ fontSize: 17, fontWeight: 800, color: "#FFFFFF", marginBottom: 3 }}>Long-term GymLink Partner</div>
            <div style={{ fontSize: 13, color: "rgba(255,255,255,0.55)" }}>Find a regular training partner · Swipe to match</div>
            <div style={{ display: "flex", gap: 6, marginTop: 8 }}>
              <span style={{ background: "rgba(255,42,42,0.2)", color: "#FF2A2A", fontSize: 10, fontWeight: 700, padding: "3px 8px", borderRadius: 6 }}>12 long-term matches nearby</span>
            </div>
          </div>
          <span style={{ color: "#FF2A2A", fontSize: 22 }}>›</span>
        </div>
      </div>
    </div>
  );

  // ── TRAINERS MODE — redirect to trainers screen ───────────────
  if (mode === "trainers") return (
    <div style={{ ...styles.screen, paddingBottom: 80 }}>
      <div style={{ background: "rgba(4,14,34,0.9)", padding: "50px 20px 16px", borderBottom: "1px solid rgba(255,255,255,0.08)", display: "flex", alignItems: "center", gap: 12 }}>
        <button onClick={() => setMode(null)} style={{ background: "none", border: "none", cursor: "pointer", fontSize: 22, color: "#fff" }}>←</button>
        <span style={{ fontSize: 17, fontWeight: 700 }}>Personal Trainers</span>
      </div>
      <div style={{ flex: 1, padding: "16px", overflow: "auto" }}>
        <div style={{ background: "rgba(47,109,255,0.1)", border: "1px solid rgba(47,109,255,0.2)", borderRadius: 14, padding: "12px 16px", marginBottom: 16, display: "flex", gap: 10 }}>
          <span style={{ fontSize: 16 }}>🏋️</span>
          <p style={{ margin: 0, fontSize: 13, color: "rgba(255,255,255,0.7)" }}>1-to-1 indoor sessions with certified personal trainers at your gym.</p>
        </div>
        {MOCK_TRAINERS.map(t => (
          <div key={t.id} onClick={() => setSelectedTrainer(t)} style={{ ...styles.card, marginBottom: 10, display: "flex", gap: 14, alignItems: "center", cursor: "pointer" }}>
            <Avatar initials={t.avatar} color={t.color} size={56} />
            <div style={{ flex: 1 }}>
              <div style={{ display: "flex", alignItems: "center", gap: 6 }}><span style={{ fontWeight: 700, fontSize: 15 }}>{t.name}</span>{t.verified && <VerifiedBadge />}</div>
              <StarRating rating={t.rating} />
              <div style={{ display: "flex", gap: 6, marginTop: 5, flexWrap: "wrap" }}>{t.specialty.slice(0,2).map(s => <span key={s} style={{ background: "rgba(47,109,255,0.12)", color: "#2F6DFF", fontSize: 11, padding: "2px 8px", borderRadius: 6 }}>{s}</span>)}</div>
              <p style={{ margin: "3px 0 0", color: "rgba(255,255,255,0.45)", fontSize: 12 }}>📍 {t.gym}</p>
            </div>
            <div style={{ textAlign: "right" }}><div style={{ fontWeight: 800, color: "#FF2A2A", fontSize: 15 }}>{t.price}</div></div>
          </div>
        ))}
      </div>
    </div>
  );

  // ── BOOTCAMP MODE ─────────────────────────────────────────────
  if (mode === "bootcamp") return (
    <div style={{ ...styles.screen, paddingBottom: 80 }}>
      <div style={{ background: "rgba(4,14,34,0.9)", padding: "50px 20px 16px", borderBottom: "1px solid rgba(255,255,255,0.08)", display: "flex", alignItems: "center", gap: 12 }}>
        <button onClick={() => setMode(null)} style={{ background: "none", border: "none", cursor: "pointer", fontSize: 22, color: "#fff" }}>←</button>
        <span style={{ fontSize: 17, fontWeight: 700 }}>Outdoor Bootcamps</span>
      </div>
      <div style={{ flex: 1, padding: "16px", overflow: "auto" }}>
        <div style={{ background: "rgba(34,197,94,0.1)", border: "1px solid rgba(34,197,94,0.2)", borderRadius: 14, padding: "12px 16px", marginBottom: 16, display: "flex", gap: 10 }}>
          <span style={{ fontSize: 16 }}>🌳</span>
          <p style={{ margin: 0, fontSize: 13, color: "rgba(255,255,255,0.7)" }}>Outdoor group sessions in parks and open spaces. Bodyweight, functional and team training.</p>
        </div>
        {[
          { id: 1, title: "Morning Park Bootcamp", trainer: "Serena Blake", location: "Victoria Park, E9", date: "Sat 29 Mar", time: "8:00am", duration: "45 min", spots: 10, booked: 6, price: "£10", color: "#F472B6" },
          { id: 2, title: "Functional Fitness Outdoors", trainer: "Kwame Asante", location: "Clapham Common, SW4", date: "Sun 30 Mar", time: "9:30am", duration: "1 hour", spots: 8, booked: 3, price: "£12", color: "#60A5FA" },
        ].map(c => (
          <div key={c.id} style={{ ...styles.card, marginBottom: 10, cursor: "pointer" }} onClick={() => tryAction(() => { setBookingItem({ title: c.title, date: c.date, time: c.time, duration: c.duration, location: c.location, price: c.price }); setBookingConfirmed(false); })}>
            <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", marginBottom: 10 }}>
              <div style={{ flex: 1 }}>
                <div style={{ fontWeight: 800, fontSize: 15, marginBottom: 3 }}>{c.title}</div>
                <div style={{ fontSize: 12, color: "rgba(255,255,255,0.5)" }}>by {c.trainer}</div>
              </div>
              <span style={{ background: "rgba(34,197,94,0.15)", color: "#22C55E", fontSize: 12, fontWeight: 700, padding: "4px 10px", borderRadius: 8 }}>{c.price}</span>
            </div>
            <div style={{ display: "flex", gap: 8, flexWrap: "wrap", marginBottom: 12 }}>
              <span style={{ background: "rgba(255,255,255,0.06)", fontSize: 12, color: "rgba(255,255,255,0.6)", padding: "4px 10px", borderRadius: 8 }}>🌳 {c.location}</span>
              <span style={{ background: "rgba(255,255,255,0.06)", fontSize: 12, color: "rgba(255,255,255,0.6)", padding: "4px 10px", borderRadius: 8 }}>📅 {c.date} · {c.time}</span>
              <span style={{ background: "rgba(255,255,255,0.06)", fontSize: 12, color: "rgba(255,255,255,0.6)", padding: "4px 10px", borderRadius: 8 }}>⏱ {c.duration}</span>
              <span style={{ background: "rgba(255,255,255,0.06)", fontSize: 12, color: "rgba(255,255,255,0.6)", padding: "4px 10px", borderRadius: 8 }}>👥 {c.booked}/{c.spots} joined</span>
            </div>
            <button style={{ ...styles.btn(), borderRadius: 12, padding: "12px" }} onClick={e => { e.stopPropagation(); tryAction(() => { setBookingItem({ title: c.title, date: c.date, time: c.time, duration: c.duration, location: c.location, price: c.price }); setBookingConfirmed(false); }); }}>Book Spot</button>
          </div>
        ))}
      </div>
    </div>
  );

  // ── GROUP CLASSES MODE ────────────────────────────────────────
  if (mode === "group") return (
    <div style={{ ...styles.screen, paddingBottom: 80 }}>
      <div style={{ background: "rgba(4,14,34,0.9)", padding: "50px 20px 16px", borderBottom: "1px solid rgba(255,255,255,0.08)", display: "flex", alignItems: "center", gap: 12 }}>
        <button onClick={() => setMode(null)} style={{ background: "none", border: "none", cursor: "pointer", fontSize: 22, color: "#fff" }}>←</button>
        <span style={{ fontSize: 17, fontWeight: 700 }}>Indoor Group Classes</span>
      </div>
      <div style={{ flex: 1, padding: "16px", overflow: "auto" }}>
        <div style={{ background: "rgba(124,58,237,0.1)", border: "1px solid rgba(124,58,237,0.2)", borderRadius: 14, padding: "12px 16px", marginBottom: 16, display: "flex", gap: 10 }}>
          <span style={{ fontSize: 16 }}>👥</span>
          <p style={{ margin: 0, fontSize: 13, color: "rgba(255,255,255,0.7)" }}>Indoor group sessions at your gym. HIIT, strength, yoga and more led by certified trainers.</p>
        </div>
        {[
          { id: 1, title: "Morning HIIT Bootcamp", trainer: "Serena Blake", location: "PureGym Victoria", date: "Sun 29 Mar", time: "8:00am", duration: "1 hour", spots: 10, booked: 6, price: "£10", type: "HIIT", color: "#F472B6" },
          { id: 2, title: "Strength & Conditioning", trainer: "Kwame Asante", location: "PureGym Victoria", date: "Tue 31 Mar", time: "6:30pm", duration: "1h 15min", spots: 5, booked: 2, price: "£15", type: "Strength", color: "#60A5FA" },
          { id: 3, title: "Yoga & Mobility Flow", trainer: "Priya Nair", location: "Nuffield Health Marylebone", date: "Wed 1 Apr", time: "7:00am", duration: "1h 30min", spots: 12, booked: 8, price: "Free", type: "Yoga", color: "#A78BFA" },
        ].map(c => (
          <div key={c.id} style={{ ...styles.card, marginBottom: 10, cursor: "pointer" }} onClick={() => tryAction(() => { setBookingItem({ title: c.title, date: c.date, time: c.time, duration: c.duration, location: c.location, price: c.price }); setBookingConfirmed(false); })}>
            <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", marginBottom: 10 }}>
              <div style={{ flex: 1 }}>
                <div style={{ display: "flex", gap: 6, marginBottom: 4 }}><span style={{ background: "rgba(124,58,237,0.2)", color: "#A78BFA", fontSize: 10, fontWeight: 700, padding: "2px 8px", borderRadius: 6 }}>{c.type}</span></div>
                <div style={{ fontWeight: 800, fontSize: 15, marginBottom: 3 }}>{c.title}</div>
                <div style={{ fontSize: 12, color: "rgba(255,255,255,0.5)" }}>by {c.trainer}</div>
              </div>
              <span style={{ background: c.price === "Free" ? "rgba(34,197,94,0.15)" : "rgba(255,42,42,0.15)", color: c.price === "Free" ? "#22C55E" : "#FF2A2A", fontSize: 12, fontWeight: 700, padding: "4px 10px", borderRadius: 8 }}>{c.price}</span>
            </div>
            <div style={{ display: "flex", gap: 8, flexWrap: "wrap", marginBottom: 12 }}>
              <span style={{ background: "rgba(255,255,255,0.06)", fontSize: 12, color: "rgba(255,255,255,0.6)", padding: "4px 10px", borderRadius: 8 }}>📍 {c.location}</span>
              <span style={{ background: "rgba(255,255,255,0.06)", fontSize: 12, color: "rgba(255,255,255,0.6)", padding: "4px 10px", borderRadius: 8 }}>📅 {c.date} · {c.time}</span>
              <span style={{ background: "rgba(255,255,255,0.06)", fontSize: 12, color: "rgba(255,255,255,0.6)", padding: "4px 10px", borderRadius: 8 }}>⏱ {c.duration}</span>
              <span style={{ background: "rgba(255,255,255,0.06)", fontSize: 12, color: "rgba(255,255,255,0.6)", padding: "4px 10px", borderRadius: 8 }}>👥 {c.booked}/{c.spots}</span>
            </div>
            <button style={{ ...styles.btn(), borderRadius: 12, padding: "12px" }} onClick={e => { e.stopPropagation(); tryAction(() => { setBookingItem({ title: c.title, date: c.date, time: c.time, duration: c.duration, location: c.location, price: c.price }); setBookingConfirmed(false); }); }}>Book Spot</button>
          </div>
        ))}
      </div>
    </div>
  );

  // ── PARTNER / SWIPE MODE ──────────────────────────────────────
  return (
    <div style={{ ...styles.screen, paddingBottom: 80 }}>
      <div style={{ background: "rgba(4,14,34,0.9)", padding: "50px 20px 16px", borderBottom: "1px solid rgba(255,255,255,0.08)", display: "flex", alignItems: "center", gap: 12 }}>
        <button onClick={() => setMode(null)} style={{ background: "none", border: "none", cursor: "pointer", fontSize: 22, color: "#fff" }}>←</button>
        <span style={{ fontSize: 17, fontWeight: 700, flex: 1 }}>Find a GymLink Partner</span>
        <button onClick={() => setShowFilters(true)} style={{ background: "rgba(255,42,42,0.15)", border: "1px solid rgba(255,42,42,0.3)", borderRadius: 10, padding: "7px 14px", cursor: "pointer", color: "#FF2A2A", fontWeight: 600, fontSize: 12 }}>Filters ⚙️</button>
      </div>

      <div style={{ flex: 1, padding: "20px 16px", display: "flex", flexDirection: "column", alignItems: "center", gap: 16 }}>
        {current ? (
          <div onTouchStart={onTouchStart} onTouchMove={onTouchMove} onTouchEnd={onTouchEnd}
            style={{ width: "100%", maxWidth: 380, transform: swipeDir === "right" ? "rotate(8deg) translateX(60px)" : swipeDir === "left" ? "rotate(-8deg) translateX(-60px)" : `translateX(${dragX}px) rotate(${dragX * 0.05}deg)`, opacity: swipeDir ? 0 : 1, transition: isDragging ? "none" : "all 0.35s cubic-bezier(0.34,1.56,0.64,1)" }}>
            <div style={{ ...styles.card, padding: 0, overflow: "hidden", borderRadius: 24, boxShadow: "0 16px 48px rgba(0,0,0,0.5)" }}>
              <div style={{ background: `linear-gradient(135deg, ${current.color}30, rgba(8,26,58,0.8))`, padding: "32px 24px", display: "flex", flexDirection: "column", alignItems: "center", gap: 12, position: "relative" }}>
                {dragX > 40 && <div style={{ position: "absolute", top: 20, left: 20, background: "#22C55E", color: "#fff", fontWeight: 800, fontSize: 18, padding: "6px 16px", borderRadius: 10, transform: "rotate(-15deg)", border: "2.5px solid #fff" }}>LINK 💪</div>}
                {dragX < -40 && <div style={{ position: "absolute", top: 20, right: 20, background: "#FF2A2A", color: "#fff", fontWeight: 800, fontSize: 18, padding: "6px 16px", borderRadius: 10, transform: "rotate(15deg)", border: "2.5px solid #fff" }}>SKIP ✕</div>}
                <Avatar initials={current.avatar} color={current.color} size={90} />
                <div style={{ textAlign: "center" }}>
                  <h2 style={{ margin: 0, fontSize: 24, fontWeight: 800, color: "#FFFFFF" }}>{current.name}</h2>
                  <p style={{ margin: "4px 0 0", color: "rgba(255,255,255,0.55)", fontSize: 14 }}>{current.age} • {current.gender}</p>
                </div>
                <ScoreBadge score={current.score} />
              </div>
              <div style={{ padding: "20px 24px", display: "flex", flexDirection: "column", gap: 14 }}>
                <div style={{ display: "flex", gap: 8, flexWrap: "wrap" }}>
                  <span style={{ background: catColor(current.level) + "20", color: catColor(current.level), fontSize: 12, fontWeight: 700, padding: "4px 12px", borderRadius: 8 }}>{current.level}</span>
                  <span style={{ background: "rgba(47,109,255,0.12)", color: "#2F6DFF", fontSize: 12, fontWeight: 600, padding: "4px 12px", borderRadius: 8 }}>📍 {current.gym}</span>
                </div>
                <p style={{ margin: 0, color: "rgba(255,255,255,0.55)", fontSize: 14, lineHeight: 1.5 }}>{current.bio}</p>
                <div style={{ background: "rgba(255,255,255,0.05)", borderRadius: 12, padding: "10px 14px" }}>
                  <span style={{ fontSize: 12, color: "rgba(255,255,255,0.45)", fontWeight: 600 }}>Looking for: </span>
                  <span style={{ fontSize: 12, color: "#FFFFFF", fontWeight: 600 }}>{current.lookingFor}</span>
                </div>
                {current.days?.length > 0 && <div style={{ display: "flex", gap: 6 }}>{current.days.map(d => <span key={d} style={{ background: "rgba(47,109,255,0.12)", color: "#2F6DFF", fontSize: 11, fontWeight: 700, padding: "3px 9px", borderRadius: 6 }}>{d}</span>)}</div>}
                <button onClick={() => setViewProfile(current)} style={{ background: "none", border: "none", cursor: "pointer", color: "rgba(255,255,255,0.45)", fontSize: 13, fontWeight: 600, padding: 0, display: "flex", alignItems: "center", justifyContent: "center", marginTop: 2 }}>View full profile ›</button>
              </div>
            </div>
          </div>
        ) : (
          <div style={{ flex: 1, display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center", gap: 16, padding: 40, textAlign: "center" }}>
            <span style={{ fontSize: 60 }}>😅</span>
            <h3 style={{ color: "#FFFFFF", margin: 0 }}>No more profiles!</h3>
            <p style={{ color: "rgba(255,255,255,0.5)", margin: 0 }}>Check back later or adjust your filters.</p>
          </div>
        )}

        {current && (
          <>
            <div style={{ display: "flex", alignItems: "center", justifyContent: "center", gap: 32, marginTop: 8 }}>
              <button onClick={() => handleSwipe("left")} style={{ width: 64, height: 64, borderRadius: 32, border: "2px solid rgba(255,42,42,0.3)", background: "rgba(255,255,255,0.04)", cursor: "pointer", display: "flex", alignItems: "center", justifyContent: "center", boxShadow: "0 4px 20px rgba(255,42,42,0.15)" }}>
                <svg width="26" height="26" viewBox="0 0 24 24" fill="none"><line x1="18" y1="6" x2="6" y2="18" stroke="#FF2A2A" strokeWidth="2.5" strokeLinecap="round"/><line x1="6" y1="6" x2="18" y2="18" stroke="#FF2A2A" strokeWidth="2.5" strokeLinecap="round"/></svg>
              </button>
              <button onClick={() => handleSwipe("right")} style={{ width: 76, height: 76, borderRadius: 38, border: "none", background: "linear-gradient(135deg, #FF2A2A, #cc0000)", cursor: "pointer", display: "flex", alignItems: "center", justifyContent: "center", boxShadow: "0 8px 28px rgba(255,42,42,0.45)" }}>
                <svg width="32" height="32" viewBox="0 0 24 24" fill="none"><path d="M12 21C12 21 3 14.5 3 8.5C3 5.42 5.42 3 8.5 3C10.24 3 11.91 3.81 13 5.08C14.09 3.81 15.76 3 17.5 3C20.58 3 23 5.42 23 8.5C23 14.5 12 21 12 21Z" fill="white" opacity="0.9"/></svg>
              </button>
            </div>
            <div style={{ display: "flex", justifyContent: "center", gap: 88, marginTop: 2 }}>
              <span style={{ fontSize: 11, fontWeight: 700, color: "#FF2A2A", letterSpacing: 0.5, textTransform: "uppercase" }}>Pass</span>
              <span style={{ fontSize: 11, fontWeight: 700, color: "#22C55E", letterSpacing: 0.5, textTransform: "uppercase" }}>Connect</span>
            </div>
          </>
        )}
      </div>

      {/* Filters */}
      {showFilters && (
        <div style={{ position: "fixed", inset: 0, background: "rgba(0,0,0,0.7)", zIndex: 200, display: "flex", alignItems: "flex-end" }}>
          <div style={{ background: "#0D1E4A", borderRadius: "24px 24px 0 0", width: "100%", maxWidth: 430, margin: "0 auto", padding: "24px 24px 40px", border: "1px solid rgba(255,255,255,0.1)", display: "flex", flexDirection: "column", gap: 20 }}>
            <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
              <h3 style={{ margin: 0 }}>Filter Profiles</h3>
              <button onClick={() => setShowFilters(false)} style={{ background: "rgba(255,255,255,0.08)", border: "none", borderRadius: 10, width: 32, height: 32, cursor: "pointer", color: "#fff", fontSize: 16, display: "flex", alignItems: "center", justifyContent: "center" }}>✕</button>
            </div>
            <div><label style={styles.label}>Fitness Level</label><div style={{ display: "flex", gap: 8, flexWrap: "wrap" }}>{["", "Beginner", "Intermediate", "Advanced", "Pro"].map(l => <div key={l} onClick={() => setFilters(f => ({ ...f, level: l }))} style={styles.chip(filters.level === l)}>{l || "Any"}</div>)}</div></div>
            <div><label style={styles.label}>Gender</label><div style={{ display: "flex", gap: 8 }}>{["", "Male", "Female", "Non-binary"].map(g => <div key={g} onClick={() => setFilters(f => ({ ...f, gender: g }))} style={{ ...styles.chip(filters.gender === g), flex: 1, textAlign: "center" }}>{g || "Any"}</div>)}</div></div>
            <button style={styles.btn()} onClick={() => setShowFilters(false)}>Apply Filters</button>
          </div>
        </div>
      )}

      {/* Profile view sheet */}
      {viewProfile && (
        <div style={{ position: "fixed", inset: 0, background: "rgba(0,0,0,0.75)", zIndex: 250, display: "flex", alignItems: "flex-end" }} onClick={() => setViewProfile(null)}>
          <div onClick={e => e.stopPropagation()} style={{ background: "#0D1E4A", borderRadius: "24px 24px 0 0", width: "100%", maxWidth: 430, margin: "0 auto", maxHeight: "88vh", overflow: "auto", paddingBottom: 40, border: "1px solid rgba(255,255,255,0.1)" }}>
            <div style={{ display: "flex", justifyContent: "center", paddingTop: 12, paddingBottom: 4 }}><div style={{ width: 40, height: 4, borderRadius: 2, background: "rgba(255,255,255,0.15)" }} /></div>
            <div style={{ background: `linear-gradient(135deg, ${viewProfile.color}25, rgba(8,26,58,0.9))`, padding: "20px 24px 24px", display: "flex", flexDirection: "column", alignItems: "center", gap: 12, position: "relative" }}>
              <button onClick={() => setViewProfile(null)} style={{ position: "absolute", top: 16, right: 16, background: "rgba(255,255,255,0.1)", border: "none", borderRadius: 20, width: 32, height: 32, cursor: "pointer", fontSize: 16, color: "#fff", display: "flex", alignItems: "center", justifyContent: "center" }}>✕</button>
              <Avatar initials={viewProfile.avatar} color={viewProfile.color} size={80} />
              <div style={{ textAlign: "center" }}><h2 style={{ margin: 0, fontSize: 22, fontWeight: 800 }}>{viewProfile.name}</h2><p style={{ margin: "4px 0 0", color: "rgba(255,255,255,0.55)", fontSize: 14 }}>{viewProfile.age} • {viewProfile.gender}</p></div>
              <ScoreBadge score={viewProfile.score} />
            </div>
            <div style={{ padding: "20px 24px", display: "flex", flexDirection: "column", gap: 16 }}>
              <div style={{ display: "flex", gap: 8, flexWrap: "wrap" }}>
                <span style={{ background: catColor(viewProfile.level) + "20", color: catColor(viewProfile.level), fontSize: 12, fontWeight: 700, padding: "5px 12px", borderRadius: 8 }}>{viewProfile.level}</span>
                <span style={{ background: "rgba(47,109,255,0.12)", color: "#2F6DFF", fontSize: 12, fontWeight: 600, padding: "5px 12px", borderRadius: 8 }}>📍 {viewProfile.gym}</span>
              </div>
              <p style={{ margin: 0, color: "rgba(255,255,255,0.7)", fontSize: 14, lineHeight: 1.6 }}>{viewProfile.bio}</p>
              <div style={{ background: "rgba(255,255,255,0.05)", borderRadius: 12, padding: "12px 14px" }}><span style={{ fontSize: 12, color: "rgba(255,255,255,0.45)", fontWeight: 600 }}>Looking for: </span><span style={{ fontSize: 13, color: "#FFFFFF", fontWeight: 600 }}>{viewProfile.lookingFor}</span></div>
              {viewProfile.days?.length > 0 && <div style={{ display: "flex", gap: 6, flexWrap: "wrap" }}>{viewProfile.days.map(d => <span key={d} style={{ background: "rgba(47,109,255,0.12)", color: "#2F6DFF", fontSize: 12, fontWeight: 700, padding: "5px 12px", borderRadius: 8 }}>{d}</span>)}</div>}
              <div style={{ display: "flex", gap: 10, marginTop: 4 }}>
                <button onClick={() => { setViewProfile(null); handleSwipe("left"); }} style={{ ...styles.btn("outline"), flex: 1, borderRadius: 14 }}>Pass</button>
                <button onClick={() => { setViewProfile(null); handleSwipe("right"); }} style={{ ...styles.btn(), flex: 2 }}>💪 Connect</button>
              </div>
              <div style={{ borderTop: "1px solid rgba(255,255,255,0.08)", paddingTop: 16 }}>
                <button style={{ background: "none", border: "none", cursor: "pointer", display: "flex", alignItems: "center", gap: 8, color: "#FF2A2A", fontSize: 13, fontWeight: 600, padding: 0 }}>🚩 Report or Block this user</button>
              </div>
            </div>
          </div>
        </div>
      )}
    {/* ── Daily GymLink Modal ── */}
    {showDailySheet && (
      <div style={{ position: "fixed", inset: 0, background: "rgba(0,0,0,0.75)", zIndex: 600, display: "flex", alignItems: "flex-end" }}>
        <div style={{ background: "#0D1E4A", borderRadius: "28px 28px 0 0", width: "100%", maxWidth: 430, margin: "0 auto", maxHeight: "90vh", overflow: "auto", paddingBottom: 40, border: "1px solid rgba(255,255,255,0.1)" }}>
          <div style={{ display: "flex", justifyContent: "center", paddingTop: 14 }}><div style={{ width: 40, height: 4, borderRadius: 2, background: "rgba(255,255,255,0.15)" }} /></div>

          {/* Step 1 — Choose Today or Future */}
          {dailyStep === 1 && (
            <div style={{ padding: "20px 24px 8px" }}>
              <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", marginBottom: 20 }}>
                <div>
                  <h3 style={{ margin: "0 0 4px", fontSize: 20, fontWeight: 900 }}>GymLink</h3>
                  <p style={{ margin: 0, fontSize: 13, color: "rgba(255,255,255,0.5)" }}>What are you looking for today?</p>
                </div>
                <button onClick={() => { setShowDailySheet(false); onDismissDaily && onDismissDaily(); }} style={{ background: "rgba(255,255,255,0.08)", border: "none", borderRadius: 10, padding: "6px 14px", cursor: "pointer", color: "rgba(255,255,255,0.5)", fontSize: 13, fontWeight: 600 }}>Skip</button>
              </div>
              <div style={{ display: "flex", flexDirection: "column", gap: 12, marginBottom: 20 }}>
                <div onClick={() => { setDailyMode("today"); setDailyStep(2); }}
                  style={{ borderRadius: 18, border: `2px solid ${dailyMode === "today" ? "#FF2A2A" : "rgba(255,255,255,0.1)"}`, background: dailyMode === "today" ? "rgba(255,42,42,0.1)" : "rgba(255,255,255,0.04)", padding: "18px 20px", cursor: "pointer", display: "flex", alignItems: "center", gap: 16 }}>
                  <div style={{ width: 52, height: 52, borderRadius: 16, background: "#FF2A2A", display: "flex", alignItems: "center", justifyContent: "center", fontSize: 26, flexShrink: 0 }}>⚡</div>
                  <div style={{ flex: 1 }}>
                    <div style={{ fontSize: 16, fontWeight: 800, marginBottom: 3 }}>GymLink for Today</div>
                    <div style={{ fontSize: 13, color: "rgba(255,255,255,0.5)" }}>Find a training partner right now</div>
                    <div style={{ fontSize: 11, color: "#FF2A2A", fontWeight: 700, marginTop: 5 }}>⚡ {DAILY_MATCHES.length} matches available near you</div>
                  </div>
                  <span style={{ color: "rgba(255,255,255,0.4)", fontSize: 22 }}>›</span>
                </div>
                <div onClick={() => { setDailyMode("future"); setDailyStep(2); }}
                  style={{ borderRadius: 18, border: `2px solid ${dailyMode === "future" ? "#2F6DFF" : "rgba(255,255,255,0.1)"}`, background: dailyMode === "future" ? "rgba(47,109,255,0.1)" : "rgba(255,255,255,0.04)", padding: "18px 20px", cursor: "pointer", display: "flex", alignItems: "center", gap: 16 }}>
                  <div style={{ width: 52, height: 52, borderRadius: 16, background: "#2F6DFF", display: "flex", alignItems: "center", justifyContent: "center", fontSize: 26, flexShrink: 0 }}>📅</div>
                  <div style={{ flex: 1 }}>
                    <div style={{ fontSize: 16, fontWeight: 800, marginBottom: 3 }}>GymLink for Future Date</div>
                    <div style={{ fontSize: 13, color: "rgba(255,255,255,0.5)" }}>Plan a session on a specific date</div>
                  </div>
                  <span style={{ color: "rgba(255,255,255,0.4)", fontSize: 22 }}>›</span>
                </div>
              </div>
            </div>
          )}

          {/* Step 2 — Set preferences */}
          {dailyStep === 2 && (
            <div style={{ padding: "20px 24px" }}>
              <div style={{ display: "flex", alignItems: "center", gap: 12, marginBottom: 20 }}>
                <button onClick={() => setDailyStep(1)} style={{ background: "rgba(255,255,255,0.08)", border: "none", borderRadius: 10, width: 34, height: 34, cursor: "pointer", color: "#fff", fontSize: 18, display: "flex", alignItems: "center", justifyContent: "center" }}>←</button>
                <div>
                  <h3 style={{ margin: "0 0 2px", fontSize: 18, fontWeight: 800 }}>{dailyMode === "today" ? "⚡ GymLink for Today" : "📅 GymLink for Future Date"}</h3>
                  <p style={{ margin: 0, fontSize: 12, color: "rgba(255,255,255,0.5)" }}>Set your preferences</p>
                </div>
              </div>
              <div style={{ display: "flex", flexDirection: "column", gap: 16, marginBottom: 20 }}>
                {dailyMode === "future" && <PickerField label="Date" type="date" min={new Date().toISOString().split("T")[0]} max={(() => { const d = new Date(); d.setDate(d.getDate() + 14); return d.toISOString().split("T")[0]; })()} value={dailyDate} onChange={e => setDailyDate(e.target.value)} />}
                <PickerField label="What time?" type="time" value={dailyTime} onChange={e => setDailyTime(e.target.value)} />
                <div>
                  <label style={styles.label}>Session Duration</label>
                  <div style={{ display: "flex", gap: 8 }}>
                    {DURATIONS.map(d => <div key={d} onClick={() => setDailyDuration(d)} style={{ ...styles.chip(dailyDuration === d), flex: 1, textAlign: "center", fontSize: 11 }}>{d}</div>)}
                  </div>
                </div>
              </div>
              <button style={{ ...styles.btn(), opacity: dailyTime ? 1 : 0.4 }} onClick={() => { if (dailyTime) { if (!canMatch) { setShowDailySheet(false); setShowGate(true); } else setDailyStep(3); } }}>
                Find Matches →
              </button>
            </div>
          )}

          {/* Step 3 — Match cards (swipe left/right) */}
          {dailyStep === 3 && currentMatch && (
            <div style={{ padding: "20px 24px" }}>
              <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 16 }}>
                <div>
                  <h3 style={{ margin: "0 0 2px", fontSize: 18, fontWeight: 800 }}>Your GymLinks</h3>
                  <p style={{ margin: 0, fontSize: 12, color: "rgba(255,255,255,0.5)" }}>{DAILY_MATCHES.length - matchIdx} potential matches · {dailyTime}{dailyDate ? ` · ${dailyDate}` : ""} · {dailyDuration}</p>
                </div>
                <button onClick={() => { setShowDailySheet(false); onDismissDaily && onDismissDaily(); }} style={{ background: "rgba(255,255,255,0.08)", border: "none", borderRadius: 10, padding: "6px 12px", cursor: "pointer", color: "rgba(255,255,255,0.5)", fontSize: 12, fontWeight: 600 }}>Close</button>
              </div>

              {/* Swipeable match card */}
              <div
                onTouchStart={onMatchTouchStart}
                onTouchMove={onMatchTouchMove}
                onTouchEnd={onMatchTouchEnd}
                style={{ transform: `translateX(${matchDragX}px) rotate(${matchDragX * 0.04}deg)`, transition: matchStartX ? "none" : "transform 0.3s ease", marginBottom: 16 }}>
                <div style={{ background: `linear-gradient(135deg, ${currentMatch.color}25, rgba(8,26,58,0.95))`, border: "1px solid rgba(255,255,255,0.1)", borderRadius: 20, padding: "20px", position: "relative" }}>
                  {matchDragX > 40 && <div style={{ position: "absolute", top: 16, left: 16, background: "#22C55E", color: "#fff", fontWeight: 800, fontSize: 15, padding: "5px 14px", borderRadius: 8, transform: "rotate(-12deg)" }}>ACCEPT ✓</div>}
                  {matchDragX < -40 && <div style={{ position: "absolute", top: 16, right: 16, background: "#FF2A2A", color: "#fff", fontWeight: 800, fontSize: 15, padding: "5px 14px", borderRadius: 8, transform: "rotate(12deg)" }}>DECLINE ✕</div>}
                  <div style={{ display: "flex", gap: 14, alignItems: "center", marginBottom: 12 }}>
                    <Avatar initials={currentMatch.avatar} color={currentMatch.color} size={64} />
                    <div style={{ flex: 1 }}>
                      <div style={{ fontSize: 18, fontWeight: 800 }}>{currentMatch.name}</div>
                      <div style={{ display: "flex", gap: 6, marginTop: 5 }}>
                        <span style={{ background: "rgba(47,109,255,0.15)", color: "#2F6DFF", fontSize: 11, fontWeight: 700, padding: "3px 8px", borderRadius: 6 }}>{currentMatch.level}</span>
                        <span style={{ background: "rgba(255,255,255,0.07)", fontSize: 11, color: "rgba(255,255,255,0.6)", padding: "3px 8px", borderRadius: 6 }}>📍 {currentMatch.gym}</span>
                      </div>
                    </div>
                    <ScoreBadge score={currentMatch.score} />
                  </div>
                  <p style={{ margin: "0 0 12px", fontSize: 13, color: "rgba(255,255,255,0.6)", lineHeight: 1.5 }}>{currentMatch.bio}</p>
                  <div style={{ background: "rgba(255,255,255,0.05)", borderRadius: 10, padding: "8px 12px", fontSize: 12, color: "rgba(255,255,255,0.5)" }}>
                    🕐 Available {dailyTime} · ⏱ {dailyDuration}
                  </div>
                </div>
              </div>

              <p style={{ margin: "0 0 12px", fontSize: 12, color: "rgba(255,255,255,0.35)", textAlign: "center" }}>Swipe or tap buttons · {matchIdx + 1} of {DAILY_MATCHES.length}</p>

              <div style={{ display: "flex", gap: 12 }}>
                <button onClick={() => handleMatchSwipe("left")}
                  style={{ flex: 1, padding: "14px", borderRadius: 14, border: "2px solid rgba(255,42,42,0.4)", background: "transparent", cursor: "pointer", fontSize: 14, fontWeight: 800, color: "#FF2A2A" }}>
                  ✕ Decline
                </button>
                <button onClick={() => handleMatchSwipe("right")}
                  style={{ flex: 2, padding: "14px", borderRadius: 14, border: "none", background: "#22C55E", cursor: "pointer", fontSize: 14, fontWeight: 800, color: "#fff" }}>
                  ✓ Accept
                </button>
              </div>
            </div>
          )}

          {/* No more matches */}
          {dailyStep === 3 && !currentMatch && (
            <div style={{ padding: "40px 24px", textAlign: "center" }}>
              <div style={{ fontSize: 52, marginBottom: 12 }}>🏋️</div>
              <h3 style={{ margin: "0 0 8px", fontSize: 18, fontWeight: 800 }}>No more matches</h3>
              <p style={{ margin: "0 0 24px", fontSize: 14, color: "rgba(255,255,255,0.5)" }}>Check back later or try a different time</p>
              <button style={styles.btn()} onClick={() => { setShowDailySheet(false); onDismissDaily && onDismissDaily(); }}>Browse Discover</button>
            </div>
          )}
        </div>
      </div>
    )}

    {/* ── Gate Modal — profile/ID required ── */}
    {showGate && (
      <div style={{ position: "fixed", inset: 0, background: "rgba(0,0,0,0.8)", zIndex: 700, display: "flex", alignItems: "center", justifyContent: "center", padding: 24 }} onClick={() => setShowGate(false)}>
        <div onClick={e => e.stopPropagation()} style={{ background: "#0D1E4A", border: "1px solid rgba(255,255,255,0.12)", borderRadius: 24, padding: "28px 24px", width: "100%", maxWidth: 340 }}>
          <div style={{ width: 64, height: 64, borderRadius: 20, background: "rgba(255,42,42,0.15)", display: "flex", alignItems: "center", justifyContent: "center", fontSize: 30, margin: "0 auto 18px" }}>🔒</div>
          <h3 style={{ margin: "0 0 8px", fontSize: 18, fontWeight: 800, textAlign: "center" }}>Complete Setup to Match</h3>
          <p style={{ margin: "0 0 22px", fontSize: 14, color: "rgba(255,255,255,0.6)", lineHeight: 1.6, textAlign: "center" }}>You need to complete your profile and verify your ID before connecting with other users.</p>
          <div style={{ display: "flex", flexDirection: "column", gap: 10 }}>
            {!profileComplete && <button style={{ ...styles.btn(), background: "#FF2A2A" }} onClick={() => { setShowGate(false); onCompleteProfile && onCompleteProfile(); }}>Complete Profile →</button>}
            {!idVerified && <button style={{ ...styles.btn(), background: "#2F6DFF" }} onClick={() => { setShowGate(false); onVerifyId && onVerifyId(); }}>Verify ID →</button>}
            <button style={{ ...styles.btn("ghost"), color: "rgba(255,255,255,0.4)" }} onClick={() => setShowGate(false)}>Browse only</button>
          </div>
        </div>
      </div>
    )}

    {/* ── Booking Sheet ── */}
    {bookingItem && (
      <div style={{ position: "fixed", inset: 0, background: "rgba(0,0,0,0.75)", zIndex: 500, display: "flex", alignItems: "flex-end" }} onClick={() => { if (!bookingConfirmed) { setBookingItem(null); } }}>
        <div onClick={e => e.stopPropagation()} style={{ background: "#0D1E4A", borderRadius: "24px 24px 0 0", width: "100%", maxWidth: 430, margin: "0 auto", padding: "24px 24px 48px", border: "1px solid rgba(255,255,255,0.1)" }}>
          <div style={{ display: "flex", justifyContent: "center", marginBottom: 16 }}><div style={{ width: 40, height: 4, borderRadius: 2, background: "rgba(255,255,255,0.15)" }} /></div>
          {bookingConfirmed ? (
            <div style={{ textAlign: "center", padding: "8px 0" }}>
              <div style={{ width: 72, height: 72, borderRadius: 22, background: "rgba(34,197,94,0.15)", border: "1px solid rgba(34,197,94,0.3)", display: "flex", alignItems: "center", justifyContent: "center", fontSize: 34, margin: "0 auto 16px" }}>✅</div>
              <h3 style={{ margin: "0 0 8px", fontSize: 20, fontWeight: 800 }}>You're booked!</h3>
              <p style={{ margin: "0 0 6px", fontSize: 14, color: "rgba(255,255,255,0.7)" }}>{bookingItem.title}</p>
              <p style={{ margin: "0 0 24px", fontSize: 13, color: "rgba(255,255,255,0.5)" }}>{bookingItem.date} · {bookingItem.time} · {bookingItem.duration}</p>
              <button style={styles.btn()} onClick={() => { setBookingItem(null); setBookingConfirmed(false); }}>Done</button>
            </div>
          ) : (
            <>
              <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", marginBottom: 20 }}>
                <div>
                  <h3 style={{ margin: "0 0 4px", fontSize: 18, fontWeight: 800 }}>Confirm Booking</h3>
                  <p style={{ margin: 0, fontSize: 13, color: "rgba(255,255,255,0.5)" }}>{bookingItem.title}</p>
                </div>
                <button onClick={() => setBookingItem(null)} style={{ background: "rgba(255,255,255,0.08)", border: "none", borderRadius: 10, width: 32, height: 32, cursor: "pointer", color: "#fff", fontSize: 16, display: "flex", alignItems: "center", justifyContent: "center" }}>✕</button>
              </div>
              <div style={{ display: "flex", flexDirection: "column", gap: 10, marginBottom: 20 }}>
                {[
                  { icon: "📅", label: "Date", value: bookingItem.date },
                  { icon: "🕐", label: "Time", value: bookingItem.time },
                  { icon: "⏱", label: "Duration", value: bookingItem.duration },
                  { icon: "📍", label: "Location", value: bookingItem.location },
                  { icon: "💷", label: "Price", value: bookingItem.price },
                ].filter(r => r.value).map(r => (
                  <div key={r.label} style={{ display: "flex", alignItems: "center", gap: 12, background: "rgba(255,255,255,0.05)", borderRadius: 12, padding: "12px 14px" }}>
                    <span style={{ fontSize: 16, width: 24 }}>{r.icon}</span>
                    <span style={{ fontSize: 13, color: "rgba(255,255,255,0.5)", width: 72 }}>{r.label}</span>
                    <span style={{ fontSize: 14, fontWeight: 600 }}>{r.value}</span>
                  </div>
                ))}
              </div>
              <button style={{ ...styles.btn(), padding: "16px", fontSize: 15, fontWeight: 800 }} onClick={() => setBookingConfirmed(true)}>
                Confirm Booking {bookingItem.price !== "Free" ? `· ${bookingItem.price}` : "· Free"}
              </button>
            </>
          )}
        </div>
      </div>
    )}

    {/* ── Trainer Profile Sheet ── */}
    {selectedTrainer && (
      <div style={{ position: "fixed", inset: 0, background: "rgba(0,0,0,0.75)", zIndex: 500, display: "flex", alignItems: "flex-end" }} onClick={() => setSelectedTrainer(null)}>
        <div onClick={e => e.stopPropagation()} style={{ background: "#0D1E4A", borderRadius: "24px 24px 0 0", width: "100%", maxWidth: 430, margin: "0 auto", maxHeight: "88vh", overflow: "auto", paddingBottom: 40, border: "1px solid rgba(255,255,255,0.1)" }}>
          <div style={{ display: "flex", justifyContent: "center", paddingTop: 12 }}><div style={{ width: 40, height: 4, borderRadius: 2, background: "rgba(255,255,255,0.15)" }} /></div>
          <div style={{ background: `linear-gradient(135deg, ${selectedTrainer.color}25, rgba(8,26,58,0.9))`, padding: "20px 24px", display: "flex", gap: 14, alignItems: "center" }}>
            <Avatar initials={selectedTrainer.avatar} color={selectedTrainer.color} size={64} />
            <div style={{ flex: 1 }}>
              <div style={{ fontSize: 18, fontWeight: 800, marginBottom: 2 }}>{selectedTrainer.name}</div>
              <div style={{ display: "flex", gap: 6, marginBottom: 5 }}>{selectedTrainer.verified && <VerifiedBadge />}</div>
              <StarRating rating={selectedTrainer.rating} />
            </div>
            <button onClick={() => setSelectedTrainer(null)} style={{ background: "rgba(255,255,255,0.1)", border: "none", borderRadius: 20, width: 32, height: 32, cursor: "pointer", color: "#fff", fontSize: 16, display: "flex", alignItems: "center", justifyContent: "center", flexShrink: 0 }}>✕</button>
          </div>
          <div style={{ padding: "16px 20px", display: "flex", flexDirection: "column", gap: 14 }}>
            <div style={{ display: "flex", gap: 8, flexWrap: "wrap" }}>{selectedTrainer.specialty.map(s => <span key={s} style={{ background: "rgba(47,109,255,0.15)", color: "#2F6DFF", fontSize: 12, fontWeight: 600, padding: "4px 10px", borderRadius: 8 }}>{s}</span>)}</div>
            <div style={{ display: "flex", gap: 10 }}>
              {[{ label: "Rating", val: `${selectedTrainer.rating}★` }, { label: "Reviews", val: String(selectedTrainer.reviews) }, { label: "Rate", val: selectedTrainer.price }].map(s => (
                <div key={s.label} style={{ flex: 1, background: "rgba(255,255,255,0.05)", borderRadius: 12, padding: "10px", textAlign: "center" }}>
                  <div style={{ fontSize: 15, fontWeight: 800, color: "#FFFFFF" }}>{s.val}</div>
                  <div style={{ fontSize: 10, color: "rgba(255,255,255,0.45)", marginTop: 2 }}>{s.label}</div>
                </div>
              ))}
            </div>
            <p style={{ margin: 0, fontSize: 14, color: "rgba(255,255,255,0.65)", lineHeight: 1.6 }}>{selectedTrainer.bio}</p>
            <div style={{ display: "flex", alignItems: "center", gap: 8 }}><span style={{ fontSize: 14 }}>📍</span><span style={{ fontSize: 13, color: "rgba(255,255,255,0.6)" }}>{selectedTrainer.gym}</span></div>
            <div style={{ display: "flex", gap: 10 }}>
              <button style={{ ...styles.btn("outline"), flex: 1 }} onClick={() => setSelectedTrainer(null)}>Close</button>
              <button style={{ ...styles.btn(), flex: 2 }} onClick={() => { setBookingItem({ title: `1-to-1 with ${selectedTrainer.name}`, date: "Select date", time: "Select time", duration: "1 hour", location: selectedTrainer.gym, price: selectedTrainer.price }); setSelectedTrainer(null); setBookingConfirmed(false); }}>Book Session</button>
            </div>
          </div>
        </div>
      </div>
    )}
    </div>
  );
}

// ── MATCHES / CHAT ────────────────────────────────────────────────────────────
function MatchesScreen() {
  const [active, setActive] = useState(null);
  const [messages, setMessages] = useState([
    { from: "them", text: "Hey! Ready to train tomorrow?" },
    { from: "me", text: "Absolutely! What time works for you?" },
    { from: "them", text: "Sounds good! See you at 6pm 💪" },
  ]);
  const [input, setInput] = useState("");

  if (active) {
    return (
      <div style={{ ...styles.screen, height: "100vh" }}>
        <div style={{ background: "rgba(255,255,255,0.06)", padding: "50px 16px 12px", borderBottom: "1px solid rgba(255,255,255,0.08)", display: "flex", alignItems: "center", gap: 12 }}>
          <button onClick={() => setActive(null)} style={{ background: "none", border: "none", fontSize: 22, cursor: "pointer" }}>←</button>
          <Avatar initials={active.avatar} color={active.color} size={38} />
          <div><div style={{ fontWeight: 700, fontSize: 16 }}>{active.name}</div><div style={{ fontSize: 12, color: "#22C55E" }}>● Active now</div></div>
          <div style={{ marginLeft: "auto", display: "flex", gap: 8 }}>
            <button style={{ background: "none", border: "none", cursor: "pointer", fontSize: 20 }}>🚩</button>
            <button style={{ background: "none", border: "none", cursor: "pointer", fontSize: 20 }}>🚫</button>
          </div>
        </div>
        <div style={{ background: "rgba(245,158,11,0.12)", padding: "8px 16px", borderBottom: "1px solid rgba(245,158,11,0.2)", display: "flex", gap: 8, alignItems: "flex-start" }}>
          <span style={{ fontSize: 16 }}>⚠️</span>
          <p style={{ margin: 0, fontSize: 12, color: "#F59E0B", lineHeight: 1.4 }}>We strongly recommend meeting inside the gym only. GymLink is not responsible for meetings outside the gym or external contact sharing.</p>
        </div>
        <div style={{ flex: 1, padding: "16px", overflow: "auto", display: "flex", flexDirection: "column", gap: 10, paddingBottom: 80 }}>
          {messages.map((m, i) => (
            <div key={i} style={{ display: "flex", justifyContent: m.from === "me" ? "flex-end" : "flex-start" }}>
              <div style={{ background: m.from === "me" ? "#2F6DFF" : "#FFFFFF", color: m.from === "me" ? "#FFFFFF" : C.text, padding: "10px 16px", borderRadius: m.from === "me" ? "18px 18px 4px 18px" : "18px 18px 18px 4px", maxWidth: "75%", fontSize: 14, lineHeight: 1.4, boxShadow: "0 2px 8px rgba(0,0,0,0.08)" }}>{m.text}</div>
            </div>
          ))}
        </div>
        <div style={{ position: "fixed", bottom: 0, left: "50%", transform: "translateX(-50%)", width: "100%", maxWidth: 430, padding: "12px 16px 28px", background: "rgba(4,14,34,0.97)", borderTop: "1px solid rgba(255,255,255,0.08)", display: "flex", gap: 10 }}>
          <input style={{ ...styles.input, flex: 1 }} placeholder="Type a message..." value={input} onChange={e => setInput(e.target.value)} onKeyDown={e => { if (e.key === "Enter" && input.trim()) { setMessages(m => [...m, { from: "me", text: input }]); setInput(""); } }} />
          <button style={{ background: "#FF2A2A", border: "none", borderRadius: 12, width: 44, height: 44, cursor: "pointer", color: "#fff", fontSize: 18, flexShrink: 0 }} onClick={() => { if (input.trim()) { setMessages(m => [...m, { from: "me", text: input }]); setInput(""); } }}>→</button>
        </div>
      </div>
    );
  }

  return (
    <div style={{ ...styles.screen, paddingBottom: 80 }}>
      <TopBar title="Matches & Chats" />
      <div style={{ padding: "16px" }}>
        {MOCK_MATCHES.map(m => (
          <div key={m.id} onClick={() => setActive(m)} style={{ display: "flex", alignItems: "center", gap: 14, padding: "14px 16px", background: "rgba(255,255,255,0.06)", borderRadius: 16, cursor: "pointer", border: "1px solid rgba(255,255,255,0.09)", marginBottom: 8 }}>
            <div style={{ position: "relative" }}>
              <Avatar initials={m.avatar} color={m.color} size={50} />
              <div style={{ position: "absolute", bottom: 0, right: 0, width: 12, height: 12, background: "#22C55E", borderRadius: 6, border: "2px solid #fff" }} />
            </div>
            <div style={{ flex: 1 }}>
              <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
                <span style={{ fontWeight: 700, fontSize: 15 }}>{m.name}</span>
                <span style={{ fontSize: 12, color: "rgba(255,255,255,0.55)" }}>{m.time} ago</span>
              </div>
              <div style={{ fontSize: 13, color: "rgba(255,255,255,0.55)", marginTop: 2 }}>{m.lastMsg}</div>
            </div>
            {m.unread > 0 && <div style={{ background: "#FF2A2A", color: "#fff", borderRadius: 10, padding: "2px 7px", fontSize: 11, fontWeight: 700 }}>{m.unread}</div>}
          </div>
        ))}
      </div>
    </div>
  );
}

// ── REQUESTS ─────────────────────────────────────────────────────────────────
function RequestsScreen() {
  const [showCreate, setShowCreate] = useState(false);
  const [requests, setRequests] = useState([
    { id: 1, date: "Mon 31 Mar", time: "6:30pm", gym: "PureGym Shoreditch", duration: "1 hour", status: "active" },
  ]);
  const [form, setForm] = useState({ date: "", time: "", gym: "", duration: "1 hour" });
  const up = (k, v) => setForm(f => ({ ...f, [k]: v }));
  const maxDate = new Date(); maxDate.setDate(maxDate.getDate() + 14);

  return (
    <div style={{ ...styles.screen, paddingBottom: 80 }}>
      <TopBar title="My Requests" rightAction={<button onClick={() => setShowCreate(true)} style={{ background: "#FF2A2A", border: "none", borderRadius: 10, padding: "6px 14px", cursor: "pointer", color: "#fff", fontWeight: 700, fontSize: 13 }}>+ New</button>} />
      <div style={{ padding: "16px", display: "flex", flexDirection: "column", gap: 12 }}>
        {requests.map(r => (
          <div key={r.id} style={styles.card}>
            <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start" }}>
              <div><span style={{ fontWeight: 700, fontSize: 16 }}>{r.date}</span><span style={{ color: "rgba(255,255,255,0.55)", fontSize: 14 }}> at {r.time}</span></div>
              <span style={{ background: "#22C55E" + "18", color: "#22C55E", fontSize: 12, fontWeight: 700, padding: "4px 10px", borderRadius: 8 }}>Active</span>
            </div>
            <div style={{ display: "flex", gap: 8, marginTop: 10, flexWrap: "wrap" }}>
              <span style={{ background: "rgba(47,109,255,0.12)", color: "#2F6DFF", fontSize: 12, padding: "4px 10px", borderRadius: 8 }}>📍 {r.gym}</span>
              <span style={{ background: "rgba(255,255,255,0.04)", color: "rgba(255,255,255,0.55)", fontSize: 12, padding: "4px 10px", borderRadius: 8 }}>⏱ {r.duration}</span>
            </div>
            <button style={{ ...styles.btn("danger", "sm"), marginTop: 12 }} onClick={() => setRequests(prev => prev.filter(x => x.id !== r.id))}>Cancel Request</button>
          </div>
        ))}
        {requests.length === 0 && <div style={{ textAlign: "center", padding: 40, color: "rgba(255,255,255,0.55)" }}><div style={{ fontSize: 48 }}>📅</div><p>No active requests. Create one!</p></div>}
      </div>

      {showCreate && (
        <div style={{ position: "fixed", inset: 0, background: "rgba(0,0,0,0.4)", zIndex: 200, display: "flex", alignItems: "flex-end" }}>
          <div style={{ background: "rgba(255,255,255,0.06)", borderRadius: "24px 24px 0 0", width: "100%", maxWidth: 430, margin: "0 auto", padding: "24px 24px 40px", display: "flex", flexDirection: "column", gap: 16 }}>
            <div style={{ display: "flex", justifyContent: "space-between" }}>
              <h3 style={{ margin: 0 }}>New GymLink Request</h3>
              <button onClick={() => setShowCreate(false)} style={{ background: "none", border: "none", fontSize: 22, cursor: "pointer" }}>✕</button>
            </div>
            <PickerField label="Date (up to 2 weeks ahead)" type="date" max={maxDate.toISOString().split("T")[0]} value={form.date} onChange={e => up("date", e.target.value)} />
            <PickerField label="Time" type="time" value={form.time} onChange={e => up("time", e.target.value)} />
            <div><label style={styles.label}>Gym</label><select style={styles.input} value={form.gym} onChange={e => up("gym", e.target.value)}><option value="">Select gym...</option>{LONDON_GYMS.map(g => <option key={g}>{g}</option>)}</select></div>
            <div>
              <label style={styles.label}>Duration</label>
              <div style={{ display: "flex", gap: 8 }}>
                {["30 min", "45 min", "1 hour"].map(d => <div key={d} onClick={() => up("duration", d)} style={{ ...styles.chip(form.duration === d), flex: 1, textAlign: "center" }}>{d}</div>)}
              </div>
            </div>
            <button style={styles.btn()} onClick={() => {
              if (form.date && form.time && form.gym) {
                setRequests(prev => [...prev, { id: Date.now(), date: form.date, time: form.time, gym: form.gym, duration: form.duration, status: "active" }]);
                setShowCreate(false);
                setForm({ date: "", time: "", gym: "", duration: "1 hour" });
              }
            }}>Post Request</button>
          </div>
        </div>
      )}
    </div>
  );
}

// ── TRAINERS ─────────────────────────────────────────────────────────────────
function TrainersScreen() {
  const [selected, setSelected] = useState(null);
  const [showBook, setShowBook] = useState(false);

  if (selected) {
    return (
      <div style={{ ...styles.screen, paddingBottom: 80 }}>
        <TopBar title="Trainer Profile" onBack={() => setSelected(null)} />
        <div style={{ overflow: "auto", paddingBottom: 80 }}>
          <div style={{ background: `linear-gradient(135deg, ${selected.color}30, ${selected.color}10)`, padding: "32px 24px", display: "flex", flexDirection: "column", alignItems: "center", gap: 12 }}>
            <Avatar initials={selected.avatar} color={selected.color} size={90} />
            <div style={{ textAlign: "center" }}>
              <h2 style={{ margin: 0, fontSize: 22, fontWeight: 800 }}>{selected.name}</h2>
              <div style={{ marginTop: 6, display: "flex", gap: 8, justifyContent: "center", flexWrap: "wrap" }}>
                {selected.verified && <VerifiedBadge />}
                <StarRating rating={selected.rating} />
              </div>
              <p style={{ color: "rgba(255,255,255,0.55)", margin: "6px 0 0", fontSize: 13 }}>{selected.reviews} reviews</p>
            </div>
          </div>
          <div style={{ padding: "20px" }}>
            <div style={{ display: "flex", gap: 10, marginBottom: 16, flexWrap: "wrap" }}>{selected.specialty.map(s => <span key={s} style={{ background: "rgba(47,109,255,0.12)", color: "#2F6DFF", fontSize: 12, fontWeight: 600, padding: "5px 12px", borderRadius: 10 }}>{s}</span>)}</div>
            <div style={{ ...styles.card, marginBottom: 12 }}><h4 style={{ margin: "0 0 8px", color: "rgba(255,255,255,0.55)", fontSize: 12, textTransform: "uppercase" }}>About</h4><p style={{ margin: 0, color: "#FFFFFF", lineHeight: 1.6, fontSize: 14 }}>{selected.bio}</p></div>
            <div style={{ ...styles.card, marginBottom: 12 }}><h4 style={{ margin: "0 0 8px", color: "rgba(255,255,255,0.55)", fontSize: 12, textTransform: "uppercase" }}>Location</h4><p style={{ margin: 0, color: "#FFFFFF", fontSize: 14 }}>📍 {selected.gym}</p></div>
            <div style={{ ...styles.card, marginBottom: 20 }}>
              <h4 style={{ margin: "0 0 8px", color: "rgba(255,255,255,0.55)", fontSize: 12, textTransform: "uppercase" }}>Reviews</h4>
              {[{ name: "James P.", text: "Incredible trainer. Saw results in 4 weeks.", stars: 5 }, { name: "Sasha M.", text: "Very professional and motivating.", stars: 5 }].map((rev, i) => (
                <div key={i} style={{ paddingTop: i > 0 ? 12 : 0, borderTop: i > 0 ? `1px solid ${"rgba(255,255,255,0.1)"}` : "none", marginTop: i > 0 ? 12 : 0 }}>
                  <div style={{ display: "flex", justifyContent: "space-between" }}><span style={{ fontWeight: 600, fontSize: 13 }}>{rev.name}</span><span style={{ color: "#F59E0B" }}>{"★".repeat(rev.stars)}</span></div>
                  <p style={{ margin: "4px 0 0", fontSize: 13, color: "rgba(255,255,255,0.55)" }}>{rev.text}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
        <div style={{ position: "fixed", bottom: 80, left: "50%", transform: "translateX(-50%)", width: "100%", maxWidth: 430, padding: "12px 20px", background: "rgba(255,255,255,0.06)", borderTop: "1px solid rgba(255,255,255,0.08)" }}>
          <div style={{ display: "flex", gap: 10, alignItems: "center" }}>
            <div style={{ background: "rgba(47,109,255,0.12)", borderRadius: 12, padding: "10px 16px", flex: 1, textAlign: "center" }}><div style={{ fontSize: 12, color: "rgba(255,255,255,0.55)" }}>Rate</div><div style={{ fontSize: 18, fontWeight: 800, color: "#2F6DFF" }}>{selected.price}</div></div>
            <button style={{ ...styles.btn(), flex: 2 }} onClick={() => setShowBook(true)}>Book Session</button>
          </div>
        </div>
        {showBook && (
          <div style={{ position: "fixed", inset: 0, background: "rgba(0,0,0,0.4)", zIndex: 200, display: "flex", alignItems: "flex-end" }}>
            <div style={{ background: "rgba(255,255,255,0.06)", borderRadius: "24px 24px 0 0", width: "100%", maxWidth: 430, margin: "0 auto", padding: "24px 24px 40px" }}>
              <h3 style={{ margin: "0 0 20px" }}>Book with {selected.name}</h3>
              <div style={{ display: "flex", flexDirection: "column", gap: 14 }}>
                <div><label style={styles.label}>Session Type</label><div style={{ display: "flex", gap: 10 }}>{["1-to-1 Session", "Group Class"].map(t => <div key={t} style={{ ...styles.chip(false), flex: 1, textAlign: "center" }}>{t}</div>)}</div></div>
                <PickerField label="Date" type="date" value={""} onChange={()=>{}} />
                <PickerField label="Time" type="time" value={""} onChange={()=>{}} />
                <button style={styles.btn()} onClick={() => setShowBook(false)}>Confirm Booking</button>
                <button style={styles.btn("ghost")} onClick={() => setShowBook(false)}>Cancel</button>
              </div>
            </div>
          </div>
        )}
      </div>
    );
  }

  return (
    <div style={{ ...styles.screen, paddingBottom: 80 }}>
      <TopBar title="Find a Trainer" />
      <div style={{ padding: "16px", display: "flex", flexDirection: "column", gap: 12 }}>
        <input style={styles.input} placeholder="🔍 Search trainers, specialties..." />
        {MOCK_TRAINERS.map(t => (
          <div key={t.id} onClick={() => setSelected(t)} style={{ ...styles.card, cursor: "pointer", display: "flex", gap: 14, alignItems: "center" }}>
            <Avatar initials={t.avatar} color={t.color} size={60} />
            <div style={{ flex: 1 }}>
              <div style={{ display: "flex", alignItems: "center", gap: 6, flexWrap: "wrap" }}><span style={{ fontWeight: 700, fontSize: 16 }}>{t.name}</span>{t.verified && <VerifiedBadge />}</div>
              <StarRating rating={t.rating} />
              <div style={{ display: "flex", gap: 6, marginTop: 6, flexWrap: "wrap" }}>{t.specialty.slice(0, 2).map(s => <span key={s} style={{ background: "rgba(47,109,255,0.12)", color: "#2F6DFF", fontSize: 11, padding: "3px 8px", borderRadius: 6 }}>{s}</span>)}</div>
              <p style={{ margin: "4px 0 0", color: "rgba(255,255,255,0.55)", fontSize: 12 }}>📍 {t.gym}</p>
            </div>
            <div style={{ textAlign: "right" }}><div style={{ fontWeight: 800, color: "#2F6DFF", fontSize: 15 }}>{t.price}</div></div>
          </div>
        ))}
      </div>
    </div>
  );
}

// ── USER PROFILE SCREEN ───────────────────────────────────────────────────────

// ── MANDATORY SAFETY SCREEN (first-time only) ─────────────────────────────────
function MandatorySafetyScreen({ onAccept }) {
  const [accepted, setAccepted] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const scrollRef = useRef();

  const handleScroll = (e) => {
    const el = e.target;
    if (el.scrollHeight - el.scrollTop - el.clientHeight < 60) setScrolled(true);
  };

  return (
    <div style={styles.screen}>
      <div style={{ background: "#FF2A2A", padding: "50px 24px 20px" }}>
        <div style={{ display: "flex", alignItems: "center", gap: 12 }}>
          <div style={{ width: 44, height: 44, borderRadius: 14, background: "rgba(255,255,255,0.2)", display: "flex", alignItems: "center", justifyContent: "center", fontSize: 22 }}>🛡️</div>
          <div>
            <h2 style={{ margin: 0, fontSize: 20, fontWeight: 900, color: "#fff" }}>Safety Policy</h2>
            <p style={{ margin: 0, fontSize: 12, color: "rgba(255,255,255,0.75)" }}>Please read before continuing</p>
          </div>
        </div>
      </div>

      <div ref={scrollRef} onScroll={handleScroll} style={{ flex: 1, overflow: "auto", padding: "20px 16px 20px" }}>
        <div style={{ background: "rgba(255,42,42,0.1)", border: "1.5px solid rgba(255,42,42,0.3)", borderRadius: 16, padding: "14px 16px", marginBottom: 16, display: "flex", gap: 10 }}>
          <span style={{ fontSize: 18, flexShrink: 0 }}>⚠️</span>
          <p style={{ margin: 0, fontSize: 13, color: "#FFFFFF", lineHeight: 1.6 }}>This policy must be read and accepted before you can use GymLink. You will not be able to proceed without agreeing.</p>
        </div>

        {[
          { icon: "🏟️", color: "#2F6DFF", title: "Meeting Guidelines", body: "GymLink strongly recommends meeting inside a gym or public fitness facility at all times. Avoid private or unfamiliar locations. If meeting someone new, inform a trusted person of your plans.", bullets: ["Always meet inside a gym or public fitness facility", "Avoid meeting in private or unfamiliar locations", "Inform someone you trust about your plans"] },
          { icon: "💬", color: "#F59E0B", title: "Communication Outside the App", body: null, bullets: ["Sharing personal contact details is done at your own discretion", "GymLink does not monitor communication outside the app", "GymLink is not responsible for interactions outside the platform"] },
          { icon: "🤝", color: "#7C3AED", title: "User Responsibility", body: "By using GymLink, you agree to act respectfully and responsibly at all times.", bullets: ["Act respectfully and responsibly towards other users", "Use your own judgement when meeting others", "Report any suspicious or inappropriate behaviour through the app"] },
          { icon: "🔒", color: "#22C55E", title: "Data & Privacy", body: null, bullets: ["Your personal data is used only to facilitate gym connections", "You control your profile visibility in Privacy Settings", "Your data is never sold to third parties"] },
          { icon: "🚨", color: "#FF2A2A", title: "Reporting & Support", body: "If you experience or witness any concerning behaviour, report it through the app immediately. All reports are reviewed confidentially and appropriate action will be taken.", bullets: [] },
        ].map((s, i) => (
          <div key={i} style={{ background: "rgba(255,255,255,0.05)", border: "1px solid rgba(255,255,255,0.09)", borderRadius: 16, padding: "16px", marginBottom: 12 }}>
            <div style={{ display: "flex", alignItems: "center", gap: 10, marginBottom: 12 }}>
              <div style={{ width: 38, height: 38, borderRadius: 12, background: s.color + "20", display: "flex", alignItems: "center", justifyContent: "center", fontSize: 18, flexShrink: 0 }}>{s.icon}</div>
              <h4 style={{ margin: 0, fontSize: 15, fontWeight: 800, color: "#FFFFFF" }}>{s.title}</h4>
            </div>
            {s.body && <p style={{ margin: "0 0 10px", fontSize: 13, color: "rgba(255,255,255,0.6)", lineHeight: 1.6 }}>{s.body}</p>}
            {s.bullets.length > 0 && (
              <div style={{ display: "flex", flexDirection: "column", gap: 8 }}>
                {s.bullets.map((b, bi) => (
                  <div key={bi} style={{ display: "flex", alignItems: "flex-start", gap: 10 }}>
                    <div style={{ width: 6, height: 6, borderRadius: 3, background: s.color, flexShrink: 0, marginTop: 6 }} />
                    <span style={{ fontSize: 13, color: "rgba(255,255,255,0.7)", lineHeight: 1.5 }}>{b}</span>
                  </div>
                ))}
              </div>
            )}
          </div>
        ))}

        <div style={{ background: "rgba(255,255,255,0.06)", borderRadius: 16, padding: "16px", marginBottom: 20, textAlign: "center" }}>
          <p style={{ margin: "0 0 8px", fontSize: 13, color: "rgba(255,255,255,0.6)", lineHeight: 1.6 }}>GymLink provides tools to help people connect through fitness, but personal safety ultimately relies on individual awareness and responsibility.</p>
          <p style={{ margin: 0, fontSize: 14, fontWeight: 800, color: "#FFFFFF" }}>Train smart. Stay safe. Respect others.</p>
        </div>

        {!scrolled && (
          <div style={{ textAlign: "center", marginBottom: 16 }}>
            <p style={{ margin: 0, fontSize: 12, color: "rgba(255,255,255,0.4)", fontStyle: "italic" }}>↓ Scroll to read the full policy before accepting</p>
          </div>
        )}
      </div>

      <div style={{ padding: "16px 20px 36px", background: "rgba(4,14,34,0.97)", borderTop: "1px solid rgba(255,255,255,0.08)" }}>
        <div onClick={() => scrolled && setAccepted(v => !v)}
          style={{ display: "flex", alignItems: "flex-start", gap: 14, cursor: scrolled ? "pointer" : "not-allowed", padding: "14px", background: accepted ? "rgba(255,42,42,0.1)" : "rgba(255,255,255,0.04)", borderRadius: 14, border: `2px solid ${accepted ? "#FF2A2A" : "rgba(255,255,255,0.12)"}`, marginBottom: 14, opacity: scrolled ? 1 : 0.5, transition: "all 0.2s" }}>
          <div style={{ width: 22, height: 22, borderRadius: 6, border: `2px solid ${accepted ? "#FF2A2A" : "rgba(255,255,255,0.3)"}`, background: accepted ? "#FF2A2A" : "transparent", display: "flex", alignItems: "center", justifyContent: "center", flexShrink: 0, marginTop: 1 }}>
            {accepted && <span style={{ color: "#fff", fontSize: 13, fontWeight: 800 }}>✓</span>}
          </div>
          <p style={{ margin: 0, fontSize: 13, color: accepted ? "#FFFFFF" : "rgba(255,255,255,0.6)", fontWeight: accepted ? 600 : 400, lineHeight: 1.5 }}>I have read and agree to the GymLink Safety Policy and understand my responsibilities as a user.</p>
        </div>
        <button style={{ ...styles.btn(), opacity: accepted ? 1 : 0.35, cursor: accepted ? "pointer" : "not-allowed", fontSize: 15, fontWeight: 800 }} onClick={() => accepted && onAccept()} disabled={!accepted}>
          {accepted ? "Continue to Profile Setup →" : scrolled ? "Accept to continue" : "Read the full policy first"}
        </button>
      </div>
    </div>
  );
}

// ── EDIT PROFILE SCREEN ───────────────────────────────────────────────────────
function EditProfileScreen({ user, onSave, onBack }) {
  const [form, setForm] = useState({
    name: user?.name || "",
    age: user?.age || "",
    gender: user?.gender || "",
    level: user?.level || "",
    lookingFor: user?.lookingFor || "",
    gym: user?.gym || "",
    preferredDays: user?.preferredDays || [],
    preferredTime: user?.preferredTime || "",
    partnerLevel: user?.partnerLevel || "",
    partnerGender: user?.partnerGender || "",
  });
  const up = (k, v) => setForm(f => ({ ...f, [k]: v }));
  const toggleDay = d => up("preferredDays", form.preferredDays.includes(d) ? form.preferredDays.filter(x => x !== d) : [...form.preferredDays, d]);
  const [saved, setSaved] = useState(false);

  const handleSave = () => {
    setSaved(true);
    setTimeout(() => { onSave(form); onBack(); }, 900);
  };

  return (
    <div style={styles.screen}>
      <TopBar title="Edit Profile" onBack={onBack} />
      <div style={{ flex: 1, padding: "20px 16px", overflow: "auto", paddingBottom: 100, display: "flex", flexDirection: "column", gap: 18 }}>
        <div><label style={styles.label}>Full Name</label><input style={styles.input} value={form.name} onChange={e => up("name", e.target.value)} /></div>
        <div><label style={styles.label}>Age</label><input style={styles.input} type="number" value={form.age} onChange={e => up("age", e.target.value)} /></div>
        <div>
          <label style={styles.label}>Gender</label>
          <div style={{ display: "flex", gap: 8, flexWrap: "wrap" }}>
            {["Male", "Female", "Non-binary", "Prefer not to say"].map(g => <div key={g} onClick={() => up("gender", g)} style={{ ...styles.chip(form.gender === g), flex: 1, textAlign: "center", fontSize: 12 }}>{g}</div>)}
          </div>
        </div>
        <div>
          <label style={styles.label}>Fitness Level</label>
          <div style={{ display: "flex", flexWrap: "wrap", gap: 8 }}>
            {["Beginner", "Intermediate", "Advanced", "Pro"].map(l => <div key={l} onClick={() => up("level", l)} style={styles.chip(form.level === l)}>{l}</div>)}
          </div>
        </div>
        <div>
          <label style={styles.label}>What are you looking for?</label>
          <div style={{ display: "flex", flexDirection: "column", gap: 8 }}>
            {["GymLink for Today", "GymLink for Future Date", "Long-term training partner"].map(opt => (
              <div key={opt} onClick={() => up("lookingFor", opt)} style={{ ...styles.chip(form.lookingFor === opt), display: "flex", alignItems: "center", gap: 8 }}>{opt}</div>
            ))}
          </div>
        </div>
        <div>
          <label style={styles.label}>Your Gym</label>
          <select style={styles.input} value={form.gym} onChange={e => up("gym", e.target.value)}>
            <option value="">Select gym...</option>
            {LONDON_GYMS.map(g => <option key={g} value={g}>{g}</option>)}
          </select>
        </div>
        <div>
          <label style={styles.label}>Preferred Days</label>
          <div style={{ display: "flex", gap: 6, flexWrap: "wrap" }}>
            {["Mon","Tue","Wed","Thu","Fri","Sat","Sun"].map(d => <div key={d} onClick={() => toggleDay(d)} style={{ padding: "8px 12px", borderRadius: 10, border: `1.5px solid ${form.preferredDays.includes(d) ? "#FF2A2A" : "rgba(255,255,255,0.1)"}`, background: form.preferredDays.includes(d) ? "#FF2A2A" : "rgba(255,255,255,0.05)", color: "#fff", fontSize: 13, fontWeight: 700, cursor: "pointer" }}>{d}</div>)}
          </div>
        </div>
        <div>
          <label style={styles.label}>Preferred Time</label>
          <div style={{ display: "flex", flexDirection: "column", gap: 8 }}>
            {[{ id: "Early morning", label: "Early Morning 5–8am" }, { id: "Morning", label: "Morning 8–12pm" }, { id: "Afternoon", label: "Afternoon 12–5pm" }, { id: "Evening", label: "Evening 5–9pm" }].map(t => (
              <div key={t.id} onClick={() => up("preferredTime", t.id)} style={{ ...styles.chip(form.preferredTime === t.id), textAlign: "left" }}>{t.label}</div>
            ))}
          </div>
        </div>
        <div>
          <label style={styles.label}>Preferred Partner Level</label>
          <div style={{ display: "flex", flexWrap: "wrap", gap: 8 }}>
            {["Any", "Beginner", "Intermediate", "Advanced", "Pro"].map(l => <div key={l} onClick={() => up("partnerLevel", l)} style={styles.chip(form.partnerLevel === l)}>{l}</div>)}
          </div>
        </div>
        <div>
          <label style={styles.label}>Preferred Partner Gender</label>
          <div style={{ display: "flex", gap: 8 }}>
            {["Any", "Male", "Female", "Non-binary"].map(g => <div key={g} onClick={() => up("partnerGender", g)} style={{ ...styles.chip(form.partnerGender === g), flex: 1, textAlign: "center", fontSize: 12 }}>{g}</div>)}
          </div>
        </div>
      </div>
      <div style={{ position: "fixed", bottom: 0, left: "50%", transform: "translateX(-50%)", width: "100%", maxWidth: 430, padding: "16px 20px 32px", background: "rgba(4,14,34,0.97)", borderTop: "1px solid rgba(255,255,255,0.08)" }}>
        {saved
          ? <div style={{ background: "rgba(34,197,94,0.15)", border: "1px solid rgba(34,197,94,0.3)", borderRadius: 12, padding: "14px", textAlign: "center", color: "#22C55E", fontWeight: 700 }}>✓ Profile updated!</div>
          : <button style={styles.btn()} onClick={handleSave}>Save Changes</button>
        }
      </div>
    </div>
  );
}

// ── PRIVACY SETTINGS SCREEN ───────────────────────────────────────────────────
function PrivacySettingsScreen({ onBack }) {
  const [settings, setSettings] = useState({ visibility: "everyone", showAge: true, showGym: true, showScore: true, allowMessages: true });
  const toggle = k => setSettings(s => ({ ...s, [k]: !s[k] }));

  const Toggle = ({ value, onToggle }) => (
    <div onClick={onToggle} style={{ width: 48, height: 28, borderRadius: 14, cursor: "pointer", background: value ? "#FF2A2A" : "rgba(255,255,255,0.15)", position: "relative", transition: "background 0.2s", flexShrink: 0 }}>
      <div style={{ width: 22, height: 22, borderRadius: 11, background: "#fff", position: "absolute", top: 3, left: value ? 23 : 3, transition: "left 0.2s", boxShadow: "0 1px 4px rgba(0,0,0,0.3)" }} />
    </div>
  );

  return (
    <div style={styles.screen}>
      <TopBar title="Privacy Settings" onBack={onBack} />
      <div style={{ flex: 1, padding: "20px 16px", overflow: "auto", display: "flex", flexDirection: "column", gap: 12 }}>
        <div>
          <label style={styles.label}>Profile Visibility</label>
          <div style={{ display: "flex", flexDirection: "column", gap: 8 }}>
            {[{ id: "everyone", label: "Everyone", sub: "Any GymLink user can see your profile" }, { id: "matches", label: "Matches Only", sub: "Only people you've matched with" }, { id: "nobody", label: "Hidden", sub: "Your profile won't appear in Discover" }].map(opt => (
              <div key={opt.id} onClick={() => setSettings(s => ({ ...s, visibility: opt.id }))} style={{ ...styles.card, display: "flex", alignItems: "center", gap: 14, cursor: "pointer", border: `1.5px solid ${settings.visibility === opt.id ? "#FF2A2A" : "rgba(255,255,255,0.09)"}`, background: settings.visibility === opt.id ? "rgba(255,42,42,0.08)" : "rgba(255,255,255,0.06)" }}>
                <div style={{ flex: 1 }}><div style={{ fontWeight: 700, fontSize: 14 }}>{opt.label}</div><div style={{ fontSize: 12, color: "rgba(255,255,255,0.5)", marginTop: 2 }}>{opt.sub}</div></div>
                {settings.visibility === opt.id && <span style={{ color: "#FF2A2A", fontWeight: 800, fontSize: 16 }}>✓</span>}
              </div>
            ))}
          </div>
        </div>
        <div style={{ marginTop: 8 }}>
          <label style={styles.label}>Profile Details</label>
          <div style={{ display: "flex", flexDirection: "column", gap: 8 }}>
            {[{ key: "showAge", label: "Show my age", sub: "Display age on your profile card" }, { key: "showGym", label: "Show my gym", sub: "Display gym name on your profile" }, { key: "showScore", label: "Show consistency score", sub: "Display your reliability score" }, { key: "allowMessages", label: "Allow messages from matches", sub: "Matches can send you messages" }].map(s => (
              <div key={s.key} style={{ ...styles.card, display: "flex", alignItems: "center", gap: 14 }}>
                <div style={{ flex: 1 }}><div style={{ fontWeight: 600, fontSize: 14 }}>{s.label}</div><div style={{ fontSize: 12, color: "rgba(255,255,255,0.5)", marginTop: 2 }}>{s.sub}</div></div>
                <Toggle value={settings[s.key]} onToggle={() => toggle(s.key)} />
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

// ── BLOCKED USERS SCREEN ──────────────────────────────────────────────────────
function BlockedUsersScreen({ onBack }) {
  const [blocked, setBlocked] = useState([
    { id: 1, name: "Alex K.", avatar: "AK", color: "#6366F1", gym: "PureGym Shoreditch", blockedOn: "12 Mar 2026" },
    { id: 2, name: "Sam T.", avatar: "ST", color: "#F43F5E", gym: "Better Gym Hackney", blockedOn: "3 Feb 2026" },
  ]);
  const [confirmUnblock, setConfirmUnblock] = useState(null);

  return (
    <div style={styles.screen}>
      <TopBar title="Blocked Users" onBack={onBack} />
      <div style={{ flex: 1, padding: "20px 16px", overflow: "auto" }}>
        {blocked.length === 0 ? (
          <div style={{ textAlign: "center", padding: "60px 20px" }}>
            <div style={{ fontSize: 52, marginBottom: 12 }}>🚫</div>
            <p style={{ fontWeight: 700, fontSize: 15, margin: "0 0 6px" }}>No blocked users</p>
            <p style={{ fontSize: 13, color: "rgba(255,255,255,0.5)", margin: 0 }}>Users you block won't appear in your Discover feed</p>
          </div>
        ) : (
          <div style={{ display: "flex", flexDirection: "column", gap: 10 }}>
            <p style={{ margin: "0 0 8px", fontSize: 13, color: "rgba(255,255,255,0.5)" }}>Blocked users cannot see your profile or contact you.</p>
            {blocked.map(u => (
              <div key={u.id} style={{ ...styles.card, display: "flex", alignItems: "center", gap: 14 }}>
                <Avatar initials={u.avatar} color={u.color} size={46} />
                <div style={{ flex: 1 }}>
                  <div style={{ fontWeight: 700, fontSize: 15 }}>{u.name}</div>
                  <div style={{ fontSize: 12, color: "rgba(255,255,255,0.5)", marginTop: 2 }}>{u.gym}</div>
                  <div style={{ fontSize: 11, color: "rgba(255,255,255,0.35)", marginTop: 2 }}>Blocked {u.blockedOn}</div>
                </div>
                <button onClick={() => setConfirmUnblock(u)} style={{ background: "rgba(255,255,255,0.08)", border: "1px solid rgba(255,255,255,0.15)", borderRadius: 10, padding: "7px 14px", cursor: "pointer", fontSize: 12, fontWeight: 600, color: "#FFFFFF" }}>Unblock</button>
              </div>
            ))}
          </div>
        )}
      </div>

      {confirmUnblock && (
        <div style={{ position: "fixed", inset: 0, background: "rgba(0,0,0,0.8)", zIndex: 500, display: "flex", alignItems: "center", justifyContent: "center", padding: 24 }} onClick={() => setConfirmUnblock(null)}>
          <div onClick={e => e.stopPropagation()} style={{ background: "#0D1E4A", border: "1px solid rgba(255,255,255,0.12)", borderRadius: 24, padding: "28px 24px", width: "100%", maxWidth: 340 }}>
            <h3 style={{ margin: "0 0 8px", fontSize: 18, fontWeight: 800 }}>Unblock {confirmUnblock.name}?</h3>
            <p style={{ margin: "0 0 24px", fontSize: 14, color: "rgba(255,255,255,0.6)", lineHeight: 1.5 }}>They will be able to see your profile and appear in your Discover feed again.</p>
            <div style={{ display: "flex", flexDirection: "column", gap: 10 }}>
              <button style={styles.btn()} onClick={() => { setBlocked(prev => prev.filter(u => u.id !== confirmUnblock.id)); setConfirmUnblock(null); }}>Yes, Unblock</button>
              <button style={{ ...styles.btn("ghost"), color: "rgba(255,255,255,0.5)" }} onClick={() => setConfirmUnblock(null)}>Cancel</button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

// ── HELP & SUPPORT SCREEN ─────────────────────────────────────────────────────
function HelpSupportScreen({ onBack }) {
  const [open, setOpen] = useState(null);
  const faqs = [
    { q: "How does GymLink matching work?", a: "GymLink matches you with gym-goers at your selected gym based on fitness level, availability, and workout preferences. You can swipe to connect or pass on suggested matches." },
    { q: "How do I change my gym or availability?", a: "Go to My Profile → Edit Profile. You can update your gym, preferred days, time slots, and fitness level at any time." },
    { q: "Is my personal information safe?", a: "Yes. GymLink uses industry-standard encryption. Your personal details are never shared with third parties. You can control what's visible to others in Privacy Settings." },
    { q: "How do I report inappropriate behaviour?", a: "Tap Safety & Reporting in Settings, or use the Report button on any user's profile. All reports are reviewed confidentially within 24 hours." },
    { q: "How does the Consistency Score work?", a: "Your score (0–100) reflects how often you attend sessions you've committed to. Attending sessions increases it, cancellations or no-shows reduce it. A higher score builds trust with other users." },
    { q: "Can I use GymLink as a Personal Trainer?", a: "Yes — sign up as a Personal Trainer to access the trainer dashboard, create classes, manage bookings, and promote your sessions. A Pro subscription (£5/month) unlocks all trainer features." },
    { q: "How do I cancel my trainer subscription?", a: "Go to My Profile → Trainer Pro Plan → Cancel Subscription. Your access continues until the end of the billing period." },
  ];

  return (
    <div style={styles.screen}>
      <TopBar title="Help & Support" onBack={onBack} />
      <div style={{ flex: 1, padding: "20px 16px", overflow: "auto", display: "flex", flexDirection: "column", gap: 10 }}>
        <div style={{ background: "rgba(47,109,255,0.12)", border: "1px solid rgba(47,109,255,0.25)", borderRadius: 16, padding: "16px", marginBottom: 8 }}>
          <div style={{ fontWeight: 700, fontSize: 15, marginBottom: 4 }}>👋 How can we help?</div>
          <p style={{ margin: 0, fontSize: 13, color: "rgba(255,255,255,0.6)", lineHeight: 1.5 }}>Browse the FAQs below or get in touch directly. We typically respond within 24 hours.</p>
        </div>

        <label style={styles.label}>Frequently Asked Questions</label>
        {faqs.map((faq, i) => (
          <div key={i} style={{ background: "rgba(255,255,255,0.05)", border: "1px solid rgba(255,255,255,0.09)", borderRadius: 14, overflow: "hidden" }}>
            <div onClick={() => setOpen(open === i ? null : i)} style={{ padding: "14px 16px", display: "flex", alignItems: "center", gap: 12, cursor: "pointer" }}>
              <span style={{ flex: 1, fontWeight: 600, fontSize: 14, color: "#FFFFFF" }}>{faq.q}</span>
              <span style={{ color: "rgba(255,255,255,0.4)", fontSize: 18, transform: open === i ? "rotate(90deg)" : "none", transition: "transform 0.2s" }}>›</span>
            </div>
            {open === i && (
              <div style={{ padding: "0 16px 14px", borderTop: "1px solid rgba(255,255,255,0.06)" }}>
                <p style={{ margin: "12px 0 0", fontSize: 13, color: "rgba(255,255,255,0.65)", lineHeight: 1.6 }}>{faq.a}</p>
              </div>
            )}
          </div>
        ))}

        <div style={{ marginTop: 12, background: "rgba(255,255,255,0.05)", border: "1px solid rgba(255,255,255,0.09)", borderRadius: 16, padding: "18px" }}>
          <div style={{ fontWeight: 700, fontSize: 15, marginBottom: 6 }}>Still need help?</div>
          <p style={{ margin: "0 0 14px", fontSize: 13, color: "rgba(255,255,255,0.6)" }}>Contact our support team directly and we'll get back to you.</p>
          <button onClick={() => window.open("mailto:support@gymlink.co.uk")} style={{ ...styles.btn("outline"), borderRadius: 12, borderColor: "rgba(255,255,255,0.2)" }}>✉️  Email support@gymlink.co.uk</button>
        </div>
      </div>
    </div>
  );
}

// ── TERMS & CONDITIONS SCREEN ─────────────────────────────────────────────────
function TermsScreen({ onBack }) {
  return (
    <div style={styles.screen}>
      <TopBar title="Terms & Conditions" onBack={onBack} />
      <div style={{ flex: 1, padding: "20px 16px 40px", overflow: "auto", display: "flex", flexDirection: "column", gap: 16 }}>
        <p style={{ margin: 0, fontSize: 12, color: "rgba(255,255,255,0.4)" }}>Last updated: January 2026 · GymLink Ltd, London, UK</p>
        {[
          { title: "1. Acceptance of Terms", body: "By accessing or using the GymLink application, you agree to be bound by these Terms and Conditions. If you do not agree, you must not use the app. GymLink reserves the right to update these terms at any time with notice." },
          { title: "2. Eligibility", body: "You must be at least 18 years old to use GymLink. By registering, you confirm that all information you provide is accurate and up to date. GymLink reserves the right to suspend accounts that provide false information." },
          { title: "3. User Accounts", body: "You are responsible for maintaining the confidentiality of your account credentials. You must notify GymLink immediately of any unauthorised use of your account. GymLink is not liable for losses resulting from unauthorised account access." },
          { title: "4. Identity Verification", body: "GymLink requires identity verification for all users to maintain platform safety. Providing fraudulent identification documents is a serious violation and will result in immediate account termination and may be reported to relevant authorities." },
          { title: "5. User Conduct", body: "Users must behave respectfully and lawfully at all times. Harassment, discrimination, spam, and any form of abusive behaviour are strictly prohibited. GymLink reserves the right to remove any content or suspend any account that violates these standards." },
          { title: "6. Meeting Safety", body: "GymLink strongly recommends that users meet exclusively in public gym environments. GymLink bears no responsibility for the outcomes of in-person meetings arranged through the platform. Users engage in person-to-person contact entirely at their own risk." },
          { title: "7. Trainer Services", body: "Personal Trainers on GymLink operate as independent professionals. GymLink does not employ trainers and is not responsible for the quality, safety, or outcome of any training sessions. Trainers are responsible for ensuring they hold valid certifications and insurance." },
          { title: "8. Subscriptions & Payments", body: "Trainer Pro subscriptions are billed monthly. Cancellations take effect at the end of the current billing period. Refunds are not provided for partial months. GymLink reserves the right to modify pricing with 30 days notice." },
          { title: "9. Privacy", body: "GymLink collects and processes personal data in accordance with our Privacy Policy. By using the app, you consent to this processing. Your data will never be sold to third parties without explicit consent." },
          { title: "10. Limitation of Liability", body: "GymLink provides a platform to facilitate connections between gym users and trainers. We do not guarantee the accuracy of user profiles, match quality, or outcomes from connections made through the platform. Our liability is limited to the maximum extent permitted by law." },
          { title: "11. Termination", body: "GymLink may terminate or suspend your account at any time for violation of these terms. You may delete your account at any time through the app settings. Upon termination, your data will be handled in accordance with our Privacy Policy." },
          { title: "12. Governing Law", body: "These terms are governed by the laws of England and Wales. Any disputes shall be subject to the exclusive jurisdiction of the courts of England and Wales." },
        ].map((s, i) => (
          <div key={i}>
            <div style={{ fontWeight: 800, fontSize: 14, color: "#FFFFFF", marginBottom: 6 }}>{s.title}</div>
            <p style={{ margin: 0, fontSize: 13, color: "rgba(255,255,255,0.6)", lineHeight: 1.7 }}>{s.body}</p>
          </div>
        ))}
        <div style={{ background: "rgba(255,255,255,0.05)", borderRadius: 14, padding: "16px", marginTop: 8 }}>
          <p style={{ margin: 0, fontSize: 12, color: "rgba(255,255,255,0.45)", lineHeight: 1.6 }}>For questions about these Terms, contact us at legal@gymlink.co.uk · GymLink Ltd is registered in England and Wales.</p>
        </div>
      </div>
    </div>
  );
}

// ── USER PROFILE SCREEN ───────────────────────────────────────────────────────
function UserProfileScreen({ user, onLogout, onUpdateUser }) {
  const [tab, setTab] = useState("profile");
  const [showSafety, setShowSafety] = useState(false);
  const [showEdit, setShowEdit] = useState(false);
  const [showPrivacy, setShowPrivacy] = useState(false);
  const [showBlocked, setShowBlocked] = useState(false);
  const [showHelp, setShowHelp] = useState(false);
  const [showTerms, setShowTerms] = useState(false);
  const [selectedHistory, setSelectedHistory] = useState(null);
  const [localUser, setLocalUser] = useState(user);

  useEffect(() => { setLocalUser(user); }, [user]);

  const handleSaveProfile = (updated) => {
    setLocalUser(prev => ({ ...prev, ...updated }));
    onUpdateUser && onUpdateUser(updated);
  };

  // Sub-screen routing
  if (showSafety) return <SafetyPolicyScreen onBack={() => setShowSafety(false)} />;
  if (showEdit) return <EditProfileScreen user={localUser} onSave={handleSaveProfile} onBack={() => setShowEdit(false)} />;
  if (showPrivacy) return <PrivacySettingsScreen onBack={() => setShowPrivacy(false)} />;
  if (showBlocked) return <BlockedUsersScreen onBack={() => setShowBlocked(false)} />;
  if (showHelp) return <HelpSupportScreen onBack={() => setShowHelp(false)} />;
  if (showTerms) return <TermsScreen onBack={() => setShowTerms(false)} />;

  // History profile card
  const historyProfile = selectedHistory ? MOCK_PROFILES.find(p => p.name === selectedHistory.partner) || {
    name: selectedHistory.partner, avatar: selectedHistory.partner.split(" ").map(n => n[0]).join(""),
    color: "#6366F1", gym: selectedHistory.gym, level: "Intermediate", bio: "GymLink connection.", score: 75,
  } : null;

  return (
    <div style={{ ...styles.screen, paddingBottom: 80 }}>
      <TopBar title="My Profile" rightAction={<button onClick={onLogout} style={{ background: "none", border: "none", cursor: "pointer", color: "rgba(255,255,255,0.55)", fontSize: 13, fontWeight: 600 }}>Sign Out</button>} />

      <div style={{ background: "linear-gradient(135deg, rgba(47,109,255,0.15), rgba(255,42,42,0.08))", padding: "24px 20px", display: "flex", gap: 16, alignItems: "center" }}>
        <Avatar initials={(localUser?.name || "ME").split(" ").map(n => n[0]).join("").slice(0,2)} color={"#2F6DFF"} size={72} />
        <div style={{ flex: 1 }}>
          <h2 style={{ margin: 0, fontSize: 20, fontWeight: 800 }}>{localUser?.name || "Your Name"}</h2>
          <p style={{ margin: "2px 0 6px", color: "rgba(255,255,255,0.55)", fontSize: 13 }}>{localUser?.gym || "Select a gym"}</p>
          <span style={{ background: "rgba(47,109,255,0.15)", color: "#2F6DFF", fontSize: 12, fontWeight: 700, padding: "4px 10px", borderRadius: 8 }}>{localUser?.level || "Set your level"}</span>
        </div>
        <ScoreBadge score={82} />
      </div>

      <div style={{ display: "flex", borderBottom: "1px solid rgba(255,255,255,0.08)", background: "rgba(255,255,255,0.04)" }}>
        {["profile", "history", "settings"].map(t => (
          <button key={t} onClick={() => setTab(t)} style={{ flex: 1, padding: "12px 0", background: "none", border: "none", cursor: "pointer", fontSize: 13, fontWeight: 700, color: tab === t ? "#FF2A2A" : "rgba(255,255,255,0.4)", borderBottom: `2px solid ${tab === t ? "#FF2A2A" : "transparent"}`, textTransform: "capitalize" }}>{t}</button>
        ))}
      </div>

      <div style={{ padding: "16px", overflow: "auto" }}>

        {/* ── PROFILE TAB ── */}
        {tab === "profile" && (
          <div style={{ display: "flex", flexDirection: "column", gap: 12 }}>
            {[
              { label: "Age", value: localUser?.age || "—" },
              { label: "Gender", value: localUser?.gender || "—" },
              { label: "Looking for", value: localUser?.lookingFor || "—" },
              { label: "Preferred days", value: (localUser?.preferredDays?.length ? localUser.preferredDays.join(", ") : "—") },
              { label: "Preferred time", value: localUser?.preferredTime || "—" },
              { label: "Partner preference", value: `${localUser?.partnerLevel || "Any"} level, ${localUser?.partnerGender || "Any"} gender` },
            ].map(f => (
              <div key={f.label} style={{ ...styles.card, display: "flex", justifyContent: "space-between", alignItems: "center" }}>
                <span style={{ fontSize: 13, color: "rgba(255,255,255,0.55)", fontWeight: 600 }}>{f.label}</span>
                <span style={{ fontSize: 14, color: "#FFFFFF", fontWeight: 600 }}>{f.value}</span>
              </div>
            ))}
            <button style={styles.btn()} onClick={() => setShowEdit(true)}>✏️ Edit Profile</button>
          </div>
        )}

        {/* ── HISTORY TAB ── */}
        {tab === "history" && (
          <div style={{ display: "flex", flexDirection: "column", gap: 10 }}>
            <div style={{ ...styles.card, background: "rgba(47,109,255,0.1)", border: "1px solid rgba(47,109,255,0.25)", marginBottom: 4 }}>
              <h4 style={{ margin: "0 0 4px", color: "#2F6DFF", fontSize: 14 }}>Consistency Score: 82 / 100</h4>
              <p style={{ margin: 0, fontSize: 12, color: "#2F6DFF" }}>Very Reliable — keep it up! 🏆</p>
            </div>
            <p style={{ margin: 0, fontWeight: 700, fontSize: 13, color: "rgba(255,255,255,0.5)", letterSpacing: 1, textTransform: "uppercase" }}>Last 30 Days</p>
            {WORKOUT_HISTORY.map((w, i) => {
              const outcomeColor = w.outcome === "attended" ? "#22C55E" : w.outcome === "cancelled" ? "#F59E0B" : "#FF2A2A";
              const outcomeIcon = w.outcome === "attended" ? "✓" : w.outcome === "cancelled" ? "~" : "✗";
              return (
                <div key={i} onClick={() => setSelectedHistory(w)} style={{ ...styles.card, display: "flex", alignItems: "center", gap: 12, cursor: "pointer", transition: "all 0.15s" }}>
                  <div style={{ width: 40, height: 40, borderRadius: 20, background: outcomeColor + "18", display: "flex", alignItems: "center", justifyContent: "center", fontSize: 18, color: outcomeColor, fontWeight: 800, flexShrink: 0 }}>{outcomeIcon}</div>
                  <div style={{ flex: 1 }}>
                    <div style={{ fontWeight: 700, fontSize: 14 }}>{w.partner}</div>
                    <div style={{ fontSize: 12, color: "rgba(255,255,255,0.5)", marginTop: 2 }}>{w.date} · {w.gym}</div>
                  </div>
                  <div style={{ display: "flex", flexDirection: "column", alignItems: "flex-end", gap: 4 }}>
                    <span style={{ fontSize: 11, fontWeight: 700, padding: "3px 8px", borderRadius: 6, background: outcomeColor + "18", color: outcomeColor, textTransform: "capitalize" }}>{w.outcome}</span>
                    <span style={{ fontSize: 11, color: "rgba(255,255,255,0.35)" }}>View profile ›</span>
                  </div>
                </div>
              );
            })}
          </div>
        )}

        {/* ── SETTINGS TAB ── */}
        {tab === "settings" && (
          <div style={{ display: "flex", flexDirection: "column", gap: 10 }}>
            {[
              { icon: "🔒", label: "Privacy Settings", action: () => setShowPrivacy(true) },
              { icon: "🚫", label: "Blocked Users", action: () => setShowBlocked(true) },
              { icon: "🛡️", label: "Safety & Reporting", action: () => setShowSafety(true) },
              { icon: "📋", label: "Terms & Conditions", action: () => setShowTerms(true) },
              { icon: "❓", label: "Help & Support", action: () => setShowHelp(true) },
            ].map(s => (
              <div key={s.label} onClick={s.action} style={{ ...styles.card, display: "flex", alignItems: "center", gap: 14, cursor: "pointer" }}>
                <span style={{ fontSize: 22 }}>{s.icon}</span>
                <span style={{ fontWeight: 600, flex: 1 }}>{s.label}</span>
                <span style={{ color: "rgba(255,255,255,0.4)" }}>›</span>
              </div>
            ))}
            <button style={{ ...styles.btn("danger"), marginTop: 8 }} onClick={onLogout}>Sign Out</button>
          </div>
        )}
      </div>

      {/* History profile card sheet */}
      {selectedHistory && historyProfile && (
        <div style={{ position: "fixed", inset: 0, background: "rgba(0,0,0,0.75)", zIndex: 400, display: "flex", alignItems: "flex-end" }} onClick={() => setSelectedHistory(null)}>
          <div onClick={e => e.stopPropagation()} style={{ background: "#0D1E4A", borderRadius: "24px 24px 0 0", width: "100%", maxWidth: 430, margin: "0 auto", padding: "24px 24px 48px", border: "1px solid rgba(255,255,255,0.1)" }}>
            <div style={{ display: "flex", justifyContent: "center", marginBottom: 16 }}><div style={{ width: 40, height: 4, borderRadius: 2, background: "rgba(255,255,255,0.15)" }} /></div>
            <div style={{ display: "flex", gap: 16, alignItems: "center", marginBottom: 16 }}>
              <Avatar initials={historyProfile.avatar} color={historyProfile.color} size={64} />
              <div style={{ flex: 1 }}>
                <div style={{ fontSize: 18, fontWeight: 800 }}>{historyProfile.name}</div>
                <div style={{ fontSize: 13, color: "rgba(255,255,255,0.5)", marginTop: 2 }}>{historyProfile.gym}</div>
                <div style={{ display: "flex", gap: 6, marginTop: 6 }}>
                  <span style={{ background: "rgba(47,109,255,0.15)", color: "#2F6DFF", fontSize: 11, fontWeight: 700, padding: "3px 9px", borderRadius: 8 }}>{historyProfile.level}</span>
                  <span style={{ background: selectedHistory.outcome === "attended" ? "rgba(34,197,94,0.15)" : "rgba(255,42,42,0.15)", color: selectedHistory.outcome === "attended" ? "#22C55E" : "#FF2A2A", fontSize: 11, fontWeight: 700, padding: "3px 9px", borderRadius: 8, textTransform: "capitalize" }}>{selectedHistory.outcome}</span>
                </div>
              </div>
              <ScoreBadge score={historyProfile.score || 75} />
            </div>
            {historyProfile.bio && <p style={{ margin: "0 0 16px", fontSize: 14, color: "rgba(255,255,255,0.6)", lineHeight: 1.5 }}>{historyProfile.bio}</p>}
            <div style={{ background: "rgba(255,255,255,0.05)", borderRadius: 12, padding: "10px 14px", marginBottom: 18, display: "flex", gap: 8 }}>
              <span style={{ fontSize: 13, color: "rgba(255,255,255,0.5)" }}>📅 Last session:</span>
              <span style={{ fontSize: 13, fontWeight: 600 }}>{selectedHistory.date}</span>
            </div>
            <div style={{ display: "flex", gap: 10 }}>
              <button style={{ ...styles.btn("outline"), flex: 1 }} onClick={() => setSelectedHistory(null)}>Close</button>
              <button style={{ ...styles.btn(), flex: 2 }} onClick={() => setSelectedHistory(null)}>💪 Re-connect</button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

// ── TRAINER DASHBOARD ─────────────────────────────────────────────────────────
function TrainerDashboard({ user, onLogout, activeTab, setActiveTab, notifications, onReadNotification, onReadAllNotifications, unreadCount }) {
  const [tab, setTab] = useState("dashboard");
  const [dashView, setDashView] = useState("upcoming");
  const [showPhotos, setShowPhotos] = useState(false);
  const [showReviews, setShowReviews] = useState(false);
  const [showSafetyPolicy, setShowSafetyPolicy] = useState(false);
  const [trainerPhotos, setTrainerPhotos] = useState([]);
  const photoInputRef = useRef();

  // Subscription
  const [subscribed, setSubscribed] = useState(false);
  const [showSubscribe, setShowSubscribe] = useState(false);
  const [paymentStep, setPaymentStep] = useState("plan");
  const [paymentForm, setPaymentForm] = useState({ card: "", expiry: "", cvv: "", name: "" });
  const [subRenewDate, setSubRenewDate] = useState(null);
  const openSubscribe = () => { setPaymentStep("plan"); setPaymentForm({ card: "", expiry: "", cvv: "", name: "" }); setShowSubscribe(true); };
  const closeSubscribe = () => setShowSubscribe(false);
  const handlePay = () => {
    if (!paymentForm.card || !paymentForm.expiry || !paymentForm.cvv || !paymentForm.name) return;
    setPaymentStep("processing");
    setTimeout(() => {
      if (Math.random() > 0.1) {
        const renew = new Date(); renew.setMonth(renew.getMonth() + 1);
        setSubRenewDate(renew.toLocaleDateString("en-GB", { day: "numeric", month: "long", year: "numeric" }));
        setSubscribed(true); setPaymentStep("success");
      } else { setPaymentStep("failed"); }
    }, 2000);
  };
  const formatCard = (v) => v.replace(/\D/g, "").slice(0, 16).replace(/(.{4})/g, "$1 ").trim();
  const formatExpiry = (v) => { const d = v.replace(/\D/g, "").slice(0, 4); return d.length > 2 ? d.slice(0, 2) + "/" + d.slice(2) : d; };

  // Classes
  const [showCreateClass, setShowCreateClass] = useState(false);
  const [classes, setClasses] = useState([
    { id: 1, title: "Morning HIIT Bootcamp", workoutType: "HIIT", date: "2026-03-29", startTime: "08:00", endTime: "09:00", time: "08:00", spots: 10, booked: 6, price: "£10", location: "PureGym Victoria", status: "active" },
    { id: 2, title: "Strength & Conditioning", workoutType: "Strength", date: "2026-03-31", startTime: "18:30", endTime: "19:30", time: "18:30", spots: 5, booked: 2, price: "£15", location: "PureGym Victoria", status: "active" },
  ]);
  const [classForm, setClassForm] = useState({ title: "", sessionType: "indoor", workoutType: "", date: "", startTime: "", endTime: "", duration: "45 min", price: "", spots: "", location: "" });
  const [editingClass, setEditingClass] = useState(null);
  const [editForm, setEditForm] = useState({});
  const [cancelTarget, setCancelTarget] = useState(null);
  const [notification, setNotification] = useState(null);
  const [showBroadcast, setShowBroadcast] = useState(false);
  const [broadcastClass, setBroadcastClass] = useState(null);
  const [broadcastMsg, setBroadcastMsg] = useState("");
  const [broadcastSent, setBroadcastSent] = useState(false);

  const showToast = (msg, type = "success") => { setNotification({ msg, type }); setTimeout(() => setNotification(null), 3500); };
  const handleSaveEdit = () => { setClasses(prev => prev.map(c => c.id === editingClass.id ? { ...c, ...editForm } : c)); setEditingClass(null); showToast("Class updated · Registered users notified 📩"); };
  const handleCancelClass = () => { setClasses(prev => prev.map(c => c.id === cancelTarget.id ? { ...c, status: "cancelled" } : c)); setCancelTarget(null); showToast("Class cancelled · Registered users notified 📩"); };
  const handleBroadcastSend = () => {
    if (!broadcastMsg.trim()) return;
    const count = broadcastClass ? broadcastClass.booked : classes.filter(c => c.status === "active").reduce((s, c) => s + c.booked, 0);
    showToast(`Message sent to ${count} participant${count !== 1 ? "s" : ""} 📩`);
    setBroadcastSent(true);
    setTimeout(() => { setBroadcastSent(false); setBroadcastMsg(""); setShowBroadcast(false); setBroadcastClass(null); }, 1600);
  };
  const handlePhotoUpload = (e) => {
    const files = Array.from(e.target.files);
    files.forEach(file => {
      if (trainerPhotos.length >= 10) return;
      const url = URL.createObjectURL(file);
      setTrainerPhotos(prev => prev.length < 10 ? [...prev, { url, name: file.name, type: file.type }] : prev);
    });
  };
  const removePhoto = (idx) => setTrainerPhotos(prev => prev.filter((_, i) => i !== idx));

  const fmtDate = (d) => { if (!d) return "—"; try { return new Date(d).toLocaleDateString("en-GB", { weekday: "short", day: "numeric", month: "short" }); } catch { return d; } };
  const fmtTime = (t) => { if (!t) return "—"; try { const [h, m] = t.split(":"); const hr = parseInt(h); return `${hr % 12 || 12}:${m}${hr < 12 ? "am" : "pm"}`; } catch { return t; } };

  const today = new Date(); today.setHours(0, 0, 0, 0);
  const upcoming = classes.filter(c => c.status === "active" && new Date(c.date) >= today);
  const past = classes.filter(c => c.status !== "active" || new Date(c.date) < today);

  return (
    <div style={{ minHeight: "100vh", background: BG, display: "flex", flexDirection: "column", color: "#FFFFFF", paddingBottom: 80 }}>
      {showSafetyPolicy && (
        <div style={{ position: "fixed", inset: 0, zIndex: 400, maxWidth: 430, margin: "0 auto" }}>
          <SafetyPolicyScreen onBack={() => setShowSafetyPolicy(false)} />
        </div>
      )}
      {!showSafetyPolicy && activeTab === "notifications" && (
        <NotificationsScreen notifications={notifications} onRead={onReadNotification} onReadAll={onReadAllNotifications} isTrainer={true} />
      )}
      {!showSafetyPolicy && activeTab !== "notifications" && (
      <>
      <div style={{ background: "#FF2A2A", padding: "50px 20px 20px" }}>
        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
          <div>
            <p style={{ color: "rgba(255,255,255,0.7)", margin: "0 0 2px", fontSize: 13 }}>Welcome back,</p>
            <h2 style={{ color: "#FFFFFF", margin: 0, fontSize: 22, fontWeight: 800 }}>{user?.name || "Trainer"} ⚡</h2>
          </div>
          <div style={{ display: "flex", flexDirection: "column", alignItems: "flex-end", gap: 6 }}>
            <Avatar initials="PT" color="rgba(255,255,255,0.2)" size={46} />
            <span style={{ background: subscribed ? "rgba(34,197,94,0.25)" : "rgba(255,255,255,0.15)", border: `1px solid ${subscribed ? "rgba(34,197,94,0.5)" : "rgba(255,255,255,0.3)"}`, color: subscribed ? "#86efac" : "rgba(255,255,255,0.8)", fontSize: 10, fontWeight: 700, padding: "3px 8px", borderRadius: 8, letterSpacing: 0.3 }}>{subscribed ? "✓ PRO PLAN" : "FREE PLAN"}</span>
          </div>
        </div>
        <div style={{ display: "flex", gap: 12, marginTop: 16 }}>
          {[{ label: "Classes", val: String(upcoming.length) }, { label: "Clients", val: "24" }, { label: "Rating", val: "4.9★" }].map(s => (
            <div key={s.label} style={{ flex: 1, background: "rgba(255,255,255,0.15)", borderRadius: 12, padding: "10px 12px", textAlign: "center" }}>
              <div style={{ color: "#FFFFFF", fontWeight: 800, fontSize: 18 }}>{s.val}</div>
              <div style={{ color: "rgba(255,255,255,0.7)", fontSize: 11 }}>{s.label}</div>
            </div>
          ))}
        </div>
      </div>

      <div style={{ display: "flex", borderBottom: "1px solid rgba(255,255,255,0.08)", background: "rgba(255,255,255,0.06)" }}>
        {["dashboard", "classes", "profile"].map(t => (
          <button key={t} onClick={() => setTab(t)} style={{ flex: 1, padding: "12px 0", background: "none", border: "none", cursor: "pointer", fontSize: 13, fontWeight: 700, color: tab === t ? "#FF2A2A" : "rgba(255,255,255,0.4)", borderBottom: `2px solid ${tab === t ? "#FF2A2A" : "transparent"}`, textTransform: "capitalize" }}>{t}</button>
        ))}
      </div>

      <div style={{ padding: "16px", overflow: "auto" }}>
        {/* ── DASHBOARD TAB ── */}
        {tab === "dashboard" && (
          <div style={{ display: "flex", flexDirection: "column", gap: 0 }}>
            {/* Subscription card */}
            <div style={{ marginBottom: 18 }}>
              {subscribed ? (
                <div style={{ background: "linear-gradient(135deg, rgba(124,58,237,0.25), rgba(168,85,247,0.15))", border: "1px solid rgba(124,58,237,0.3)", borderRadius: 18, padding: "14px 18px", display: "flex", alignItems: "center", gap: 12 }}>
                  <div style={{ width: 38, height: 38, borderRadius: 12, background: "rgba(255,255,255,0.15)", display: "flex", alignItems: "center", justifyContent: "center", fontSize: 18 }}>⚡</div>
                  <div style={{ flex: 1 }}><div style={{ color: "#fff", fontWeight: 800, fontSize: 14 }}>Trainer Pro · Active</div><div style={{ color: "rgba(255,255,255,0.65)", fontSize: 12 }}>Renews {subRenewDate}</div></div>
                  <span style={{ background: "rgba(34,197,94,0.2)", color: "#86efac", fontSize: 10, fontWeight: 800, padding: "3px 9px", borderRadius: 7, border: "1px solid rgba(34,197,94,0.3)" }}>ACTIVE</span>
                </div>
              ) : (
                <div style={{ background: "linear-gradient(135deg, #7C3AED, #A855F7)", borderRadius: 18, padding: "14px 18px", display: "flex", alignItems: "center", gap: 12 }}>
                  <span style={{ fontSize: 22, flexShrink: 0 }}>🔒</span>
                  <div style={{ flex: 1 }}><div style={{ color: "#fff", fontWeight: 800, fontSize: 14 }}>Upgrade to Trainer Pro</div><div style={{ color: "rgba(255,255,255,0.7)", fontSize: 12 }}>Create classes & upload media</div></div>
                  <button onClick={openSubscribe} style={{ background: "#fff", border: "none", borderRadius: 10, padding: "7px 14px", cursor: "pointer", color: "#7C3AED", fontWeight: 800, fontSize: 12, flexShrink: 0 }}>£5/mo →</button>
                </div>
              )}
            </div>

            {/* Upcoming / Past tabs */}
            <div style={{ display: "flex", background: "rgba(255,255,255,0.04)", borderRadius: 14, padding: 4, marginBottom: 16 }}>
              {[{ id: "upcoming", label: `Upcoming${upcoming.length > 0 ? ` (${upcoming.length})` : ""}` }, { id: "past", label: `Past${past.length > 0 ? ` (${past.length})` : ""}` }].map(t => (
                <button key={t.id} onClick={() => setDashView(t.id)} style={{ flex: 1, padding: "9px 0", borderRadius: 11, border: "none", cursor: "pointer", fontSize: 13, fontWeight: 700, background: dashView === t.id ? "rgba(255,255,255,0.1)" : "transparent", color: dashView === t.id ? "#2F6DFF" : C.muted, boxShadow: dashView === t.id ? "0 2px 8px rgba(0,0,0,0.08)" : "none", transition: "all 0.18s" }}>{t.label}</button>
              ))}
            </div>

            {/* Upcoming Classes */}
            {dashView === "upcoming" && (
              <div style={{ display: "flex", flexDirection: "column", gap: 12 }}>
                {upcoming.length > 0 && (
                  <button onClick={() => { setShowBroadcast(true); setBroadcastClass(null); setBroadcastMsg(""); setBroadcastSent(false); }} style={{ display: "flex", alignItems: "center", gap: 10, background: "rgba(47,109,255,0.12)", border: `1.5px solid ${"#2F6DFF"}30`, borderRadius: 14, padding: "12px 16px", cursor: "pointer", width: "100%" }}>
                    <span style={{ fontSize: 20 }}>📣</span>
                    <div style={{ textAlign: "left", flex: 1 }}><div style={{ fontWeight: 700, color: "#2F6DFF", fontSize: 14 }}>Message Participants</div><div style={{ fontSize: 12, color: "rgba(255,255,255,0.55)" }}>Send a message to a class group</div></div>
                    <span style={{ color: "#2F6DFF", fontSize: 18 }}>›</span>
                  </button>
                )}
                {upcoming.length === 0 ? (
                  <div style={{ textAlign: "center", padding: "48px 20px", color: "rgba(255,255,255,0.55)" }}>
                    <div style={{ fontSize: 52, marginBottom: 12 }}>🗓️</div>
                    <p style={{ margin: 0, fontWeight: 700, fontSize: 15, color: "#FFFFFF" }}>No upcoming classes</p>
                    <p style={{ margin: "6px 0 20px", fontSize: 13 }}>Create your first class to get started</p>
                    <button style={{ ...styles.btn(), width: "auto", padding: "12px 24px" }} onClick={() => { setTab("classes"); if (subscribed) setShowCreateClass(true); else openSubscribe(); }}>+ Create a Class</button>
                  </div>
                ) : upcoming.map(c => {
                  const fillPct = c.spots > 0 ? Math.round((c.booked / c.spots) * 100) : 0;
                  const fillColor = fillPct >= 80 ? C.success : fillPct >= 50 ? "#2F6DFF" : C.warning;
                  return (
                    <div key={c.id} style={{ background: "rgba(255,255,255,0.06)", borderRadius: 20, overflow: "hidden", border: "1.5px solid rgba(255,255,255,0.12)", boxShadow: "0 2px 12px rgba(0,0,0,0.05)" }}>
                      <div style={{ height: 4, background: `linear-gradient(90deg, ${"#2F6DFF"}, #38BFFF)` }} />
                      <div style={{ padding: "16px 18px" }}>
                        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", marginBottom: 12 }}>
                          <div style={{ flex: 1, paddingRight: 8 }}>
                            <h4 style={{ margin: "0 0 4px", fontWeight: 800, fontSize: 16 }}>{c.title}</h4>
                            <div style={{ display: "flex", gap: 6, flexWrap: "wrap" }}>
                              {c.workoutType && <span style={{ background: "rgba(47,109,255,0.12)", color: "#2F6DFF", fontSize: 11, fontWeight: 600, padding: "3px 9px", borderRadius: 6 }}>{c.workoutType}</span>}
                              <span style={{ background: c.price === "Free" ? C.success + "18" : "rgba(255,255,255,0.04)", color: c.price === "Free" ? C.success : C.muted, fontSize: 11, fontWeight: 600, padding: "3px 9px", borderRadius: 6 }}>{c.price || "Free"}</span>
                            </div>
                          </div>
                        </div>
                        <div style={{ display: "flex", flexDirection: "column", gap: 6, marginBottom: 14 }}>
                          <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
                            <span style={{ fontSize: 14 }}>📅</span>
                            <span style={{ fontSize: 13, fontWeight: 600 }}>{fmtDate(c.date)}</span>
                            <span style={{ fontSize: 13, color: "rgba(255,255,255,0.55)" }}>·</span>
                            <span style={{ fontSize: 13, fontWeight: 600 }}>{fmtTime(c.startTime || c.time)}</span>
                            {c.endTime && <><span style={{ fontSize: 13, color: "rgba(255,255,255,0.55)" }}>–</span><span style={{ fontSize: 13, fontWeight: 600 }}>{fmtTime(c.endTime)}</span></>}
                          </div>
                          {c.location && <div style={{ display: "flex", alignItems: "center", gap: 8 }}><span style={{ fontSize: 14 }}>📍</span><span style={{ fontSize: 13, color: "rgba(255,255,255,0.55)" }}>{c.location}</span></div>}
                        </div>
                        <div style={{ background: "rgba(255,255,255,0.04)", borderRadius: 12, padding: "10px 14px", marginBottom: 14 }}>
                          <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 6 }}>
                            <div style={{ display: "flex", alignItems: "center", gap: 6 }}><span style={{ fontSize: 15 }}>👥</span><span style={{ fontSize: 13, fontWeight: 700 }}>{c.booked} participant{c.booked !== 1 ? "s" : ""}</span><span style={{ fontSize: 12, color: "rgba(255,255,255,0.55)" }}>/ {c.spots} spots</span></div>
                            <span style={{ fontSize: 12, fontWeight: 700, color: fillColor }}>{c.spots - c.booked === 0 ? "Full 🔥" : `${c.spots - c.booked} left`}</span>
                          </div>
                          <div style={{ background: "rgba(255,255,255,0.12)", borderRadius: 6, height: 6, overflow: "hidden" }}><div style={{ background: fillColor, width: `${fillPct}%`, height: "100%", borderRadius: 6 }} /></div>
                        </div>
                        <div style={{ display: "flex", gap: 8 }}>
                          <button onClick={() => { setEditingClass(c); setEditForm({ title: c.title, workoutType: c.workoutType || "", date: c.date, startTime: c.startTime || c.time || "", endTime: c.endTime || "", location: c.location, spots: String(c.spots), price: c.price }); }} style={{ ...styles.btn("outline", "sm"), flex: 1, borderRadius: 10, borderColor: "#2F6DFF", color: "#2F6DFF", fontSize: 13 }}>✏️ Edit</button>
                          <button onClick={() => { setShowBroadcast(true); setBroadcastClass(c); setBroadcastMsg(""); setBroadcastSent(false); }} style={{ ...styles.btn("outline", "sm"), flex: 1, borderRadius: 10, borderColor: "#7C3AED", color: "#7C3AED", fontSize: 13 }}>📣 Message</button>
                          <button onClick={() => setCancelTarget(c)} style={{ ...styles.btn("danger", "sm"), flex: 1, borderRadius: 10, fontSize: 13 }}>🚫 Cancel</button>
                        </div>
                      </div>
                    </div>
                  );
                })}
              </div>
            )}

            {/* Past Classes */}
            {dashView === "past" && (
              <div style={{ display: "flex", flexDirection: "column", gap: 10 }}>
                {past.length === 0 ? (
                  <div style={{ textAlign: "center", padding: "48px 20px", color: "rgba(255,255,255,0.55)" }}>
                    <div style={{ fontSize: 52, marginBottom: 12 }}>📋</div>
                    <p style={{ margin: 0, fontWeight: 700, fontSize: 15 }}>No past classes yet</p>
                    <p style={{ margin: "6px 0 0", fontSize: 13 }}>Completed sessions will appear here</p>
                  </div>
                ) : past.map(c => (
                  <div key={c.id} style={{ background: "rgba(255,255,255,0.06)", borderRadius: 18, border: "1.5px solid rgba(255,255,255,0.12)", padding: "14px 16px", opacity: c.status === "cancelled" ? 0.6 : 1 }}>
                    <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", marginBottom: 8 }}>
                      <h4 style={{ margin: 0, fontWeight: 700, fontSize: 14 }}>{c.title}</h4>
                      <span style={{ fontSize: 10, fontWeight: 800, padding: "3px 8px", borderRadius: 6, background: c.status === "cancelled" ? "#FEE2E2" : "rgba(255,255,255,0.04)", color: c.status === "cancelled" ? C.danger : C.muted }}>{c.status === "cancelled" ? "Cancelled" : "Completed"}</span>
                    </div>
                    <div style={{ display: "flex", gap: 10, flexWrap: "wrap" }}>
                      <span style={{ fontSize: 12, color: "rgba(255,255,255,0.55)" }}>📅 {fmtDate(c.date)} · {fmtTime(c.startTime || c.time)}</span>
                      <span style={{ fontSize: 12, color: "rgba(255,255,255,0.55)" }}>👥 {c.booked} attended</span>
                      {c.location && <span style={{ fontSize: 12, color: "rgba(255,255,255,0.55)" }}>📍 {c.location}</span>}
                    </div>
                  </div>
                ))}
              </div>
            )}


          </div>
        )}

        {/* ── CLASSES TAB ── */}
        {tab === "classes" && (
          <div style={{ display: "flex", flexDirection: "column", gap: 14 }}>
            {!subscribed && (
              <div style={{ background: "linear-gradient(135deg, #7C3AED, #A855F7)", borderRadius: 18, padding: "16px 18px" }}>
                <div style={{ display: "flex", gap: 12, alignItems: "flex-start", marginBottom: 12 }}><span style={{ fontSize: 22, flexShrink: 0 }}>🔒</span><div><div style={{ color: "#fff", fontWeight: 800, fontSize: 14, marginBottom: 3 }}>Class creation requires a subscription</div><div style={{ color: "rgba(255,255,255,0.75)", fontSize: 12 }}>Subscribe to create classes and promote sessions.</div></div></div>
                <button onClick={openSubscribe} style={{ width: "100%", padding: "12px 18px", borderRadius: 12, border: "none", background: "#fff", color: "#7C3AED", fontWeight: 800, fontSize: 14, cursor: "pointer" }}>Upgrade to Trainer Plan · £5/month →</button>
              </div>
            )}
            <button style={{ ...styles.btn(), borderRadius: 14, opacity: subscribed ? 1 : 0.45, cursor: subscribed ? "pointer" : "not-allowed" }} onClick={() => subscribed ? setShowCreateClass(true) : openSubscribe()}>{subscribed ? "+ Create Class / Bootcamp" : "🔒 Create Class / Bootcamp"}</button>
            {classes.map(c => {
              const isCancelled = c.status === "cancelled";
              const fillPct = c.spots > 0 ? Math.round((c.booked / c.spots) * 100) : 0;
              const fillColor = fillPct >= 90 ? C.success : fillPct >= 60 ? "#2F6DFF" : C.warning;
              return (
                <div key={c.id} style={{ ...styles.card, opacity: isCancelled ? 0.65 : 1, border: `1.5px solid ${isCancelled ? C.danger + "30" : "rgba(255,255,255,0.1)"}` }}>
                  <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", marginBottom: 12 }}>
                    <div style={{ flex: 1, paddingRight: 10 }}>
                      <h4 style={{ margin: "0 0 4px", fontWeight: 800, fontSize: 15 }}>{c.title}</h4>
                      <div style={{ display: "flex", gap: 6, flexWrap: "wrap" }}>
                        <span style={{ background: isCancelled ? "#FEE2E2" : "rgba(47,109,255,0.15)", color: isCancelled ? C.danger : "#2F6DFF", fontSize: 11, fontWeight: 700, padding: "3px 9px", borderRadius: 6 }}>{isCancelled ? "Cancelled" : "Active"}</span>
                        {c.workoutType && <span style={{ background: "rgba(255,255,255,0.04)", color: "rgba(255,255,255,0.55)", fontSize: 11, padding: "3px 9px", borderRadius: 6 }}>{c.workoutType}</span>}
                        <span style={{ background: c.price === "Free" ? C.success + "15" : "rgba(255,255,255,0.04)", color: c.price === "Free" ? C.success : C.muted, fontSize: 11, fontWeight: 700, padding: "3px 9px", borderRadius: 6 }}>{c.price || "Free"}</span>
                      </div>
                    </div>
                  </div>
                  <div style={{ display: "flex", gap: 8, flexWrap: "wrap", marginBottom: 12 }}>
                    <span style={{ background: "rgba(255,255,255,0.04)", color: "rgba(255,255,255,0.55)", fontSize: 12, padding: "5px 10px", borderRadius: 8 }}>📅 {fmtDate(c.date)} · {fmtTime(c.startTime || c.time)}{c.endTime ? `–${fmtTime(c.endTime)}` : ""}</span>
                    {c.location && <span style={{ background: "rgba(255,255,255,0.04)", color: "rgba(255,255,255,0.55)", fontSize: 12, padding: "5px 10px", borderRadius: 8 }}>📍 {c.location}</span>}
                  </div>
                  {!isCancelled && (
                    <div style={{ marginBottom: 14 }}>
                      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 5 }}>
                        <span style={{ fontSize: 12, color: "rgba(255,255,255,0.55)" }}><strong style={{ color: "#FFFFFF" }}>{c.booked}</strong> / {c.spots} registered</span>
                        <span style={{ fontSize: 12, fontWeight: 700, color: fillColor }}>{fillPct}% full</span>
                      </div>
                      <div style={{ background: "rgba(255,255,255,0.12)", borderRadius: 6, height: 7, overflow: "hidden" }}><div style={{ background: fillColor, width: `${fillPct}%`, height: "100%", borderRadius: 6 }} /></div>
                    </div>
                  )}
                  {!isCancelled && (
                    <div style={{ display: "flex", gap: 8 }}>
                      <button style={{ ...styles.btn("outline", "sm"), flex: 1, borderRadius: 10, borderColor: "#2F6DFF", color: "#2F6DFF" }} onClick={() => { setEditingClass(c); setEditForm({ title: c.title, workoutType: c.workoutType || "", date: c.date, startTime: c.startTime || c.time || "", endTime: c.endTime || "", location: c.location, spots: String(c.spots), price: c.price }); }}>✏️ Edit</button>
                      <button style={{ ...styles.btn("danger", "sm"), flex: 1, borderRadius: 10 }} onClick={() => setCancelTarget(c)}>🚫 Cancel Class</button>
                    </div>
                  )}
                  {isCancelled && <div style={{ background: "#FEF2F2", borderRadius: 10, padding: "8px 12px", fontSize: 12, color: "#FF2A2A", fontWeight: 600 }}>This class was cancelled · All registered users were notified</div>}
                </div>
              );
            })}
          </div>
        )}

        {/* ── PROFILE TAB ── */}
        {tab === "profile" && (
          <div style={{ display: "flex", flexDirection: "column", gap: 12 }}>
            <div style={{ ...styles.card, display: "flex", flexDirection: "column", gap: 12 }}>
              <div style={{ display: "flex", gap: 14, alignItems: "center" }}>
                <Avatar initials="PT" color={"#2F6DFF"} size={64} />
                <div><h3 style={{ margin: 0 }}>{user?.name || "Your Name"}</h3><VerifiedBadge /></div>
              </div>
              <button style={styles.btn("outline", "sm")}>Edit Profile</button>
            </div>
            {[
              { icon: "📸", label: "Manage Photos & Videos", action: () => subscribed ? setShowPhotos(true) : openSubscribe(), locked: !subscribed },
              { icon: "⭐", label: "Reviews", action: () => setShowReviews(true), locked: false },
              { icon: "🛡️", label: "Safety & Reporting", action: () => setShowSafetyPolicy(true), locked: false },
            ].map(s => (
              <div key={s.label} onClick={s.action} style={{ ...styles.card, display: "flex", alignItems: "center", gap: 14, cursor: "pointer", opacity: s.locked ? 0.7 : 1 }}>
                <span style={{ fontSize: 22 }}>{s.icon}</span>
                <span style={{ fontWeight: 600, flex: 1 }}>{s.label}</span>
                {s.locked ? <span style={{ background: "#F3F0FF", color: "#7C3AED", fontSize: 10, fontWeight: 800, padding: "3px 8px", borderRadius: 6 }}>PRO</span> : <span style={{ color: "rgba(255,255,255,0.55)" }}>›</span>}
              </div>
            ))}
            <div onClick={openSubscribe} style={{ ...styles.card, display: "flex", alignItems: "center", gap: 14, cursor: "pointer", background: subscribed ? "#F0FDF4" : "#F3F0FF", border: `1px solid ${subscribed ? "#BBF7D0" : "#DDD6FE"}` }}>
              <span style={{ fontSize: 22 }}>⚡</span>
              <div style={{ flex: 1 }}><div style={{ fontWeight: 700, fontSize: 14, color: subscribed ? C.success : "#7C3AED" }}>{subscribed ? "Trainer Pro · Active" : "Upgrade to Trainer Pro"}</div><div style={{ fontSize: 12, color: "rgba(255,255,255,0.55)" }}>{subscribed ? `Renews ${subRenewDate}` : "£5/month · Unlock all features"}</div></div>
              <span style={{ color: "rgba(255,255,255,0.55)" }}>›</span>
            </div>
            <button style={{ ...styles.btn("danger"), marginTop: 8 }} onClick={onLogout}>Sign Out</button>
          </div>
        )}
      </div>

      {/* Toast */}
      {notification && (
        <div style={{ position: "fixed", top: 60, left: "50%", transform: "translateX(-50%)", background: notification.type === "success" ? C.success : C.danger, color: "#fff", borderRadius: 14, padding: "12px 20px", fontSize: 14, fontWeight: 600, zIndex: 600, boxShadow: "0 8px 32px rgba(0,0,0,0.2)", display: "flex", alignItems: "center", gap: 8, maxWidth: 360, width: "calc(100% - 48px)", animation: "slideDown 0.3s ease" }}>
          <span style={{ fontSize: 18 }}>{notification.type === "success" ? "✅" : "⚠️"}</span>{notification.msg}
        </div>
      )}

      {/* Broadcast Modal */}
      {showBroadcast && (
        <div style={{ position: "fixed", inset: 0, background: "rgba(0,0,0,0.45)", zIndex: 500, display: "flex", alignItems: "flex-end" }} onClick={() => !broadcastSent && setShowBroadcast(false)}>
          <div onClick={e => e.stopPropagation()} style={{ background: "rgba(255,255,255,0.06)", borderRadius: "24px 24px 0 0", width: "100%", maxWidth: 430, margin: "0 auto", padding: "24px 24px 48px" }}>
            <div style={{ display: "flex", justifyContent: "center", marginBottom: 20 }}><div style={{ width: 40, height: 4, borderRadius: 2, background: "rgba(255,255,255,0.12)" }} /></div>
            {broadcastSent ? (
              <div style={{ textAlign: "center", padding: "16px 0 8px" }}>
                <div style={{ fontSize: 52, marginBottom: 12 }}>📣</div>
                <h3 style={{ margin: "0 0 6px", fontWeight: 800, fontSize: 19 }}>Message sent!</h3>
                <p style={{ margin: 0, color: "rgba(255,255,255,0.55)", fontSize: 14 }}>All participants have been notified.</p>
              </div>
            ) : (
              <>
                <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", marginBottom: 18 }}>
                  <div><h3 style={{ margin: "0 0 4px", fontSize: 19, fontWeight: 800 }}>📣 Message Participants</h3><p style={{ margin: 0, fontSize: 13, color: "rgba(255,255,255,0.55)" }}>Send a message to class members</p></div>
                  <button onClick={() => setShowBroadcast(false)} style={{ background: "rgba(255,255,255,0.04)", border: "none", borderRadius: 10, width: 32, height: 32, cursor: "pointer", fontSize: 16, display: "flex", alignItems: "center", justifyContent: "center", flexShrink: 0 }}>✕</button>
                </div>
                <div style={{ marginBottom: 16 }}>
                  <label style={styles.label}>Select class</label>
                  <div style={{ display: "flex", flexDirection: "column", gap: 8 }}>
                    <div onClick={() => setBroadcastClass(null)} style={{ display: "flex", alignItems: "center", gap: 12, padding: "11px 14px", borderRadius: 12, cursor: "pointer", border: `2px solid ${broadcastClass === null ? "#2F6DFF" : "rgba(255,255,255,0.1)"}`, background: broadcastClass === null ? "rgba(47,109,255,0.15)" : "#FFFFFF" }}>
                      <span style={{ fontSize: 18 }}>📋</span>
                      <div style={{ flex: 1 }}><div style={{ fontWeight: 700, fontSize: 13, color: broadcastClass === null ? "#2F6DFF" : C.text }}>All upcoming classes</div><div style={{ fontSize: 12, color: "rgba(255,255,255,0.55)" }}>{classes.filter(c => c.status === "active").reduce((s, c) => s + c.booked, 0)} total participants</div></div>
                      {broadcastClass === null && <span style={{ color: "#2F6DFF", fontWeight: 800 }}>✓</span>}
                    </div>
                    {upcoming.map(c => {
                      const sel = broadcastClass?.id === c.id;
                      return (
                        <div key={c.id} onClick={() => setBroadcastClass(c)} style={{ display: "flex", alignItems: "center", gap: 12, padding: "11px 14px", borderRadius: 12, cursor: "pointer", border: `2px solid ${sel ? "#2F6DFF" : "rgba(255,255,255,0.1)"}`, background: sel ? "rgba(47,109,255,0.15)" : "#FFFFFF" }}>
                          <span style={{ fontSize: 18 }}>🗓️</span>
                          <div style={{ flex: 1 }}><div style={{ fontWeight: 700, fontSize: 13, color: sel ? "#2F6DFF" : C.text }}>{c.title}</div><div style={{ fontSize: 12, color: "rgba(255,255,255,0.55)" }}>{fmtDate(c.date)} · {fmtTime(c.startTime || c.time)} · 👥 {c.booked}</div></div>
                          {sel && <span style={{ color: "#2F6DFF", fontWeight: 800 }}>✓</span>}
                        </div>
                      );
                    })}
                  </div>
                </div>
                <div style={{ marginBottom: 16 }}>
                  <label style={styles.label}>Your message</label>
                  <textarea style={{ ...styles.input, minHeight: 100, resize: "none" }} placeholder="e.g. Don't forget to bring your resistance bands tomorrow!" value={broadcastMsg} onChange={e => setBroadcastMsg(e.target.value)} />
                  <div style={{ textAlign: "right", fontSize: 12, color: broadcastMsg.length > 280 ? C.danger : C.muted, marginTop: 4 }}>{broadcastMsg.length}/280</div>
                </div>
                {broadcastMsg.trim().length > 0 && (
                  <div style={{ background: "rgba(255,255,255,0.04)", borderRadius: 12, padding: "12px 14px", marginBottom: 16, border: "1px solid rgba(255,255,255,0.09)" }}>
                    <div style={{ fontSize: 11, color: "rgba(255,255,255,0.55)", fontWeight: 700, textTransform: "uppercase", letterSpacing: 0.4, marginBottom: 8 }}>Preview</div>
                    <div style={{ display: "flex", gap: 10 }}><span style={{ fontSize: 18 }}>🔔</span><div><div style={{ fontWeight: 700, fontSize: 13 }}>{user?.name || "Your Trainer"}</div><div style={{ fontSize: 13, color: "rgba(255,255,255,0.55)", marginTop: 2 }}>{broadcastMsg}</div></div></div>
                  </div>
                )}
                <button style={{ ...styles.btn(), borderRadius: 14, padding: "15px 24px", fontSize: 15, opacity: broadcastMsg.trim().length > 0 ? 1 : 0.45 }} onClick={handleBroadcastSend} disabled={!broadcastMsg.trim()}>
                  Send to {broadcastClass ? `${broadcastClass.booked} participant${broadcastClass.booked !== 1 ? "s" : ""}` : "all participants"} →
                </button>
              </>
            )}
          </div>
        </div>
      )}

      {/* Edit Class Modal */}
      {editingClass && (
        <div style={{ position: "fixed", inset: 0, background: "rgba(0,0,0,0.45)", zIndex: 500, display: "flex", alignItems: "flex-end" }} onClick={() => setEditingClass(null)}>
          <div onClick={e => e.stopPropagation()} style={{ background: "rgba(255,255,255,0.06)", borderRadius: "24px 24px 0 0", width: "100%", maxWidth: 430, margin: "0 auto", padding: "24px 24px 48px", maxHeight: "90vh", overflow: "auto" }}>
            <div style={{ display: "flex", justifyContent: "center", marginBottom: 20 }}><div style={{ width: 40, height: 4, borderRadius: 2, background: "rgba(255,255,255,0.12)" }} /></div>
            <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 6 }}>
              <h3 style={{ margin: "0 0 4px", fontSize: 19, fontWeight: 800 }}>✏️ Edit Class</h3>
              <button onClick={() => setEditingClass(null)} style={{ background: "rgba(255,255,255,0.04)", border: "none", borderRadius: 10, width: 32, height: 32, cursor: "pointer", fontSize: 16, display: "flex", alignItems: "center", justifyContent: "center" }}>✕</button>
            </div>
            <div style={{ background: "rgba(47,109,255,0.12)", border: `1px solid ${"#2F6DFF"}30`, borderRadius: 12, padding: "10px 14px", marginTop: 14, marginBottom: 20, display: "flex", gap: 8 }}>
              <span style={{ fontSize: 15, flexShrink: 0 }}>📩</span>
              <p style={{ margin: 0, fontSize: 12, color: "#2F6DFF" }}>Saving will notify <strong>{editingClass.booked} registered users</strong> about changes.</p>
            </div>
            <div style={{ display: "flex", flexDirection: "column", gap: 16 }}>
              <div><label style={styles.label}>Class Name</label><input style={styles.input} value={editForm.title || ""} onChange={e => setEditForm(f => ({ ...f, title: e.target.value }))} /></div>
              <div>
                <label style={styles.label}>Workout Type / Style</label>
                <div style={{ display: "flex", flexWrap: "wrap", gap: 8 }}>{WORKOUT_TYPES.map(t => <div key={t} onClick={() => setEditForm(f => ({ ...f, workoutType: t }))} style={{ ...styles.chip(editForm.workoutType === t), fontSize: 12 }}>{t}</div>)}</div>
              </div>
              <div><label style={styles.label}>Gym Location</label><select style={styles.input} value={editForm.location} onChange={e => setEditForm(f => ({ ...f, location: e.target.value }))}><option value="">Select gym...</option>{LONDON_GYMS.map(g => <option key={g}>{g}</option>)}</select></div>
              <PickerField label="Date" type="date" value={editForm.date} onChange={e => setEditForm(f => ({ ...f, date: e.target.value }))} />
              <div style={{ display: "flex", gap: 12 }}>
                <div style={{ flex: 1 }}><PickerField label="Start Time" type="time" value={editForm.startTime} onChange={e => setEditForm(f => ({ ...f, startTime: e.target.value }))} /></div>
                <div style={{ flex: 1 }}><PickerField label="End Time" type="time" value={editForm.endTime} onChange={e => setEditForm(f => ({ ...f, endTime: e.target.value }))} /></div>
              </div>
              <div>
                <label style={styles.label}>Capacity (max participants)</label>
                <input style={styles.input} type="number" min={editingClass.booked} value={editForm.spots} onChange={e => setEditForm(f => ({ ...f, spots: e.target.value }))} />
                {parseInt(editForm.spots) < editingClass.booked && <p style={{ color: "#FF2A2A", fontSize: 12, margin: "6px 0 0" }}>⚠️ Can't be less than current bookings ({editingClass.booked})</p>}
              </div>
              <div>
                <label style={styles.label}>Price</label>
                <div style={{ display: "flex", gap: 8 }}>
                  <div onClick={() => setEditForm(f => ({ ...f, price: "Free" }))} style={{ ...styles.chip(editForm.price === "Free"), flex: 1, textAlign: "center" }}>Free</div>
                  <input style={{ ...styles.input, flex: 2 }} placeholder="e.g. £10" value={editForm.price === "Free" ? "" : editForm.price} onChange={e => setEditForm(f => ({ ...f, price: e.target.value }))} />
                </div>
              </div>
              <div style={{ display: "flex", gap: 10, marginTop: 4 }}>
                <button style={{ ...styles.btn("outline"), flex: 1, borderRadius: 14 }} onClick={() => setEditingClass(null)}>Discard</button>
                <button style={{ ...styles.btn(), flex: 2, borderRadius: 14, opacity: parseInt(editForm.spots) < editingClass.booked ? 0.45 : 1 }} onClick={handleSaveEdit} disabled={parseInt(editForm.spots) < editingClass.booked}>Save & Notify Users</button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Cancel Confirmation */}
      {cancelTarget && (
        <div style={{ position: "fixed", inset: 0, background: "rgba(0,0,0,0.85)", zIndex: 700, display: "flex", alignItems: "center", justifyContent: "center", padding: 24 }} onClick={() => setCancelTarget(null)}>
          <div onClick={e => e.stopPropagation()} style={{ background: "#0D1E4A", border: "1px solid rgba(255,255,255,0.12)", borderRadius: 24, padding: "28px 24px", width: "100%", maxWidth: 360, boxShadow: "0 24px 80px rgba(0,0,0,0.7)" }}>
            <div style={{ width: 60, height: 60, borderRadius: 20, background: "#FEF2F2", display: "flex", alignItems: "center", justifyContent: "center", fontSize: 28, marginBottom: 20 }}>🚫</div>
            <h3 style={{ margin: "0 0 8px", fontSize: 19, fontWeight: 800 }}>Cancel this class?</h3>
            <p style={{ margin: "0 0 8px", fontSize: 14, color: "rgba(255,255,255,0.55)" }}><strong style={{ color: "#FFFFFF" }}>{cancelTarget.title}</strong></p>
            <p style={{ margin: "0 0 20px", fontSize: 14, color: "rgba(255,255,255,0.55)", lineHeight: 1.5 }}>This cannot be undone. All <strong style={{ color: "#FFFFFF" }}>{cancelTarget.booked} registered users</strong> will be notified immediately.</p>
            <div style={{ display: "flex", flexDirection: "column", gap: 10 }}>
              <button style={{ ...styles.btn("danger"), borderRadius: 14, padding: "15px 24px" }} onClick={handleCancelClass}>Yes, Cancel Class</button>
              <button style={{ ...styles.btn("ghost"), borderRadius: 14, color: "rgba(255,255,255,0.55)" }} onClick={() => setCancelTarget(null)}>Keep Class Active</button>
            </div>
          </div>
        </div>
      )}

      {/* Create Class Modal */}
      {showCreateClass && (
        <div style={{ position: "fixed", inset: 0, background: "rgba(0,0,0,0.4)", zIndex: 200, display: "flex", alignItems: "flex-end" }} onClick={() => setShowCreateClass(false)}>
          <div onClick={e => e.stopPropagation()} style={{ background: "rgba(255,255,255,0.06)", borderRadius: "24px 24px 0 0", width: "100%", maxWidth: 430, margin: "0 auto", padding: "24px 24px 40px", maxHeight: "90vh", overflow: "auto" }}>
            <div style={{ display: "flex", justifyContent: "space-between", marginBottom: 16 }}>
              <h3 style={{ margin: 0, fontSize: 18, fontWeight: 800 }}>New Class / Bootcamp</h3>
              <button onClick={() => setShowCreateClass(false)} style={{ background: "none", border: "none", fontSize: 22, cursor: "pointer" }}>✕</button>
            </div>
            <div style={{ display: "flex", flexDirection: "column", gap: 14 }}>
              <div><label style={styles.label}>Class Name</label><input style={styles.input} placeholder="e.g. Morning HIIT Bootcamp" value={classForm.title} onChange={e => setClassForm(f => ({ ...f, title: e.target.value }))} /></div>
              <div>
                <label style={styles.label}>Session Type</label>
                <div style={{ display: "flex", gap: 8 }}>
                  {[{ id: "indoor", icon: "🏋️", label: "Indoor PT" }, { id: "bootcamp", icon: "🌳", label: "Bootcamp" }, { id: "group", icon: "👥", label: "Group Class" }].map(t => (
                    <div key={t.id} onClick={() => setClassForm(f => ({ ...f, sessionType: t.id, location: "" }))}
                      style={{ flex: 1, padding: "10px 6px", borderRadius: 12, border: `2px solid ${(classForm.sessionType || "indoor") === t.id ? "#FF2A2A" : "rgba(255,255,255,0.1)"}`, background: (classForm.sessionType || "indoor") === t.id ? "rgba(255,42,42,0.1)" : "rgba(255,255,255,0.04)", cursor: "pointer", textAlign: "center" }}>
                      <div style={{ fontSize: 18, marginBottom: 3 }}>{t.icon}</div>
                      <div style={{ fontSize: 10, fontWeight: 700, color: (classForm.sessionType || "indoor") === t.id ? "#FF2A2A" : "rgba(255,255,255,0.6)" }}>{t.label}</div>
                    </div>
                  ))}
                </div>
              </div>
              <div>
                <label style={styles.label}>Workout Type / Style</label>
                <div style={{ display: "flex", flexWrap: "wrap", gap: 8 }}>{WORKOUT_TYPES.map(t => <div key={t} onClick={() => setClassForm(f => ({ ...f, workoutType: t }))} style={{ ...styles.chip(classForm.workoutType === t), fontSize: 12 }}>{t}</div>)}</div>
              </div>
              {(classForm.sessionType || "indoor") === "bootcamp" ? (
                <div><label style={styles.label}>Outdoor Location</label><input style={styles.input} placeholder="e.g. Victoria Park, E9 · Clapham Common, SW4" value={classForm.location} onChange={e => setClassForm(f => ({ ...f, location: e.target.value }))} /></div>
              ) : (
                <div><label style={styles.label}>Gym Location</label><select style={styles.input} value={classForm.location} onChange={e => setClassForm(f => ({ ...f, location: e.target.value }))}><option value="">Select gym...</option>{LONDON_GYMS.map(g => <option key={g}>{g}</option>)}</select></div>
              )}
              <PickerField label="Date" type="date" value={classForm.date} onChange={e => setClassForm(f => ({ ...f, date: e.target.value }))} />
              <div style={{ display: "flex", gap: 12 }}>
                <div style={{ flex: 1 }}><PickerField label="Start Time" type="time" value={classForm.startTime} onChange={e => setClassForm(f => ({ ...f, startTime: e.target.value }))} /></div>
                <div style={{ flex: 1 }}><PickerField label="End Time" type="time" value={classForm.endTime} onChange={e => setClassForm(f => ({ ...f, endTime: e.target.value }))} /></div>
              </div>
              <div>
                <label style={styles.label}>Duration</label>
                <div style={{ display: "flex", gap: 6, flexWrap: "wrap" }}>
                  {["45 min", "1 hour", "1h 15min", "1h 30min"].map(d => <div key={d} onClick={() => setClassForm(f => ({ ...f, duration: d }))} style={{ ...styles.chip(classForm.duration === d), flex: 1, textAlign: "center", fontSize: 11 }}>{d}</div>)}
                </div>
              </div>
              <div><label style={styles.label}>Capacity (max participants)</label><input style={styles.input} type="number" placeholder="e.g. 10" value={classForm.spots} onChange={e => setClassForm(f => ({ ...f, spots: e.target.value }))} /></div>
              <div>
                <label style={styles.label}>Price (optional)</label>
                <div style={{ display: "flex", gap: 8 }}>
                  <div onClick={() => setClassForm(f => ({ ...f, price: "Free" }))} style={{ ...styles.chip(classForm.price === "Free"), flex: 1, textAlign: "center" }}>Free</div>
                  <input style={{ ...styles.input, flex: 2 }} placeholder="e.g. £10" value={classForm.price === "Free" ? "" : classForm.price} onChange={e => setClassForm(f => ({ ...f, price: e.target.value }))} />
                </div>
              </div>
              <button style={styles.btn()} onClick={() => {
                if (classForm.title && classForm.date && classForm.location) {
                  setClasses(prev => [...prev, { id: Date.now(), ...classForm, time: classForm.startTime, booked: 0, spots: parseInt(classForm.spots) || 10, status: "active" }]);
                  setShowCreateClass(false);
                  setClassForm({ title: "", sessionType: "indoor", workoutType: "", date: "", startTime: "", endTime: "", duration: "45 min", price: "", spots: "", location: "" });
                }
              }}>Post Class</button>
            </div>
          </div>
        </div>
      )}

      {/* Subscription Modal */}
      {showSubscribe && (
        <div style={{ position: "fixed", inset: 0, background: BG, zIndex: 600, display: "flex", flexDirection: "column", maxWidth: 430, margin: "0 auto", overflow: "auto" }}>
          <div style={{ flex: 1, overflow: "auto", paddingBottom: 40 }}>
            <div style={{ padding: "50px 0 0" }} />
            {paymentStep === "plan" && (
              <div style={{ padding: "20px 24px" }}>
                <div style={{ display: "flex", alignItems: "center", gap: 14, marginBottom: 24 }}>
                  <button onClick={closeSubscribe} style={{ background: "rgba(255,255,255,0.08)", border: "none", borderRadius: 10, width: 36, height: 36, cursor: "pointer", fontSize: 20, color: "#fff", display: "flex", alignItems: "center", justifyContent: "center" }}>←</button>
                  <h3 style={{ margin: 0, fontSize: 20, fontWeight: 900 }}>Trainer Pro Plan</h3>
                </div>
                <div style={{ background: "linear-gradient(135deg, #7C3AED, #A855F7)", borderRadius: 20, padding: "24px 20px", textAlign: "center", marginBottom: 20 }}>
                  <div style={{ color: "rgba(255,255,255,0.8)", fontSize: 14, marginBottom: 4 }}>Monthly subscription</div>
                  <div style={{ color: "#fff", fontSize: 48, fontWeight: 900, lineHeight: 1, marginBottom: 4 }}>£5</div>
                  <div style={{ color: "rgba(255,255,255,0.7)", fontSize: 13 }}>per month · cancel anytime</div>
                </div>
                <div style={{ display: "flex", flexDirection: "column", gap: 10, marginBottom: 24 }}>
                  {[{ icon: "🗓️", title: "Create Classes & Bootcamps", desc: "Post unlimited sessions for members" }, { icon: "📸", title: "Upload Photos & Videos", desc: "Showcase your training style" }, { icon: "📣", title: "Promote Sessions", desc: "Boost visibility to reach more clients" }, { icon: "✅", title: "Verified Trainer Badge", desc: "Build trust with the verified checkmark" }].map(f => (
                    <div key={f.title} style={{ display: "flex", gap: 14, alignItems: "flex-start", padding: "12px 0", borderBottom: "1px solid rgba(255,255,255,0.08)" }}>
                      <div style={{ width: 38, height: 38, borderRadius: 12, background: "rgba(124,58,237,0.2)", border: "1px solid rgba(124,58,237,0.3)", display: "flex", alignItems: "center", justifyContent: "center", fontSize: 18, flexShrink: 0 }}>{f.icon}</div>
                      <div><div style={{ fontWeight: 700, fontSize: 14 }}>{f.title}</div><div style={{ fontSize: 12, color: "rgba(255,255,255,0.55)", marginTop: 2 }}>{f.desc}</div></div>
                    </div>
                  ))}
                </div>
                <button style={{ ...styles.btn(), background: "linear-gradient(135deg, #7C3AED, #A855F7)", padding: "16px 24px", fontSize: 16, borderRadius: 16 }} onClick={() => setPaymentStep("payment")}>Subscribe Now · £5/month →</button>
                <p style={{ textAlign: "center", fontSize: 12, color: "rgba(255,255,255,0.55)", marginTop: 12 }}>Secure payment · Cancel anytime from your profile</p>
              </div>
            )}
            {paymentStep === "payment" && (
              <div style={{ padding: "20px 24px" }}>
                <div style={{ display: "flex", alignItems: "center", gap: 12, marginBottom: 24 }}>
                  <button onClick={() => setPaymentStep("plan")} style={{ background: "none", border: "none", fontSize: 20, cursor: "pointer", padding: 0, color: "#FFFFFF" }}>←</button>
                  <h3 style={{ margin: 0, fontSize: 19, fontWeight: 800 }}>Payment Details</h3>
                </div>
                <div style={{ background: "rgba(124,58,237,0.15)", border: "1px solid rgba(124,58,237,0.3)", borderRadius: 14, padding: "14px 16px", marginBottom: 24, display: "flex", justifyContent: "space-between", alignItems: "center" }}>
                  <div><div style={{ fontWeight: 700, fontSize: 14, color: "#FFFFFF" }}>Trainer Pro Plan</div><div style={{ fontSize: 12, color: "rgba(255,255,255,0.5)" }}>Billed monthly</div></div>
                  <div style={{ fontWeight: 900, fontSize: 20, color: "#7C3AED" }}>£5</div>
                </div>
                <div style={{ display: "flex", flexDirection: "column", gap: 16 }}>
                  <div><label style={styles.label}>Cardholder Name</label><input style={styles.input} placeholder="Full name on card" value={paymentForm.name} onChange={e => setPaymentForm(f => ({ ...f, name: e.target.value }))} /></div>
                  <div><label style={styles.label}>Card Number</label><div style={{ position: "relative" }}><input style={{ ...styles.input, paddingRight: 48 }} placeholder="1234 5678 9012 3456" value={paymentForm.card} onChange={e => setPaymentForm(f => ({ ...f, card: formatCard(e.target.value) }))} /><span style={{ position: "absolute", right: 14, top: "50%", transform: "translateY(-50%)", fontSize: 18 }}>💳</span></div></div>
                  <div style={{ display: "flex", gap: 12 }}>
                    <div style={{ flex: 1 }}><label style={styles.label}>Expiry</label><input style={styles.input} placeholder="MM/YY" value={paymentForm.expiry} onChange={e => setPaymentForm(f => ({ ...f, expiry: formatExpiry(e.target.value) }))} /></div>
                    <div style={{ flex: 1 }}><label style={styles.label}>CVV</label><input style={styles.input} placeholder="•••" maxLength={4} type="password" value={paymentForm.cvv} onChange={e => setPaymentForm(f => ({ ...f, cvv: e.target.value.replace(/\D/g, "").slice(0, 4) }))} /></div>
                  </div>
                  <div style={{ display: "flex", alignItems: "center", gap: 8, background: "rgba(255,255,255,0.04)", borderRadius: 10, padding: "10px 14px" }}><span style={{ fontSize: 16 }}>🔒</span><span style={{ fontSize: 12, color: "rgba(255,255,255,0.55)" }}>Your payment is encrypted and secure.</span></div>
                  <button style={{ ...styles.btn(), background: "linear-gradient(135deg, #7C3AED, #A855F7)", padding: "16px 24px", fontSize: 16, borderRadius: 16, opacity: (paymentForm.card.length >= 19 && paymentForm.expiry.length === 5 && paymentForm.cvv.length >= 3 && paymentForm.name) ? 1 : 0.45 }} onClick={handlePay} disabled={!(paymentForm.card.length >= 19 && paymentForm.expiry.length === 5 && paymentForm.cvv.length >= 3 && paymentForm.name)}>Pay £5 · Subscribe Now</button>
                </div>
              </div>
            )}
            {paymentStep === "processing" && (
              <div style={{ padding: "60px 24px", textAlign: "center", display: "flex", flexDirection: "column", alignItems: "center", gap: 20 }}>
                <div style={{ width: 72, height: 72, borderRadius: 22, background: "#F3F0FF", display: "flex", alignItems: "center", justifyContent: "center", fontSize: 32 }}>⏳</div>
                <div><h3 style={{ margin: "0 0 8px", fontSize: 19, fontWeight: 800 }}>Processing payment…</h3><p style={{ margin: 0, color: "rgba(255,255,255,0.55)", fontSize: 14 }}>Please wait, do not close this screen</p></div>
              </div>
            )}
            {paymentStep === "success" && (
              <div style={{ padding: "48px 28px", textAlign: "center", display: "flex", flexDirection: "column", alignItems: "center", gap: 16 }}>
                <div style={{ width: 88, height: 88, borderRadius: 28, background: "linear-gradient(135deg, #7C3AED, #A855F7)", display: "flex", alignItems: "center", justifyContent: "center", fontSize: 42 }}>⚡</div>
                <div><h2 style={{ margin: "0 0 8px", fontSize: 24, fontWeight: 900 }}>You're on Trainer Pro!</h2><p style={{ margin: 0, color: "rgba(255,255,255,0.55)", fontSize: 14 }}>All Pro features are now unlocked.</p></div>
                <div style={{ background: "rgba(124,58,237,0.15)", border: "1px solid rgba(124,58,237,0.3)", borderRadius: 16, padding: "14px 18px", width: "100%", textAlign: "left" }}>
                  {["Create classes & bootcamps", "Upload photos & videos", "Promote your sessions"].map((f, i) => (
                    <div key={i} style={{ display: "flex", alignItems: "center", gap: 10, padding: "6px 0" }}>
                      <div style={{ width: 20, height: 20, borderRadius: 10, background: "#7C3AED", display: "flex", alignItems: "center", justifyContent: "center", flexShrink: 0 }}><span style={{ color: "#fff", fontSize: 11, fontWeight: 800 }}>✓</span></div>
                      <span style={{ fontSize: 14 }}>{f}</span>
                    </div>
                  ))}
                </div>
                <button style={{ ...styles.btn(), background: "linear-gradient(135deg, #7C3AED, #A855F7)", padding: "16px 24px", fontSize: 16, borderRadius: 16, width: "100%" }} onClick={closeSubscribe}>Start Using Pro Features →</button>
              </div>
            )}
            {paymentStep === "failed" && (
              <div style={{ padding: "48px 28px", textAlign: "center", display: "flex", flexDirection: "column", alignItems: "center", gap: 16 }}>
                <div style={{ width: 80, height: 80, borderRadius: 24, background: "#FEF2F2", border: "2px solid #FECACA", display: "flex", alignItems: "center", justifyContent: "center", fontSize: 38 }}>❌</div>
                <div><h3 style={{ margin: "0 0 8px", fontSize: 20, fontWeight: 800 }}>Payment failed</h3><p style={{ margin: 0, color: "rgba(255,255,255,0.55)", fontSize: 14 }}>Please check your card details and try again.</p></div>
                <div style={{ display: "flex", flexDirection: "column", gap: 10, width: "100%" }}>
                  <button style={{ ...styles.btn(), background: "linear-gradient(135deg, #7C3AED, #A855F7)", padding: "15px 24px", fontSize: 15, borderRadius: 14 }} onClick={() => setPaymentStep("payment")}>Try Again</button>
                  <button style={{ ...styles.btn("ghost"), color: "rgba(255,255,255,0.55)" }} onClick={closeSubscribe}>Cancel</button>
                </div>
              </div>
            )}
          </div>
        </div>
      )}

      {/* Photos & Videos Panel */}
      {showPhotos && (
        <div style={{ position: "fixed", inset: 0, background: BG, zIndex: 400, display: "flex", flexDirection: "column", maxWidth: 430, margin: "0 auto" }}>
          <div style={{ background: "rgba(255,255,255,0.06)", borderBottom: "1px solid rgba(255,255,255,0.08)", padding: "50px 20px 16px", display: "flex", alignItems: "center", gap: 12 }}>
            <button onClick={() => setShowPhotos(false)} style={{ background: "none", border: "none", fontSize: 22, cursor: "pointer", color: "#FFFFFF", display: "flex", alignItems: "center" }}>←</button>
            <h2 style={{ margin: 0, fontSize: 18, fontWeight: 800, flex: 1 }}>Photos & Videos</h2>
            <span style={{ fontSize: 12, color: "rgba(255,255,255,0.55)", fontWeight: 600 }}>{trainerPhotos.length} / 10</span>
          </div>
          <div style={{ flex: 1, overflow: "auto", padding: "20px 16px 40px" }}>
            <div style={{ background: "rgba(47,109,255,0.12)", borderRadius: 14, padding: "12px 16px", marginBottom: 20, display: "flex", gap: 10 }}>
              <span style={{ fontSize: 16, flexShrink: 0 }}>ℹ️</span>
              <p style={{ margin: 0, fontSize: 13, color: "#2F6DFF" }}>Upload up to <strong>10 photos</strong> and short <strong>videos</strong> to showcase your training style.</p>
            </div>
            <input ref={photoInputRef} type="file" accept="image/*,video/*" multiple style={{ display: "none" }} onChange={handlePhotoUpload} />
            {trainerPhotos.length < 10 && (
              <button onClick={() => photoInputRef.current.click()} style={{ width: "100%", padding: "20px", borderRadius: 16, border: `2.5px dashed ${"#2F6DFF"}60`, background: "rgba(47,109,255,0.12)", cursor: "pointer", display: "flex", flexDirection: "column", alignItems: "center", gap: 8, marginBottom: 20 }}>
                <span style={{ fontSize: 32 }}>📤</span>
                <span style={{ fontSize: 15, fontWeight: 700, color: "#2F6DFF" }}>Upload Photos or Videos</span>
                <span style={{ fontSize: 12, color: "rgba(255,255,255,0.55)" }}>{10 - trainerPhotos.length} slot{10 - trainerPhotos.length !== 1 ? "s" : ""} remaining · JPG, PNG, MP4</span>
              </button>
            )}
            {trainerPhotos.length > 0 ? (
              <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr 1fr", gap: 8 }}>
                {trainerPhotos.map((p, i) => (
                  <div key={i} style={{ position: "relative", borderRadius: 12, overflow: "hidden", aspectRatio: "1", background: "rgba(255,255,255,0.12)" }}>
                    {p.type?.startsWith("video") ? <div style={{ width: "100%", height: "100%", background: "#1a1a2e", display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center", gap: 4 }}><span style={{ fontSize: 24 }}>🎬</span><span style={{ fontSize: 10, color: "rgba(255,255,255,0.7)", fontWeight: 600 }}>VIDEO</span></div> : <img src={p.url} alt={`Media ${i + 1}`} style={{ width: "100%", height: "100%", objectFit: "cover", display: "block" }} />}
                    {i === 0 && <div style={{ position: "absolute", top: 6, left: 6, background: "#FF2A2A", color: "#fff", fontSize: 9, fontWeight: 800, padding: "2px 7px", borderRadius: 6 }}>COVER</div>}
                    <button onClick={() => removePhoto(i)} style={{ position: "absolute", top: 6, right: 6, background: "rgba(0,0,0,0.6)", border: "none", borderRadius: 12, width: 24, height: 24, cursor: "pointer", color: "#fff", fontSize: 13, display: "flex", alignItems: "center", justifyContent: "center" }}>✕</button>
                  </div>
                ))}
              </div>
            ) : (
              <div style={{ textAlign: "center", padding: "40px 20px", color: "rgba(255,255,255,0.55)" }}><div style={{ fontSize: 52, marginBottom: 12 }}>🖼️</div><p style={{ margin: 0, fontWeight: 600 }}>No photos yet</p><p style={{ margin: "6px 0 0", fontSize: 13 }}>Upload your first photo to start building your profile</p></div>
            )}
          </div>
        </div>
      )}

      {/* Reviews Panel */}
      {showReviews && (
        <div style={{ position: "fixed", inset: 0, background: BG, zIndex: 400, display: "flex", flexDirection: "column", maxWidth: 430, margin: "0 auto" }}>
          <div style={{ background: "rgba(255,255,255,0.06)", borderBottom: "1px solid rgba(255,255,255,0.08)", padding: "50px 20px 16px", display: "flex", alignItems: "center", gap: 12 }}>
            <button onClick={() => setShowReviews(false)} style={{ background: "none", border: "none", fontSize: 22, cursor: "pointer", color: "#FFFFFF" }}>←</button>
            <h2 style={{ margin: 0, fontSize: 18, fontWeight: 800 }}>My Reviews</h2>
          </div>
          <div style={{ flex: 1, overflow: "auto", padding: "20px 16px 40px", display: "flex", flexDirection: "column", gap: 12 }}>
            <div style={{ ...styles.card, display: "flex", gap: 20, alignItems: "center" }}>
              <div style={{ textAlign: "center" }}><div style={{ fontSize: 36, fontWeight: 900 }}>4.9</div><div style={{ color: "#F59E0B", fontSize: 18 }}>★★★★★</div><div style={{ fontSize: 12, color: "rgba(255,255,255,0.55)", marginTop: 2 }}>47 reviews</div></div>
              <div style={{ flex: 1, display: "flex", flexDirection: "column", gap: 5 }}>
                {[5,4,3,2,1].map(star => { const w = star === 5 ? 82 : star === 4 ? 12 : star === 3 ? 4 : star === 2 ? 2 : 0; return <div key={star} style={{ display: "flex", alignItems: "center", gap: 6 }}><span style={{ fontSize: 11, color: "rgba(255,255,255,0.55)", width: 8 }}>{star}</span><div style={{ flex: 1, height: 6, background: "rgba(255,255,255,0.12)", borderRadius: 3, overflow: "hidden" }}><div style={{ width: `${w}%`, height: "100%", background: "#F59E0B", borderRadius: 3 }} /></div></div>; })}
              </div>
            </div>
            {[{ name: "James P.", stars: 5, date: "14 Mar 2026", text: "Incredible trainer. Saw real results within 4 weeks. Always professional and motivating." }, { name: "Sasha M.", stars: 5, date: "2 Mar 2026", text: "Very professional and always on time. Pushes you just the right amount." }, { name: "Diane K.", stars: 5, date: "18 Feb 2026", text: "Best PT I've had. Knows exactly how to adapt sessions to your level." }, { name: "Tom R.", stars: 4, date: "9 Feb 2026", text: "Great sessions, very knowledgeable. Highly recommend for strength training." }].map((r, i) => (
              <div key={i} style={styles.card}>
                <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", marginBottom: 8 }}>
                  <div style={{ display: "flex", gap: 10, alignItems: "center" }}>
                    <div style={{ width: 36, height: 36, borderRadius: 18, background: "rgba(47,109,255,0.12)", display: "flex", alignItems: "center", justifyContent: "center", fontSize: 13, fontWeight: 800, color: "#2F6DFF" }}>{r.name.split(" ").map(n => n[0]).join("")}</div>
                    <div><div style={{ fontWeight: 700, fontSize: 14 }}>{r.name}</div><div style={{ fontSize: 11, color: "rgba(255,255,255,0.55)" }}>{r.date}</div></div>
                  </div>
                  <span style={{ color: "#F59E0B", fontSize: 14 }}>{"★".repeat(r.stars)}</span>
                </div>
                <p style={{ margin: 0, fontSize: 13, color: "rgba(255,255,255,0.55)", lineHeight: 1.5 }}>{r.text}</p>
              </div>
            ))}
          </div>
        </div>
      )}
      </> )} {/* end activeTab !== notifications */}
      <BottomNav tab={activeTab} setTab={setActiveTab} isTrainer={true} unreadCount={unreadCount} />
    </div>
  );
}

// ── APP ROOT ──────────────────────────────────────────────────────────────────
export default function GymLinkApp() {
  const [screen, setScreen] = useState("splash");
  const [authData, setAuthData] = useState(null);
  const [tab, setTab] = useState("discover");
  const [profileData, setProfileData] = useState(null);
  const [pendingEmail, setPendingEmail] = useState("");
  const [safetyAccepted, setSafetyAccepted] = useState(false);
  const [idVerified, setIdVerified] = useState(false);
  const [profileComplete, setProfileComplete] = useState(false);
  const [showDailyGymLink, setShowDailyGymLink] = useState(true); // show on app open

  const [notifications, setNotifications] = useState([
    { id: 1,  type: "joined",    read: false, time: "2m ago",    title: "New user joined your class",       body: "Marcus Reid joined Morning HIIT Bootcamp on 29 Mar",          audience: "trainer" },
    { id: 2,  type: "enquiry",   read: false, time: "15m ago",   title: "New enquiry received",             body: "Jade Thompson sent an enquiry about 1-to-1 sessions",         audience: "trainer" },
    { id: 3,  type: "joined",    read: false, time: "1h ago",    title: "New user joined your class",       body: "Amara Diallo joined Strength & Conditioning on 31 Mar",       audience: "trainer" },
    { id: 4,  type: "message",   read: true,  time: "3h ago",    title: "Message sent to class",            body: "Your message to Morning HIIT Bootcamp was delivered to 6 participants", audience: "trainer" },
    { id: 5,  type: "enquiry",   read: true,  time: "Yesterday", title: "New enquiry received",             body: "Leo Marchetti is asking about your pricing for group sessions", audience: "trainer" },
    { id: 6,  type: "updated",   read: false, time: "5m ago",    title: "Class updated",                    body: "Morning HIIT Bootcamp has moved to 9:00am on 29 Mar",         audience: "user" },
    { id: 7,  type: "cancelled", read: false, time: "30m ago",   title: "Class cancelled",                  body: "Strength & Conditioning on 31 Mar has been cancelled",        audience: "user" },
    { id: 8,  type: "match",     read: false, time: "1h ago",    title: "New gym buddy match! 💪",          body: "You and Darius Osei both swiped right — start chatting!",     audience: "user" },
    { id: 9,  type: "message",   read: false, time: "2h ago",    title: "Message from your trainer",        body: "Serena Blake: 'Don't forget to bring your resistance bands tomorrow'", audience: "user" },
    { id: 10, type: "reminder",  read: true,  time: "Yesterday", title: "Session reminder",                 body: "You have a gym session with Marcus Reid tomorrow at 6pm",     audience: "user" },
    { id: 11, type: "updated",   read: true,  time: "2 days ago", title: "Class updated",                   body: "Barry's Bootcamp — location changed to PureGym Shoreditch",  audience: "user" },
  ]);

  const markRead = (id) => setNotifications(prev => prev.map(n => n.id === id ? { ...n, read: true } : n));
  const markAllRead = () => setNotifications(prev => prev.map(n => ({ ...n, read: true })));

  const isTrainer = authData?.accountType === "trainer";
  const audienceFilter = isTrainer ? "trainer" : "user";
  const myNotifications = notifications.filter(n => n.audience === audienceFilter);
  const unreadCount = myNotifications.filter(n => !n.read).length;

  const handleLogin = (data) => { setAuthData(data); setScreen("profileSetup"); };
  const handleSignup = (data) => { setAuthData(data); setPendingEmail(data.email); setScreen("emailVerify"); };
  const handleEmailVerified = () => setScreen(safetyAccepted ? "profileSetup" : "mandatorySafety");
  const handleProfileComplete = (profile) => { setProfileData(profile); setProfileComplete(true); setScreen(idVerified ? "app" : "idVerification"); };
  const handleIDVerificationComplete = () => { setIdVerified(true); setScreen("app"); };
  const handleLogout = () => { setScreen("splash"); setAuthData(null); setProfileData(null); setPendingEmail(""); setTab("discover"); setSafetyAccepted(false); };

  const handleSetTab = (t) => { setTab(t); if (t === "notifications") markAllRead(); };
  const handleSkipProfile = () => { setScreen("app"); };
  const handleSkipIdVerification = () => { setScreen("app"); };

  const handleUpdateUser = (updated) => setProfileData(prev => ({ ...prev, ...updated }));

  return (
    <div style={styles.app}>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Montserrat:wght@400;500;600;700;800;900&display=swap');
        * { box-sizing: border-box; -webkit-tap-highlight-color: transparent; }
        ::-webkit-scrollbar { width: 0; }
        input, select, textarea { font-family: 'Montserrat', sans-serif; } select option { background: #081A3A; color: #fff; }
        input[type=number]::-webkit-inner-spin-button { -webkit-appearance: none; }
        @keyframes slideDown { from { opacity: 0; transform: translateX(-50%) translateY(-12px); } to { opacity: 1; transform: translateX(-50%) translateY(0); } }
      `}</style>

      {screen === "splash"          && <SplashScreen onNext={(s) => setScreen(s)} />}
      {screen === "login"           && <LoginScreen onBack={() => setScreen("splash")} onLogin={handleLogin} />}
      {screen === "signup"          && <SignupScreen onBack={() => setScreen("splash")} onSignup={handleSignup} />}
      {screen === "emailVerify"     && <EmailVerificationScreen email={pendingEmail} accountType={authData?.accountType} onVerified={handleEmailVerified} onBack={() => setScreen("login")} />}
      {screen === "mandatorySafety"  && <MandatorySafetyScreen onAccept={() => { setSafetyAccepted(true); setScreen("profileSetup"); }} />}
      {screen === "resetPassword"   && <ResetPasswordScreen onDone={() => setScreen("login")} />}
      {screen === "profileSetup"    && (isTrainer ? <TrainerProfileSetup onComplete={handleProfileComplete} onSkip={handleSkipProfile} /> : <UserProfileSetup onComplete={handleProfileComplete} onSkip={handleSkipProfile} />)}
      {screen === "idVerification"  && <IDVerificationScreen accountType={authData?.accountType} onComplete={handleIDVerificationComplete} onSkip={handleSkipIdVerification} />}

      {screen === "app" && (
        <>
          {isTrainer ? (
            <>
              <TrainerDashboard
                user={{ ...authData, ...profileData }}
                onLogout={handleLogout}
                activeTab={tab}
                setActiveTab={handleSetTab}
                notifications={myNotifications}
                onReadNotification={markRead}
                onReadAllNotifications={markAllRead}
                unreadCount={unreadCount}
              />
            </>
          ) : (
            <>
              {tab === "discover"      && <DiscoverScreen user={{ ...authData, ...profileData }} onGoToChat={() => handleSetTab("matches")} profileComplete={profileComplete} idVerified={idVerified} onCompleteProfile={() => setScreen("profileSetup")} onVerifyId={() => setScreen("idVerification")} showDailyModal={showDailyGymLink} onDismissDaily={() => setShowDailyGymLink(false)} />}
              {tab === "matches"       && <MatchesScreen />}
              {tab === "requests"      && <RequestsScreen />}
              {tab === "trainers"      && <TrainersScreen />}
              {tab === "notifications" && <NotificationsScreen notifications={myNotifications} onRead={markRead} onReadAll={markAllRead} isTrainer={false} />}
              {tab === "profile"       && <UserProfileScreen user={{ ...authData, ...profileData }} onLogout={handleLogout} onUpdateUser={handleUpdateUser} />}
              <BottomNav tab={tab} setTab={handleSetTab} isTrainer={false} unreadCount={unreadCount} />
            </>
          )}
        </>
      )}
    </div>
  );
}
