
const DiscussService = require( '../services/DiscussService');
const Util = require( '../utils/Utils');

const util = new Util();

class DiscussController {
  static async getAllDiscusss(req, res) {
    try {
      const allDiscusss = await DiscussService.getAllDiscusss();
      if (allDiscusss.length > 0) {
        util.setSuccess(200, 'Discusss retrieved', allDiscusss);
      } else {
        util.setSuccess(200, 'No Discuss found');
      }
      return util.send(res);
    } catch (error) {
      util.setError(400, error);
      return util.send(res);
    }
  }

  static async addDiscuss(req, res) {
    if (!req.body.body) {
      util.setError(400, 'Please provide complete details');
      return util.send(res);
    }
    const newDiscuss = req.body;
    try {
      const createdDiscuss = await DiscussService.addDiscuss(newDiscuss);
      util.setSuccess(201, 'Discuss Added!', createdDiscuss);
      return util.send(res);
    } catch (error) {
      util.setError(400, error.message);
      return util.send(res);
    }
  }

  static async updatedDiscuss(req, res) {
    const alteredDiscuss = req.body;
    const { id } = req.params;
    if (!Number(id)) {
      util.setError(400, 'Please input a valid numeric value');
      return util.send(res);
    }
    try {
      const updateDiscuss = await DiscussService.updateDiscuss(id, alteredDiscuss);
      if (!updateDiscuss) {
        util.setError(404, `Cannot find Discuss with the id: ${id}`);
      } else {
        util.setSuccess(200, 'Discuss updated', updateDiscuss);
      }
      return util.send(res);
    } catch (error) {
      util.setError(404, error);
      return util.send(res);
    }
  }

  static async getADiscuss(req, res) {
    const { id } = req.params;

    if (!Number(id)) {
      util.setError(400, 'Please input a valid numeric value');
      return util.send(res);
    }

    try {
      const theDiscuss = await DiscussService.getADiscuss(id);

      if (!theDiscuss) {
        util.setError(404, `Cannot find Discuss with the id ${id}`);
      } else {
        util.setSuccess(200, 'Found Discuss', theDiscuss);
      }
      return util.send(res);
    } catch (error) {
      util.setError(404, error);
      return util.send(res);
    }
  }

  static async deleteDiscuss(req, res) {
    const { id } = req.params;

    if (!Number(id)) {
      util.setError(400, 'Please provide a numeric value');
      return util.send(res);
    }

    try {
      const DiscussToDelete = await DiscussService.deleteDiscuss(id);

      if (DiscussToDelete) {
        util.setSuccess(200, 'Discuss deleted');
      } else {
        util.setError(404, `Discuss with the id ${id} cannot be found`);
      }
      return util.send(res);
    } catch (error) {
      util.setError(400, error);
      return util.send(res);
    }
  }
}

module.exports = DiscussController;