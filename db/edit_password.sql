update users
set password = $2
where user_id = $1
returning user_id;