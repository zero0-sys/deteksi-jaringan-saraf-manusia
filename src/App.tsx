/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useEffect, useRef, useCallback } from 'react';
import { GoogleGenAI, Type } from '@google/genai';
import { Terminal, Brain, Activity, Loader2, Send, AlertTriangle, CheckCircle2, Copy, Download, X, FileText, Cpu, Network, Smile, Frown, Meh, Angry, Annoyed, Laugh, Shield, Wifi } from 'lucide-react';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';

// ═══════════════════════════════════════════════════════════
// SECURITY LAYER — Anti-Inspect, Anti-DevTools, Anti-Copy
// ═══════════════════════════════════════════════════════════
const SecurityLayer = () => {
  useEffect(() => {
    // Disable right-click context menu
    const handleContextMenu = (e: MouseEvent) => {
      e.preventDefault();
      return false;
    };

    // Block DevTools keyboard shortcuts
    const handleKeyDown = (e: KeyboardEvent) => {
      // F12
      if (e.key === 'F12') {
        e.preventDefault();
        return false;
      }
      // Ctrl+Shift+I / Ctrl+Shift+J / Ctrl+Shift+C (DevTools)
      if (e.ctrlKey && e.shiftKey && ['I', 'J', 'C'].includes(e.key.toUpperCase())) {
        e.preventDefault();
        return false;
      }
      // Ctrl+U (View Source)
      if (e.ctrlKey && e.key.toUpperCase() === 'U') {
        e.preventDefault();
        return false;
      }
      // Ctrl+S (Save)
      if (e.ctrlKey && e.key.toUpperCase() === 'S') {
        e.preventDefault();
        return false;
      }
      // Ctrl+P (Print)
      if (e.ctrlKey && e.key.toUpperCase() === 'P') {
        e.preventDefault();
        return false;
      }
    };

    // Disable text selection 
    const handleSelectStart = (e: Event) => {
      const target = e.target as HTMLElement;
      // Allow selection inside textarea and input fields
      if (target.tagName === 'TEXTAREA' || target.tagName === 'INPUT') return;
      e.preventDefault();
    };

    // Disable drag
    const handleDragStart = (e: DragEvent) => {
      e.preventDefault();
    };

    // Disable copy (except in textarea/input)
    const handleCopy = (e: ClipboardEvent) => {
      const target = e.target as HTMLElement;
      if (target.tagName === 'TEXTAREA' || target.tagName === 'INPUT') return;
      e.preventDefault();
    };

    // DevTools detection via debugger timing
    let devtoolsCheckInterval: number;
    const checkDevTools = () => {
      const start = performance.now();
      // Debugger statement pauses execution when DevTools is open
      // eslint-disable-next-line no-debugger
      debugger;
      const end = performance.now();
      if (end - start > 100) {
        document.body.innerHTML = '<div style="display:flex;align-items:center;justify-content:center;height:100vh;background:#000;color:#ff0000;font-family:monospace;font-size:24px;text-align:center;padding:20px;"><div><p>⛔ AKSES DITOLAK</p><p style="font-size:14px;color:#666;margin-top:16px;">Developer Tools terdeteksi.<br/>Silakan tutup DevTools dan muat ulang halaman.</p></div></div>';
      }
    };
    // Only run devtools check in production
    if (import.meta.env.PROD) {
      devtoolsCheckInterval = window.setInterval(checkDevTools, 1000);
    }

    // Console warning
    console.log(
      '%c⛔ BERHENTI!',
      'color: red; font-size: 48px; font-weight: bold;'
    );
    console.log(
      '%cIni adalah fitur browser yang ditujukan untuk developer. Jika seseorang menyuruh Anda menyalin-tempel sesuatu di sini, itu adalah penipuan.',
      'color: white; font-size: 16px;'
    );

    document.addEventListener('contextmenu', handleContextMenu);
    document.addEventListener('keydown', handleKeyDown);
    document.addEventListener('selectstart', handleSelectStart);
    document.addEventListener('dragstart', handleDragStart);
    document.addEventListener('copy', handleCopy);

    return () => {
      document.removeEventListener('contextmenu', handleContextMenu);
      document.removeEventListener('keydown', handleKeyDown);
      document.removeEventListener('selectstart', handleSelectStart);
      document.removeEventListener('dragstart', handleDragStart);
      document.removeEventListener('copy', handleCopy);
      if (devtoolsCheckInterval) clearInterval(devtoolsCheckInterval);
    };
  }, []);

  return null;
};

// Removed SecureTopBar as requested

interface LogLine {
  id: string;
  type: 'error' | 'success';
  text: string;
}

const SplashScreen = ({ onComplete }: { onComplete: () => void }) => {
  const icons = [Smile, Frown, Meh, Angry, Annoyed, Laugh];
  const [CurrentIcon, setCurrentIcon] = useState(() => icons[0]);
  const [isFading, setIsFading] = useState(false);
  
  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentIcon(() => icons[Math.floor(Math.random() * icons.length)]);
    }, 150);
    
    const fadeTimeout = setTimeout(() => {
      setIsFading(true);
    }, 2500);

    const completeTimeout = setTimeout(() => {
      clearInterval(interval);
      onComplete();
    }, 3000);
    
    return () => { 
      clearInterval(interval); 
      clearTimeout(fadeTimeout);
      clearTimeout(completeTimeout); 
    };
  }, []);
  
  return (
    <div className={`fixed inset-0 bg-black z-50 flex flex-col items-center justify-center transition-opacity duration-500 ${isFading ? 'opacity-0' : 'opacity-100'}`}>
       <div className="animate-pulse-fast mb-8 text-white">
         <CurrentIcon className="w-32 h-32 md:w-40 md:h-40 stroke-[1.5]" />
       </div>
       <div className="text-white font-mono tracking-widest animate-pulse text-sm md:text-base border border-white px-6 py-2 bg-black/50 backdrop-blur-sm">
         MEMUAT KESADARAN...
       </div>
    </div>
  );
};

const GlitchHeader = () => {
  const text = "NEURAL MIND SCANNER";
  const [displayText, setDisplayText] = useState(text);
  const [Icon, setIcon] = useState(() => Brain);
  
  useEffect(() => {
    const chars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789@#$%&*<>[]{}';
    const icons = [Brain, Activity, Terminal, Cpu, Network];
    
    const glitchInterval = setInterval(() => {
      let iterations = 0;
      const scrambleInterval = setInterval(() => {
        setDisplayText(text.split('').map((char, index) => {
          if (char === ' ') return ' ';
          if (index < iterations / 2) return text[index];
          return chars[Math.floor(Math.random() * chars.length)];
        }).join(''));
        
        setIcon(() => icons[Math.floor(Math.random() * icons.length)]);
        
        iterations += 1;
        if (iterations > text.length * 2) {
          clearInterval(scrambleInterval);
          setDisplayText(text);
          setIcon(() => Brain);
        }
      }, 30);
    }, 5000); // Trigger glitch every 5 seconds
    
    return () => clearInterval(glitchInterval);
  }, []);
  
  return (
    <div className="inline-flex items-center justify-center mb-4">
      <Icon className="w-8 h-8 text-white mr-3" />
      <h1 className="text-3xl font-bold tracking-tight uppercase font-mono">
        {displayText}
      </h1>
    </div>
  );
};

export default function App() {
  const [input, setInput] = useState('');
  const [logs, setLogs] = useState<LogLine[]>([]);
  const [isScanning, setIsScanning] = useState(false);
  const [isGenerating, setIsGenerating] = useState(false);
  const [isFinished, setIsFinished] = useState(false);
  const [chaosScore, setChaosScore] = useState<number | null>(null);
  const [totalLines, setTotalLines] = useState(0);
  const [simulatedTime, setSimulatedTime] = useState(0);
  const [targetTime, setTargetTime] = useState(0);
  const [analysisText, setAnalysisText] = useState('');
  const [showPopup, setShowPopup] = useState(false);
  const [showSplash, setShowSplash] = useState(true);
  const [chartData, setChartData] = useState<any[]>([]);
  
  const terminalRef = useRef<HTMLDivElement>(null);
  const fullLogsRef = useRef<string[]>([]); // Store all logs for download/copy without lagging React state

  useEffect(() => {
    if (terminalRef.current) {
      terminalRef.current.scrollTop = terminalRef.current.scrollHeight;
    }
  }, [logs]);

  const generateLogLine = (chaosLevel: number, customMessages: string[]): LogLine => {
    const timestamp = new Date().toISOString().replace('T', ' ').substring(0, 23);
    const hexAddress = `0x${Math.floor(Math.random() * 16777215).toString(16).padStart(6, '0').toUpperCase()}`;
    const memoryOffset = `+0x${Math.floor(Math.random() * 4096).toString(16).toUpperCase()}`;
    
    // Cap chaos at 85% so there's always at least 15% normal thoughts
    const effectiveChaos = Math.min(chaosLevel, 85);
    const isError = Math.random() * 100 < effectiveChaos;
    
    let baseMsg = "";
    if (isError && customMessages.length > 0) {
      baseMsg = customMessages[Math.floor(Math.random() * customMessages.length)];
    } else {
      const normalThoughts = [
        "SYS_OK: Fungsi motorik dasar stabil",
        "SYS_OK: Detak jantung dalam batas normal",
        "SYS_OK: Suplai oksigen ke korteks frontal optimal",
        "SYS_OK: Memori jangka pendek merespons",
        "SYS_OK: Keseimbangan kimiawi otak dipertahankan",
        "SYS_OK: Reseptor dopamin siaga",
        "SYS_OK: Jaringan saraf otonom berfungsi baik",
        "SYS_OK: Sinkronisasi gelombang alpha terdeteksi"
      ];
      baseMsg = normalThoughts[Math.floor(Math.random() * normalThoughts.length)];
    }
      
    return {
      id: Math.random().toString(36).substring(7),
      type: isError ? 'error' : 'success',
      text: `[${timestamp}] <${hexAddress}${memoryOffset}> ${baseMsg}`
    };
  };

  const startGeneratingLogs = (chaos: number, customMsgs: string[], analysis: string) => {
    setIsGenerating(true);
    setIsFinished(false);
    fullLogsRef.current = [];
    setLogs([]);
    setChartData([]);
    
    let count = 0;
    // Lines scale with chaos: 100% = 4200 lines, 0% = 300 lines
    const maxLines = Math.max(300, Math.floor((chaos / 100) * 4200)); 
    // Time scales with chaos: 100% = 15 seconds, 0% = 3 seconds
    const generationDuration = Math.max(3000, Math.floor((chaos / 100) * 15000));
    setSimulatedTime(0);
    
    const startTime = Date.now();
    let localChartData: any[] = [];
    let lastChartUpdate = 0;
    
    const interval = setInterval(() => {
      const elapsed = Date.now() - startTime;
      const progress = Math.min(1, elapsed / generationDuration);
      
      const currentTargetLines = Math.floor(progress * maxLines);
      const linesToAdd = currentTargetLines - count;
      
      if (linesToAdd > 0) {
        const newLogObjs = Array.from({ length: linesToAdd }).map(() => generateLogLine(chaos, customMsgs));
        const newLinesStr = newLogObjs.map(log => log.text);
        
        fullLogsRef.current.push(...newLinesStr);
        
        setLogs(prev => [...prev, ...newLogObjs]); // Keep all logs in DOM so count matches exactly
        
        setTotalLines(currentTargetLines);
        count = currentTargetLines;
      }
      
      setSimulatedTime(elapsed / 1000); // Update time in real seconds
      
      // Update chart data every 200ms
      if (elapsed - lastChartUpdate > 200 || progress === 1) {
        const targetKesadaran = 100 - chaos;
        const noise = (Math.random() * 20 - 10) * (1 - progress);
        const currentVal = 100 - ((100 - targetKesadaran) * progress) + noise;
        
        localChartData.push({
          time: (elapsed / 1000).toFixed(1) + 's',
          kesadaran: Math.max(0, Math.min(100, Math.round(currentVal)))
        });
        setChartData([...localChartData]);
        lastChartUpdate = elapsed;
      }
      
      if (progress >= 1) {
        clearInterval(interval);
        setIsGenerating(false);
        setIsFinished(true);
        setAnalysisText(analysis);
        setShowPopup(true);
      }
    }, 50);
  };

  const handleScan = async () => {
    if (!input.trim() || isScanning || isGenerating) return;
    
    setIsScanning(true);
    setIsFinished(false);
    setShowPopup(false);
    setLogs([]);
    setTotalLines(0);
    setSimulatedTime(0);
    setChaosScore(null);
    
    try {
      // @ts-ignore - Injected by Vite
      // eslint-disable-next-line
      const injectedKey = typeof __GEMINI_API_KEY__ !== 'undefined' ? __GEMINI_API_KEY__ : '';
      const apiKey = import.meta.env.VITE_GEMINI_API_KEY || injectedKey;
      
      if (!apiKey || apiKey === '') {
        throw new Error('API Key tidak ditemukan. Pastikan Anda telah mengatur VITE_GEMINI_API_KEY di Netlify.');
      }
      const ai = new GoogleGenAI({ apiKey: apiKey });
      const response = await ai.models.generateContent({
        model: "gemini-3-flash-preview",
        contents: `Analisis teks keluh kesah berikut.
Tentukan tingkat kekacauan pikiran (0-100).
Buat 15 pesan log sistem (kode error jika kacau, atau kode success jika bahagia) dalam bahasa Indonesia yang SANGAT SPESIFIK dengan isi teks pengguna. 
Gunakan format log terminal (misal: "ERR_FINANCE: Saldo tidak mencukupi untuk harapan" atau "SYS_LOVE: Koneksi hati terjalin kuat").

Selain itu, buatkan 'analysisText' (teks paragraf) berdasarkan aturan berikut:
JIKA tingkat kekacauan > 50: Berikan saran pengobatan, sebuah quotes penyemangat, dan saran tegas untuk pergi ke psikolog atau bercerita ke teman kepercayaan/orang tua.
JIKA tingkat kekacauan <= 50: Berikan hadiah berupa ramalan masa depan yang positif, apa yang harus dia lakukan ke depannya, dan petunjuk arah kehidupan sesuai dengan cerita yang dia bagikan.

Teks: "${input}"`,
        config: {
          responseMimeType: "application/json",
          responseSchema: {
            type: Type.OBJECT,
            properties: {
              chaosLevel: { type: Type.NUMBER },
              systemMessages: {
                type: Type.ARRAY,
                items: { type: Type.STRING }
              },
              analysisText: { type: Type.STRING }
            },
            required: ["chaosLevel", "systemMessages", "analysisText"]
          }
        }
      });

      const result = JSON.parse(response.text);
      setChaosScore(result.chaosLevel);
      setIsScanning(false); // Turn off scanning state so generation UI shows
      startGeneratingLogs(result.chaosLevel, result.systemMessages, result.analysisText);
    } catch (error) {
      console.error(error);
      setLogs([{ id: 'err', type: 'error', text: 'FATAL: Gagal terhubung ke API jaringan neuron.' }]);
      setIsScanning(false);
    }
  };

  const copyLogs = () => {
    navigator.clipboard.writeText(fullLogsRef.current.join('\n'));
    alert('Log neural berhasil disalin!');
  };

  const downloadLogs = () => {
    const blob = new Blob([fullLogsRef.current.join('\n')], { type: 'text/plain' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `neural_log_${new Date().getTime()}.txt`;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
  };

  const copyAnalysis = () => {
    navigator.clipboard.writeText(analysisText);
    alert('Hasil analisis berhasil disalin!');
  };

  const formatTime = (seconds: number) => {
    return `${seconds.toFixed(1)}s`;
  };

  return (
    <>
      <SecurityLayer />
      {showSplash && <SplashScreen onComplete={() => setShowSplash(false)} />}
      <div className={`min-h-screen bg-modern-grid text-white p-2 sm:p-4 md:p-8 flex flex-col items-center justify-center font-sans relative overflow-hidden ${showSplash ? 'hidden' : ''}`}>
        <div className="w-full max-w-5xl grid grid-cols-1 lg:grid-cols-12 gap-4 lg:gap-6 relative z-10">
          
          {/* Header */}
          <div className="lg:col-span-12 text-center mb-2 mt-4 lg:mt-0">
            <GlitchHeader />
            <p className="text-gray-400 max-w-2xl mx-auto uppercase text-xs sm:text-sm tracking-widest px-4">
              Sistem Deteksi Kesadaran v2.0
            </p>
          </div>

          {/* Input Section */}
          <div className="lg:col-span-5 flex flex-col gap-4 h-auto lg:h-[700px]">
            <div className="border border-white p-4 sm:p-6 flex-grow flex flex-col bg-black/80 backdrop-blur-sm">
              <h2 className="text-base sm:text-lg font-bold mb-4 flex items-center justify-between uppercase tracking-wider border-b border-white pb-2">
              <div className="flex items-center">
                <Activity className="w-5 h-5 mr-2" />
                Input Kesadaran
              </div>
              {isFinished && (
                <button 
                  onClick={() => setShowPopup(true)}
                  className="text-xs border border-white px-2 py-1 hover:bg-white hover:text-black transition-colors flex items-center"
                >
                  <FileText className="w-3 h-3 mr-1" />
                  Lihat Hasil
                </button>
              )}
            </h2>
            <textarea
              value={input}
              onChange={(e) => setInput(e.target.value)}
              placeholder="Masukkan keluh kesah atau pikiran Anda di sini..."
              className="w-full flex-grow bg-transparent border border-gray-700 p-4 text-white placeholder-gray-600 focus:outline-none focus:border-white resize-none transition-colors font-mono text-sm"
            />
            <button
              onClick={handleScan}
              disabled={isScanning || isGenerating || !input.trim()}
              className="mt-4 w-full py-3 px-4 bg-white text-black hover:bg-gray-300 disabled:opacity-50 disabled:cursor-not-allowed font-bold uppercase tracking-widest transition-colors flex items-center justify-center"
            >
              {isScanning ? (
                <>
                  <Loader2 className="w-5 h-5 mr-2 animate-spin" />
                  Menganalisis...
                </>
              ) : isGenerating ? (
                <>
                  <Activity className="w-5 h-5 mr-2 animate-pulse" />
                  Mengekstrak...
                </>
              ) : (
                <>
                  <Send className="w-5 h-5 mr-2" />
                  Mulai Pemindaian
                </>
              )}
            </button>
          </div>

          {/* Status Card */}
          {(isScanning || chaosScore !== null) && (
            <div className="border border-white p-6 bg-black/80 backdrop-blur-sm shrink-0">
              <div className="flex items-center justify-between mb-2">
                <span className="text-white font-bold uppercase tracking-wider text-sm">
                  {isScanning ? 'Menganalisis...' : 'Tingkat Kekacauan'}
                </span>
                <span className="text-2xl font-mono font-bold">
                  {isScanning ? '---%' : `${chaosScore}%`}
                </span>
              </div>
              <div className="w-full bg-gray-900 h-2 mb-4 border border-gray-700 relative overflow-hidden">
                {isScanning ? (
                  <div className="absolute top-0 bottom-0 w-1/2 bg-gradient-to-r from-transparent via-white to-transparent animate-fluid-scan" />
                ) : (
                  <div 
                    className="h-full bg-white transition-all duration-1000 ease-out relative"
                    style={{ width: `${chaosScore}%` }}
                  >
                    <div className="absolute inset-0 bg-white/30 animate-pulse" />
                  </div>
                )}
              </div>
              <div className="flex items-center justify-between text-xs text-gray-400 uppercase tracking-wider font-mono">
                <div className="flex items-center">
                  {isScanning ? (
                    <><Activity className="w-4 h-4 mr-2 text-gray-400 animate-spin" /> Memindai gelombang otak</>
                  ) : chaosScore !== null && chaosScore > 50 ? (
                    <><AlertTriangle className="w-4 h-4 mr-2 text-red-500 animate-pulse-fast" /> Turbulensi neural</>
                  ) : (
                    <><Smile className="w-4 h-4 mr-2 text-green-500 animate-bounce-slow" /> Jalur neural stabil</>
                  )}
                </div>
                <div>
                  WAKTU: {isScanning ? '0.0s' : formatTime(simulatedTime)}
                </div>
              </div>
            </div>
          )}

          {/* Chart Card */}
          {(isScanning || chartData.length > 0) && (
            <div className="border border-white p-4 bg-black/80 backdrop-blur-sm shrink-0 h-[200px] flex flex-col">
              <h3 className="text-xs font-bold uppercase tracking-wider mb-2 flex items-center border-b border-white pb-2">
                <Activity className="w-4 h-4 mr-2" /> Fluktuasi Kesadaran
              </h3>
              <div className="flex-grow w-full">
                <ResponsiveContainer width="100%" height="100%">
                  <LineChart data={chartData}>
                    <CartesianGrid strokeDasharray="3 3" stroke="#333" vertical={false} />
                    <XAxis dataKey="time" stroke="#fff" fontSize={10} tickMargin={5} />
                    <YAxis stroke="#fff" fontSize={10} domain={[0, 100]} />
                    <Tooltip 
                      contentStyle={{ backgroundColor: '#000', border: '1px solid #fff', borderRadius: 0 }}
                      itemStyle={{ color: '#fff' }}
                      labelStyle={{ color: '#aaa' }}
                    />
                    <Line 
                      type="monotone" 
                      dataKey="kesadaran" 
                      stroke="#fff" 
                      strokeWidth={2} 
                      dot={false} 
                      isAnimationActive={false} 
                    />
                  </LineChart>
                </ResponsiveContainer>
              </div>
            </div>
          )}
        </div>

        {/* Terminal Section */}
        <div className="lg:col-span-7 h-[400px] lg:h-[700px]">
          <div className="border border-white h-full flex flex-col bg-black/80 backdrop-blur-sm">
            {/* Terminal Header */}
            <div className="bg-white text-black px-4 py-2 flex items-center justify-between border-b border-white">
              <div className="flex items-center">
                <Terminal className="w-4 h-4 mr-2" />
                <span className="text-xs font-bold uppercase tracking-widest">neural_output.log</span>
              </div>
              <div className="flex items-center gap-4">
                {totalLines > 0 && (
                  <span className="text-xs font-mono font-bold">
                    LINES: {totalLines.toLocaleString()}
                  </span>
                )}
                {isFinished && (
                  <div className="flex items-center gap-2 border-l border-black pl-4">
                    <button onClick={copyLogs} className="hover:text-gray-600 transition-colors" title="Salin Log">
                      <Copy className="w-4 h-4" />
                    </button>
                    <button onClick={downloadLogs} className="hover:text-gray-600 transition-colors" title="Unduh Log">
                      <Download className="w-4 h-4" />
                    </button>
                  </div>
                )}
              </div>
            </div>
            
            {/* Terminal Body */}
            <div 
              ref={terminalRef}
              className="flex-grow p-4 overflow-y-auto font-mono text-xs sm:text-sm leading-relaxed"
            >
              {logs.length === 0 && !isScanning && (
                <div className="h-full flex flex-col items-center justify-center text-gray-600">
                  <Terminal className="w-12 h-12 mb-4 opacity-50" />
                  <p className="uppercase tracking-widest text-xs">Menunggu input neural...</p>
                </div>
              )}
              
              {logs.map((log) => (
                <div 
                  key={log.id} 
                  className={`mb-1 break-all transition-colors ${
                    log.type === 'error' ? 'text-red-500' : 'text-green-500'
                  }`}
                >
                  {log.text}
                </div>
              ))}
              
              {isGenerating && (
                <div className="text-white mt-2 animate-pulse">
                  _
                </div>
              )}
            </div>
          </div>
        </div>
      </div>

      {/* Popup Modal */}
      {showPopup && isFinished && chaosScore !== null && (
        <div className="fixed inset-0 bg-black/90 flex items-center justify-center z-50 p-4 backdrop-blur-sm">
          <div className="bg-black border border-white p-6 max-w-2xl w-full max-h-[90vh] flex flex-col">
            <div className="flex justify-between items-center mb-4 border-b border-white pb-4">
              <h3 className="font-bold uppercase tracking-widest text-lg flex items-center">
                {chaosScore > 50 ? (
                  <><AlertTriangle className="w-5 h-5 mr-2 text-red-500 animate-pulse-fast" /> DIAGNOSIS: TINGKAT KECEMASAN TINGGI</>
                ) : (
                  <><Smile className="w-5 h-5 mr-2 text-green-500 animate-bounce-slow" /> DIAGNOSIS: PIKIRAN STABIL & BAHAGIA</>
                )}
              </h3>
              <button 
                onClick={() => setShowPopup(false)}
                className="p-1 hover:bg-white hover:text-black transition-colors"
              >
                <X className="w-5 h-5" />
              </button>
            </div>
            
            <div className="flex-grow overflow-y-auto font-mono text-sm leading-relaxed mb-6 whitespace-pre-wrap pr-2">
              {analysisText}
            </div>
            
            <div className="flex justify-end gap-4 pt-4 border-t border-white">
              <button 
                onClick={copyAnalysis} 
                className="border border-white px-4 py-2 uppercase text-xs font-bold hover:bg-white hover:text-black transition-colors flex items-center"
              >
                <Copy className="w-4 h-4 mr-2" />
                Salin Hasil
              </button>
              <button 
                onClick={() => setShowPopup(false)} 
                className="bg-white text-black px-4 py-2 uppercase text-xs font-bold hover:bg-gray-300 transition-colors"
              >
                Tutup
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Footer */}
      <footer className="mt-6 mb-2 text-center text-[10px] sm:text-xs text-gray-500 font-mono relative z-10 tracking-widest uppercase">
        © 2026 by naufalshdq
      </footer>
    </div>
    </>
  );
}
