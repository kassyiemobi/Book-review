const  database = require( "../src/models/Discuss");

class DiscussService {
  static async getAllDiscuss() {
    try {
      return await database.Discuss.findAll();
    } catch (error) {
      throw error;
    }
  }

  static async addDiscuss(newDiscuss) {
    try {
      return await database.Discuss.create(newDiscuss);
    } catch (error) {
      throw error;
    }
  }

  static async updateDiscuss(id, updateDiscuss) {
    try {
      const DiscussToUpdate = await database.Discuss.findOne({
        where: { id: Number(id) },
      });

      if (DiscussToUpdate) {
        await database.Discuss.update(updateDiscuss, { where: { id: Number(id) } });

        return updateDiscuss;
      }
      return null;
    } catch (error) {
      throw error;
    }
  }

  static async getADiscuss(id) {
    try {
      const theDiscuss = await database.Discuss.findOne({
        where: { id: Number(id) },
      });

      return theDiscuss;
    } catch (error) {
      throw error;
    }
  }

  static async deleteDiscuss(id) {
    try {
      const DiscussToDelete = await database.Discuss.findOne({
        where: { id: Number(id) },
      });

      if (DiscussToDelete) {
        const deletedDiscuss = await database.Discuss.destroy({
          where: { id: Number(id) },
        });
        return deletedDiscuss;
      }
      return null;
    } catch (error) {
      throw error;
    }
  }
}

module.exports = DiscussService;
