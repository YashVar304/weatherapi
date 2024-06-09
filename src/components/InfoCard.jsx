import React from "react";

function InfoCard({ icon, name, value }) {
  return (
    <div className="text-white bg-black bg-opacity-70 flex justify-between p-3 rounded-xl ">
      <div className="flex  items-center ">
        {icon}
        <p className="text-lg font-mono">{name}</p>
      </div>
      <p className="">{value}</p>
    </div>
  );
}

export default InfoCard;
