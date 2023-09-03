router.get('/data', verifyToken, (req, res) => {
  return res.json(req.user);
});

router.get('/verify', (req, res) => {
  jwt.verify(req.params.token, process.env.SECRET_KEY, async (err, decoded) => {
    if (err) {
      return res.json({ msg: 'Link expired', success: false });
    }
    const id = decoded.id;
    await User.findByIdAndUpdate(id, { verified: true });
    return res.json[{ msg: 'Account verified successfully.', success: true }];
  });
});

module.export = router;
