import Link from "next/link";
import React from "react";

type Props = {
  link: string;
};
const Open = ({ link }: Props) => {
  return (
    <>
      {link ? (
        <Link
          href={link}
          target="_blank"
          className="inline-block px-3 py-1 rounded-full text-sm font-medium bg-white text-green-600 border border-green-200 hover:bg-green-50 hover:text-green-700 dark:bg-zinc-800 dark:text-green-400 dark:border-green-600 dark:hover:bg-zinc-700 transition-all"
        >
          Open
        </Link>
      ) : (
        <span className="text-xs text-muted-foreground">No Link</span>
      )}
    </>
  );
};

export default Open;
