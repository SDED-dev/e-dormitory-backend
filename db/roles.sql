CREATE TABLE
    `roles` (
        `id` int NOT NULL AUTO_INCREMENT,
        `name` varchar(32) DEFAULT NULL UNIQUE,
        PRIMARY KEY (`id`)
    );

INSERT INTO `roles` (`name`)
VALUES ('admin'), ('moderator'), ('user');

CREATE TABLE
    `user_roles` (
        `id` int NOT NULL AUTO_INCREMENT,
        `user_id` int NOT NULL,
        `role_id` int NOT NULL,
        PRIMARY KEY (`id`),
        UNIQUE KEY `uc_roles` (`user_id`, `role_id`),
        KEY `role_id` (`role_id`),
        FOREIGN KEY (`user_id`) REFERENCES `users` (`id`) ON UPDATE CASCADE ON DELETE CASCADE,
        FOREIGN KEY (`role_id`) REFERENCES `roles` (`id`) ON UPDATE CASCADE
    )