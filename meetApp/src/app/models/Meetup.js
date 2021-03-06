import Sequelize, { Model } from 'sequelize';

class Meetup extends Model {
    static init(sequelize) {
        super.init(
            {
                title: Sequelize.STRING,
                banner_id: Sequelize.NUMBER,
                description: Sequelize.STRING,
                location: Sequelize.STRING,
                date: Sequelize.DATE,
                canceled_at: Sequelize.DATE
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
        this.belongsTo(models.File, { foreignKey: 'banner_id', as: 'banner' });
    }
}

export default Meetup;
