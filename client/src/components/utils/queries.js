import { gql } from '@apollo/client';

export const GET_ALL_CONTRACTORS = gql`
query GET_ALL_CONTRACTORS {
    contractors {
    _id
      companyName
      address
      city
      state
      zip
      phoneNumber
      email
      password
      projects {
        _id
        name
        type
        squareFootage
        address
        city
        state
        zip
        owner
        recycleItems {
          _id
          material
          date
          quantity
          unit
          notes
          recycler
        }
      }
      }
  }
`

export const GET_ALL_PROJECTS = gql`
query GET_ALL_PROJECTS {
    projects {
        _id
        name
        type
        squareFootage
        address
        city
        state
        zip
        owner
          recycleItems {
          _id
          material
          date
          quantity
          unit
          notes
          recycler
        }
    }
  }
`

export const GET_ALL_ITEMS = gql `
query GET_ALL_ITEMS {
    items {
      _id
      material
      date
      quantity
      unit
      notes
      recycler
    }
  }
`

export const GET_SINGLE_CONTRACTOR = gql `
query GET_SINGLE_CONTRACTOR($id: ID!) {
    contractor (contractorId: $id) {
      _id
      companyName
      address
      city
      state
      zip
      phoneNumber
      email
      password
      projects {
        _id
        name
        type
        squareFootage
        address
        city
        state
        zip
        owner
        recycleItems {
          _id
          material
          date
          quantity
          unit
          notes
          recycler
        }
      }
    }
  }
`

export const GET_SINGLE_PROJECT = gql`
query GET_SINGLE_PROJECT($id: ID!){
    project(projectId: $id){
        _id
        name
        type
        squareFootage
        address
        city
        state
        zip
        owner
          recycleItems {
          _id
          material
          date
          quantity
          unit
          notes
          recycler
        }
    }
  }
`

export const GET_SINGLE_ITEM = gql `
query GET_SINGLE_ITEM($id: ID!) {
    item(itemId: $id){
      _id
      material
      date
      quantity
      unit
      notes
      recycler
    }
  }
`
