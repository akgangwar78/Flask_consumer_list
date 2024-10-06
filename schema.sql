CREATE DATABASE consumerdb;

USE consumerdb;

CREATE TABLE consumers (
    id INT AUTO_INCREMENT PRIMARY KEY,
    name VARCHAR(255),
    email VARCHAR(255),
    phone VARCHAR(20)
);

INSERT INTO `consumers` (`id`, `name`, `email`, `phone`) VALUES
(2, 'Sumit Khanna', 'sumitk@gmail.com', '8597845216'),
(3, 'Sulbhi Verma', 'sulbhiverma@gmail.com', '8945763215'),
(4, 'Amit Singhal', 'amit.singhal@gmail.com', '8947563214'),
(5, 'Vipul Garg', 'vipulg@gmail.com', '8945863575'),
(6, 'Hemant Chauhan', 'hemchauhan@gmail.com', '8475689125'),
(7, 'Pawan Singh', 'pawan.singh@gmail.com', '9868574636'),
(8, 'Neha Bhargav', 'neha.bhargav@gmail.com', '9568356745');
