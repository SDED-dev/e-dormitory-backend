CREATE TABLE
    `rooms` (
        `id` int NOT NULL AUTO_INCREMENT,
        `faculties_id` int NOT NULL,
        `dormitory_id` int NOT NULL,
        `number` varchar(32) DEFAULT NULL UNIQUE,
        `capacity` int DEFAULT NULL,
        `capacity_available` int DEFAULT NULL,
        PRIMARY KEY (`id`),
        FOREIGN KEY (`faculties_id`) REFERENCES `faculties` (`id`),
        FOREIGN KEY (`dormitory_id`) REFERENCES `dormitory` (`id`)
    )