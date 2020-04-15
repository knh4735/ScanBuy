// Types
const TOGGLE_CAMERA = "view/TOGGLE_CAMERA";
const ITEM_DETECTED = "view/ITEM_DETECTED";
const CANCEL_DETECTED = "view/CANCEL_DETECTED";
const RESIZE = "view/RESIZE";

// Actions
export const toggleCamera = () => ({
  type: TOGGLE_CAMERA
});

export const itemDetected = item => ({
  type: ITEM_DETECTED,
  payload: item
});

export const cancelDetected = () => ({
  type: CANCEL_DETECTED
});

export const resize = (width, height) => ({
  type: RESIZE,
  payload: {
    width,
    height
  }
});

const initialState = {
  isCameraOn: false,
  detectedItem: false,
  width: window.innerWidth,
  height: window.innerHeight
};

// Reducer
const view = (state = initialState, action) => {
  switch (action.type) {
    case TOGGLE_CAMERA:
      return {
        ...state,
        isCameraOn: !state.isCameraOn
      };
    case ITEM_DETECTED:
      return {
        ...state,
        detectedItem: action.payload,
        isCameraOn: false
      };
    case CANCEL_DETECTED:
      return {
        ...state,
        detectedItem: false
      };
    case RESIZE:
      return {
        ...state,
        width: action.payload.width,
        height: action.payload.height
      };
    default:
      return state;
  }
};

export default view;
