"use client";
import React from "react";
import { useGetAllDocsForTheUserQuery } from "@/app/_RTK/RTK-query/RTKQuery";
import { useFilterSelector } from "@/app/hooks/Selectors";
import DocsCard from "../../cards/DocsCard";
import DocsCardLoader from "../../loaders/DocsCardLoader";
import ErrorFetchingData from "../../common/ErrorFetchingData";
import NoData from "../../common/NoData";

type Props = {
  title: string;
  description: string;
  showPDF: string;
  emptyPDF: string;
};

const DocsSummariesSection = ({
  title,
  description,
  showPDF,
  emptyPDF,
}: Props) => {
  const filter = useFilterSelector();
  const { data, isLoading, isError } = useGetAllDocsForTheUserQuery({
    subjectId: filter.subjectId ?? undefined,
  });

  if (isError) {
    return <ErrorFetchingData />;
  }

  const docs = data?.data?.data ?? [];

  return (
    <section className="py-10 px-4 md:px-10">
      <div className="mb-8 text-center md:text-start">
        <h2 className="text-3xl font-bold text-indigo-700 mb-1">{title}</h2>
        <p className="text-sm text-gray-500">{description}</p>
      </div>

      {isLoading ? (
        <div className="grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 gap-6">
          {[...Array(6)].map((_, i) => (
            <DocsCardLoader key={i} />
          ))}
        </div>
      ) : docs.length > 0 ? (
        <div className="grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 gap-6">
          {docs.map((doc) => (
            <DocsCard
              key={doc.id}
              title={doc.title}
              description={doc.description}
              link={doc.link}
              createdAt={doc.createdAt}
              showPDF={showPDF}
            />
          ))}
        </div>
      ) : (
        <NoData message={emptyPDF} />
      )}
    </section>
  );
};

export default DocsSummariesSection;
