import jwt from 'jsonwebtoken';

// Biblioteca padrão do node
// Pega função callback e nela pode utilizar async await
import { promisify } from 'util';

import authConfig from '../../config/auth';

export default async (req, res, next) => {
    const authHeader = req.headers.authorization;

    if (!authHeader) {
        return res.status(401).json({ error: 'Token not Provided' });
    }

    // usando a desestruturação dessa forma, descarta a primeira posição do array. a palabra 'bearer'
    const [, token] = authHeader.split(' ');

    // Utilizar try catch porque pode retirnar erro

    try {
        const decoded = await promisify(jwt.verify)(token, authConfig.secret);

        req.userId = decoded.id;

        return next();
    } catch (err) {
        return res.status(401).json({ error: 'Token Invalid' });
    }
};
