select * from users
where username = $1 or email = $1;