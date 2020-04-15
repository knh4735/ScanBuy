// Types
const ADD_ITEM = "cart/ADD_ITEM";
const DELETE_ITEM = "cart/DELETE_ITEM";
const INCREASE_ITEM = "cart/INCREASE_ITEM";
const DECREASE_ITEM = "cart/DECREASE_ITEM";
const PAY = "cart/PAY";

// Actions
export const addItem = item => ({
  type: ADD_ITEM,
  payload: item
});

export const deleteItem = id => ({
  type: DELETE_ITEM,
  payload: id
});

export const increaseItem = id => ({
  type: INCREASE_ITEM,
  payload: id
});

export const decreaseItem = id => ({
  type: DECREASE_ITEM,
  payload: id
});

export const pay = date => ({
  type: PAY,
  payload: date
});

const initialState = {
  items: [],
  history: {
    date: "No Purchase History",
    items: []
  }
};

// Reducer
const view = (state = initialState, action) => {
  switch (action.type) {
    case ADD_ITEM:
      const newItem = action.payload;
      const itemIdx = state.items.findIndex(item => item.id === newItem.id);

      return {
        ...state,
        items:
          itemIdx === -1
            ? state.items.concat(newItem)
            : state.items.map(item => {
                if (item.id !== newItem.id) return item;
                else
                  return {
                    ...item,
                    amount: item.amount + newItem.amount
                  };
              })
      };
    case DELETE_ITEM:
      return {
        ...state,
        items: state.items.filter(item => item.id !== action.payload)
      };
    case INCREASE_ITEM:
      return {
        ...state,
        items: state.items.map(item =>
          item.id !== action.payload
            ? item
            : {
                ...item,
                amount: item.amount + 1
              }
        )
      };
    case DECREASE_ITEM:
      return {
        ...state,
        items: state.items.map(item =>
          item.id !== action.payload
            ? item
            : {
                ...item,
                amount: item.amount - 1
              }
        )
      };
    case PAY:
      return {
        ...state,
        items: [],
        history: {
          date: action.payload,
          items: state.items
        }
      };
    default:
      return state;
  }
};

export default view;
