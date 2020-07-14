select * from word
where difficulty = $1
order by random()
limit 1;