import { gql } from '@apollo/client';

export const LOGIN_USER = gql`
  mutation login($email: String!, $password: String!) {
    login(email: $email, password: $password) {
      token
      contractor {
        _id
        companyName
      }
    }
  }
`;

export const ADD_COMPANY = gql `
mutation ADD_COMPANY ($companyName: String!, $address: String!, $city: String!, $state: String!, $zip: String!, $phoneNumber: String!, $email: String!, $password: String!){
  addCompany(companyName: $companyName, address: $address, city: $city, state: $state, zip: $zip, phoneNumber: $phoneNumber, email: $email, password: $password){
    companyName
    address
    city
    state
    zip
    phoneNumber
    email
    password
  }
}`

export const ADD_PROJECT = gql `
mutation ADD_PROJECT ($name: String!, $type: String!, $squareFootage: Int!, $address: String!, $city: String!, $state: String!, $zip: String!, $owner: String!) {
  addProject (name: $name, type: $type, squareFootage: $squareFootage, address: $address, city: $city, state: $state, zip: $zip, owner: $owner ) {
    name
    type
    squareFootage
    address
    city
    state
    zip
    owner
  }
}
`

export const ADD_ITEM = gql `
mutation ADD_ITEM ($id: ID, $material: String!, $quantity: Int!, $unit: String!, $notes: String!, $recycler: String!){
  addItem(projectId: $id, material: $material, quantity: $quantity, unit: $unit, notes: $notes, recycler: $recycler){
    material
    date
    quantity
    unit
    notes
    recycler
  }
}`

export const UPDATE_ITEM = gql `
mutation UPDATE_ITEM ($id: ID!, $material: String!, $quantity: Int!, $unit: String!, $notes: String!, $recycler: String!){
  updateItem(itemId: $id, material: $material, quantity: $quantity, unit: $unit, notes: $notes, recycler: $recycler){
    material
    date
    quantity
    unit
    notes
    recycler
  }
}
`

export const REMOVE_ITEM = gql `
mutation REMOVE_ITEM($id: ID!) {
  deleteItem(itemId: $id){
    material
  }
}`