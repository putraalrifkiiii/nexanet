export default function Badge({ text, indicatorColor }) {
  return (
    <div className="inline-flex items-center mb-8 gap-2 px-3.5 py-1.5 rounded-full border border-[rgba(255,255,255,0.1)] backdrop-blur-md ">
      <span
        className={`w-1.5 h-1.5 rounded-full animate-pulse duration-2000 ${indicatorColor}`}
      />
      <span className="font-mono text-[rgb(255,255,255,0.4)] text-[11px]">
        {text}
      </span>
    </div>
  );
}
