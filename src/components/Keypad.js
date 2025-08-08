export default function Keypad({ onKeyPress, loading }) {
    const buttons = [
      ['AC', '⌫', '', 'FX'],
      ['7', '8', '9', ''],
      ['4', '5', '6', ''],
      ['1', '2', '3', ''],
      ['0', '.', '', '']
    ];
  
    const getButtonStyle = (button) => {
      if (button === '') return 'invisible';
      if (button === 'AC' || button === '⌫') return 'bg-gray-600 hover:bg-gray-500 text-white';
      if (button === 'FX') return `${loading ? 'bg-blue-400' : 'bg-blue-500 hover:bg-blue-400'} text-white font-semibold`;
      if (button === '0') return 'bg-gray-700 hover:bg-gray-600 text-white col-span-2';
      return 'bg-gray-700 hover:bg-gray-600 text-white';
    };
  
    return (
      <div className="grid grid-cols-4 gap-3">
        {buttons.flat().map((button, index) => (
          <button
            key={index}
            onClick={() => button && onKeyPress(button)}
            disabled={loading && button === 'FX'}
            className={`
              h-16 rounded-2xl text-xl font-medium transition-all duration-150 active:scale-95
              ${getButtonStyle(button)}
              ${button === '0' ? 'col-span-2' : ''}
              ${loading && button === 'FX' ? 'cursor-not-allowed' : ''}
            `}
          >
            {loading && button === 'FX' ? (
              <div className="flex items-center justify-center">
                <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
              </div>
            ) : (
              button
            )}
          </button>
        ))}
      </div>
    );
  }
  