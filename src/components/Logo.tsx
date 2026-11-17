// src/components/Logo.tsx
import Image from 'next/image';

interface LogoProps {
  size?: 'small' | 'medium' | 'large';
}

export default function Logo({ size = 'medium' }: LogoProps) {
  const sizes = {
    small: { w: 40, h: 40, text: 'text-sm' },
    medium: { w: 60, h: 60, text: 'text-base' },
    large: { w: 100, h: 100, text: 'text-2xl' },
  };

  const s = sizes[size];

  return (
    <div className="flex items-center gap-3">
      {/* Usamos la imagen PNG oficial con priority para que cargue instantáneo */}
      <div className="relative shrink-0" style={{ width: s.w, height: s.h }}>
        <Image 
          src="/images/logo.png" 
          alt="Logo Dra. Ismenia Ávila" 
          fill
          sizes={`${s.w}px`}
          priority
          className="object-contain"
        />
      </div>
      
      <div className="leading-tight">
        <h1 className={`font-bold text-slate-900 ${s.text}`}>
          Dra. Ismenia Ávila
        </h1>
        <p className={`text-slate-500 ${size === 'small' ? 'text-[10px]' : 'text-xs'}`}>
          Odontología Operatoria y Estética
        </p>
      </div>
    </div>
  );
}