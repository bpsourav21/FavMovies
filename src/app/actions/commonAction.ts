import { AppDispatch } from "../store";
import { AlertAction, LoadingAction } from "./actionTypes";

export const onHandleAlert = (msg: string, isSuccess: boolean = true) => {
    return (dispatch: AppDispatch) => {
        dispatch({
            type: isSuccess ? AlertAction.SUCCESS : AlertAction.FAILED,
            payload: msg
        });
        setTimeout(() => {
            dispatch({ type: AlertAction.NONE });
        }, 3000)
    };
};

export const showLoader = (isLoading: boolean) => {
    return (dispatch: AppDispatch) => {
        dispatch({
            type: LoadingAction.LOADING,
            payload: isLoading
        })
    };
};