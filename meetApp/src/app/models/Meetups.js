import Sequelize, { Model } from 'sequelize';

class MeetUp extends Model {
    static init(sequelize) {
        super.init(
            {
                // Aqui sómente as colunas que serão definicas pelo usuário
                date: Sequelize.STRING,
                cancelet_at: Sequelize.STRING
            },
            {
                // É importante passar o sequelize como segundo parametro do init
                sequelize
            }
        );

        return this;
    }

    static associate(models) {
        this.BelongsTo(models.User, { ForeignKey: 'user_id', as: 'user' });
    }
}

export default MeetUp;
