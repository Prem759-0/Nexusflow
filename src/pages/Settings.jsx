const accentColors = {
  indigo: '#6366f1',
  emerald: '#10b981',
  rose: '#f43f5e',
  amber: '#f59e0b',
};

// inside the Appearance card:
<div className="flex gap-3">
  {accents.map((a) => (
    <button
      key={a}
      onClick={() => setAccent(a)}
      style={{ backgroundColor: accentColors[a] }}
      className={`w-8 h-8 rounded-full ring-2 ring-offset-2 transition ${
        accent === a ? 'ring-black dark:ring-white' : 'ring-transparent'
      }`}
      aria-label={`Set accent ${a}`}
    />
  ))}
</div>
