create database messages_demo;
use messages_demo;

create table messages (
	id int primary key auto_increment,
    message nvarchar(2000) not null
);

insert into messages (message) values
('Hello'),
('World!'),
('This is another message!');

create USER 'message_demo_read'@'%' IDENTIFIED WITH mysql_native_password BY 'message_demo_read';
GRANT ALL PRIVILEGES ON messages_demo.* TO 'message_demo_read'@'%';
flush privileges;
