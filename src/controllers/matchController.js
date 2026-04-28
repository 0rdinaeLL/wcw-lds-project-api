import * as service from '../services/matchService.js';

export const createMatchHandler = async (req, res, next) => {
  try {
    const match = await service.createMatch(req.body);
    res.status(201).json(match);
  } catch (err) {
    next(err);
  }
};

export const getAllMatchesHandler = async (req, res, next) => {
  try {
    const matches = await service.getAllMatches();
    res.status(200).json(matches);
  } catch (err) {
    next(err);
  }
};

export const getMatchByIdHandler = async (req, res, next) => {
  try {
    const id = Number(req.params.id);
    const match = await service.getMatchById(id);
    res.status(200).json(match);
  } catch (err) {
    next(err);
  }
};

export const updateMatchHandler = async (req, res, next) => {
  try {
    const id = Number(req.params.id);
    const updated = await service.updateMatch(id, req.body);
    res.status(200).json(updated);
  } catch (err) {
    next(err);
  }
};

export const deleteMatchHandler = async (req, res, next) => {
  try {
    const id = Number(req.params.id);
    const deleted = await service.deleteMatch(id);
    res.status(200).json(deleted);
  } catch (err) {
    next(err);
  }
};
