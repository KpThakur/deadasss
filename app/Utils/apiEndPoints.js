export default {
    // Authentication
    GENERATE_TOKEN: '/api/tokenGenrate/jwtToken',
    USER_SIGN_UP: '/api/users/signup',
    USER_SIGN_IN: '/api/users/signin',
    USER_VERIFICATION: '/api/users/userverification',
    GET_USER_PROFILE: '/api/users/getProfile',
    FORGOT_PASSWORD: '/api/users/forgetPassword',
    OTP_CHECK: '/api/users/otpCheck',
    CHANGE_PASSWORD: '/api/users/changepassword',


    //Payment
    USER_RECEIVED_PAYMENT: '/api/payment/userReceivedPayment',
    CREATE_STRIPE_ACCOUNT: '/api/payment/createStripeAccount',

    //Challenge create
    CREATE_CHALLENGE: '/api/payment/createChallenge',
    CHECK_CHALLENGE: '/api/payment/checkChallenge',
    CANCEL_CHALLENGE: '/api/payment/cancelChallenge',
    USER_CHALLENGED_PAYMENT_LIST: '/api/payment/userChallengedPaymentList',

    //SettingApi
    UPDATE_PROFILE: '/api/users/updateProfile',
    UPDATE_PASSWORD: '/api/users/updatePassword',
    USER_CHALLENGE_LIST: '/api/payment/userChallengeList',
    USER_PAYMENT_DEATAILS: '/api/payment/updatePaymentDetails',
    CREATE_RATING: '/api/rate/createRating',
    ABOUT_US: '/api/about/aboutus',
    GET_ACCOUNT_DETAILS: 'api/payment/getAccountDetails',
    CONTACT_US: '/api/about/contact',
    USER_LOGOUT: '/api/users/userLogout',
    termAndConditionForApp: '/api/about/termAndConditionForApp',

    //Receiver end
    CHALLENGE_CODE_VERIFY: '/api/payment/challengeCodeVerify',
    PAYMENT_FOR_CHALLENGE: '/api/payment/paymentForChallenge',

    //Video calling
    CHECK_BUSY_CALL: '/api/videocall/checkBusyCall',
    VIDEO_CALLING: '/api/videocall/continueVideoCall',
    VIDEO_CALLING_STATUS: '/api/videocall/videocallStatus',
    GET_CALL_STATUS: '/api/videocall/getCallStatus',
    cheakCallStatus: '/api/videocall/cheakCallStatus',
    getwalletAmount: '/api/payment/getwalletAmount',
    getPaymentHistory: '/api/payment/getPaymentHistory',
    createStripeAccount: '/api/payment/createStripeAccount',
    withdrawWalletAmount: '/api/payment/withdrawWalletAmount',
    checkStripeAccountVerify: '/api/payment/checkStripeAccountVerify',
    createReport: '/api/rate/createReport',
    GET_STRIPE_KEY: "api/payment/getStipePublicKey",

    stripeTest: "api/videocall/createStripeAccount",





}
