import jQuery from 'jquery';
import * as Config from '../configuration';

export function authenticate(username, password, success, error) {
    jQuery.ajax({
        url: `${Config.AUTH_AUTHORIZATION_URL}`,
        //dataType: "json",
        contentType: "application/json; charset=utf-8",
        type: 'POST',
        data: JSON.stringify({
            username,
            password
        }),
        success,
        error
    });
}