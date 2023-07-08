const Sequelize = require('sequelize');

class Follow extends Sequelize.Model {
  static init(sequelize) {
    const followAttr = {
      followerId: {
        type: Sequelize.INTEGER,
        allowNull: false,
      },
      followingId: {
        type: Sequelize.INTEGER,
        allowNull: false,
      },
    };

    const followTbl = {
      sequelize,
      timestamps: true,
      underscored: false,
      modelName: 'Follow',
      tableName: 'follows',
      paranoid: false,
      charset: 'utf8mb4',
      collate: 'utf8mb4_general_ci',
    };

    return super.init(followAttr, followTbl);
  }

  static associate(db) {
    db.Follow.belongsTo(db.User, { foreignKey: 'followerId', as: 'Follower' });
    db.Follow.belongsTo(db.User, { foreignKey: 'followingId', as: 'Following' });
  }

  static async findAllFollows() {
    try {
      const follows = await this.findAll();
      return follows;
    } catch (error) {
      throw new Error('Failed to fetch follows');
    }
  }
}

module.exports = Follow;
