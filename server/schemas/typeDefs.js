const { gql } = require('apollo-server-express');

const typeDefs = gql`
    type GeneralContractor {
        _id: ID
        companyName: String
        address: String
        city: String
        state: String
        zip: Int
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
        zip: Int
        owner: String
        generalContractor: GeneralContractor
        recycleItems: [Item]
    }

    type Item {
        _id: ID
        material: String
        date: String
        quantity: Int
        unit: String
        notes: String
        recycler: String
        projects: Project
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
        addItem(material: String!, quantity: Int!, unit: String!, notes: String!, recycler: String!): Item
    }
`;

module.exports = typeDefs;