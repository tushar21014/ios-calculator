export default function CurrencySelector({ symbols, from, to, setFrom, setTo }) {
  return (
    <div className="flex gap-4 mb-6">
      <div className="flex-1">
        <label className="block text-gray-400 text-xs mb-2 uppercase tracking-wide">
          From
        </label>
        <select 
          value={from}
          onChange={(e) => setFrom(e.target.value)}
          className="w-full bg-gray-700 text-white rounded-xl px-4 py-3 text-lg font-medium focus:outline-none focus:ring-2 focus:ring-blue-500 appearance-none cursor-pointer"
        >
          {symbols.map(symbol => (
            <option key={symbol} value={symbol} className="bg-gray-700">
              {symbol}
            </option>
          ))}
        </select>
      </div>
      
      <div className="flex items-end pb-3">
        <button
          onClick={() => {
            setFrom(to);
            setTo(from);
          }}
          className="bg-gray-700 hover:bg-gray-600 text-white p-3 rounded-xl transition-colors"
        >
          <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7h12m0 0l-4-4m4 4l-4 4m0 6H4m0 0l4 4m-4-4l4-4" />
          </svg>
        </button>
      </div>
      
      <div className="flex-1">
        <label className="block text-gray-400 text-xs mb-2 uppercase tracking-wide">
          To
        </label>
        <select 
          value={to}
          onChange={(e) => setTo(e.target.value)}
          className="w-full bg-gray-700 text-white rounded-xl px-4 py-3 text-lg font-medium focus:outline-none focus:ring-2 focus:ring-blue-500 appearance-none cursor-pointer"
        >
          {symbols.map(symbol => (
            <option key={symbol} value={symbol} className="bg-gray-700">
              {symbol}
            </option>
          ))}
        </select>
      </div>
    </div>
  );
}
