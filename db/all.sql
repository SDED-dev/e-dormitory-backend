-- Active: 1683104989146@@dev.sded.cf@3306@e_dormitory3

DROP DATABASE IF EXISTS `e_dormitory3`;

CREATE DATABASE `e_dormitory3`;

USE `e_dormitory3`;

CREATE TABLE
    `users`(
        `id` INT NOT NULL AUTO_INCREMENT UNIQUE,
        `email` VARCHAR(64) not null unique,
        `phone` VARCHAR(64) not null unique,
        `password` varchar(64) not null,
        PRIMARY KEY (`id`)
    );

CREATE TABLE
    `roles` (
        `id` INT NOT NULL AUTO_INCREMENT UNIQUE,
        `name` varchar(32) DEFAULT NULL UNIQUE,
        PRIMARY KEY (`id`)
    );

INSERT INTO `roles` (`name`)
VALUES ('admin'), ('dean'), ('commandant'), ('user');

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
    );

CREATE TABLE
    `faculties` (
        `id` int NOT NULL AUTO_INCREMENT,
        `name` varchar(32) DEFAULT NULL UNIQUE,
        `available` BOOLEAN DEFAULT TRUE,
        PRIMARY KEY (`id`)
    );

CREATE TABLE
    `dormitories` (
        `id` int NOT NULL AUTO_INCREMENT,
        `number` varchar(32) DEFAULT NULL UNIQUE,
        `moderator_id` int DEFAULT NULL,
        `director` varchar(64) DEFAULT NULL,
        FOREIGN KEY (`moderator_id`) REFERENCES `users` (`id`),
        PRIMARY KEY (`id`)
    );

CREATE TABLE
    `faculties_dormitory` (
        `id` int NOT NULL AUTO_INCREMENT,
        `faculties_id` int NOT NULL,
        `dormitory_id` int NOT NULL,
        `awilable` BOOLEAN DEFAULT TRUE,
        PRIMARY KEY (`id`),
        UNIQUE KEY `uc_roles` (
            `faculties_id`,
            `dormitory_id`
        ),
        KEY `dormitory_id` (`dormitory_id`),
        FOREIGN KEY (`faculties_id`) REFERENCES `faculties` (`id`),
        FOREIGN KEY (`dormitory_id`) REFERENCES `dormitories` (`id`)
    );

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
        FOREIGN KEY (`dormitory_id`) REFERENCES `dormitories` (`id`)
    );

CREATE TABLE
    `order_statuses` (
        `id` int NOT NULL AUTO_INCREMENT,
        `name` varchar(32) DEFAULT NULL UNIQUE,
        PRIMARY KEY (`id`)
    );

INSERT INTO
    `order_statuses` (`name`)
VALUES ('У розгляді'), ('Підтверджено 2/2'), ('Відхилено'), ('На доопрацюванні'), ('Відкликано'), ('Підтвердженно 1/2');

CREATE TABLE
    `course` (
        `id` int NOT NULL AUTO_INCREMENT,
        `name` varchar(32) DEFAULT NULL UNIQUE,
        PRIMARY KEY (`id`)
    );

INSERT INTO `course` (`name`)
VALUES ('1'), ('2'), ('3'), ('4'), ('1ск'), ('2ск'), ('3ск'), ('М1'), ('М2');

CREATE TABLE
    `check_time` (
        `id` int NOT NULL AUTO_INCREMENT,
        `course_id` int NOT NULL,
        `in` DATE NOT NULL,
        `out` DATE NOT NULL,
        FOREIGN KEY (`course_id`) REFERENCES `course` (`id`) ON UPDATE CASCADE,
        PRIMARY KEY (`id`)
    );

CREATE TABLE
    `benefit` (
        `id` int NOT NULL AUTO_INCREMENT UNIQUE,
        `name` varchar(64) DEFAULT NULL UNIQUE,
        `discount` int DEFAULT NULL,
        `available` BOOLEAN DEFAULT TRUE,
        PRIMARY KEY (`id`)
    );

CREATE TABLE
    `orders` (
        `id` INT NOT NULL AUTO_INCREMENT,
        `user_id` INT NOT NULL,
        `first_name` VARCHAR(32) NOT NULL,
        `last_name` VARCHAR(32) NOT NULL,
        `sur_name` VARCHAR(32) NOT NULL,
        `gender` VARCHAR(32) NOT NULL,
        `faculty_id` INT NOT NULL,
        `course` VARCHAR(32) NOT NULL,
        `group` VARCHAR(32) NOT NULL,
        `dormitory_id` INT NOT NULL,
        `room_id` INT NOT NULL,
        `benefit_id` INT DEFAULT NULL,
        `passport` VARCHAR(32) NOT NULL,
        `RNTRC` VARCHAR(32) NOT NULL,
        `status` INT NOT NULL,
        `created_at` TIMESTAMP NOT NULL,
        `comment` VARCHAR(255) DEFAULT NULL,
        `check-in` DATE DEFAULT NULL,
        `check-out` DATE DEFAULT NULL,
        FOREIGN KEY (`user_id`) REFERENCES `users` (`id`) ON UPDATE CASCADE ON DELETE CASCADE,
        FOREIGN KEY (`faculty_id`) REFERENCES `faculties` (`id`) ON UPDATE CASCADE,
        FOREIGN KEY (`dormitory_id`) REFERENCES `dormitories` (`id`) ON UPDATE CASCADE,
        FOREIGN KEY (`room_id`) REFERENCES `rooms` (`id`) ON UPDATE CASCADE,
        FOREIGN KEY (`benefit_id`) REFERENCES `benefit` (`id`) ON UPDATE CASCADE,
        FOREIGN KEY (`status`) REFERENCES `order_statuses` (`id`) ON UPDATE CASCADE,
        PRIMARY KEY (`id`)
    );