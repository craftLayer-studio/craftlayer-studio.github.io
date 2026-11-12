import s from './home.module.css';

/**
 * Original hero illustration: a blueprint grid with stacked, offset
 * translucent planes that echo the layered "C" mark, a UI fragment on the
 * front plane and a code fragment card. Decorative only.
 */
export function HeroVisual() {
  const mono = {fontFamily: 'var(--font-mono), ui-monospace, monospace'};
  return (
    <div className={s.visual} aria-hidden="true">
      <svg viewBox="0 0 560 520" className={s.visualSvg} focusable="false">
        <defs>
          <pattern id="cl-grid-sm" width="16" height="16" patternUnits="userSpaceOnUse">
            <path d="M16 0H0V16" fill="none" stroke="#3A50E0" strokeOpacity="0.07" strokeWidth="1" />
          </pattern>
          <pattern id="cl-grid-lg" width="80" height="80" patternUnits="userSpaceOnUse">
            <rect width="80" height="80" fill="url(#cl-grid-sm)" />
            <path d="M80 0H0V80" fill="none" stroke="#3A50E0" strokeOpacity="0.14" strokeWidth="1" />
          </pattern>
          <radialGradient id="cl-fade" cx="50%" cy="45%" r="60%">
            <stop offset="0%" stopColor="#fff" stopOpacity="1" />
            <stop offset="100%" stopColor="#fff" stopOpacity="0" />
          </radialGradient>
          <mask id="cl-grid-mask">
            <rect width="560" height="520" fill="url(#cl-fade)" />
          </mask>
          <linearGradient id="cl-blue-plane" x1="0" y1="0" x2="1" y2="1">
            <stop offset="0%" stopColor="#5468F0" />
            <stop offset="100%" stopColor="#3A50E0" />
          </linearGradient>
          <filter id="cl-soft" x="-20%" y="-20%" width="140%" height="140%">
            <feDropShadow dx="0" dy="18" stdDeviation="18" floodColor="#101828" floodOpacity="0.12" />
          </filter>
        </defs>

        {/* Blueprint grid */}
        <rect width="560" height="520" fill="url(#cl-grid-lg)" mask="url(#cl-grid-mask)" />

        {/* Dimension rulers */}
        <g stroke="#101828" strokeOpacity="0.35" strokeWidth="1">
          <path d="M96 40V32M96 36H436M436 40V32" />
          <path d="M28 104H36M32 104V420M28 420H36" />
        </g>
        <text x="266" y="26" textAnchor="middle" fontSize="10" fill="#475467" style={mono}>
          1280
        </text>
        <text x="20" y="266" textAnchor="middle" fontSize="10" fill="#475467" style={mono} transform="rotate(-90 20 266)">
          800
        </text>

        {/* Layer 03: mint, furthest back */}
        <g className={s.layer3}>
          <rect x="176" y="72" width="340" height="300" rx="14" fill="#8BDDC0" fillOpacity="0.55" />
          <rect x="176.5" y="72.5" width="339" height="299" rx="13.5" fill="none" stroke="#101828" strokeOpacity="0.1" />
        </g>

        {/* Layer 02: electric blue */}
        <g className={s.layer2}>
          <rect x="136" y="112" width="340" height="300" rx="14" fill="url(#cl-blue-plane)" fillOpacity="0.92" />
          <g stroke="#fff" strokeOpacity="0.18">
            <path d="M136 172H476M136 232H476M136 292H476M136 352H476" />
          </g>
        </g>

        {/* Layer 01: interface fragment on white */}
        <g className={s.layer1} filter="url(#cl-soft)">
          <rect x="96" y="152" width="340" height="300" rx="14" fill="#fff" />
          <rect x="96.5" y="152.5" width="339" height="299" rx="13.5" fill="none" stroke="#E4E7EC" />
          {/* Window chrome */}
          <path d="M96 188H436" stroke="#E4E7EC" />
          <circle cx="116" cy="170" r="4" fill="#E4E7EC" />
          <circle cx="130" cy="170" r="4" fill="#E4E7EC" />
          <circle cx="144" cy="170" r="4" fill="#E4E7EC" />
          <rect x="196" y="163" width="140" height="14" rx="7" fill="#F2F4F7" />
          {/* Headline and copy */}
          <rect x="120" y="212" width="64" height="8" rx="2" fill="#3A50E0" fillOpacity="0.85" />
          <rect x="120" y="232" width="232" height="16" rx="3" fill="#101828" />
          <rect x="120" y="254" width="176" height="16" rx="3" fill="#101828" />
          <rect x="120" y="282" width="252" height="6" rx="3" fill="#D0D5DD" />
          <rect x="120" y="296" width="210" height="6" rx="3" fill="#D0D5DD" />
          {/* Buttons */}
          <rect x="120" y="320" width="96" height="30" rx="6" fill="#101828" />
          <rect x="224" y="320" width="96" height="30" rx="6" fill="#fff" stroke="#D0D5DD" />
          {/* Cards row */}
          <rect x="120" y="372" width="92" height="56" rx="8" fill="#F7F8F5" stroke="#E4E7EC" />
          <rect x="220" y="372" width="92" height="56" rx="8" fill="#F7F8F5" stroke="#E4E7EC" />
          <rect x="320" y="372" width="92" height="56" rx="8" fill="#8BDDC0" fillOpacity="0.35" stroke="#8BDDC0" />
          <rect x="132" y="384" width="36" height="6" rx="3" fill="#98A2B3" />
          <rect x="232" y="384" width="44" height="6" rx="3" fill="#98A2B3" />
          <rect x="332" y="384" width="30" height="6" rx="3" fill="#101828" fillOpacity="0.6" />
        </g>

        {/* Code fragment card */}
        <g className={s.codeCard}>
          <rect x="324" y="330" width="212" height="132" rx="10" fill="#101828" />
          <circle cx="342" cy="348" r="3" fill="#8BDDC0" />
          <text x="354" y="351" fontSize="10" fill="#98A2B3" style={mono}>
            deploy.ts
          </text>
          <text x="340" y="378" fontSize="11" fill="#D0D5DD" style={mono}>
            <tspan fill="#8A99FF">export</tspan> <tspan fill="#8A99FF">async</tspan> function
          </text>
          <text x="340" y="396" fontSize="11" fill="#fff" style={mono}>
            ship(<tspan fill="#8BDDC0">idea</tspan>) {'{'}
          </text>
          <text x="352" y="414" fontSize="11" fill="#D0D5DD" style={mono}>
            <tspan fill="#8A99FF">await</tspan> validate(idea)
          </text>
          <text x="352" y="432" fontSize="11" fill="#D0D5DD" style={mono}>
            <tspan fill="#8A99FF">return</tspan> build(idea)
          </text>
          <text x="340" y="450" fontSize="11" fill="#fff" style={mono}>
            {'}'}
          </text>
        </g>

        {/* Annotations */}
        <g fontSize="10" fill="#475467" style={mono}>
          <path d="M516 92H540" stroke="#101828" strokeOpacity="0.35" />
          <text x="508" y="66" textAnchor="end">
            03 / plan
          </text>
          <path d="M476 128H500V112" stroke="#101828" strokeOpacity="0.35" fill="none" />
          <text x="504" y="108">02 / design</text>
          <path d="M66 152V200H96" stroke="#101828" strokeOpacity="0.35" fill="none" />
          <text x="44" y="144">01 / build</text>
        </g>
        <g fill="#3A50E0">
          <rect x="94" y="150" width="5" height="5" />
          <rect x="433" y="150" width="5" height="5" />
          <rect x="94" y="449" width="5" height="5" />
        </g>
      </svg>
    </div>
  );
}
