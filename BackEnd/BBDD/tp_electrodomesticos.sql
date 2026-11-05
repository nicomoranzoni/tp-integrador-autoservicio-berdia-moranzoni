-- phpMyAdmin SQL Dump
-- version 5.1.1deb5ubuntu1
-- https://www.phpmyadmin.net/
--
-- Servidor: localhost:3306
-- Tiempo de generación: 24-06-2026 a las 11:07:32
-- Versión del servidor: 8.0.46-0ubuntu0.22.04.3
-- Versión de PHP: 8.1.2-1ubuntu2.24

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Base de datos: `tp_electrodomesticos`
--

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `products`
--

CREATE TABLE `products` (
  `id` int NOT NULL ,
  `name` varchar(100) NOT NULL,
  `image` varchar(255) NOT NULL,
  `category` enum('tablet','celular') NOT NULL,
  `price` decimal(10,2) NOT NULL,
  `active` tinyint(1) NOT NULL DEFAULT '1'
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Volcado de datos para la tabla `products`
--
INSERT INTO `products` (`id`, `name`, `image`, `category`, `price`, `active`) VALUES
(1, 'Tablet TCL Tab 10L 4 GB 128 GB', 'https://images.fravega.com/f500/98c25fd83cf727c1c23044c7171c0016.jpg', 'tablet', 349999, 1),
(2, 'Tablet Edna Studio Pro 10 Negra 128GB', 'https://images.fravega.com/f500/ea0f2e9bcb232403b3d96803556bd758.jpg', 'tablet', 249999, 1),
(3, 'Tablet Lenovo K11 2.5K 11 256GB 8GB RAM 5G Android 15 con Teclado y Lapiz', 'https://www.necxus.com.ar/products_image106/43976/1000x1000_1.jpg', 'tablet', 1121350, 1),
(4, 'Tablet Xiaomi Redmi Pad 2 8GB 256GB 11 2k Hyperos 2 Menta Lavanda', 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcT21Zan5KkvflTuUv9s9DeTxZ7feprHKRypbT3hF41wOg&s=10', 'tablet', 569999, 1),
(5, 'Tablet TCL Tab A1 Plus 6 GB 128 GB', 'https://http2.mlstatic.com/D_NQ_NP_711265-MLA111187064923_052026-O.webp', 'tablet', 499999, 1),
(6, 'Tablet Samsung Galaxy Tab A11 8.7 4GB Ram 64GB 90hz Android 15 Gris Oscuro', 'https://statics.avenida.com/avenida/products/photos/b7/2fc/f11d87b2fc1ff64214dfb70bdda9022f_l.png', 'tablet', 307200, 1),
(7, 'Tablet Philco 10 64GB 6GB RAM', 'https://www.necxus.com.ar/products_image106/41138/1000x1000_1.jpg', 'tablet', 209999, 1),
(8, 'Tablet Lenovo Tab One 8.7 4GB 64GB', 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSjufDOzs0bhLA_MJrrJjRf5BtwKw_GVHw96XIKesIXSg&s=10', 'tablet', 289999, 1),
(9, 'Tablet Lenovo Tab Plus 11.5 8 GB 256GB', 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSKCvwsAqz2lEzM_dYDADoX_0V7dSMha9Hnfqf2O_mBHk4mmbqh8jZ29FgN&s=10', 'tablet', 600000, 1),
(10, 'Tablet Amazon Kids Fire HD 10 Azul 32GB', 'https://m.media-amazon.com/images/I/61ugA0LAAjL._AC_UL450_SY450_QL70_.jpg', 'tablet', 250000, 1),
(11, 'Apple iPhone 17 Sage 12 RAM 256GB', 'https://via.placeholder.com/150', 'celular', 200000, 1),
(12, 'Apple iPhone 16 Negro 8 RAM 128GB', 'https://via.placeholder.com/150', 'celular', 170000, 1),
(13, 'Samsung Galaxy A57 Awesome Lilac 8 RAM 256GB', 'https://via.placeholder.com/150', 'celular', 90000, 1),
(14, 'Samsung Galaxy S25 FE Navy 12 RAM 256GB', 'https://via.placeholder.com/150', 'celular', 180000, 1),
(15, 'Xiaomi Redmi Note 15 Pro Glacier Blue 8 RAM 256GB', 'https://via.placeholder.com/150', 'celular', 80000, 1),
(16, 'Xiaomi Poco X8 Pro Negro 8 RAM 256GB', 'https://via.placeholder.com/150', 'celular', 60000, 1),
(17, 'Motorola Moto G86 Power Cereza 8 RAM 256GB', 'https://via.placeholder.com/150', 'celular', 85000, 1),
(18, 'Motorola Edge 70 Fusion Sporting Green 8 RAM 256GB', 'https://via.placeholder.com/150', 'celular', 90000, 1),
(19, 'Google Pixel 9 Obsidian 12 RAM 128GB', 'https://via.placeholder.com/150', 'celular', 60000, 1),
(20, 'Google Pixel 8 Rosa 8 RAM 128GB', 'https://via.placeholder.com/150', 'celular', 87000, 1);
-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `product_sales`
--

CREATE TABLE `product_sales` (
  `product_id` int NOT NULL,
  `sale_id` int NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Volcado de datos para la tabla `product_sales`
--




-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `sales`
--

CREATE TABLE `sales` (
  `id` int NOT NULL,
  `date` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP,
  `total_price` decimal(10,2) NOT NULL,
  `user_name` varchar(240) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Volcado de datos para la tabla `sales`
--



-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `users`
--

CREATE TABLE `users` (
  `id` int NOT NULL,
  `name` varchar(100) NOT NULL,
  `email` varchar(100) NOT NULL,
  `password` varchar(255) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Volcado de datos para la tabla `users`
--

INSERT INTO `users` (`id`, `name`, `email`, `password`) VALUES
(1,'nicolas','nicomoranzoni@test.com','test'),
(2,'santiago', 'santiago@test.com','test'),
(7, 'test', 'test@test.com', 'test');


--
-- Índices para tablas volcadas
--

--
-- Indices de la tabla `products`
--
ALTER TABLE `products`
  ADD PRIMARY KEY (`id`);

--
-- Indices de la tabla `product_sales`
--
ALTER TABLE `product_sales`
  ADD KEY `product_id` (`product_id`,`sale_id`),
  ADD KEY `sale_id` (`sale_id`);

--
-- Indices de la tabla `sales`
--
ALTER TABLE `sales`
  ADD PRIMARY KEY (`id`);

--
-- Indices de la tabla `users`
--
ALTER TABLE `users`
  ADD PRIMARY KEY (`id`);

--
-- AUTO_INCREMENT de las tablas volcadas
--

--
-- AUTO_INCREMENT de la tabla `products`
--
ALTER TABLE `products`
  MODIFY `id` int NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=82;

--
-- AUTO_INCREMENT de la tabla `sales`
--
ALTER TABLE `sales`
  MODIFY `id` int NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=6;

--
-- AUTO_INCREMENT de la tabla `users`
--
ALTER TABLE `users`
  MODIFY `id` int NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=15;

--
-- Restricciones para tablas volcadas
--

--
-- Filtros para la tabla `product_sales`
--
ALTER TABLE `product_sales`
  ADD CONSTRAINT `product_sales_ibfk_1` FOREIGN KEY (`product_id`) REFERENCES `products` (`id`) ON DELETE CASCADE ON UPDATE CASCADE,
  ADD CONSTRAINT `product_sales_ibfk_2` FOREIGN KEY (`sale_id`) REFERENCES `sales` (`id`) ON DELETE CASCADE ON UPDATE CASCADE;
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
