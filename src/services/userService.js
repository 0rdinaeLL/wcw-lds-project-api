import bcrypt from 'bcryptjs';
import * as userRepo from '../repositories/userRepo.js';

export async function getAllUsers() {
  return userRepo.findAllUsers();
}

export async function getUserById(id) {
  const user = await userRepo.findUserById(id);
  if (!user) throw new Error("User not found");
  return user;
}

export async function createUser({ email, password, role }) {
  const existing = await userRepo.findUserByEmail(email);
  if (existing) throw new Error("Email already registered");

  const hashed = await bcrypt.hash(password, 10);

  return userRepo.createUser({
    email,
    password: hashed,
    role
  });
}

export async function updateUser(id, data) {
  if (data.password) {
    data.password = await bcrypt.hash(data.password, 10);
  }
  return userRepo.updateUser(id, data);
}

export async function deleteUser(id) {
  return userRepo.deleteUser(id);
}
