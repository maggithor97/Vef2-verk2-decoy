
export function formatDate(d) {
    const ye = new Intl.DateTimeFormat('en', { year: 'numeric' }).format(d);
    const mo = new Intl.DateTimeFormat('en', { month: '2-digit' }).format(d);
    const da = new Intl.DateTimeFormat('en', { day: '2-digit' }).format(d);
    return `${da}-${mo}-${ye}`;
}

/**
 * Tekur bara úr "-" sem er á réttum stað í streng
 * @param {Kennitala í streng} kt 
 */
export function formatKennitala(kt) {
    if (kt[6] === '-') {
        return (kt.substring(0, 6) + kt.substring(7, 11));
    }
    return kt;
}

/**
 * Fall sem sér um villumeðhöndlun í forminu. 
 * Fallið skilar fylki af villum.
 * @param {string} name Nafn sem var submittað
 * @param {string} kt kennitala sem var submittuð
 * @param {string} comment Athugasemd
 */
export function getError(name, kt, comment) {
    let errors = [];
    if (name.length < 1) {
        errors.push("Nafn má ekki vera tómt")
    } else if (name.length > 128) {
        errors.push("Nafn má að hámarki vera 128 stafir")
    }
    if (!allnumeric(kt) || kt.length != 10) {
        errors.push("Kennitala verður að vera á formi 000000-0000 eða 0000000000")
    } else if (kt.length === 0) {
        errors.push("Kennitala má ekki vera tóm")
    }
    if (comment.length > 400) {
        errors.push("Athugasemd má að hámarki vera 400 stafir")
    }
    return errors;
}

/**
 * Skoða hvort strengur inniheldur aðeins tölur.
 * @param {string} inputtxt stengur til að skoða
 */
function allnumeric(inputtxt) {
    var numbers = /^[0-9]+$/;
    if (inputtxt.match(numbers)) {
        return true;
    }
    else {
        return false;
    }
} 
