const { GeneralContractor, Project, Item } = require('../models');

const resolvers = {
    Query: {
        contractors: async () => {
            // Populate all GC's, there projects, and items
            return await GeneralContractor.find({}).populate('projects').populate({
                path: 'projects',
                populate: 'recycleItems'
            })
        },

        projects: async () => {
            // Populate all Projects
            return await Project.find({}).populate('recycleItems');
        },

        items: async () => {
            // Populate all Recycled Items
            return await Item.find({}).populate('projects');
        }
    }
}

module.exports = resolvers;