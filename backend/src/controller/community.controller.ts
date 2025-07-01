import { Request, Response } from "express";
import { setResponse } from "../utils/jsonStander.js";
import { communityService } from "../services/CommunityService.js";

/**
 * @name       getAllCommunities
 * @description Get all communities
 */
export const getAllCommunities = async (req: Request, res: Response) => {
  const communities = await communityService.getAll();
  return setResponse(res, { data: communities }, 200, "Communities fetched");
};

/**
 * @name       getCommunityById
 * @description Get single community by ID
 */
export const getCommunityById = async (req: Request, res: Response) => {
  const id = req.params.id;
  const community = await communityService.getCommunityById(id);
  if (!community) {
    return setResponse(res, { data: null }, 404, "Community not found");
  }
  return setResponse(res, { data: community }, 200, "Community found");
};

/**
 * @name       getCommunityByName
 * @description Get community by name
 */
export const getCommunityByName = async (req: Request, res: Response) => {
  const name = req.params.name;
  const community = await communityService.getCommunityByName(name);
  if (!community) {
    return setResponse(res, { data: null }, 404, "Community not found");
  }
  return setResponse(res, { data: community }, 200, "Community found");
};

/**
 * @name        createCommunity
 * @description Create a new community
 */
export const createCommunity = async (req: Request, res: Response) => {
  const { name, description } = req.body;
  const image = req?.file?.path;

  if (!image) {
    return setResponse(res, { data: null }, 400, "Image is required");
  }

  const newCommunity = await communityService.createNewCommunity(
    name,
    description,
    image
  );
  return setResponse(res, { data: newCommunity }, 201, "Community created");
};

/**
 * @name        updateCommunityById
 * @description Update existing community by ID
 */
export const updateCommunityById = async (req: Request, res: Response) => {
  const id = req.params.id;
  const { name, description } = req.body;
  const community = await communityService.getCommunityById(id);
  if (!community) {
    return setResponse(res, { data: null }, 404, "Community not found");
  }

  community.description = description ? description : community.description;
  community.name = name ? name : community.name;

  const updated = await communityService.updateCommunityById(id, community);
  return setResponse(res, { data: updated }, 200, "Community updated");
};

/**
 * @name        deleteCommunityById
 * @description Delete community by ID
 */
export const deleteCommunityById = async (req: Request, res: Response) => {
  const id = req.params.id;

  const community = await communityService.getCommunityById(id);
  if (!community) {
    return setResponse(res, { data: null }, 404, "Community not found");
  }

  const deleted = await communityService.deleteCommunityById(id);
  return setResponse(res, { data: deleted }, 200, "Community deleted");
};
