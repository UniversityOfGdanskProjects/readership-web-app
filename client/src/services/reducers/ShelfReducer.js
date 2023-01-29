import {
    ADD_SHELF,
    DELETE_SHELF,
    UPDATE_SHELF,
    GET_ALL_SHELF
  } from '../actions/ShelfActions';

const initialState = []

// SHELFS:
// [{
//     user_id : id,
//     shelfs: {
//         read: [books..],
//         ...
//     }
// }]

export const ShelfReducer = (state=initialState, action) => {
    switch (action.type) {
        case ADD_SHELF:
            console.log('ACTION: ', action.type);
            // action.paylood = {
            //     user_id: currentUserID,
            //     newShelfName: "newShelfName"
            // }
            const addShelfState = state.map(UIDAndShelfs => {
                console.log("UIDSHELF", UIDAndShelfs)
                if (UIDAndShelfs.user_id === action.payload.user_id ) {
                    console.log("USER:", UIDAndShelfs)
                    if (UIDAndShelfs.shelfs[action.payload.newShelfName] === undefined) {
                        console.log("NEW SHLEF:", UIDAndShelfs)
                        return {...UIDAndShelfs, shelfs: {...UIDAndShelfs['shelfs'], [action.payload.newShelfName]: []}}
                    } else {
                        console.log("Shelf exists")
                        return UIDAndShelfs
                    }
                } 
                return UIDAndShelfs
            })
            console.log(action.payload, "Added new Shelf", addShelfState)
            return addShelfState
        case DELETE_SHELF:
            console.log('ACTION: ', action.type);
            // action.paylood = {
            //     user_id: currentUserID,
            //     delShelfName: "delShelfName"
            // }
            const delShelfState = state.map(UIDAndShelfs => {
                if (UIDAndShelfs.user_id === action.payload.user_id ) {
                    if (UIDAndShelfs.shelfs[action.payload.delShelfName] !== undefined 
                        && action.payload.delShelfName !== 'read') {
                        delete UIDAndShelfs.shelfs[action.payload.delShelfName]
                        console.log("After deleted shelf", UIDAndShelfs);
                    } else {
                        console.log("Shelf does't exists or is 'read'")
                    }
                } 
                return UIDAndShelfs
            })
            return delShelfState
        case UPDATE_SHELF:
            console.log('ACTION: ', action.type);
            // action.paylood = {
            //     user_id: currentUserID,
            //     shelfToUpDate: {
            //             shelfName: [books]
            //      }
            // }
            console.log("UPDATE_SHELF - state before:", state);
            const updateShelfState = state.map(UIDAndShelfs => {
                if (UIDAndShelfs.user_id === action.payload.user_id ) {
                    const updatedShelf = {...UIDAndShelfs.shelfs, ...action.payload.shelfToUpDate}
                    console.log("Changed shelf: ", updatedShelf)
                    return {...UIDAndShelfs, shelfs: updatedShelf}
                } 
                return UIDAndShelfs
            })
            console.log("UPDATE_SHELL - state after:", updateShelfState);
            return updateShelfState
            

            
        case GET_ALL_SHELF:
            console.log('ACTION: ', action.type);
            return [...action.payload]

        default:
            return state
    }
};