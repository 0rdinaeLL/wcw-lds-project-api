import * as service from '../services/betService.js';

export const createBetHandler = async (req, res, next) => {
  try {
    const bet = await service.createBet(req.body, req.user);
    res.status(201).json(bet);
  } catch (err) {
    next(err);
  }
};

export const getAllBetsHandler = async (req, res, next) => {
  try {
    const bets = await service.getAllBets();
    res.status(200).json(bets);
  } catch (err) {
    next(err);
  }
};

export const getBetByIdHandler = async (req, res, next) => {
  try {
    const id = Number(req.params.id);
    const bet = await service.getBetById(id);
    res.status(200).json(bet);
  } catch (err) {
    next(err);
  }
};

export const deleteBetHandler = async (req, res, next) => {
  try {
    const id = Number(req.params.id);
    const deleted = await service.deleteBet(id);
    res.status(200).json(deleted);
  } catch (err) {
    next(err);
  }
};
