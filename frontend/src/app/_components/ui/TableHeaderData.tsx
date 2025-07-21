import React from "react";
type Props = {
  length: number;
  name: string;
};
const TableHeaderData = ({ length, name }: Props) => {
  return (
    <div className="p-4 border-b">
      <h2 className="text-lg font-semibold text-foreground">
        All {name[0].toUpperCase() + name.slice(1).toLowerCase()}
      </h2>
      <p className="text-sm text-muted-foreground">
        Total: {length} {name.toLowerCase()}
      </p>
    </div>
  );
};

export default TableHeaderData;
