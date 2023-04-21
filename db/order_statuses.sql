CREATE TABLE
    `order_statuses` (
        `id` int NOT NULL AUTO_INCREMENT,
        `name` varchar(32) DEFAULT NULL UNIQUE,
        PRIMARY KEY (`id`)
    );

INSERT INTO
    `order_statuses` (`name`)
VALUES ('У розгляді'), ('Підтверджено'), ('Відхилено'), ('На доопрацюванні'), ('Відкликано');