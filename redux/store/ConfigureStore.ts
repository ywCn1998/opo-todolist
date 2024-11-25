import { combineReducers } from "@reduxjs/toolkit";
import { documentDirectory, EncodingType } from "expo-file-system";
import { createExpoFileSystemStorage } from "redux-persist-expo-file-system-storage";
import autoMergeLevel2 from "redux-persist/lib/stateReconciler/autoMergeLevel2";

import TaskReducer from "./tasks";
import { persistReducer } from "redux-persist";



export const expoFileSystemStorage = createExpoFileSystemStorage({
    storagePath: `${documentDirectory}customPathName/`,
    encoding: EncodingType.UTF8,
    debug: true,
});
const persist = (key: any, reducer: any) =>
    persistReducer(
        {
            key,
            storage: expoFileSystemStorage,
            stateReconciler: autoMergeLevel2,
        },
        reducer
    );

const combinePersistReducers = (keys: any) =>
    Object.keys(keys).reduce(
        (obj, key) => ({
            ...obj,
            [key]: persist(key, keys[key]),
        }),
        {}
    );

const reducers = combineReducers({
    ...combinePersistReducers({
        task: TaskReducer,
    }),
});

export default reducers;
