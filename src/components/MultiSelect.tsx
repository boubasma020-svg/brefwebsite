import { Check } from 'lucide-react';

interface MultiSelectProps {
  label: string;
  options: string[];
  selected: string[];
  onChange: (selected: string[]) => void;
  required?: boolean;
}

export default function MultiSelect({
  label,
  options,
  selected,
  onChange,
  required = false,
}: MultiSelectProps) {
  const toggleOption = (option: string) => {
    if (selected.includes(option)) {
      onChange(selected.filter((item) => item !== option));
    } else {
      onChange([...selected, option]);
    }
  };

  return (
    <div>
      <label className="block text-sm font-medium text-gray-700 mb-3">
        {label} {required && <span className="text-red-500">*</span>}
      </label>
      <div className="grid grid-cols-2 gap-3">
        {options.map((option) => {
          const isSelected = selected.includes(option);
          return (
            <button
              key={option}
              type="button"
              onClick={() => toggleOption(option)}
              className={`relative flex items-center justify-between px-4 py-3 rounded-lg border-2 transition-all ${
                isSelected
                  ? 'border-blue-600 bg-blue-50 text-blue-900'
                  : 'border-gray-300 bg-white text-gray-700 hover:border-gray-400'
              }`}
            >
              <span className="text-sm font-medium">{option}</span>
              {isSelected && (
                <Check className="w-5 h-5 text-blue-600 flex-shrink-0 ml-2" />
              )}
            </button>
          );
        })}
      </div>
      {selected.length > 0 && (
        <p className="mt-2 text-sm text-gray-600">
          {selected.length} sélectionné{selected.length > 1 ? 's' : ''}
        </p>
      )}
    </div>
  );
}
