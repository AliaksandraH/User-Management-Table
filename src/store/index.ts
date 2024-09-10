import { createStore, Store, AnyAction } from "redux";
import reducer from "../reducers/index";
import { AppState } from "../reducers/types";

const store: Store<AppState, AnyAction> = createStore(
    reducer,
    (window as any).__REDUX_DEVTOOLS_EXTENSION__
        ? (window as any).__REDUX_DEVTOOLS_EXTENSION__()
        : (f: any) => f
);

export default store;
