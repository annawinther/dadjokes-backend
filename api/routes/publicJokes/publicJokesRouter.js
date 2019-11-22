const router = require("express").Router();
const PJokes = require('../../models/publicJokesModel');

router.get('/', (req, res) => {
  PJokes.getPublicJokes()
     .then(jokes => {
         res.status(200).json(jokes);
     })
     .catch(error => {
        res.status(500).json({
            error: error.message
          });
     })
    //   const page = req.query.page ? parseInt(req.query.page) : 1;
    //   const startIndex = (page - 1) * 5;
    //   const endIndex = page * 5;
    //   const results = {};
  
    //   const paginated_results = paginateJokes(
    //     jokes,
    //     results,
    //     page,
    //     endIndex,
    //     startIndex
    //   );
    // } catch (error) {
    //   res.status(500).json({
    //     error: error.message
    //   });
    // }
  });

  module.exports = router;