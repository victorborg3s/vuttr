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
	autoapprove
	) values (
	'oauth2-jwt-client',
	'resource-server-rest-api',
	'$2a$08$qvrzQZ7jJ7oy2p/msL4M0.l83Cd0jNsX6AJUitbgRXGzge4j035ha',
	'read',
	'password,authorization_code,refresh_token,client_credentials,implicit',
	'https://google.com',
	'USER',
	10800,
	2592000,
	null,
	null) ON CONFLICT DO NOTHING;
insert into authority(name) values ('ADMIN') ON CONFLICT DO NOTHING;
insert into principal(
	account_expired,
	account_locked,
	credentials_expired,
	enabled,
	password,
	user_name
	) values (
	false,
	false,
	false,
	true,
	'$2a$08$qvrzQZ7jJ7oy2p/msL4M0.l83Cd0jNsX6AJUitbgRXGzge4j035ha',
	'admin') ON CONFLICT DO NOTHING;
insert into user_authority(authority_id,user_id) values (1,1) ON CONFLICT DO NOTHING;