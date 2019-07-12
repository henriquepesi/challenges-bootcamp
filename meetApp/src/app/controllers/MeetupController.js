import * as Yup from 'yup';
import { subDays, isBefore } from 'date-fns';
import Meetup from '../models/Meetup';

class MeetupController {
    async store(req, res) {
        const schema = Yup.object().shape({
            title: Yup.string().required(),
            description: Yup.string().required(),
            location: Yup.string().required(),
            date: Yup.date().required()
        });

        if (!(await schema.isValid(req.body))) {
            return res
                .status(400)
                .json({ error: 'You need to fill all campus' });
        }

        const { title, description, location, date, canceled_at } = req.body;

        const meetup = await Meetup.create({
            user_id: req.userId,
            title,
            description,
            location,
            date,
            canceled_at
        });

        return res.json(meetup);
    }

    async delete(req, res) {
        const meeting = await Meetup.findByPk(req.params.id);

        if (meeting.user_id !== req.userId) {
            return res.status(401).json({
                error: "You don't have permission to cancel this meeting"
            });
        }

        const dateWithSub = subDays(meeting.date, 1);

        if (isBefore(dateWithSub, new Date())) {
            return res.status(401).json({
                error: 'You can only cancel meetings 1 day in advance'
            });
        }

        meeting.canceled_at = new Date();

        await meeting.destroy();

        return res.json(meeting);
    }
}

export default new MeetupController();
