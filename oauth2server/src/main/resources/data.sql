insert into oauth_client_details(
	client_id,
	resource_ids,
	client_secret,
	scope,
	authorized_grant_types,
	web_server_redirect_uri,
	authorities,
	access_token_validity,
	refresh_token_validity,
	additional_information,
	autoapprove) 
select * from (
	select 'vuttr-web', 'vuttr-rest-api', '$2a$08$qvrzQZ7jJ7oy2p/msL4M0.l83Cd0jNsX6AJUitbgRXGzge4j035ha',
		'vuttr_tool_write', 'password,authorization_code,refresh_token,client_credentials,implicit', 
		'http://0.0.0.0:8080/oauth_callback', 'USER', 10800, 2592000, '{}', 0) x 
	where not exists(select * from oauth_client_details);

insert into authority(name) select * from (
	select 'ADMIN') x WHERE NOT EXISTS (select * from authority);

insert into principal(
	account_expired,
	account_locked,
	credentials_expired,
	enabled,
	password,
	user_name) 
select * from (select false, false, false, true, '$2a$08$qvrzQZ7jJ7oy2p/msL4M0.l83Cd0jNsX6AJUitbgRXGzge4j035ha', 'admin') x 
	where not exists(select * from principal);

insert into user_authority(authority_id,user_id) 
	select * from (select 1, 1) x 
	WHERE NOT EXISTS (select * from user_authority);

