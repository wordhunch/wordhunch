
create table users (
user_id serial primary key,
email varChar(100),
username varChar(60),
password varChar(100),
profile_picture text
);

create table word (
word_id serial primary key,
word varChar(10),
difficulty integer
);

create table game (
game_id serial primary key,
user_id integer references users(user_id),
word_id integer references word(word_id),
difficulty_game integer,
create_on timestamp default now()
);

create table game_history (
history_id serial primary key,
user_id integer references users(user_id),
game_id integer references game(game_id),
score float
);