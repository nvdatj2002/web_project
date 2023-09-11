import { createSlice } from "@reduxjs/toolkit"

const initialValue = () => {
    const carts = JSON.parse(localStorage.getItem('carts'))
    if (carts == null) {
        return []
    }
    return carts
}

export default createSlice({
    name: 'cart',
    initialState: initialValue,
    reducers: {
        addToCart: (state, action) => {
            const exist = state.filter((cart) => cart.product.id === action.payload.product.id);
            console.log(exist)
            if (exist <= 0) {
                state.push(action.payload)
            } else {
                const itemCart = exist.find((cart) => cart.size === action.payload.size);
                console.log(itemCart)
                if (!itemCart) {
                    state.push(action.payload)
                } else {
                    const i = state.findIndex((cart) => cart.id === itemCart.id);
                    state[i].quantity = Number(action.payload.quantity) + Number(state[i].quantity)

                }
            }
            localStorage.setItem('carts', JSON.stringify(state))
        },
        updateToCart: (state, action) => {
            state[action.payload.index].quantity = action.payload.quantity
            localStorage.setItem('carts', JSON.stringify(state))

        },
        removeItemToCart: (state, action) => {
            console.log(action.payload)
            state.splice(action.payload, 1);
            localStorage.setItem('carts', JSON.stringify(state))
        }

    }
})


