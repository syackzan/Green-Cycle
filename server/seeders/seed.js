const db = require("../config/connection");
const { GeneralContractor, Project, Item } = require('../models');

//Seed Json Files below
const gcData = require('./gcData.json');
const projectData = require('./projectData.json');
const itemData = require('./itemData.json');

db.once('open', async () => {
    //clean database
    await GeneralContractor.deleteMany();
    await Project.deleteMany();
    await Item.deleteMany();

    // bulk create each model
    const contractors = await GeneralContractor.create(gcData);
    const projects = await Project.insertMany(projectData);
    const items = await Item.insertMany(itemData);

    for (newProject of projects){ 
        for (newContractor of contractors) {
            if (newProject.city === newContractor.city){
                newContractor.projects.push(newProject._id);
                await newContractor.save()
            }
        }
    }

    for (newItem of items){
        const tempProject = projects[Math.floor(Math.random() * projects.length)];
        tempProject.recycleItems.push(newItem._id);
        await tempProject.save();
    }

    // console.log(contractors);

    console.log("Complete!");
    process.exit(0);
})