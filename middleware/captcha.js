const axios = require("axios");

module.exports = (roles) => {
  return async (req, res, next) => {
    if (req.method === "OPTIONS") next();
    try {
      const url = "https://challenges.cloudflare.com/turnstile/v0/siteverify";

      const response = await axios.post(url, {
        secret: process.env.TURNSITE_SECRET,
        response: req.body.token,
      });

      if (response.data.success) return next();
      else res.status(404).json({ errors: [{ msg: "Капча не пройдена" }] });
    } catch (error) {
      console.log(error);
      res.status(501).json({ errors: [{ msg: "Капча не пройдена" }] });
    }
  };
};
