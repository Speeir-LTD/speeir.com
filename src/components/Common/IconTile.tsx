// Shared icon container used wherever the site shows "this represents X"
// (service cards, feature callouts, process steps) so every section draws
// from the same visual language instead of each inventing its own.
const accents = [
  { border: "from-blue-500 to-cyan-500", icon: "text-blue-600 dark:text-blue-400" },
  { border: "from-purple-500 to-pink-500", icon: "text-pink-600 dark:text-pink-400" },
  { border: "from-orange-500 to-red-500", icon: "text-orange-600 dark:text-orange-400" },
  { border: "from-green-500 to-teal-500", icon: "text-green-600 dark:text-green-400" },
  { border: "from-indigo-500 to-purple-500", icon: "text-indigo-600 dark:text-indigo-400" },
  { border: "from-gray-500 to-slate-500", icon: "text-gray-700 dark:text-gray-300" },
] as const;

const sizes = {
  sm: { box: "w-12 h-12", icon: "w-6 h-6" },
  md: { box: "w-16 h-16", icon: "w-7 h-7" },
} as const;

type IconTileProps = {
  path: string;
  accentIndex?: number;
  size?: keyof typeof sizes;
  className?: string;
};

const IconTile = ({ path, accentIndex = 0, size = "md", className = "" }: IconTileProps) => {
  const accent = accents[accentIndex % accents.length];
  const s = sizes[size];

  return (
    <div className={`${s.box} rounded-2xl bg-gradient-to-br ${accent.border} p-0.5 shadow-lg ${className}`}>
      <div className="w-full h-full rounded-[14px] bg-white dark:bg-gray-800 flex items-center justify-center">
        <svg className={`${s.icon} ${accent.icon}`} fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d={path}></path>
        </svg>
      </div>
    </div>
  );
};

export default IconTile;
