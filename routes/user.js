const express = require('express');
const { User } = require('../models');

const router = express.Router();

router.get('/:id', async (req, res) => {
  const userId = req.params.id;

  try {
    console.log("userId: ", userId);
    const user = await User.findByPk(userId);
    //const followings = await user.getFollowings();
    //console.log("followings: ",followings);
    const followersCount = await user.getFollowerCount();
    const followingCount = await user.getFollowingCount();
    console.log("followingsCount", followersCount);
    res.json({
      nick: user.nick,
      email: user.email,
      snsId: user.snsId,
      followersCount: followersCount,
      followingCount: followingCount
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Internal server error' });
  }
});


module.exports = router;
