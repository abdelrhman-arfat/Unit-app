import { Request, Response } from "express";
import { eventService } from "../services/EventService.js";
import { setResponse } from "../utils/jsonStander.js";
import setPagination from "../utils/setPagination.js";

/**
 * @name createEvent
 * @desc Create a new event
 */
export const createEvent = async (req: Request, res: Response) => {
  const { title, description, link, startDate, endDate } = req.body;
  const image = req?.file?.path || "";

  const event = await eventService.create({
    title,
    description,
    link,
    image,
    startDate: new Date(startDate),
    endDate: new Date(endDate),
  });

  return setResponse(res, { data: event }, 201, "Event created");
};

/**
 * @name getAllEvents
 * @desc Get all events
 */
export const getAllEvents = async (req: Request, res: Response) => {
  const [skip, limit] = setPagination(req);
  const events = await eventService.getAll(skip, limit);
  return setResponse(res, { data: events }, 200, "Events fetched");
};

/**
 * @name getEventById
 * @desc Get event by ID
 */
export const getEventById = async (req: Request, res: Response) => {
  const id = Number(req.params.id);
  const event = await eventService.getById(id);
  if (!event) {
    return setResponse(res, { data: null }, 404, "Event not found");
  }
  return setResponse(res, { data: event }, 200, "Event fetched");
};

/**
 * @name    updateEvent
 * @desc Update event
 */
export const updateEvent = async (req: Request, res: Response) => {
  const id = Number(req.params.id);
  const { title, description, link, startDate, endDate } = req.body;
  const exists = await eventService.getById(id);
  if (!exists) return setResponse(res, { data: null }, 404, "Event not found");
  const newStartDate = new Date(startDate);
  const newEndDate = new Date(endDate);
  if (newStartDate < new Date()) {
    return setResponse(
      res,
      { data: null },
      400,
      "Start date must be in the future"
    );
  }
  if (newStartDate > newEndDate) {
    return setResponse(
      res,
      { data: null },
      400,
      "End date must be after start date"
    );
  }

  if (startDate) exists.startDate = new Date(startDate);
  if (endDate) exists.endDate = new Date(endDate);

  if (title) exists.title = title;
  if (description) exists.description = description;
  if (link) exists.link = link;

  const updated = await eventService.update(id, exists);

  return setResponse(res, { data: updated }, 200, "Event updated");
};

/**
 * @name    deleteEvent
 * @desc Delete event
 */
export const deleteEvent = async (req: Request, res: Response) => {
  const id = Number(req.params.id);
  await eventService.delete(id);
  return setResponse(res, { data: null }, 200, "Event deleted");
};
