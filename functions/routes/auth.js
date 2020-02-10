const router = require('express').Router();
const passport = require('passport');

router.get('/google', passport.authenticate('google', {
  scope: ['email', 'profile']
}));

router.get('/google/redirect', passport.authenticate('google'), (req, res) => {
  res.send(`
    <script>
      if (window.opener) {
        window.opener.postMessage(${JSON.stringify(req.user, null, 4)}, 'http://localhost:8080');
      }

      setTimeout(() => {
        window.close();
      }, 1000);
    </script>
  `)
});

module.exports = router;
