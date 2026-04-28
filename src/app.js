import express from 'express';
import morgan from 'morgan';
import cors from 'cors';
import authRoutes from './routes/authRoutes.js';
import teamRoutes from './routes/teamRoutes.js';
import playerRoutes from './routes/playerRoutes.js';
import matchRoutes from './routes/matchRoutes.js';
import goalRoutes from './routes/goalRoutes.js';
import betRoutes from './routes/betRoutes.js';
import userRoutes from "./routes/userRoutes.js";
import swaggerUi from 'swagger-ui-express';
import yaml from 'js-yaml';
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const app = express();

app.use(cors());
app.use(express.json());
if (process.env.NODE_ENV !== 'test') app.use(morgan('tiny'));

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Load OpenAPI YAML using absolute path (works on Render)
let specs;
try {
  const yamlPath = path.join(__dirname, '../docs/openapi.yaml');
  specs = yaml.load(fs.readFileSync(yamlPath, 'utf8'));
} catch (error) {
  console.log('Failed to load OpenAPI specification', error);
  process.exit(1);
}

// Routes
app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(specs));
app.use('/api/auth', authRoutes);
app.use('/api/teams', teamRoutes);
app.use('/api/players', playerRoutes);
app.use('/api/matches', matchRoutes);
app.use('/api/goals', goalRoutes);
app.use('/api/bets', betRoutes);
app.use('/api/users', userRoutes);
app.get('/health', (req, res) => {
  res.status(200).send('OK');
});

// Error handler
app.use((err, req, res, next) => {
  console.log(err.stack);
  if (!err.status) {
    err.status = 500;
    err.message = 'Internal Server Error';
  }
  res.status(err.status).json({ error: err.message });
});

export default app;
