create table
    users(
        id int not null auto_increment unique,
        email varchar(64) not null unique,
        phone varchar(64) not null unique,
        password varchar(64) not null,
        PRIMARY KEY (`id`)
    );