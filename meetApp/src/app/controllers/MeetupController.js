import * as Yup from 'yup';
import { subDays, isBefore, startOfHour, parseISO } from 'date-fns';
import Meetup from '../models/Meetup';

class MeetupController {
    async store(req, res) {
        const schema = Yup.object().shape({
            title: Yup.string().required(),
            description: Yup.string().required(),
            location: Yup.string().required(),
            date: Yup.date().required()
        });

        const { title, description, location, date, canceled_at } = req.body;

        if (!(await schema.isValid(req.body))) {
            return res
                .status(400)
                .json({ error: 'You need to fill all campus' });
        }

        const hourStart = startOfHour(parseISO(date));

        if (isBefore(hourStart, new Date())) {
            return res.status(400).json({ error: 'Invalid Date' });
        }

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

        await meeting.destroy()();

        return res.json(meeting);
    }

    async update(req, res) {
        const schema = Yup.object().shape({
            title: Yup.string(),
            file_id: Yup.number(),
            description: Yup.string(),
            location: Yup.string(),
            date: Yup.date()
        });

        if (!(await schema.isValid(req.body))) {
            return res.status(400).json({ error: 'Validation fails' });
        }

        const user_id = req.userId;

        const meetup = await Meetup.findByPk(req.params.id);

        if (meetup.user_id !== user_id) {
            return res.status(401).json({ error: 'Not authorized.' });
        }

        if (isBefore(parseISO(req.body.date), new Date())) {
            return res.status(400).json({ error: 'Meetup date invalid' });
        }

        if (meetup.past) {
            return res
                .status(400)
                .json({ error: "Can't update past meetups." });
        }

        const { title, description, location, date } = await meetup.update(
            req.body
        );

        return res.json({ title, description, location, date });
    }
}

export default new MeetupController();
