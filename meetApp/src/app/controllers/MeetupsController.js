// import * as Yup from 'yup';
// import MeetUp from '../models/MeetUp';

class MeetupController {
    async store(req, res) {
        return res.json({ ok: true });
    }
}

export default new MeetupController();
