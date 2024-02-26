
import userService from '../Service/userService';
// const connection = require('../Service/userService');



const handleHelloWord = (req, res) => {

    return res.render("Home.ejs")
}


const handleUserPage = async (req, res) => {

    // Cookies that have not been signed
    console.log('Cookies: ', req.cookies)
    res.cookie("test", "test cookie")
    // Cookies that have been signed
    console.log('Signed Cookies: ', req.signedCookies)
    let userList = await userService.getUserList();
    return res.render("user.ejs", { userList })
}


const handleCreateNewUser = async (req, res) => {
    let email = req.body.email;
    let password = req.body.password;
    let username = req.body.username;

    await userService.createNewUser(email, password, username)
    return res.redirect("/user");

}

const handleDeleteUser = async (req, res) => {
    // const id = req.user.id;
    await userService.deleteUser(req.params.id)
    //    res.render('delete.ejs',{userEdit : user})
    return res.redirect("/user");
}

const getUpdateUser = async (req, res) => {
    let id = req.params.id;
    let user = await userService.getUserById(id)
    res.render('update-user.ejs', { userEdit: user })


}

const postUpdateUser = async (req, res) => {
    let email = req.body.email;
    let username = req.body.username;
    let id = req.body.id;
    await userService.updateUser(email, username, id);

    res.redirect("/user");
}
module.exports = {
    handleHelloWord, handleUserPage, handleCreateNewUser, handleDeleteUser,
    getUpdateUser, postUpdateUser
}