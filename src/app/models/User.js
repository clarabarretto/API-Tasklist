import Sequelize, {Model} from "sequelize";
import bcrypt from 'bcryptjs';


class User extends Model{
    static init(sequelize){ // parametro sequelize = conexão com o banco
        super.init(
            {
                name: Sequelize.STRING,
                email: Sequelize.STRING,
                password: Sequelize.VIRTUAL,
                password_hash: Sequelize.STRING
            },
            {
                sequelize,
            }
        )
        this.addHook('beforeSave', async (user) => {
            if(user.password){        //senha que quer criptografar | força criptografia
                user.password_hash = await bcrypt.hash(user.password, 8)
            }
        })

        return this
    }
    checkPasswod(password){
        return bcrypt.compare(password, this.password_hash);
    }
}

export default User