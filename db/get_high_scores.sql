select score
from game_history
where user_id = $1
order by score desc
limit 3;