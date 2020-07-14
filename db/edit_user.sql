update users
set username = $2,
profile_picture = $3,
email = $4
where user_id = $1
returning user_id;