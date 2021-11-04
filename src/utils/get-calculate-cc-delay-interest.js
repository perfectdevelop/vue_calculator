/*
 * Hesapkurdu Arge
 */

// import axios from 'axios';

export const getCCDelayInterest = (data) => {
    //Api or dummy data should be provided,  please ask for if you don't have
    // let params = new FormData();
    // params.set('CreditCardLimit', data.limit);
    // params.set('PeriodDebt', data.loan);
    // params.set('PaidPeriodDebt', data.termDebtPaid);
    // params.set('HasCreditCardOverOneYear', data.question);

    // return axios({
    //     method: 'post',
    //     url: '/CalculationTools/CalculateCcDelayInterest',
    //     data: params
    // });

    return fetch("/api/users/")
    .then(response => {
        return {            
            status: 200,
            data: {
                Message: null,
                DelayInterest: -24.750000000000004,
                HasError: false,
                Message: null,
                MinimumPaymentAmount: 375,
                Success: true,
                Tax: -4.950000000000001,
                TotalPeriodDebt: -1279.7
            }
        }
    })

    
};
