import { useState } from "react";

const Dropdown = ({
  title,
  options,
  selectedValue,
  setSelectedValue,
  className,
  dropdownClassName,
  ...rest
}) => {
  const [isOpen, setIsOpen] = useState(false);

  const toggleDropdown = () => setIsOpen(!isOpen);

  const handleSelect = (option) => {
    setSelectedValue(option);
    setIsOpen(false);
  };

  const combinedContainerClassName = `relative flex flex-col gap-y-2 ${className}`;
  const combinedDropdownClassName = `relative w-3/4 ${dropdownClassName}`;

  return (
    <div className={combinedContainerClassName}>
      <div className="font-bold text-xl">{title}</div>
      <button
        onClick={toggleDropdown}
        className="bg-[#F3F3F3] p-4 rounded-2xl outline-none text-left w-3/4"
        {...rest}
      >
        {selectedValue ? selectedValue.title : "Select an option"}
      </button>
      {isOpen && (
        <div className="absolute top-full z-10 w-3/4 bg-[#F3F3F3]">
          {options.map((option) => (
            <div
              key={option.id}
              onClick={() => handleSelect(option)}
              className="p-4 hover:bg-gray-300 cursor-pointer w-full"
            >
              {option.title}
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default Dropdown;
