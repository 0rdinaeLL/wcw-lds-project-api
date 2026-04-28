import * as service from '../services/teamService.js';

export const createTeamHandler = async (req, res, next) => {
  try {
    const team = await service.createTeam(req.body);
    res.status(201).json(team);
  } catch (err) {
    next(err);
  }
};

export const getAllTeamsHandler = async (req, res, next) => {
  try {
    const teams = await service.getAllTeams();
    res.status(200).json(teams);
  } catch (err) {
    next(err);
  }
};

export const getTeamByIdHandler = async (req, res, next) => {
   try{
     const id = Number(req.params.id);
    const team = await service.getTeamById(id);
    res.status(200).json(team);
  } catch (err) {
    next(err);
  }
};

export const updateTeamHandler = async (req, res, next) => {
  try {
    const id = Number(req.params.id);
    const updatedTeam = await service.updateTeam(id, req.body);
    res.status(200).json(updatedTeam);
  } catch (err) {
    next(err);
  }
}

export const deleteTeamHandler = async (req, res, next) => {
  try {
    const id = Number(req.params.id);
    const team = await service.deleteTeam(id);
    res.status(200).json(team);
  } catch (err) {
    next(err);
  }
};

export const deleteTeamByNameHandler = async (req, res, next) => {
  try {
    const name = req.params.name;
    const team = await service.deleteTeamByName(name);
    res.status(200).json(team);
  } catch (err) {
    next(err);
  }
};