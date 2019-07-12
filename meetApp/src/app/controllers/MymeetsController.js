import { startOfDay, endOfDay, parseISO } from 'date-fns';

import Meetup from '../models/Meetup';
import User from '../models/User';

class MymeetsController {
    async index(req, res) {
        const checkUserLoged = await User.findOne({
            where: { id: req.userId }
        });

        if (!checkUserLoged) {
            return res
                .status(401)
                .json({ error: 'you can not see those meetings' });
        }

        const { date } = req.query;

        const meetings = await Meetup.findAll({
            where: {
                user_id: req.userId
            }
        });

        return res.json(meetings);
    }
}

export default new MymeetsController();
