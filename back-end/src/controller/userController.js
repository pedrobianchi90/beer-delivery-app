const userService = require('../service/userService');

module.exports = {
  async login(req, res) {
    const { email, password } = req.body;

    const token = await userService.readOne(email, password);

    return res.status(200).json({ token });
  },

  async index(req, res) {
    console.log(req.user);

    const { id } = req.user;

    const users = await userService.readAll(id);

    return res.status(200).json(users);
  },

  async userRegister(req, res) {
    const { email, name, password } = req.body;

    const data = { email, name, password };

    const token = await userService.create(data);

    return res.status(201).json({ token });
  },

  async createUser(req, res) {
    const { name, email, password, role } = req.body;

    const data = { email, name, password, role };

    const user = await userService.createWithRole(data);

    return res.status(201).json(user);
  },

  async deleteUser(req, res) {
    const { id } = req.params;

    await userService.deleteUser(id);

    return res.sendStatus(204);
  },

  async getSellers(_req, res) {
    const users = await userService.findByRole('seller');

    return res.status(200).json(users);
  },
};
