const Select = () => {
  return (
    <div className="w-full">
      <label
        htmlFor="category"
        className="block mb-2 text-sm font-medium text-gray-900 dark:text-white w-full">
        Category
      </label>
      <select
        id="category"
        value="Select Category"
        name="category"
        className="border block border-green bg-black p-3 rounded-md w-full">
        <option value="TV">Select Category</option>
        <option value="TV">TV/Monitors</option>
        <option value="PC">PC</option>
        <option value="GA">Gaming/Console</option>
        <option value="PH">Phones</option>
      </select>
    </div>
  );
};

export default Select;
