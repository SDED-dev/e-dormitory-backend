-- Active: 1681971464379@@dev.sded.cf@3306@e_dormitory

CREATE TABLE
    `orders` (
        `id` INT NOT NULL AUTO_INCREMENT,
        `user_id` INT NOT NULL,
        `first_name` VARCHAR(32) NOT NULL,
        `last_name` VARCHAR(32) NOT NULL,
        `sur_name` VARCHAR(32) NOT NULL,
        `faculty_id` INT NOT NULL,
        `course` VARCHAR(32) NOT NULL,
        `group` VARCHAR(32) NOT NULL,
        `dormitory_id` INT NOT NULL,
        `room_id` INT NOT NULL,
        `passport` VARCHAR(32) NOT NULL,
        `RNOCPP` VARCHAR(32) NOT NULL,
        `status` INT NOT NULL,
        `created_at` TIMESTAMP NOT NULL,
        `comment` VARCHAR(255) DEFAULT NULL,
        FOREIGN KEY (`user_id`) REFERENCES `users` (`id`) ON UPDATE CASCADE ON DELETE CASCADE,
        FOREIGN KEY (`faculty_id`) REFERENCES `faculties` (`id`) ON UPDATE CASCADE,
        FOREIGN KEY (`dormitory_id`) REFERENCES `dormitory` (`id`) ON UPDATE CASCADE,
		FOREIGN KEY (`room_id`) REFERENCES `rooms` (`id`) ON UPDATE CASCADE,
        FOREIGN KEY (`status`) REFERENCES `order_statuses` (`id`) ON UPDATE CASCADE,
        PRIMARY KEY (`id`)
    );