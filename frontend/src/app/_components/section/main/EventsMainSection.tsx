"use client";

import React, { useState } from "react";
import InfiniteScroll from "react-infinite-scroll-component";
import { useGetAllEventsQuery } from "@/app/_RTK/RTK-query/RTKQuery";
import { Event } from "@/app/types/Event";
import EventCard from "../../cards/EventCard";
import EventCardLoader from "../../loaders/EventCardLoader";
import LoaderGetMoreData from "../../loaders/LoaderGetMoreData";
import ErrorFetchingData from "../../common/ErrorFetchingData";

type EventsMainSectionProps = {
  noEventsText: string;
  allEventsLoadedText: string;
  visitEventText: string;
  title: string;
};

const EventsMainSection = ({
  noEventsText,
  allEventsLoadedText,
  visitEventText,
  title,
}: EventsMainSectionProps) => {
  const [limit, setLimit] = useState(5);

  const { data, isFetching, isError } = useGetAllEventsQuery(
    { limit },
    {
      refetchOnReconnect: false,
    }
  );

  const events: Event[] = data?.data?.data ?? [];
  const totalPages = data?.data?.pages ?? 1;
  const hasMore = limit / 10 < totalPages;

  const fetchMore = () => {
    if (!isFetching && hasMore) {
      setLimit((prev) => prev + 10);
    }
  };
  if (isError) {
    return <ErrorFetchingData />;
  }

  return (
    <div className="min-h-screen bg-gray-50 py-10 px-4 md:px-8">
      <div className="relative max-w-3xl mx-auto mb-12 text-center">
        <h1 className="text-2xl md:text-4xl font-bold text-indigo-700 tracking-tight leading-tight">
          {title}
        </h1>
        <div className="mt-3 w-24 h-1 bg-indigo-500 mx-auto rounded-full animate-pulse" />
      </div>

      {events.length === 0 && isFetching ? (
        <div className="flex flex-col items-center gap-6">
          {Array.from({ length: 3 }).map((_, i) => (
            <EventCardLoader key={i} />
          ))}
        </div>
      ) : (
        <InfiniteScroll
          dataLength={events.length}
          next={fetchMore}
          hasMore={hasMore}
          loader={<LoaderGetMoreData name="events" />}
          endMessage={
            events.length === 0 ? (
              <p className="text-center text-gray-400 mt-8 text-sm">
                {noEventsText}
              </p>
            ) : (
              <p className="text-center text-gray-400 mt-8 text-sm">
                {allEventsLoadedText}
              </p>
            )
          }
        >
          <div className="flex flex-col items-center gap-6">
            {events.map((event, index) => (
              <div key={index + "event-wrapper"} className="w-full max-w-2xl">
                <EventCard
                  event={event}
                  visitEventText={visitEventText}
                  key={index + "event-card"}
                />
              </div>
            ))}
          </div>
        </InfiniteScroll>
      )}
    </div>
  );
};

export default EventsMainSection;
