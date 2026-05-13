'use client';

const Footer = () => {
  return (
    <footer className="relative z-0 flex min-h-[200px] w-full flex-col items-center justify-center overflow-hidden bg-obsidian py-10">
      <div className="absolute inset-0 opacity-10">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,_var(--tw-gradient-stops))] from-gold/20 via-transparent to-transparent" />
      </div>
      
      <div className="relative z-10 px-4 text-center sm:px-6">
        <p className="mb-4 text-[9px] font-bold uppercase tracking-[0.32em] text-[#8D9096] opacity-50 sm:text-[10px] sm:tracking-[0.5em]">
          Digital Excellence Designed By
        </p>
        <h2 className="mb-2 text-2xl font-black tracking-tighter text-white sm:text-3xl">
          <span className="text-gold">Mohammed</span> Ihsan
        </h2>
        <div className="w-12 h-px bg-gold/30 mx-auto mt-6 mb-4" />
        <p className="text-[9px] uppercase tracking-[0.22em] text-[#8D9096] sm:text-[10px] sm:tracking-widest">
          (c) 2026 LUXURY TIMEPIECES GROUP | Sri Lanka
        </p>
      </div>
      
      {/* Decorative lines */}
      <div className="absolute bottom-0 left-0 w-full h-px bg-gradient-to-r from-transparent via-gold/20 to-transparent" />
    </footer>
  );
};

export default Footer;
