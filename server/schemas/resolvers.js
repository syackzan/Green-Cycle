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

    Mutation: {
        addCompany: async (parent, { companyName, address, city, state, zip, phoneNumber, email, password }) => {
            return await GeneralContractor.create({ companyName, address, city, state, zip, phoneNumber, email, password })
        },

        addProject: async(parent, { name, type, squareFootage, address, city, state, zip, owner }) => {
            return await Project.create({ name, type, squareFootage, address, city, state, zip, owner });
        },

        addItem: async (parent, { material, quantity, unit, notes, recycler}) => {
            return await Item.create({ material, quantity, unit, notes, recycler});
        },

        updateCompany: async (parent, { contractorId, companyName, address, city, state, zip, phoneNumber, email, password }) => {
            return await GeneralContractor.findOneAndUpdate(
                {_id: contractorId },
                { companyName, address, city, state, zip, phoneNumber, email, password },
                { new: true}
                );
        },

        updateProject: async (parent, { projectId, name, type, squareFootage, address, city, state, zip, owner }) => {
            return await Project.findOneAndUpdate(
                {_id: projectId },
                { name, type, squareFootage, address, city, state, zip, owner },
                { new: true}
                );
        },

        updateItem: async (parent, { itemId, material, quantity, unit, notes, recycler }) => {
            return await Item.findOneAndUpdate(
                {_id: itemId },
                { material, quantity, unit, notes, recycler },
                { new: true}
                );
        },
    }
}

module.exports = resolvers;