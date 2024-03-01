CREATE ROLE docker LOGIN PASSWORD 'docker';
ALTER USER docker CREATEDB;
CREATE DATABASE intra;
GRANT ALL ON ALL TABLES IN SCHEMA public TO docker;
GRANT ALL PRIVILEGES ON DATABASE intra TO docker;
