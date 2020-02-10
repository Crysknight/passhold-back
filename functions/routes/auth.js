const router = require('express').Router();
const passport = require('passport');

const redirectScript = user => `
  <html>
    <body>
      <h1>Everything's ok</h1>
      <div>
        <h3>You are:</h3>
        <pre>${JSON.stringify(user, null, 4)}</pre>
      </div>
      <script>
        if (window.opener) {
          window.opener.postMessage(${JSON.stringify(user, null, 4)}, 'http://localhost:8080');

          setTimeout(() => {
            window.close();
          }, 1000);
        }
      </script>
    </body>
  </html>
`;

router.get('/google', passport.authenticate('google', {
  scope: ['email', 'profile']
}));

router.get('/google/redirect', passport.authenticate('google'), (req, res) => {
  res.send(redirectScript(req.user));
});

router.get('/linkedin', passport.authenticate('linkedin'));

router.get('/linkedin/redirect', passport.authenticate('linkedin'), (req, res) => {
  res.send(redirectScript(req.user));
});

module.exports = router;
