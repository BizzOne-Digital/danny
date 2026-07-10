"use client";

interface Props {
  colorHex: string;
  colorCode: "purple" | "blue" | "green" | "yellow";
  name?: string;
  size?: "sm" | "md" | "lg";
}

const labelMap = {
  purple: "CONC",
  blue: "IPA",
  green: "ECO",
  yellow: "BULK",
};

export default function ProductBottleMockup({ colorHex, colorCode, name, size = "md" }: Props) {
  const dims = {
    sm: { bottle: "w-16 h-28", cap: "w-10 h-5", label: "w-10 h-14", text: "text-[8px]" },
    md: { bottle: "w-20 h-36", cap: "w-13 h-6", label: "w-14 h-18", text: "text-[9px]" },
    lg: { bottle: "w-28 h-48", cap: "w-18 h-8", label: "w-18 h-24", text: "text-[10px]" },
  }[size];

  const shortLabel = labelMap[colorCode] || "CLN";
  const productName = name ? name.split(" ").slice(0, 2).join(" ") : "Calico";

  return (
    <div className="relative flex flex-col items-center select-none">
      {/* Cap */}
      <div
        className="rounded-t-lg rounded-b-sm z-10"
        style={{
          width: size === "sm" ? 40 : size === "md" ? 52 : 72,
          height: size === "sm" ? 12 : size === "md" ? 16 : 20,
          background: `linear-gradient(135deg, ${colorHex}, ${colorHex}80)`,
          boxShadow: `inset 0 1px 0 rgba(255,255,255,0.3), inset 0 -2px 4px rgba(0,0,0,0.3)`,
        }}
      />

      {/* Bottle body */}
      <div
        className="relative rounded-b-2xl rounded-t-sm overflow-hidden"
        style={{
          width: size === "sm" ? 48 : size === "md" ? 64 : 88,
          height: size === "sm" ? 80 : size === "md" ? 110 : 150,
          background: `linear-gradient(160deg, ${colorHex}30 0%, ${colorHex}08 40%, ${colorHex}15 100%)`,
          border: `1px solid ${colorHex}40`,
          backdropFilter: "blur(10px)",
        }}
      >
        {/* Shine effect */}
        <div
          className="absolute top-2 left-2 rounded-full"
          style={{
            width: size === "sm" ? 8 : size === "md" ? 12 : 16,
            height: size === "sm" ? 24 : size === "md" ? 36 : 50,
            background: "rgba(255,255,255,0.15)",
            filter: "blur(2px)",
          }}
        />

        {/* Label area */}
        <div
          className="absolute inset-x-2 rounded-lg flex flex-col items-center justify-center gap-1 overflow-hidden"
          style={{
            top: size === "sm" ? 10 : size === "md" ? 14 : 18,
            bottom: size === "sm" ? 8 : size === "md" ? 10 : 14,
            background: `linear-gradient(135deg, ${colorHex}25, ${colorHex}10)`,
            border: `1px solid ${colorHex}30`,
          }}
        >
          {/* Calico Canada branding */}
          <div
            className="font-black tracking-wider leading-none text-center"
            style={{
              fontSize: size === "sm" ? 7 : size === "md" ? 8 : 10,
              color: colorHex,
              fontFamily: "var(--font-space-grotesk)",
            }}
          >
            CALICO
          </div>

          {/* Color code badge */}
          <div
            className="rounded-sm flex items-center justify-center font-black tracking-widest"
            style={{
              width: size === "sm" ? 22 : size === "md" ? 28 : 38,
              height: size === "sm" ? 12 : size === "md" ? 16 : 20,
              backgroundColor: colorHex,
              fontSize: size === "sm" ? 6 : size === "md" ? 7 : 9,
              color: "white",
              fontFamily: "var(--font-space-grotesk)",
            }}
          >
            {shortLabel}
          </div>

          {/* Product short name */}
          <div
            className="text-center font-medium leading-tight px-1 text-center"
            style={{
              fontSize: size === "sm" ? 5 : size === "md" ? 6 : 8,
              color: "rgba(255,255,255,0.6)",
              fontFamily: "var(--font-inter)",
              maxWidth: "100%",
            }}
          >
            {productName}
          </div>

          {/* Barcode lines */}
          <div className="flex gap-px mt-1">
            {Array.from({ length: size === "sm" ? 8 : size === "md" ? 10 : 14 }).map((_, i) => (
              <div
                key={i}
                style={{
                  width: 1.5,
                  height: size === "sm" ? 6 : size === "md" ? 8 : 10,
                  backgroundColor: `${colorHex}40`,
                  borderRadius: 1,
                }}
              />
            ))}
          </div>
        </div>

        {/* Bottom highlight */}
        <div
          className="absolute bottom-0 left-0 right-0"
          style={{
            height: size === "sm" ? 12 : size === "md" ? 16 : 20,
            background: `linear-gradient(to top, ${colorHex}20, transparent)`,
          }}
        />
      </div>

      {/* Drop shadow */}
      <div
        className="rounded-full mt-1 opacity-30"
        style={{
          width: size === "sm" ? 40 : size === "md" ? 52 : 72,
          height: size === "sm" ? 6 : size === "md" ? 8 : 10,
          background: colorHex,
          filter: `blur(${size === "sm" ? 6 : size === "md" ? 8 : 12}px)`,
        }}
      />
    </div>
  );
}
