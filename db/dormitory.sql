CREATE TABLE
    `dormitory` (
        `id` int NOT NULL AUTO_INCREMENT,
        `number` varchar(32) DEFAULT NULL UNIQUE,
        `moderator_id` int DEFAULT NULL,
        `director` varchar(64) DEFAULT NULL,
        FOREIGN KEY (`moderator_id`) REFERENCES `users` (`id`) PRIMARY KEY (`id`)
    );

CREATE TABLE
    `faculties_dormitory` (
        `id` int NOT NULL AUTO_INCREMENT,
        `faculties_id` int NOT NULL,
        `dormitory_id` int NOT NULL,
        PRIMARY KEY (`id`),
        UNIQUE KEY `uc_roles` (
            `faculties_id`,
            `dormitory_id`
        ),
        KEY `dormitory_id` (`dormitory_id`),
        FOREIGN KEY (`faculties_id`) REFERENCES `faculties` (`id`),
        FOREIGN KEY (`dormitory_id`) REFERENCES `dormitory` (`id`)
    )