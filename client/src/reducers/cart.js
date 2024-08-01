export const cartInitialState = JSON.parse(window.localStorage.getItem('cart')) || []

export const CART_ACTION_TYPES = {
    ADD_TO_CART: 'ADD_TO_CART',
    REMOVE_FROM_CART: 'REMOVE_FROM_CART',
    CLEAR_CART: 'CLEAR_CART',
    REMOVE_ONE_FROM_CART: 'REMOVE_ONE_FROM_CART'
  }

export const updateLocalStorage = state => {
    window.localStorage.setItem('cart', JSON.stringify(state))
}
export const cartReducer = (state, action) => {
    const { type: actionType, payload: actionPayload } = action
    switch (actionType) {

        case CART_ACTION_TYPES.ADD_TO_CART : {
            const { id } = actionPayload
            const productInCartIndex = state.findIndex(item =>item.id === id)

            if (productInCartIndex >= 0) {
                const newState = structuredClone(state)
                const newQuantity = state[productInCartIndex].quantity === state[productInCartIndex].available 
                ? state[productInCartIndex].quantity 
                : state[productInCartIndex].quantity + 1
                newState[productInCartIndex].quantity = newQuantity
                updateLocalStorage(newState)
                return newState
            }

            const newState = [
                ...state,
                {
                    ...actionPayload,
                    quantity: 1
                } 
            ]
            updateLocalStorage(newState)
            return newState
        }

        case CART_ACTION_TYPES.REMOVE_FROM_CART : {
            const { id } =  actionPayload
            const newState = state.filter(item =>item.id !== id)
            updateLocalStorage(newState)
            return newState
        }

        case CART_ACTION_TYPES.REMOVE_ONE_FROM_CART : {
            const { id } = actionPayload
            const productInCartIndex = state.findIndex(item =>item.id === id)

            if (productInCartIndex >= 0) {
                let newState = structuredClone(state)
                newState[productInCartIndex].quantity -= 1
                newState = newState[productInCartIndex].quantity == 0 ? state.filter(item =>item.id !== id) : newState
                updateLocalStorage(newState)
                return newState
            }
            updateLocalStorage(state)
            return state
        }

        case CART_ACTION_TYPES.CLEAR_CART: {
            const newState = []
            updateLocalStorage(newState)
            return newState
        }

    }
    return state
}