const jwt = require("jsonwebtoken");
const SECRET_KEY = process.env.SECRET_KEY;
exports.auth = async (req, res, next) => {
  if (req.session.user) {
    const { accessToken } = req.session.user;
    if (accessToken) {
      const { _id, role } = jwt.verify(accessToken, SECRET_KEY);
      req.user = { _id, role };
      next();
    } else {
      // req.flash("error", "Login Required");
      if (req.xhr) {
        return res
          .status(401)
          .json({ status: "error", message: "Login Required" });
      } else {
        return res.redirect("/");
      }
    }
  } else {
    if (req.xhr) {
      return res
        .status(401)
        .json({ status: "error", message: "Login Required" });
    } else {
      return res.redirect("/login");
    }
  }
};

exports.isCustomer = async (req, res, next) => {
  if (req.user.role === "customer") {
    next();
  } else {
    // req.flash("error", "Login Required");
    if (req.xhr) {
      return res
        .status(401)
        .json({ status: "error", message: "Login Required" });
    } else {
      return res.redirect("/");
    }
  }
};
exports.isAdmin = async (req, res, next) => {
  if (req.user.role === "admin") {
    next();
  } else {
    // req.flash("error", "Login Required");
    if (req.xhr) {
      return res
        .status(401)
        .json({ status: "error", message: "Login Required" });
    } else {
      return res.redirect("/");
    }
  }
};
