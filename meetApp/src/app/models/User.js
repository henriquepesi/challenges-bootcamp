import Sequelize, { Model } from 'sequelize';
import bcrypt from 'bcryptjs';

class User extends Model {
    static init(sequelize) {
        super.init(
            {
                // Aqui sómente as colunas que serão definicas pelo usuário
                name: Sequelize.STRING,
                email: Sequelize.STRING,
                password: Sequelize.VIRTUAL, // Virtual não existe na base de dados, só no código
                password_hash: Sequelize.STRING
            },
            {
                // É importante passar o sequelize como segundo parametro do init
                sequelize
            }
        );

        // Before save executa o código antes de santar
        this.addHook('beforeSave', async user => {
            if (user.password) {
                user.password_hash = await bcrypt.hash(user.password, 8);
            }
        });
        return this;
    }

    checkPassword(password) {
        return bcrypt.compare(password, this.password_hash);
    }
}

export default User;
