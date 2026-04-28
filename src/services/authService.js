import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';

import {createUser, findUserByEmail} from '../repositories/userRepo.js';
//import {hash} from 'bcrypt';


export async function signUp(email, password) {
    const hashedPassword = await bcrypt.hash(password, 10);
    const newUser = await createUser({email, password: hashedPassword});
    return newUser;
}

export async function logIn(email, password) {
    const JWT_SECRET = process.env.JWT_SECRET || "defaultsecret";
    const JWT_EXPIRES_IN = process.env.JWT_EXPIRES_IN || "1h";
    const error = new Error ('Invalid credentials');
    error.status = 401;

    const user = await findUserByEmail(email);
    if (!user) throw error;

    const match = await bcrypt.compare(password, user.password);
    if(!match) throw error;

    const accessToken = jwt.sign({id: user.id, role: user.role}, JWT_SECRET, {expiresIn: JWT_EXPIRES_IN, 
    });

    return accessToken;
}