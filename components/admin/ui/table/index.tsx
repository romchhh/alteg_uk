import React, { ReactNode } from "react";

interface TableProps {
  children: ReactNode;
  className?: string;
}

interface TableCellProps {
  children: ReactNode;
  isHeader?: boolean;
  className?: string;
  colSpan?: number;
}

const Table: React.FC<TableProps> = ({ children, className }) => (
  <table className={`min-w-full ${className || ""}`}>{children}</table>
);

const TableHeader: React.FC<TableProps> = ({ children, className }) => (
  <thead className={className}>{children}</thead>
);

const TableBody: React.FC<TableProps> = ({ children, className }) => (
  <tbody className={className}>{children}</tbody>
);

const TableRow: React.FC<TableProps> = ({ children, className }) => (
  <tr className={className}>{children}</tr>
);

const TableCell: React.FC<TableCellProps> = ({
  children,
  isHeader = false,
  className = "",
  colSpan,
}) => {
  const Tag = isHeader ? "th" : "td";
  return (
    <Tag colSpan={colSpan} className={className}>
      {children}
    </Tag>
  );
};

export { Table, TableHeader, TableBody, TableRow, TableCell };
