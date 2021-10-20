const { gql } = require('apollo-server-express');

const typeDefs = gql`
    type GeneralContractor {
        _id: ID
        companyName: String
        address: String
        city: String
        state: String
        zip: String
        phoneNumber: String
        email: String
        password: String
        projects: [Project]
    }

    type Project {
        _id: ID
        name: String
        type: String
        squareFootage: Int
        address: String
        city: String
        state: String
        zip: String
        owner: String
        generalContractor: GeneralContractor
        recycleItems: [Item]
    }

    type Item {
        _id: ID
        material: String
        date: String
        quantity: String
        unit: String
        notes: String
        recycler: String
        projects: Project
    }

    type Auth {
        token: ID!
        contractor: GeneralContractor
    }

    type Query {
        contractors: [GeneralContractor]
        projects: [Project]
        items: [Item]
        contractor(contractorId: ID!): GeneralContractor
        project(projectId: ID!): Project
        item(itemId: ID!): Item
    }

    type Mutation {
        login(email: String!, password: String!): Auth
        addCompany(companyName: String!, address: String!, city: String!, state: String!, zip: String!, phoneNumber: String!, email: String!, password: String!): GeneralContractor
        addProject(name: String!, type: String!, squareFootage: Int!, address: String!, city: String!, state: String!, zip: String!, owner: String!): Project
        addItem(projectId: ID, material: String!, quantity: String!, unit: String!, notes: String!, recycler: String!): Item
        updateCompany(contractorId: ID!, companyName: String!, address: String!, city: String!, state: String!, zip: String!, phoneNumber: String!, email: String!, password: String!): GeneralContractor
        updateProject(projectId: ID!, name: String!, type: String!, squareFootage: Int!, address: String!, city: String!, state: String!, zip: String!, owner: String!): Project
        updateItem(itemId: ID!, material: String!, quantity: String!, unit: String!, notes: String!, recycler: String!): Item
    }
`;

module.exports = typeDefs;