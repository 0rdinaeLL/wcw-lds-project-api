import * as service from '../services/goalService.js';

export const createGoalHandler = async (req, res, next) => {
  try {
    const goal = await service.createGoal(req.body);
    res.status(201).json(goal);
  } catch (err) {
    next(err);
  }
};

export const getAllGoalsHandler = async (req, res, next) => {
  try {
    const goals = await service.getAllGoals();
    res.status(200).json(goals);
  } catch (err) {
    next(err);
  }
};

export const getGoalByIdHandler = async (req, res, next) => {
  try {
    const id = Number(req.params.id);
    const goal = await service.getGoalById(id);
    res.status(200).json(goal);
  } catch (err) {
    next(err);
  }
};

export const getGoalsByPlayerNameHandler = async (req, res, next) => {
  try {
    const name = req.params.name;
    const goals = await service.getGoalsByPlayerName(name);
    res.status(200).json(goals);
  } catch (err) {
    next(err);
  }
};

export const updateGoalHandler = async (req, res, next) => {
  try {
    const id = Number(req.params.id);
    const updated = await service.updateGoal(id, req.body);
    res.status(200).json(updated);
  } catch (err) {
    next(err);
  }
};

export const deleteGoalHandler = async (req, res, next) => {
  try {
    const id = Number(req.params.id);
    const deleted = await service.deleteGoal(id);
    res.status(200).json(deleted);
  } catch (err) {
    next(err);
  }
};
