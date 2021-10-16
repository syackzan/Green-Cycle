const db = require("../config/connection");
const { GeneralContractor, Project, Item } = require('../models');

//Seed Json Files below

db.once('once', async () => {
    //clean database
    await GeneralContractor.deleteMany();
    await Project.deleteMany();
    await Item.deleteMany();

    const contractors = await GeneralContractor.insertMany(gcData);
    const projects = await Project.insertMany(projectData);
    const item = await Item.insertMany(itemData);

    console.log("Complete!");
})