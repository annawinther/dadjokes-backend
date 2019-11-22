// Middleware function for validating the joke being added

function validateJoke(req, res, next) {
    let joke = req.body;
    if (!joke) {
      res.status(400).json({ message: "Joke data not found" });
    } else if (!joke.user_id) {
      res.status(400).json({ message: "Your user id is required" });
    } else if (!joke.setup) {
      res.status(400).json({ message: "Please provide a setup for the joke" });
    } else if (!joke.punchline) {
      res.status(400).json({ message: "Please provide a punchline for your joke" });
    } else if (!joke.public) {
      res.status(400).json({ message: "Please specify if the joke is public or not" });
    next();
    }
  }

  module.exports = validateJoke;