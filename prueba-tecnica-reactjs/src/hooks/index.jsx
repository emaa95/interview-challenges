import { useContext } from "react";
import { ShoppingCartContext } from "../Context";

export const useAccount = () => {
    const context = useContext(ShoppingCartContext)
    const accountFromStorage = localStorage.getItem('account');
    const parsedAccount = accountFromStorage ? JSON.parse(accountFromStorage) : null;

    const noAccountInLocalStorage = parsedAccount ? Object.keys(parsedAccount).length === 0 : true;
    const noAccountInLocalState = context.account ? Object.keys(context.account).length === 0 : true;
    const hasUserAnAccount = !noAccountInLocalStorage || !noAccountInLocalState

    return {
        account: parsedAccount,
        hasUserAnAccount,
    }
}