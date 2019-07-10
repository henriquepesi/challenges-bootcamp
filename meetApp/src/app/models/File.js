import Sequelize, { Model } from 'sequelize';

class File extends Model {
    static init(sequelize) {
        super.init(
            {
                // Aqui sómente as colunas que serão definicas pelo usuário
                name: Sequelize.STRING,
                path: Sequelize.STRING
            },
            {
                // É importante passar o sequelize como segundo parametro do init
                sequelize
            }
        );

        return this;
    }
}

export default File;
