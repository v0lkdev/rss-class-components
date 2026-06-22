'use client';

import { Provider } from "react-redux";
import { store } from "../../store";
import App from "./App";


export default function({ page }: { page: string }) {
    return (
        <Provider store={store}>
            <App page={page} />
        </Provider>
    )
}