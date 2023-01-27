import React from "react";

export default function Select({ data }) {
  //   console.log(data);
  return (
    <div>
      <select>
        {data &&
          data.map((item, key) => {
            return <option value="#" key={key}>{item.CN}</option>;
          })}
      </select>
    </div>
  );
}
