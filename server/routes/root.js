const errors = require(`restify-errors`);

module.exports = server => {
  server.get(`/s`, async (req, res, next) => {
    try {
      res.send(200, {
        message: `API root`
      });
      next();
    } catch (err) {
      res.send(404, new errors.NotFoundError(err));
    }
  });
};
