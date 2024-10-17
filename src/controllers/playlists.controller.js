import { ApiError } from "../utils/ApiError.js";
import { ApiResponse } from "../utils/ApiResponse.js";
import { User } from "../models/user.model.js";
import { Playlist } from "../models/playlists.model.js";
import { asyncHandler } from "../utils/asyncHandler";

const createPlaylist = asyncHandler(async (req, res) => {
    
});
const getUserPlaylist = asyncHandler(async (req, res) => {});

const getPlaylistById = asyncHandler(async (req, res) => {});

const addVideoFromPlaylist = asyncHandler(async (req, res) => {});

const removeVideoFromPlaylist = asyncHandler(async (req, res) => {});

const deletePlaylist = asyncHandler(async (req, res) => {});

const updatePlaylist = asyncHandler(async (req, res) => {});

export {
  createPlaylist,
  getUserPlaylist,
  getPlaylistById,
  addVideoFromPlaylist,
  removeVideoFromPlaylist,
  deletePlaylist,
  updatePlaylist,
};
