"use client";

const RadioButtonTheme = () => {
  return (
    <div className="btn-shadow mt-4 p-3 rounded-main flex items-center justify-between">
      <span className="text-md font-bold">Dark Mode: </span>
      <label className="relative inline-flex items-center cursor-pointer border border-[black] rounded-full">
        <input type="checkbox" value="" className="sr-only peer" />
        <div className="w-11 h-6 bg-gray-200 rounded-full peer dark:bg-gray-700 peer-checked:after:translate-x-full rtl:peer-checked:after:-translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-0.5 after:start-[2px] after:bg-yellow after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all dark:border-gray-600 peer-checked:bg-green"></div>
      </label>
    </div>
  );
};

export default RadioButtonTheme;
