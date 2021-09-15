const utils = {
    pswRegexCheck: (password) => {
        if (/^(?=.*[\w])(?=.*[\W])[\w\W]{8,}$/.test(password)) {
            return true;
        }
        return false;
    },
    checkConfirmPasswordValidity: (password, confirmPassword) => {
        if (password !== undefined && confirmPassword !== undefined ) {
            return password === confirmPassword;
        }
    },

}
export default utils;