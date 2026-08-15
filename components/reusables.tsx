export const GrayTitle = ({ children }: { children: React.ReactNode }) => (
  <span className="text-white/90" style={{ fontFamily: "Arial, sans-serif" }}>{children}</span>
);

export const BlueTitle = ({
  children,
  className = "",
}: {
  children: React.ReactNode;
  className?: string;
}) => (
  <span
    className={`bg-linear-to-br from-purple-300 via-purple-400 to-purple-600 bg-clip-text text-transparent ${className}`}
    style={{ fontFamily: "Arial, sans-serif" }}
  >
    {children}
  </span>
);

export const SectionLabel = ({ children }: { children: React.ReactNode }) => (
  <p className="inline-flex items-center gap-2 text-xs font-semibold text-purple-400 tracking-[0.14em] uppercase mb-4" style={{ fontFamily: "Arial, sans-serif" }}>
    <span className="w-4 h-px bg-purple-400" />
    {children}
    <span className="w-4 h-px bg-purple-400" />
  </p>
);

export const SectionHeading = ({
  gray,
  blue,
}: {
  gray: string;
  blue: string;
}) => (
  <h2 className="text-[clamp(2rem,4vw,3rem)] leading-[1.1] tracking-tight" style={{ fontFamily: "Arial, sans-serif" }}>
    <GrayTitle>{gray}</GrayTitle>
    <br />
    <BlueTitle>{blue}</BlueTitle>
  </h2>
);