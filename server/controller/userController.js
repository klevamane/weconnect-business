import users from '../model/userModel';
/**
     * @class usercontroller
     * @classdesc creates a usercontroller class with methods
     */
class usercontroller {
  /**
     * Register a new user on the platform
     * @static
     * @description create a new user
     * @param  {object} req gets values passed to the api
     * @param  {object} res sends result as output
     * @returns {object} Success message with the user created or error message
     * @memberOf
     */
  static createUser(req, res) {
    const newuser = {
      id: users.length + 1,
      email: req.body.email,
      firstname: req.body.firstname,
      lastname: req.body.lastname,
      createdAt: Date.now(),
      updatedAt: Date.now()
    };
    users.push(newuser);
    const position = users.length - 1;
    const registerdUser = users[position];
    return res.status(200).json({
      message: 'user has been registerd',
      registerdUser
    });
  }
  /**
     * @static
     * @description A registered user will be authenticated to gain access to the application
     * @param  {object} req gets values passed to the api
     * @param  {object} res sends result as output
     * @returns {object} 202 status code and valid user message is returned if successful 
     * @memberOf
     */
  static userLogin(req, res) {
    const verifyEmail = req.body.email;
    const verifyPassword = req.body.password;
    for (let i = 0; i < users.length; i += 1) {
      if (users[i].password === verifyPassword && users[i].email === verifyEmail) {
        return res.status(202).json({
          message: 'Valid user'
        });
      }
    }
    return res.status(401).json({
      message: 'Wrong login credentials',
    });
  }
}
export default usercontroller;
