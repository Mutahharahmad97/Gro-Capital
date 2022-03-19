import { apiVars } from 'config/env';
import axios from 'axios';

export function loanRequest(amount, target, purpose) {

    axios.post(apiVars.url + '/loan', {amount, target, purpose})
        .then(() => {
        },
        () => {
        });

}