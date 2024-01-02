const searchProductController = () => {
  return {
    async searchProduct(req, res) {
      const { q } = req.query;
      return res.json({ msg: q });
    },
  };
};

module.exports = searchProductController;
