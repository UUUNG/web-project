// routes/profile.js

const express = require('express');
const { User, Follow } = require('../models');

const router = express.Router();

router.get('/:userId', async (req, res) => {
  try {
    const userId = req.params.userId;
    console.log("userId in routes", userId)
    // 해당 유저 정보 가져오기
    const user = await User.findByPk(userId);

    // 팔로잉 정보 가져오기
    const following = await Follow.findAll({
      where: { followerId: userId },
      include: [{ model: User, as: 'Following' }],
    });

    console.log("folloing in profile route", following)

    // 팔로워 정보 가져오기
    const followers = await Follow.findAll({
      where: { followingId: userId },
      include: [{ model: User, as: 'Follower' }],
    });

    console.log("followers in profile route", followers)

    res.render('profile', { user, following, followers });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Internal server error' });
  }
});

module.exports = router;
