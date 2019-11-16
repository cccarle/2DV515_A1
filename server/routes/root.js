const errors = require(`restify-errors`)
const helpers = require('../helpers/helpers')

module.exports = server => {
  server.get(`/`, async (req, res, next) => {
    try {
      res.json(200, {
        message: `API root`,
        links: [
          {
            rel: `Users`,
            href: `${helpers.getURL(req)}/users`,
            method: `GET`,
            desc: `Get all users`,
            params: `{}`,
            header: ``
          },
          {
            rel: `Recommendations by euclidean`,
            href: `${helpers.getURL(req)}/recommendations/euclidean`,
            method: `POST`,
            desc: `Get users similarity and recommending movies by euclidean`,
            params: `{UserID, numberOfResults}`,
            header: ``
          },
          {
            rel: `Recommendations by pearsons`,
            href: `${helpers.getURL(req)}/recommendations/pearsons`,
            method: `POST`,
            desc: `Get users similarity and recommending movies by pearson`,
            params: `{UserID, numberOfResults}`,
            header: ``
          }
        ]
      })
      next()
    } catch (err) {
      res.send(404, new errors.NotFoundError(err))
    }
  })
}
