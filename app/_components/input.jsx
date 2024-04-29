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
    <div className="flex flex-col gap-y-2 font-inter">
      <div className="font-bold text-xl">{title}</div>
      <input
        value={value}
        onChange={(e) => setValue(e.target.value)}
        className=" bg-[#F1F1F1] rounded-[14px] p-4 outline-none w-[450px] text-base"
        placeholder={"Input " + title}
        {...rest}
      />
    </div>
  );
};

export default Input;
