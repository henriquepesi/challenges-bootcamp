import * as Yup from 'yup';
import User from '../models/User';

class UserController {
    async store(req, res) {
        // Validação
        const schema = Yup.object().shape({
            name: Yup.string().required(),
            email: Yup.string()
                .email()
                .required(),
            password: Yup.string()
                .required()
                .min(6)
        });

        if (!(await schema.isValid(req.body))) {
            return res.status(400).json({ error: 'Validation fails' });
        }

        // Selecionar campos que sejam necessários para o frontend
        const { id, name, email } = await User.create(req.body);

        return res.json({ id, name, email });
    }

    async update(req, res) {
        const { email, oldPassword } = req.body;

        const user = await User.findByPk(req.userId);

        if (email !== User.email) {
            // Verificar se já existe email que  usuário está tentando
            const userExists = await User.findOne({
                where: { email }
            });

            if (userExists) {
                return res.status(400).json({ error: 'user already exists' });
            }
        }

        if (oldPassword && !(await user.checkPassword(oldPassword))) {
            return res.status(401).json({ error: 'Password does not match' });
        }

        const { id, name } = await user.update(req.body);

        return res.json({ id, name, email });
    }
}

export default new UserController();
