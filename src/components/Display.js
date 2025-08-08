export default function Display({ value, rateInfo, error }) {
    return (
      <div className="bg-gray-800 rounded-2xl p-6 mb-6 min-h-[120px] flex flex-col justify-end">
        {error && (
          <div className="text-red-400 text-sm mb-2 text-center">
            {error}
          </div>
        )}
        
        {rateInfo && (
          <div className="text-gray-400 text-xs mb-2 text-right">
            1 {rateInfo.from} = {rateInfo.rate.toFixed(4)} {rateInfo.to}
          </div>
        )}
        
        <div className="text-white text-right">
          <div className="text-4xl font-light tracking-tight">
            {value}
          </div>
        </div>
      </div>
    );
  }
  