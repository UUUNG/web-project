const Sequelize = require('sequelize');

class Post extends Sequelize.Model {
  static init(sequelize) {
    const postAttr = {
      content: {
        type: Sequelize.STRING(140),
        allowNull: false,
      },
    };

    const postTbl = {
      sequelize,
      timestamps: true,
      underscored: false,
      modelName: 'Post',
      tableName: 'posts',
      paranoid: false,
      charset: 'utf8mb4',
      collate: 'utf8mb4_general_ci',
    };

    return super.init(postAttr, postTbl);
  }

  static associate(db) {
    db.Post.belongsTo(db.User);
  }
}

module.exports = Post;
