"use client";

import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import Image from "next/image";
import Link from "next/link";
import { useGetAllEventsQuery } from "@/app/_RTK/RTK-query/RTKQuery";
import { Event as EventType } from "@/app/types/Event";
import OpenCard from "../cards/OpenCard";
import CreateEventForm from "../forms/CreateEventForm";
import { HomeIcon } from "lucide-react";
import DeleteEvent from "../Buttons/DeleteEvent";
import UpdateEvent from "../Buttons/UpdateEvent";

const EventsTable = () => {
  const { data, isLoading, isError, refetch } = useGetAllEventsQuery({});

  if (isLoading)
    return (
      <div className="text-center py-10 text-muted-foreground text-sm">
        Loading events...
      </div>
    );

  if (isError || !data?.data)
    return (
      <div className="text-center py-10 text-red-500 text-sm">
        Failed to load events. Please try again.
      </div>
    );

  const events = data.data.data;

  return (
    <div className="space-y-6 px-4 py-6">
      {/* OpenCard for Create Form */}
      <OpenCard
        title="Events"
        buttonText="Add Event"
        component={<CreateEventForm refetch={refetch} />}
        description="Create and manage your events easily."
        icon={<HomeIcon className="text-indigo-600" />}
      />

      {/* Events Table */}
      <div className="rounded-xl border bg-card shadow-sm overflow-hidden">
        <div className="p-4 border-b">
          <h2 className="text-lg font-semibold text-foreground">All Events</h2>
          <p className="text-sm text-muted-foreground">
            Total: {events.length} events
          </p>
        </div>
        <div className="overflow-x-auto">
          <Table>
            <TableHeader className="bg-muted">
              <TableRow>
                <TableHead>Image</TableHead>
                <TableHead>Title</TableHead>
                <TableHead>Description</TableHead>
                <TableHead>Date</TableHead>
                <TableHead>Link</TableHead>
                <TableHead className="text-right">Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {events.map((event: EventType) => (
                <TableRow key={event.id} className="hover:bg-muted/40">
                  {/* Image */}
                  <TableCell>
                    {event.image ? (
                      <div className="w-[60px] h-[40px] relative rounded-md overflow-hidden border">
                        <Image
                          src={event.image.replace(/"/g, "")}
                          alt="event"
                          fill
                          className="object-cover"
                        />
                      </div>
                    ) : (
                      <span className="text-xs text-muted-foreground">
                        No Image
                      </span>
                    )}
                  </TableCell>

                  {/* Title */}
                  <TableCell className="font-medium text-sm">
                    {event.title}
                  </TableCell>

                  {/* Description */}
                  <TableCell className="max-w-[200px] truncate text-sm text-muted-foreground">
                    {event.description}
                  </TableCell>

                  {/* Dates */}
                  <TableCell className="text-sm whitespace-nowrap">
                    <span className="font-medium text-foreground">
                      {new Date(event.startDate).toLocaleDateString()}
                    </span>
                    <br />
                    <span className="text-muted-foreground">
                      → {new Date(event.endDate).toLocaleDateString()}
                    </span>
                  </TableCell>

                  {/* Link */}
                  <TableCell>
                    {event.link ? (
                      <Link
                        href={event.link}
                        target="_blank"
                        className="text-indigo-600 hover:underline text-sm font-medium"
                      >
                        Open
                      </Link>
                    ) : (
                      <span className="text-xs text-muted-foreground">
                        No Link
                      </span>
                    )}
                  </TableCell>

                  {/* Actions */}
                  <TableCell className="text-right space-x-2">
                    <UpdateEvent event={event} refetch={refetch} />
                    <DeleteEvent id={event.id} refetch={refetch} />
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </div>
      </div>
    </div>
  );
};

export default EventsTable;
