import express from "express";


/**
 * 
 * @param{*} app - express app
 */


const configViewEngine = (app) =>{
    
    app.use(express.static('./src/Public'))
    app.set("view engine", "ejs");
    app.set("views", "./src/Views");
}

export default configViewEngine;