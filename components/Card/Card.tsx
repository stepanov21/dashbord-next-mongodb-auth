import React from "react";

const Card = ({ filter, sum }: { filter: string; sum: number }) => {
  return (
    <div className="p-4 bg-gray flex justify-between h-40 rounded-2xl w-full border-[2px] border-green">
      <div className="text-2xl">{filter}</div>
      <div className="self-end text-3xl p-2">
        {sum}
        <span className="text-green ">₴</span>
      </div>
    </div>
  );
};

export default Card;
