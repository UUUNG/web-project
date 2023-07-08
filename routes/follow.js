const express = require('express');
const router = express.Router();
const { User } = require('../models');

router.post('/', async (req, res) => {
  try {
    const { userId, followingUserId } = req.body;
    console.log("userId, followingUserId :", userId, followingUserId)
    // 데이터베이스에서 현재 사용자와 팔로우 대상 사용자를 조회
    const currentUser = await User.findByPk(userId);
    const followingUser = await User.findByPk(followingUserId);

    // 현재 사용자가 이미 해당 사용자를 팔로우하고 있는지 확인
    const isFollowing = await currentUser.hasFollowing(followingUser);

    if (isFollowing) {
      // 이미 팔로우한 상태라면 언팔로우 처리
      await currentUser.removeFollowing(followingUser);
      res.status(200).json({ message: 'Unfollow successful' });
    } else {
      // 팔로우 처리
      await currentUser.addFollowing(followingUser);
      res.status(200).json({ message: 'Follow successful' });
    }
  } catch (error) {
    console.error('Failed to follow/unfollow:', error);
    res.status(500).json({ message: 'Failed to follow/unfollow' });
  }
});

router.get('/', async (req, res) => {
  try {
    const userId = req.session.userId; // 현재 사용자의 ID를 얻어온다.
    console.log("userId in /follw", userId)
    // 데이터베이스에서 현재 사용자를 조회하여 팔로잉 값 가져오기
    const user = await User.findByPk(userId);
    const followingCount = await user.countFollowings();

    res.status(200).json({ followingCount });
  } catch (error) {
    console.error('Failed to fetch following count:', error);
    res.status(500).json({ message: 'Failed to fetch following count' });
  }
});

module.exports = router;
