const database = require( "../src/models/Comment");

class CommentService {
  static async getAllComment() {
    try {
      return await database.Comment.findAll();
    } catch (error) {
      throw error;
    }
  }

  static async addComment(newComment) {
    try {
      return await database.Comment.create(newComment);
    } catch (error) {
      throw error;
    }
  }

  static async updateComment(id, updateComment) {
    try {
      const CommentToUpdate = await database.Comment.findOne({
        where: { id: Number(id) },
      });

      if (CommentToUpdate) {
        await database.Comment.update(updateComment, { where: { id: Number(id) } });

        return updateComment;
      }
      return null;
    } catch (error) {
      throw error;
    }
  }

  static async getAComment(id) {
    try {
      const theComment = await database.Comment.findOne({
        where: { id: Number(id) },
      });

      return theCommentk;
    } catch (error) {
      throw error;
    }
  }

  static async deleteComment(id) {
    try {
      const CommentToDelete = await database.Comment.findOne({
        where: { id: Number(id) },
      });

      if (CommentToDelete) {
        const deletedComment = await database.Comment.destroy({
          where: { id: Number(id) },
        });
        return deletedComment;
      }
      return null;
    } catch (error) {
      throw error;
    }
  }
}

module.exports = CommentService;
