const { User } = require("../models");
const imagekit = require('../config/imagekitConfig')

module.exports = {
  getAllUsers: async (req, res) => {
    try {
      const users = await User.findAll();

      if (users.length === 0) {
        return res
          .status(404)
          .json({ message: "Tidak ada pengguna ditemukan" });
      }
      res.json(users);
    } catch (error) {
      res
        .status(500)
        .json({ message: "Terjadi kesalahan saat mengambil data pengguna" });
    }
  },
  getUserById: async (req, res) => {
    const userId = parseInt(req.params.id);
    try {
      const user = await User.findByPk(userId);

      if (!user) {
        return res.status(404).json({ message: "Pengguna tidak ditemukan" });
      }

      res.json(user);
    } catch (error) {
      res
        .status(500)
        .json({ message: "Terjadi kesalahan saat mengambil data pengguna" });
    }
  },
  editUserById: async (req, res) => {
    try {
      const userId = parseInt(req.params.id);
      const { name, email, address, password, phone, role, about, skill } = req.body;
      // const profil = req.file ? req.file.buffer : undefined;
  
      const existingUser = await User.findByPk(userId);
  
      if (!existingUser) {
        return res.status(404).json({
          message: `Pengguna dengan ID ${userId} tidak ditemukan.`,
        });
      }
  
      // Upload gambar ke ImageKit
      const uploadResponse = await imagekit.upload({
        file: req.file.buffer,
        fileName: `${Date.now()}-${req.file.originalname}`,
      });
  
      const profil = uploadResponse.url;
  
      // Update pengguna dengan URL gambar ImageKit
      const updatedUser = await User.update(
        {
          profil: profil || existingUser.profil,
          name: name || existingUser.name,
          email: email || existingUser.email,
          address: address || existingUser.address,
          password: password || existingUser.password,
          phone: phone || existingUser.phone,
          role: role || existingUser.role,
          about: about || existingUser.about,
          skill: skill || existingUser.skill,
        },
        {
          where: { id: userId },
        }
      );
  
      res.status(200).json({
        message: `Pengguna dengan ID ${userId} berhasil diperbarui.`,
        data: updatedUser,
      });
    } catch (error) {
      res.status(500).json({ message: "Terjadi kesalahan saat mengambil data pengguna", error });
    }


    // try {
    //   const user = await User.findByPk(userId);

    //   if (!user) {
    //     return res.status(404).json({ message: "Pengguna tidak ditemukan" });
    //   }
    //   if (req.file) {
    //     user.profil = req.file.filename;
    //   } else {
    //     user.profil = req.body.profil || user.profil;
    //   }
    //   user.name = name || user.name;
    //   user.email = email || user.email;
    //   user.address = address || user.address;
    //   user.password = password || user.password;
    //   user.phone = phone || user.phone;
    //   user.role = role || user.role;
    //   user.about = about || user.about;
    //   user.skill = skill || user.skill;

    //   await user.save();

    //   res.json(user);
    // } catch (error) {
    //   res
    //     .status(500)
    //     .json({ message: "Terjadi kesalahan saat mengambil data pengguna" });
    // }
  },

  deleteUserById: async (req, res) => {
    const userId = parseInt(req.params.id);

    try {
      const user = await User.findByPk(userId);

      if (!user) {
        return res.status(404).json({ message: "Pengguna tidak ditemukan" });
      }

      await user.destroy();

      res.json({ message: "Pengguna berhasil dihapus" });
    } catch (error) {
      res
        .status(500)
        .json({ message: "Terjadi kesalahan saat menghapus pengguna" });
    }
  },
};
