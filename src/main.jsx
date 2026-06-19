import React, { useState, useEffect, useRef, StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import './index.css';

// Custom Icons
const X = (props) => <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" {...props}><path d="M18 6 6 18"/><path d="m6 6 12 12"/></svg>;
const ChevronRight = (props) => <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" {...props}><path d="m9 18 6-6-6-6"/></svg>;
const HelpCircle = (props) => <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" {...props}><circle cx="12" cy="12" r="10"/><path d="M9.09 9a3 3 0 0 1 5.83 1c0 2-3 3-3 3"/><path d="M12 17h.01"/></svg>;
const MenuIcon = (props) => <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" {...props}><line x1="4" x2="20" y1="12" y2="12"/><line x1="4" x2="20" y1="6" y2="6"/><line x1="4" x2="20" y1="18" y2="18"/></svg>;

// --- Components ---

const HelpOverlay = ({ onClose }) => {
  const [currentPage, setCurrentPage] = useState(0);

  const pages = [
    {
      title: "EUDOSSO E IL SUO COSMO",
      content: [
        "Eudosso di Cnido (408-355 a.C.), contemporaneo di Platone, fu il primo a tentare una spiegazione geometrica rigorosa del moto dei corpi celesti.",
        "Il suo modello si basa sull'idea che ogni pianeta sia trasportato da un sistema di sfere concentriche (omocentriche).",
        "La TERRA è immobile al centro, mentre ogni sfera ruota con velocità uniforme attorno a un asse fissato alla sfera superiore.",
        "Oltre alla teoria delle sfere, concepì un calendario basato su un ciclo di 4 anni con un anno di 366 giorni (anno bisestile)."
      ]
    },
    {
      title: "LE QUATTRO SFERE",
      content: [
        "Per ogni pianeta, EUDOSSO prevedeva quattro sfere distinte:",
        "1^ SFERA (BIANCA): Ruota in 24 ore da Est a Ovest, simulando il moto diurno della volta celeste.",
        "2^ SFERA (AZZURRA): Incastonata nella prima, ruota annualmente lungo la fascia dello Zodiaco.",
        "3^ SFERA (ROSSA) e 4^ SFERA (GIALLA): Ruotano con velocità uguali e opposte su assi inclinati tra loro. La loro combinazione genera l'Ippopeda (una curva a forma di otto).",
        "Il PIANETA (GIALLO), fissato all'equatore della quarta sfera, descrive così le sue caratteristiche retrogradazioni."
      ]
    },
    {
      title: "ISTRUZIONI PER L'USO",
      content: [
        "BARRA LATERALE: Usa i tasti di visibilità per accendere o spegnere le singole sfere e studiarne il moto isolato.",
        "VELOCITÀ: I tasti +VEL e -VEL permettono di accelerare o rallentare il fluire del tempo cosmico.",
        "SIMULAZIONE: Il pulsante AVVIA/FERMA blocca l'intero meccanismo per un'analisi statica.",
        "DISPLAY: Le etichette (NOMI) aiutano a identificare gli elementi del sistema durante la danza delle orbite."
      ]
    }
  ];

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm animate-fade-in">
      <div className="bg-app-bg border border-app-border rounded-xl max-w-2xl w-full p-8 relative shadow-2xl animate-scale-in">
        <button 
          onClick={onClose}
          className="absolute top-4 right-4 text-app-text-dim hover:text-white transition-colors"
        >
          <X className="w-6 h-6" />
        </button>

        <h2 className="text-3xl font-serif font-bold text-app-accent mb-6 tracking-tight uppercase" style={{ fontFamily: "'Playfair Display', serif" }}>
          {pages[currentPage].title}
        </h2>

        <div className="space-y-6 mb-8">
          {pages[currentPage].content.map((para, i) => (
            <p key={i} className="text-app-text leading-relaxed font-mono text-base md:text-lg leading-7" style={{ fontFamily: "'JetBrains Mono', monospace" }}>
              {para.split(/(\d\^ SFERA|PIANETA|TERRA|EUDOSSO|BARRA LATERALE|VELOCITÀ|SIMULAZIONE|DISPLAY|BIANCA|AZZURRA|ROSSA|GIALLA)/g).map((part, j) => {
                 const highlighted = ["1^ SFERA", "2^ SFERA", "3^ SFERA", "4^ SFERA", "PIANETA", "TERRA", "EUDOSSO", "BARRA LATERALE", "VELOCITÀ", "SIMULAZIONE", "DISPLAY", "BIANCA", "AZZURRA", "ROSSA", "GIALLA"].some(kw => part.includes(kw));
                 
                 let colorClass = "text-app-accent";
                 if (part.includes("BIANCA")) colorClass = "text-white";
                 if (part.includes("AZZURRA")) colorClass = "text-cyan-400";
                 if (part.includes("ROSSA")) colorClass = "text-rose-500";
                 if (part.includes("GIALLA") || part.includes("PIANETA")) colorClass = "text-yellow-400";
                 if (part.includes("TERRA")) colorClass = "text-blue-500";

                 return highlighted ? (
                   <span key={j} className={`${colorClass} font-bold underline decoration-current/30 underline-offset-4`}>
                     {part}
                   </span>
                 ) : part;
              })}
            </p>
          ))}
        </div>

        <div className="flex justify-between items-center mt-auto border-t border-app-border pt-6">
          <div className="flex gap-2">
            {pages.map((_, i) => (
              <div 
                key={i} 
                className={`w-2 h-2 rounded-full transition-colors ${i === currentPage ? 'bg-app-accent' : 'bg-app-border'}`}
              />
            ))}
          </div>
          <button 
            onClick={() => currentPage < pages.length - 1 ? setCurrentPage(p => p + 1) : onClose()}
            className="flex items-center gap-2 px-6 py-2 bg-app-accent hover:opacity-90 text-black font-bold rounded-lg transition-all"
          >
            {currentPage < pages.length - 1 ? "Successivo" : "OK"}
            <ChevronRight className="w-4 h-4" />
          </button>
        </div>
      </div>
    </div>
  );
};

function App() {
  const canvasRef = useRef(null);
  const containerRef = useRef(null);
  const [vis, setVis] = useState({
    first: true,
    second: true,
    third: true,
    fourth: true,
    planet: true,
    earth: true,
    names: true,
    stars: true
  });

  const [showHelp, setShowHelp] = useState(false);
  const [isPaused, setIsPaused] = useState(false);
  const [speed, setSpeed] = useState(1);
  const [sidebarOpen, setSidebarOpen] = useState(true);

  const anglesRef = useRef({ second: 0, fourth: 0 });
  const starRotationRef = useRef(0);
  const starsRef = useRef([]);
  const fixedStarsRef = useRef([]);

  useEffect(() => {
    const stars = [];
    for (let i = 0; i < 200; i++) {
        stars.push({
            x: Math.random() * 2000,
            y: Math.random() * 2000
        });
    }
    starsRef.current = stars;

    const fStars = [];
    for (let i = 0; i < 600; i++) {
      fStars.push({
        angle: Math.random() * Math.PI * 2,
        rOffset: (Math.random() - 0.5) * 6
      });
    }
    fixedStarsRef.current = fStars;
  }, []);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    let animationFrameId;

    const render = () => {
      if (!isPaused) {
          anglesRef.current.second -= (2 * Math.PI / 200) * speed;
          anglesRef.current.fourth += (2 * Math.PI / 100) * speed;
      }

      starRotationRef.current += 0.0003;

      const { width, height } = canvas;
      ctx.clearRect(0, 0, width, height);

      ctx.fillStyle = '#222';
      starsRef.current?.forEach(s => {
          ctx.fillRect(s.x % width, s.y % height, 1, 1);
      });

      const midX = width / 2;
      const midY = height / 2;
      const k = Math.min(width, height) / 600;

      const angPolo3 = anglesRef.current.second - (Math.PI / 2);
      const offsetIppopeda = Math.cos(anglesRef.current.fourth / 1.5);
      
      const pxPianeta = midX + Math.cos((angPolo3 + offsetIppopeda) + Math.PI/2) * 130 * k;
      const pyPianeta = midY + Math.sin((angPolo3 + offsetIppopeda) + Math.PI/2) * 130 * k;

      ctx.lineWidth = 1;
      
      if (vis.first) {
        ctx.strokeStyle = 'rgba(255, 255, 255, 0.2)';
        ctx.beginPath(); ctx.arc(midX, midY, 200 * k, 0, Math.PI * 2); ctx.stroke();
      }
      if (vis.second) {
        ctx.strokeStyle = 'rgba(6, 182, 212, 0.3)';
        ctx.beginPath(); ctx.arc(midX, midY, 190 * k, 0, Math.PI * 2); ctx.stroke();
      }
      if (vis.third) {
        ctx.strokeStyle = 'rgba(244, 63, 94, 0.3)';
        ctx.beginPath(); ctx.arc(midX, midY, 150 * k, 0, Math.PI * 2); ctx.stroke();

        const r3 = 150 * k;
        const r2 = 190 * k;
        const poleAngle3_1 = angPolo3;
        const poleAngle3_2 = poleAngle3_1 + Math.PI;
        
        ctx.strokeStyle = 'rgba(244, 63, 94, 0.8)';
        ctx.lineWidth = 2;
        [poleAngle3_1, poleAngle3_2].forEach(angle => {
          const cosA = Math.cos(angle);
          const sinA = Math.sin(angle);
          ctx.beginPath();
          ctx.moveTo(midX + cosA * r3, midY + sinA * r3);
          ctx.lineTo(midX + cosA * r2, midY + sinA * r2);
          ctx.stroke();
        });
        ctx.lineWidth = 1;
      }
      if (vis.fourth) {
        ctx.strokeStyle = 'rgba(255, 255, 0, 0.3)';
        ctx.beginPath(); ctx.arc(midX, midY, 130 * k, 0, Math.PI * 2); ctx.stroke();

        const poleAngle1 = angPolo3 + offsetIppopeda;
        const poleAngle2 = poleAngle1 + Math.PI;
        const r4 = 130 * k;
        
        ctx.strokeStyle = 'rgba(255, 255, 0, 0.8)';
        ctx.lineWidth = 2;
        [poleAngle1, poleAngle2].forEach(angle => {
          const cosA = Math.cos(angle);
          const sinA = Math.sin(angle);
          ctx.beginPath();
          ctx.moveTo(midX + cosA * r4, midY + sinA * r4);
          ctx.lineTo(midX + cosA * (150 * k), midY + sinA * (150 * k));
          ctx.stroke();
        });
        ctx.lineWidth = 1;
      }

      if (vis.stars) {
        const rStar = 260 * k;
        ctx.strokeStyle = 'rgba(255, 255, 255, 0.25)';
        ctx.beginPath();
        ctx.arc(midX, midY, rStar, 0, Math.PI * 2);
        ctx.stroke();

        ctx.fillStyle = 'rgba(0, 190, 215, 0.4)';
        const starRotation = starRotationRef.current;
        fixedStarsRef.current.forEach(s => {
          const x = midX + Math.cos(s.angle + starRotation) * (rStar + s.rOffset);
          const y = midY + Math.sin(s.angle + starRotation) * (rStar + s.rOffset);
          ctx.beginPath();
          ctx.arc(x, y, 0.8, 0, Math.PI * 2);
          ctx.fill();
        });

        if (vis.names) {
          ctx.fillStyle = 'rgba(200, 200, 200, 0.8)';
          ctx.font = 'bold 8px Inter, sans-serif';
          ctx.textAlign = 'center';
          ctx.letterSpacing = "2px";
          ctx.fillText("SFERA DELLE STELLE FISSE", midX, midY - rStar - 15 * k);
          ctx.letterSpacing = "0px";
        }
      }

      if (vis.earth) {
        ctx.fillStyle = '#3b82f6';
        ctx.beginPath(); ctx.arc(midX, midY, 6 * k, 0, Math.PI * 2); ctx.fill();
        if (vis.names) {
            ctx.fillStyle = '#3b82f6';
            ctx.font = 'bold 10px Inter, sans-serif';
            ctx.textAlign = 'center';
            ctx.fillText("TERRA", midX, midY + 18 * k);
        }
      }

      if (vis.planet) {
        ctx.fillStyle = '#facc15';
        ctx.beginPath(); ctx.arc(pxPianeta, pyPianeta, 5 * k, 0, Math.PI * 2); ctx.fill();
        if (vis.names) {
            ctx.fillStyle = '#facc15';
            ctx.font = 'bold 10px Inter, sans-serif';
            ctx.textAlign = 'center';
            ctx.fillText("PIANETA", pxPianeta, pyPianeta - 12 * k);
        }
      }

      animationFrameId = requestAnimationFrame(render);
    };

    render();

    return () => cancelAnimationFrame(animationFrameId);
  }, [vis, isPaused, speed]);

  useEffect(() => {
    if (!containerRef.current || !canvasRef.current) return;

    const resizeObserver = new ResizeObserver((entries) => {
      for (const entry of entries) {
        const { width, height } = entry.contentRect;
        if (canvasRef.current) {
          canvasRef.current.width = width;
          canvasRef.current.height = height;
        }
      }
    });

    resizeObserver.observe(containerRef.current);
    return () => resizeObserver.disconnect();
  }, []);

  const toggleVis = (key) => {
    setVis(prev => ({ ...prev, [key]: !prev[key] }));
  };

  return (
    <div className="flex bg-app-bg h-screen w-full overflow-hidden text-app-text font-sans">
      {showHelp && <HelpOverlay onClose={() => setShowHelp(false)} />}

      {sidebarOpen && (
          <aside className="relative w-70 bg-app-bg border-r border-app-border flex flex-col h-full overflow-hidden z-40 animate-slide-in">
            <div className="p-3 flex flex-col h-full overflow-y-auto space-y-6">
                <section className="bg-zinc-900/20 border border-app-border/40 p-3 rounded-lg">
                    <div className="flex items-center gap-2 mb-3">
                      <div className="w-1.5 h-1.5 bg-app-accent" />
                      <h3 className="text-[12px] uppercase font-bold text-app-accent tracking-[0.2em]">CONTROLLI</h3>
                    </div>
                    <div className="grid grid-cols-2 gap-2">
                      <button 
                        onClick={() => setIsPaused(!isPaused)}
                        className="col-span-2 bg-app-accent hover:opacity-90 text-black py-2 rounded-md transition-all font-bold text-[10px] tracking-widest uppercase"
                      >
                        {isPaused ? 'RIPRENDI' : 'AVVIA/FERMA'}
                      </button>
                      <button 
                        onClick={() => setSpeed(prev => Math.max(0.1, prev - 0.2))}
                        className="bg-app-surface border border-app-border py-1.5 px-2 text-center hover:border-app-accent/50 transition-colors rounded-md"
                      >
                        <span className="block text-[9px] font-bold uppercase tracking-widest">- VEL</span>
                      </button>
                      <button 
                        onClick={() => setSpeed(prev => Math.min(5, prev + 0.2))}
                        className="bg-app-surface border border-app-border py-1.5 px-2 text-center hover:border-app-accent/50 transition-colors rounded-md"
                      >
                        <span className="block text-[9px] font-bold uppercase tracking-widest">+ VEL</span>
                      </button>
                    </div>
                </section>

                <section className="space-y-4">
                    <div className="bg-zinc-900/20 border border-app-border/40 p-3 rounded-lg">
                      <div className="flex items-center gap-2 mb-3">
                        <div className="w-1.5 h-1.5 bg-app-accent" />
                        <h3 className="text-[12px] uppercase font-bold text-app-accent tracking-[0.2em]">VISIBILITÀ SFERE</h3>
                      </div>
                      <div className="space-y-1.5">
                          <SimulationToggle label="1^ SFERA" active={vis.first} onClick={() => toggleVis('first')} />
                          <SimulationToggle label="2^ SFERA" active={vis.second} onClick={() => toggleVis('second')} />
                          <SimulationToggle label="3^ SFERA" active={vis.third} onClick={() => toggleVis('third')} />
                          <SimulationToggle label="4^ SFERA" active={vis.fourth} onClick={() => toggleVis('fourth')} />
                      </div>
                    </div>

                    <div className="bg-zinc-900/20 border border-app-border/40 p-3 rounded-lg">
                      <div className="flex items-center gap-2 mb-3">
                        <div className="w-1.5 h-1.5 bg-app-accent" />
                        <h3 className="text-[12px] uppercase font-bold text-app-accent tracking-[0.2em]">VISIBILITÀ OGGETTI</h3>
                      </div>
                      <div className="space-y-1.5">
                          <SimulationToggle label="PIANETA" active={vis.planet} onClick={() => toggleVis('planet')} />
                          <SimulationToggle label="TERRA" active={vis.earth} onClick={() => toggleVis('earth')} />
                          <SimulationToggle label="STELLE FISSE" active={vis.stars} onClick={() => toggleVis('stars')} />
                          <SimulationToggle label="NOMI" active={vis.names} onClick={() => toggleVis('names')} />
                      </div>
                    </div>
                </section>

                <div className="flex-1 min-h-[10px]" />

                <button 
                  onClick={() => setShowHelp(true)}
                  className="w-full py-2 px-4 bg-zinc-900/50 border border-app-border rounded-md text-[9px] font-bold uppercase tracking-[0.2em] text-app-text-dim hover:text-app-accent hover:border-app-accent/40 transition-all flex items-center justify-center gap-2"
                >
                  <HelpCircle className="w-3.5 h-3.5" />
                  Istruzioni
                </button>

                <div className="pt-3 border-t border-app-border text-center">
                   <span className="text-[9px] font-bold text-app-accent tracking-widest">ANDREA CRISTOFORI</span>
                   <p className="text-[8px] text-app-text-dim mt-1 uppercase">EUDOSSO: LE SFERE OMOCENTRICHE</p>
                </div>
            </div>
          </aside>
        )}

      <div className="flex flex-col flex-1 h-full overflow-hidden relative">
        <button 
          onClick={() => setSidebarOpen(!sidebarOpen)}
          className="absolute top-4 left-4 z-50 p-2 bg-app-bg border border-app-border hover:bg-zinc-800 transition-colors"
        >
          <MenuIcon className="w-4 h-4 text-app-accent" />
        </button>

        <div ref={containerRef} className="relative flex-1 h-full bg-black">
          <canvas ref={canvasRef} className="w-full h-full block" />

          <div className="absolute top-8 left-8 pointer-events-none flex flex-col gap-2">
              <div className="flex items-center gap-3">
                <div className="w-4 h-4 border-2 border-app-accent flex items-center justify-center">
                  <div className="w-2 h-2 bg-app-accent" />
                </div>
                <h1 className="text-xs font-bold text-app-accent uppercase tracking-[0.3em]">MODELLO DINAMICO DI EUDOSSO</h1>
              </div>
              <p className="text-[9px] text-zinc-600 font-mono tracking-widest pl-7">PROIEZIONE GEOCENTRICA</p>
          </div>

          <div className="absolute bottom-6 right-6 font-mono text-[9px] text-zinc-600 flex flex-col items-end">
             <div>SPEED: {speed.toFixed(1)}X</div>
             <div>STATE: {isPaused ? 'IDLE' : 'COMPUTING'}</div>
          </div>
        </div>
      </div>
    </div>
  );
}

function SimulationToggle({ label, active, onClick }) {
    return (
        <button 
            onClick={onClick}
            className={`
                group w-full flex items-center justify-between px-3 py-2 bg-zinc-900/60 border border-zinc-800/50 rounded-md transition-all
                hover:bg-zinc-800/80
                ${active ? 'border-app-accent/20' : ''}
            `}
        >
            <span className={`text-[9px] font-bold tracking-[0.2em] transition-colors ${active ? 'text-white' : 'text-zinc-600'}`}>
              {label}
            </span>
            <div className={`w-1.5 h-1.5 rounded-full transition-all ${active ? 'bg-app-accent shadow-[0_0_8px_rgba(0,190,215,1)]' : 'bg-zinc-800'}`} />
        </button>
    );
}

const rootElement = document.getElementById('root');
if (rootElement) {
  createRoot(rootElement).render(
    <StrictMode>
      <App />
    </StrictMode>
  );
}
