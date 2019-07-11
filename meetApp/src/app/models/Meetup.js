import Sequelize, { Model } from 'sequelize';

class Meetup extends Model {
    static init(sequelize) {
        super.init(
            {
                title: Sequelize.STRING,
                description: Sequelize.STRING,
                location: Sequelize.STRING,
                date: Sequelize.DATE
            },
            {
                sequelize
            }
        );

        return this;
    }

    static associate(models) {
        // Quando o model tem tuas vezes relacionamento com outro, tem que usar um novo nome com 'as'
        this.belongsTo(models.User, { foreignKey: 'user_id', as: 'user' });
        this.belongsTo(models.User, {
            foreignKey: 'provider_id',
            as: 'provider'
        });
    }
}

export default Meetup;
