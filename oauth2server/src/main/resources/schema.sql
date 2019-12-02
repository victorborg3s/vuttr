CREATE SEQUENCE IF NOT EXISTS authority_id_seq START 1;

CREATE TABLE IF NOT EXISTS authority (
    id integer DEFAULT nextval('authority_id_seq'),
    name varchar(20),
    CONSTRAINT authority_pkey PRIMARY KEY (id),
    CONSTRAINT authority_unique_name UNIQUE (name)
);

CREATE SEQUENCE IF NOT EXISTS oauth_access_token_id_seq START 1;

CREATE TABLE IF NOT EXISTS oauth_access_token (
    id integer DEFAULT nextval('oauth_access_token_id_seq'),
    authentication oid,
    authentication_id varchar(255),
    client_id varchar(255),
    refresh_token varchar(255),
    token oid,
    token_id varchar(255),
    user_name varchar(255),
    CONSTRAINT oauth_access_token_pkey PRIMARY KEY (id)
);

CREATE SEQUENCE IF NOT EXISTS oauth_client_details_id_seq START 1;

CREATE TABLE IF NOT EXISTS oauth_client_details (
    id integer DEFAULT nextval('oauth_client_details_id_seq'),
    access_token_validity integer,
    additional_information varchar(4096),
    authorities varchar(255),
    authorized_grant_types varchar(255),
    autoapprove smallint,
    client_id varchar(255),
    client_name varchar(255),
    client_secret varchar(255),
    created timestamp,
    enabled boolean DEFAULT true,
    refresh_token_validity integer,
    resource_ids varchar(255),
    scope varchar(255),
    uuid varchar(255),
    web_server_redirect_uri varchar(255),
    CONSTRAINT oauth_client_details_pkey PRIMARY KEY (id),
    CONSTRAINT uk_3my6lp6ttga6hhwtsutscqset UNIQUE (client_id)
);

CREATE SEQUENCE IF NOT EXISTS oauth_client_token_id_seq START 1;

CREATE TABLE IF NOT EXISTS oauth_client_token (
    id integer DEFAULT nextval('oauth_client_token_id_seq'),
    authentication_id varchar(255),
    client_id varchar(255),
    token oid,
    token_id varchar(255),
    user_name varchar(255),
    CONSTRAINT oauth_client_token_pkey PRIMARY KEY (id)
);

CREATE SEQUENCE IF NOT EXISTS oauth_code_id_seq START 1;

CREATE TABLE IF NOT EXISTS oauth_code (
    id integer DEFAULT nextval('oauth_code_id_seq'),
    authentication oid,
    code varchar(255),
    CONSTRAINT oauth_code_pkey PRIMARY KEY (id)
);

CREATE SEQUENCE IF NOT EXISTS oauth_refresh_token_id_seq START 1;

CREATE TABLE IF NOT EXISTS oauth_refresh_token (
    id integer DEFAULT nextval('oauth_refresh_token_id_seq'),
    authentication oid,
    token oid,
    token_id varchar(255),
    CONSTRAINT oauth_refresh_token_pkey PRIMARY KEY (id)
);

CREATE SEQUENCE IF NOT EXISTS principal_id_seq START 1;

CREATE TABLE IF NOT EXISTS principal (
    id integer DEFAULT nextval('principal_id_seq'),
    account_expired boolean,
    account_locked boolean,
    credentials_expired boolean,
    enabled boolean,
    password varchar(255),
    user_name varchar(50),
    CONSTRAINT principal_pkey PRIMARY KEY (id),
    CONSTRAINT user_unique_username UNIQUE (user_name)
);

CREATE SEQUENCE IF NOT EXISTS user_authority_id_seq START 1;

CREATE TABLE IF NOT EXISTS user_authority (
    id integer DEFAULT nextval('user_authority_id_seq'),
    authority_id integer,
    user_id integer,
    CONSTRAINT user_authority_pkey PRIMARY KEY (id),
    CONSTRAINT user_authority_unique_user_id_and_authority_id UNIQUE (user_id, authority_id),
    CONSTRAINT fk_user_authority_authority_id FOREIGN KEY (authority_id) REFERENCES authority(id) NOT DEFERRABLE,
    CONSTRAINT fk_user_authority_user_id FOREIGN KEY (user_id) REFERENCES principal(id) NOT DEFERRABLE
);

