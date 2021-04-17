const authController = require('../controllers/AuthController');
const database =  require ("../src/models/index.js");
const JWT = require ('jsonwebtoken');
const bcrypt = require('bcrypt');
const Util = require('./../utils/utils');

const util = new Util();




class AuthService {

  static async signUp(data) {
  console.log(database.User)
      try {
        
        //check if user exists
      let user = await database.Users.findOne({where:{ email: data.email }});
        if (user) return util.setError(400, "User already exists");

        //create new user

        const newUser = await database.Users.create(data);
        const token = JWT.sign({ id: newUser.id }, "JWT_SECRET");

        //save new user
        await newUser.save();
          const result = {
          userId: newUser.id,
          email: newUser.email,
          token: token,
        };
        return util.setSuccess(201, "User created", result);
      } catch (error) {
        console.log(error)
        return util.setError(400, "Something went wrong");
      }

  }

};

//   static async updateUser(id, updateUser) {
//     try {
//       const bookToUpdate = await database.User.findOne({
//         where: { id: Number(id) },
//       });

//       if (bookToUpdate) {
//         await database.User.update(updateUser, { where: { id: Number(id) } });

//         return updateUser;
//       }
//       return null;
//     } catch (error) {
//       throw error;
//     }
//   }

//   static async getAUser(id) {
//     try {
//       const theUser = await database.User.findOne({
//         where: { id: Number(id) },
//       });

//       return theUser;
//     } catch (error) {
//       throw error;
//     }
//   }

//   static async deleteUser(id) {
//     try {
//       const bookToDelete = await database.User.findOne({
//         where: { id: Number(id) },
//       });

//       if (bookToDelete) {
//         const deletedUser = await database.User.destroy({
//           where: { id: Number(id) },
//         });
//         return deletedUser;
//       }
//       return null;
//     } catch (error) {
//       throw error;
//     }
//   }
// }

 module.exports =AuthService;