import { NextPage } from "next";
import { HTMLAttributes } from "react";

interface BtnAdminNavProps extends HTMLAttributes<HTMLButtonElement> {
  name: string;
  text: string;
  icon?: any;
  isSelected?: boolean;
}

export const BtnAdminNav: NextPage<BtnAdminNavProps> = ({
  name,
  text,
  icon,
  isSelected = false,
  ...rest
}) => {

  return (
    <button
      className={
        isSelected
          ? "w-full py-4 bg-gray-100 hover:bg-gray-100 transition duration-200 flex flex-row justify-center items-center text-bold text-xl"
          : "w-full py-4 hover:bg-gray-100 transition duration-200 flex flex-row justify-center items-center text-bold text-xl"
      }
      onClick={ rest.onClick }
      name={ name }
    >
      <span className={"mr-2"}>{icon}</span>
      {text}
    </button>
  );
};
