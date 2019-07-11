import Sequelize from 'sequelize';

// Pega dados do usuario
import User from '../app/models/User';
import File from '../app/models/File';
import Meetup from '../app/models/Meetup';

import databaseConfig from '../config/database';

// Cria array dos models
const models = [User, File, Meetup];

class Database {
    constructor() {
        this.init();
    }

    // faz conexão com base de dados e carregas os models
    init() {
        this.connection = new Sequelize(databaseConfig);

        // Após fazer conexão com banco de dados, percorrer o array dos models
        models
            .map(model => model.init(this.connection))
            .map(
                model =>
                    model.associate && model.associate(this.connection.models)
            );
    }
}

export default new Database();
