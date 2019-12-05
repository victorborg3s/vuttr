import jQuery from 'jquery';
import * as Config from '../configuration';

export function getToken(success, error) {
    jQuery.ajax({
        url: `${Config.AUTH_AUTHORIZATION_URL}?scope=read&response_type=token&client_id=oauth2-jwt-client`,
        type: 'POST',
        data: {
            response_type: 'token',
            client_id: 'oauth2-jwt-client',
            client_secret: 'admin1234'
        },
        dataType: "json",
        success,
        error
    });
}

export function authenticate(username, password, success, error) {
    getToken(
        (result, status, xhr) => {
            console.log(result);
            jQuery.ajax({
                url: Config.AUTH_TOKEN_URL,
                type: 'POST',
                data: {
                    grant_type: 'authorization_code',
                },
                beforeSend: function (xhr) {
                    xhr.setRequestHeader("Authorization", `Bearer ${result}`)
                },
                dataType: "json",
                success,
                error
            });
        },
        (xhr, status, error) => {
            console.log(xhr);
            console.log(status);
            console.log(error);
        }
    );

}