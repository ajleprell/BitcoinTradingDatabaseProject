import { useState } from "react";

const FilterDropdown = ({ selectedFilter, setSelectedFilter }) => {
  const [isOpen, setIsOpen] = useState(false);

  const toggleDropdown = () => setIsOpen(!isOpen);

  const handleSelection = (value) => {
    setSelectedFilter(value);
    setIsOpen(false);
  };

  return (
    <div className="relative">
      <button
        onClick={toggleDropdown}
        className="bg-white border rounded p-2 flex items-center justify-between w-48"
      >
        <span className="capitalize">{selectedFilter || "Filter"}</span>
        <span>{isOpen ? "▲" : "▼"}</span>
      </button>
      {isOpen && (
        <div className="absolute z-10 bg-white border rounded mt-1">
          <label className="block cursor-pointer px-4 py-2">
            <input
              type="radio"
              name="filter"
              value="today"
              checked={selectedFilter === "today"}
              onChange={() => handleSelection("today")}
            />
            Today
          </label>
          <label className="block cursor-pointer px-4 py-2">
            <input
              type="radio"
              name="filter"
              value="this week"
              checked={selectedFilter === "this week"}
              onChange={() => handleSelection("this week")}
            />
            This week
          </label>
          <label className="block cursor-pointer px-4 py-2">
            <input
              type="radio"
              name="filter"
              value="this month"
              checked={selectedFilter === "this month"}
              onChange={() => handleSelection("this month")}
            />
            This month
          </label>
          <label className="block cursor-pointer px-4 py-2">
            <input
              type="radio"
              name="filter"
              value="this year"
              checked={selectedFilter === "this year"}
              onChange={() => handleSelection("this year")}
            />
            This year
          </label>
          <label className="block cursor-pointer px-4 py-2">
            <input
              type="radio"
              name="filter"
              value="all time"
              checked={selectedFilter === "all time"}
              onChange={() => handleSelection("all time")}
            />
            All Time
          </label>
        </div>
      )}
    </div>
  );
};

export default FilterDropdown;
