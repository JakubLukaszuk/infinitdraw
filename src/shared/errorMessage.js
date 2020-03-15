import * as ERROR_MESSAGE from '../constants/errorMessages';

export const getErrorMessageFromCode = (errCode) =>
{
    switch (errCode) {
        case "auth/email-already-in-use":
            return {message: ERROR_MESSAGE.EMAIL_EXIST};
        case "auth/invalid-email":
            return {message: ERROR_MESSAGE.INVALID_EMIAL};
        case "auth/operation-not-allowed":
            return {message: ERROR_MESSAGE.NOT_ALLOWED};
        case "auth/weak-password":
            return {message: ERROR_MESSAGE.TOO_WEEK_PASSWORD};
        case "auth/network-request-failed":
            return {message: ERROR_MESSAGE.NETWORK};
        case "auth/too-many-requests":
            return {message: ERROR_MESSAGE.TOO_MANY_REQUESTS};
        case "auth/user-disabled":
            return {message: ERROR_MESSAGE.USER_DISABLED};
        case "auth/user-not-found":
            return {message: ERROR_MESSAGE.USER_NOT_FOUND};
        default:
            return {message: ERROR_MESSAGE.UNKNOWN};
    }
}
