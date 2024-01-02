const dayjs = require("dayjs");
const bcrypt = require("bcryptjs");
const registerModel = require("../../db/models/registerSchema");
const userController = () => {
  return {
    async getUser(req, res) {
      try {
        const userData = await registerModel.find();
        return res.render("user", { userData, dayjs });
      } catch (err) {
        return res.json({
          status: 400,
          message: err.message,
        });
      }
    },
    async getUpdateUser(req, res) {
      const { id } = req.params;
      try {
        const userData = await registerModel.findOne({ _id: id });
        return res.render("edituser", { userData });
      } catch (err) {
        return res.json({
          status: 400,
          message: err.message,
        });
      }
    },
    async updateUser(req, res) {
      const { id } = req.params;
      const { name, email, password } = req.body;
      try {
        await registerModel.updateOne(
          { _id: id },
          {
            name,
            email,
          }
        );
        if (req.file) {
          await registerModel.updateOne(
            { _id: id },
            {
              profile: req.file.filename,
            }
          );
        }
        if (req.user.role === "admin") {
          return res.status(302).redirect("/user");
        } else {
          return res.status(302).redirect("/");
        }
        // }
      } catch (err) {
        return res.json({
          status: 400,
          message: err.message,
        });
      }
    },
    async deleteUser(req, res) {
      const { id } = req.params;
      try {
        await registerModel.deleteOne({ _id: id });
        return res.status(200).json({
          status: 200,
          message: "User deleted successfully",
        });
      } catch (err) {
        return res.json({
          status: 400,
          message: err.message,
        });
      }
    },
  };
};

module.exports = userController;
