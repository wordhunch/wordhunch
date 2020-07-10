insert into users (email, password, username, profile_picture)
values
($1, $2, $3, $4)
returning *;