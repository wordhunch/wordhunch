select * from users
where username = ${newUsername} and user_id != ${user_id} or email = ${newEmail} and user_id != ${user_id}

