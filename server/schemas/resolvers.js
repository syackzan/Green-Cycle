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

        contractor: async (parent, { contractorId }) => {
            // Populate a single GC
            return await GeneralContractor.findById(contractorId).populate('projects').populate({
                path: 'projects',
                populate: 'recycleItems'
            })
        },

        projects: async () => {
            // Populate all Projects
            return await Project.find({}).populate('recycleItems');
        },

        project: async (parent, { projectId }) => {
            // Populate One Project
            return await Project.findById(projectId).populate('recycleItems')
        },

        items: async () => {
            // Populate all Recycled Items
            return await Item.find({}).populate('projects');
        },

        item: async (parent, { itemId }) => {
            // Populate one Item
            return await Item.findById(itemId)
        }
    },

    Mutations: {
        
    }
}

module.exports = resolvers;