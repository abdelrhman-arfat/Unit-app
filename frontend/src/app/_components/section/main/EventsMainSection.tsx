"use client";

import React, { useState } from "react";
import InfiniteScroll from "react-infinite-scroll-component";
import { useGetAllEventsQuery } from "@/app/_RTK/RTK-query/RTKQuery";
import { Event } from "@/app/types/Event";
import EventCard from "../../cards/EventCard";
import EventCardLoader from "../../loaders/EventCardLoader";
import { Loader2 } from "lucide-react";

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

  const { data, isFetching } = useGetAllEventsQuery(
    { limit },
    {
      refetchOnMountOrArgChange: false,
      refetchOnReconnect: false,
      refetchOnFocus: false,
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

  return (
    <div className="min-h-screen bg-gray-50 py-10 px-4 md:px-8">
      <div className="max-w-2xl mx-auto mb-8">
        <h1 className="text-3xl font-extrabold text-indigo-700 tracking-tight text-center">
          {title}
        </h1>
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
          loader={
            <div className="w-full py-4 flex justify-center">
              <div className="flex items-center gap-2 text-indigo-600">
                <Loader2 className="w-5 h-5 animate-spin" />
                <span className="text-sm font-medium animate-pulse">
                  Loading more events...
                </span>
              </div>
            </div>
          }
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
