import React from "react";
type Props = {
  length: number;
  name: string;
};
const TableHeaderData = ({ length, name }: Props) => {
  return (
    <div className="p-4 border-b flex justify-between items-center">
      <h2 className="text-lg font-semibold text-foreground">
        {name[0].toUpperCase() + name.slice(1)}
      </h2>
      <p className="text-xl text-muted-foreground">Total: {length}</p>
    </div>
  );
};

export default TableHeaderData;
