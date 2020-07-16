select g.score, u.username, u.profile_picture, g.history_id
from game_history g
join users u on g.user_id = u.user_id
order by score desc
limit 10;