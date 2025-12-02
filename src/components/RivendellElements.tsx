export const ElvenDivider = ({ className = "" }: { className?: string }) => (
    <svg className={`w-full h-auto ${className}`} viewBox="0 0 1200 120" fill="none" xmlns="http://www.w3.org/2000/svg">
        <path d="M0 60C200 60 300 20 600 20C900 20 1000 60 1200 60" stroke="currentColor" strokeWidth="1" strokeOpacity="0.3" fill="none" />
        <path d="M0 60C200 60 300 100 600 100C900 100 1000 60 1200 60" stroke="currentColor" strokeWidth="1" strokeOpacity="0.3" fill="none" />
        <circle cx="600" cy="60" r="3" fill="currentColor" className="animate-pulse" />
        <path d="M580 60L600 40L620 60L600 80L580 60Z" fill="currentColor" fillOpacity="0.5" />
    </svg>
);

export const ElvenBorder = ({ className = "" }: { className?: string }) => (
    <svg className={`absolute inset-0 w-full h-full pointer-events-none ${className}`} viewBox="0 0 400 600" preserveAspectRatio="none" fill="none" xmlns="http://www.w3.org/2000/svg">
        <path d="M10 10H100" stroke="currentColor" strokeWidth="1" />
        <path d="M10 10V100" stroke="currentColor" strokeWidth="1" />
        <path d="M390 10H300" stroke="currentColor" strokeWidth="1" />
        <path d="M390 10V100" stroke="currentColor" strokeWidth="1" />
        <path d="M10 590H100" stroke="currentColor" strokeWidth="1" />
        <path d="M10 590V500" stroke="currentColor" strokeWidth="1" />
        <path d="M390 590H300" stroke="currentColor" strokeWidth="1" />
        <path d="M390 590V500" stroke="currentColor" strokeWidth="1" />
    </svg>
);

export const Star = ({ className = "" }: { className?: string }) => (
    <svg className={className} viewBox="0 0 24 24" fill="currentColor" xmlns="http://www.w3.org/2000/svg">
        <path d="M12 0L14 10L24 12L14 14L12 24L10 14L0 12L10 10L12 0Z" />
    </svg>
);

export const Leaf = ({ className = "" }: { className?: string }) => (
    <svg className={className} viewBox="0 0 24 24" fill="currentColor" xmlns="http://www.w3.org/2000/svg">
        <path d="M12 2C12 2 14 8 20 12C14 16 12 22 12 22C12 22 10 16 4 12C10 8 12 2 12 2Z" />
        <path d="M12 2V22" stroke="currentColor" strokeWidth="0.5" strokeOpacity="0.5" />
    </svg>
);
