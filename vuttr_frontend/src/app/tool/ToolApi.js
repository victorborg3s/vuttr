import jQuery from 'jquery';
import * as Config from '../../configuration';

const ENDPOINT = "tools";

//error(xhr,status,error)
//success(result,status,xhr)

export function list(query, skip, offset, success, error) {
    let queryParam = (query && query !== "") ? `tag=${query}&` : "";
    jQuery.ajax({
        url: `${Config.API_URL}/${ENDPOINT}?${queryParam}skip=${skip}&offset=${offset}`,
        dataType: "json",
        contentType: "application/json; charset=utf-8",
        type: 'GET',
        success,
        error
    });
}

export function create(entity, jwToken, success, error) {
    console.log(`${Config.API_URL}/${ENDPOINT}`);
    jQuery.ajax({
        url: `${Config.API_URL}/${ENDPOINT}`,
        dataType: "json",
        contentType: "application/json; charset=utf-8",
        type: 'POST',
        headers: {
            authorization: `Bearer ${jwToken}`
        },
        data: JSON.stringify(entity),
        success,
        error
    });
}

export function remove(entity, jwToken, success, error) {
    jQuery.ajax({
        url: `${Config.API_URL}/${ENDPOINT}/${entity.id}`,
        dataType: "json",
        contentType: "application/json; charset=utf-8",
        type: 'DELETE',
        headers: {
            authorization: `Bearer ${jwToken}`
        },
        success,
        error
    });
}
