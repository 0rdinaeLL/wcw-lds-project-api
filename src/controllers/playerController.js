import * as service from '../services/playerService.js';

export const createPlayerHandler = async (req, res, next) => {
  try {
    const player = await service.createPlayer(req.body);
    res.status(201).json(player);
  } catch (err) {
    next(err);
  }
};

export const getAllPlayersHandler = async (req, res, next) => {
  try {
    const players = await service.getAllPlayers();
    res.status(200).json(players);
  } catch (err) {
    next(err);
  }
};

export const getPlayerByIdHandler = async (req, res, next) => {
  try {
    const id = Number(req.params.id);
    const player = await service.getPlayerById(id);
    res.status(200).json(player);
  } catch (err) {
    next(err);
  }
};

export const getPlayerByNameHandler = async (req, res, next) => {
  try {
    const name = req.params.name;
    const player = await service.findPlayerByName(name);
    res.status(200).json(player);
  } catch (err) {
    next(err);
  }
};

export const searchPlayersByNameHandler = async (req, res, next) => {
  try {
    const name = req.params.name;
    const players = await service.searchPlayersByName(name);
    res.status(200).json(players);
  } catch (err) {
    next(err);
  }
};

export const getPlayersByTeamHandler = async (req, res, next) => {
  try {
    const teamName = req.params.teamName;
    const players = await service.getPlayersByTeam(teamName);
    res.status(200).json(players);
  } catch (err) {
    next(err);
  }
};

export const updatePlayerHandler = async (req, res, next) => {
  try {
    const id = Number(req.params.id);
    const updated = await service.updatePlayer(id, req.body);
    res.status(200).json(updated);
  } catch (err) {
    next(err);
  }
};

export const deletePlayerHandler = async (req, res, next) => {
  try {
    const id = Number(req.params.id);
    const deleted = await service.deletePlayer(id);
    res.status(200).json(deleted);
  } catch (err) {
    next(err);
  }
};
