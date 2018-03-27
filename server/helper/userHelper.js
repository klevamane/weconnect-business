export const userDetails = (req, res) => {
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
};

export const usertd = (req, res) => {
    //
};