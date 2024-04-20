"use client";

const Input = ({
  title,
  value,
  setValue,
  className,
  inputClassName,
  ...rest
}) => {
  /* const combinedContainerClassName = twMerge(
    "flex flex-col gap-y-4 font-inter font-bold",
    className
  );
  const combinedInputClassName = twMerge(
    "bg-[#F3F3F3] p-6 rounded-2xl outline-none",
    inputClassName
  );*/

  return (
    <div className="flex flex-col gap-y-2 font-interitems-end">
      <div className="font-bold text-xl">{title}</div>
      <input
        value={value}
        onChange={(e) => setValue(e.target.value)}
        className="bg-[#F3F3F3] p-4 rounded-2xl outline-none w-3/4"
        placeholder={"Input " + title}
        {...rest}
      />
    </div>
  );
};

export default Input;
