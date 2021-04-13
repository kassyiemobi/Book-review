const authController = require('../controllers/AuthController');
const database =  require ("../src/models/index.js");
const JWT = require ('jsonwebtoken');
const bcrypt = require('bcrypt');


class AuthService {

  static async signUp(data) {
      //check if user exists
    let user =  await database.User.findOne({ email: data.email});

    if (user) throw error( "Email already exists");

    console.log("@@@@@@@@@@@@",Object.keys(database))
    
    //create new user

    const newUser = await database.User.create(data)
    const token = JWT.sign ({ id: user._id}, JWT_SECRET);

    //save new user
    await newUser.save();

    return (data = {
        userId : user._id,
        email: user.email,
        token: token
    });

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