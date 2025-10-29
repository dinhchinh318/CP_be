const User = require('../models/User');
const Result = require('../models/Result');

// GET /api/result/check - Kiểm tra dữ liệu
exports.checkData = async (req, res) => {
  try {
    const userCount = await User.countDocuments();
    const resultCount = await Result.countDocuments();
    
    const users = await User.find().limit(3);
    const results = await Result.find().limit(3);
    
    res.json({
      userCount,
      resultCount,
      sampleUsers: users,
      sampleResults: results,
      info: "Kiểm tra xem có bao nhiêu users và results"
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// GET /api/result/all - Lấy tất cả kết quả với populate
exports.getAll = async (req, res) => {
  try {
    const results = await Result.find()
      .populate('userId', 'name email')
      .sort({ createdAt: -1 });
    
    console.log('Total results found:', results.length); // Log để debug
    
    res.json({ 
      success: true, 
      count: results.length,
      data: results 
    });
  } catch (error) {
    console.error('Error in /all:', error);
    res.status(500).json({ message: error.message });
  }
};

// GET /api/result/all-users - Lấy tất cả user kèm kết quả
exports.getAllUsers = async (req, res) => {
  try {
    // Cách 1: Dùng aggregate (kiểm tra tên collection)
    const usersWithResults = await User.aggregate([
      {
        $lookup: {
          from: 'results',
          localField: '_id',
          foreignField: 'userId',
          as: 'results'
        }
      },
      {
        $project: {
          name: 1,
          email: 1,
          role: 1,
          createdAt: 1,
          results: 1,
          resultCount: { $size: '$results' }
        }
      },
      {
        $sort: { name: 1 }
      }
    ]);
    
    res.json({ 
      success: true, 
      count: usersWithResults.length,
      data: usersWithResults 
    });
  } catch (error) {
    console.error('Error in /all-users:', error);
    res.status(500).json({ message: error.message });
  }
};

// GET /api/result/all-users-v2 - Cách 2: Dùng Promise.all (chắc chắn hơn)
exports.getAllUsersV2 = async (req, res) => {
  try {
    const users = await User.find().sort({ name: 1 });
    
    const usersWithResults = await Promise.all(
      users.map(async (user) => {
        const results = await Result.find({ userId: user._id })
          .sort({ createdAt: -1 });
        
        return {
          _id: user._id,
          name: user.name,
          email: user.email,
          role: user.role,
          createdAt: user.createdAt,
          resultCount: results.length,
          results: results
        };
      })
    );
    
    res.json({ 
      success: true, 
      count: usersWithResults.length,
      data: usersWithResults 
    });
  } catch (error) {
    console.error('Error in /all-users-v2:', error);
    res.status(500).json({ message: error.message });
  }
};

const mongoose = require('mongoose');

// Thêm vào resultRoutes.js
exports.rawCheck = async (req, res) => {
  try {
    const db = mongoose.connection.db;
    
    // Đếm trực tiếp từ collection
    const userCount = await db.collection('users').countDocuments();
    const resultCount = await db.collection('results').countDocuments();
    
    // Lấy mẫu
    const users = await db.collection('users').find().limit(3).toArray();
    const results = await db.collection('results').find().limit(3).toArray();
    
    res.json({
      userCount,
      resultCount,
      sampleUsers: users,
      sampleResults: results
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};