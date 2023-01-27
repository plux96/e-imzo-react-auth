import React from "react";

export default function Select({ data }) {
  //   console.log(data);
  return (
    <div>
      <select>
        {data &&
          data.map((item) => {
            return <option value="#">{item.CN}</option>;
          })}
      </select>
    </div>
  );
}
