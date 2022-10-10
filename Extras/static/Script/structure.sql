-- MySQL Workbench Forward Engineering

SET @OLD_UNIQUE_CHECKS=@@UNIQUE_CHECKS, UNIQUE_CHECKS=0;
SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0;
SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='ONLY_FULL_GROUP_BY,STRICT_TRANS_TABLES,NO_ZERO_IN_DATE,NO_ZERO_DATE,ERROR_FOR_DIVISION_BY_ZERO,NO_ENGINE_SUBSTITUTION';

-- -----------------------------------------------------
-- Schema wonder_nails
-- -----------------------------------------------------

-- -----------------------------------------------------
-- Schema wonder_nails
-- -----------------------------------------------------
CREATE SCHEMA IF NOT EXISTS `wonder_nails` DEFAULT CHARACTER SET utf8 ;
USE `wonder_nails` ;

-- -----------------------------------------------------
-- Table `wonder_nails`.`Categorias`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `wonder_nails`.`Categorias` (
  `id` INT NOT NULL AUTO_INCREMENT,
  `nombre` VARCHAR(45) NOT NULL,
  PRIMARY KEY (`id`))
ENGINE = InnoDB;


-- -----------------------------------------------------
-- Table `wonder_nails`.`Marcas`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `wonder_nails`.`Marcas` (
  `id` INT NOT NULL AUTO_INCREMENT,
  `nombre` VARCHAR(45) NOT NULL,
  PRIMARY KEY (`id`))
ENGINE = InnoDB;


-- -----------------------------------------------------
-- Table `wonder_nails`.`Estados`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `wonder_nails`.`Estados` (
  `id` INT NOT NULL AUTO_INCREMENT,
  `Estado` VARCHAR(45) NOT NULL,
  PRIMARY KEY (`id`))
ENGINE = InnoDB;


-- -----------------------------------------------------
-- Table `wonder_nails`.`Productos`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `wonder_nails`.`Productos` (
  `id` INT NOT NULL AUTO_INCREMENT,
  `nombre` VARCHAR(45) NOT NULL,
  `color` VARCHAR(45) NOT NULL,
  `precio` INT NOT NULL,
  `descuento` INT NULL,
  `stock` INT NOT NULL,
  `descripcion` VARCHAR(500) NOT NULL,
  `Categorias_id` INT NOT NULL,
  `Marcas_id` INT NOT NULL,
  `Estados_id` INT NOT NULL,
  PRIMARY KEY (`id`),
  INDEX `fk_Productos_Categorias1_idx` (`Categorias_id` ASC) VISIBLE,
  INDEX `fk_Productos_Marcas1_idx` (`Marcas_id` ASC) VISIBLE,
  CONSTRAINT `fk_Productos_Categorias1`
    FOREIGN KEY (`Categorias_id`)
    REFERENCES `wonder_nails`.`Categorias` (`id`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION,
  CONSTRAINT `fk_Productos_Marcas1`
    FOREIGN KEY (`Marcas_id`)
    REFERENCES `wonder_nails`.`Marcas` (`id`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION,
  CONSTRAINT `fk_Productos_Estados`
    FOREIGN KEY (`Estados_id`)
    REFERENCES `wonder_nails`.`Estados` (`id`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION)
ENGINE = InnoDB;


-- -----------------------------------------------------
-- Table `wonder_nails`.`Perfil_imagenes`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `wonder_nails`.`Perfil_imagenes` (
  `id` INT NOT NULL AUTO_INCREMENT,
  `imagen` VARCHAR(100) NOT NULL,
  PRIMARY KEY (`id`))
ENGINE = InnoDB;


-- -----------------------------------------------------
-- Table `wonder_nails`.`Portada_imagenes`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `wonder_nails`.`Portada_imagenes` (
  `id` INT NOT NULL AUTO_INCREMENT,
  `imagen` VARCHAR(100) NOT NULL,
  PRIMARY KEY (`id`))
ENGINE = InnoDB;


-- -----------------------------------------------------
-- Table `wonder_nails`.`Roles`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `wonder_nails`.`Roles` (
  `id` INT NOT NULL AUTO_INCREMENT,
  `rol` VARCHAR(45) NOT NULL,
  PRIMARY KEY (`id`))
ENGINE = InnoDB;


-- -----------------------------------------------------
-- Table `wonder_nails`.`Usuarios`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `wonder_nails`.`Usuarios` (
  `id` INT NOT NULL AUTO_INCREMENT,
  `nombre` VARCHAR(45) NOT NULL,
  `apellido` VARCHAR(45) NOT NULL,
  `email` VARCHAR(45) NOT NULL,
  `contraseña` VARCHAR(100) NOT NULL,
  `telefono` VARCHAR(45) NULL,
  `genero` VARCHAR(45) NULL,
  `dni` BIGINT NULL,
  `Rol_id` INT NOT NULL,
  `Imagen_perfil_id` INT NOT NULL,
  `Imagen_portada_id` INT NOT NULL,
  PRIMARY KEY (`id`),
  INDEX `fk_Perfilimagenes_usuarios_idx` (`Imagen_perfil_id` ASC) VISIBLE,
  INDEX `fk_PortadaImagenes_Usuarios_idx` (`Imagen_portada_id` ASC) VISIBLE,
  INDEX `fk_Roles_Usuarios_idx` (`Rol_id` ASC) VISIBLE,
  CONSTRAINT `fk_Usuarios_Perfilimagenes`
    FOREIGN KEY (`Imagen_perfil_id`)
    REFERENCES `wonder_nails`.`Perfil_imagenes` (`id`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION,
  CONSTRAINT `fk_Usuarios_PortadaImagenes`
    FOREIGN KEY (`Imagen_portada_id`)
    REFERENCES `wonder_nails`.`Portada_imagenes` (`id`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION,
  CONSTRAINT `fk_Usuarios_Roles`
    FOREIGN KEY (`Rol_id`)
    REFERENCES `wonder_nails`.`Roles` (`id`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION)
ENGINE = InnoDB;


-- -----------------------------------------------------
-- Table `wonder_nails`.`Direcciones`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `wonder_nails`.`Direcciones` (
  `id` INT NOT NULL AUTO_INCREMENT,
  `direccion` VARCHAR(100) NOT NULL,
  `barrio` VARCHAR(45) NULL,
  `ciudad` VARCHAR(100) NOT NULL,
  `provincia` VARCHAR(100) NOT NULL,
  `codigoPostal` VARCHAR(45) NOT NULL,
  `Usuario_id` INT NOT NULL,
  PRIMARY KEY (`id`),
  INDEX `fk_usuarios_direcciones_idx` (`Usuario_id` ASC) VISIBLE,
  CONSTRAINT `fk_Direcciones_Usuarios`
    FOREIGN KEY (`Usuario_id`)
    REFERENCES `wonder_nails`.`Usuarios` (`id`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION)
ENGINE = InnoDB;


-- -----------------------------------------------------
-- Table `wonder_nails`.`Tarjetas`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `wonder_nails`.`Tarjetas` (
  `id` INT NOT NULL AUTO_INCREMENT,
  `numero_de_tarjeta` BIGINT NOT NULL,
  `nombre_impreso` VARCHAR(200) NOT NULL,
  `fecha_vencimiento` VARCHAR(45) NOT NULL,
  `codigo_de_seguridad` TINYINT NOT NULL,
  `Direccion_facturacion_id` INT NOT NULL,
  `Usuario_id` INT NOT NULL,
  PRIMARY KEY (`id`),
  INDEX `fk_direcciones_tarjetas_idx` (`Direccion_facturacion_id` ASC) VISIBLE,
  INDEX `fk_usuarios_tarjetas_idx` (`Usuario_id` ASC) VISIBLE,
  CONSTRAINT `fk_Tarjetas_Direcciones`
    FOREIGN KEY (`Direccion_facturacion_id`)
    REFERENCES `wonder_nails`.`Direcciones` (`id`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION,
  CONSTRAINT `fk_Tarjetas_Usuarios`
    FOREIGN KEY (`Usuario_id`)
    REFERENCES `wonder_nails`.`Usuarios` (`id`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION)
ENGINE = InnoDB;


-- -----------------------------------------------------
-- Table `wonder_nails`.`Envios`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `wonder_nails`.`Envios` (
  `id` INT NOT NULL AUTO_INCREMENT,
  `tipo_envio` VARCHAR(45) NOT NULL,
  `Domicilio_id` INT NOT NULL,
  PRIMARY KEY (`id`),
  INDEX `fk_Envios_Direccion_idx` (`Domicilio_id` ASC) VISIBLE,
  CONSTRAINT `fk_Envios_Direcciones`
    FOREIGN KEY (`Domicilio_id`)
    REFERENCES `wonder_nails`.`Direcciones` (`id`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION)
ENGINE = InnoDB;


-- -----------------------------------------------------
-- Table `wonder_nails`.`Carritos`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `wonder_nails`.`Carritos` (
  `id` INT NOT NULL AUTO_INCREMENT,
  `Total_compra` BIGINT NOT NULL,
  `Total_items` INT NOT NULL,
  `Productos_id` INT NOT NULL,
  `Usuarios_id` INT NOT NULL,
  `Tarjetas_id` INT NOT NULL,
  `Tipo_envio_id` INT NOT NULL,
  PRIMARY KEY (`id`),
  INDEX `fk_Carritos_Productos1_idx` (`Productos_id` ASC) VISIBLE,
  INDEX `fk_Carritos_Usuarios1_idx` (`Usuarios_id` ASC) VISIBLE,
  INDEX `fk_Tarjetas_Carritos_idx` (`Tarjetas_id` ASC) VISIBLE,
  INDEX `fk_Carritos_Envios_idx` (`Tipo_envio_id` ASC) VISIBLE,
  CONSTRAINT `fk_Carritos_Productos1`
    FOREIGN KEY (`Productos_id`)
    REFERENCES `wonder_nails`.`Productos` (`id`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION,
  CONSTRAINT `fk_Carritos_Usuarios1`
    FOREIGN KEY (`Usuarios_id`)
    REFERENCES `wonder_nails`.`Usuarios` (`id`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION,
  CONSTRAINT `fk_Carritos_Tarjetas`
    FOREIGN KEY (`Tarjetas_id`)
    REFERENCES `wonder_nails`.`Tarjetas` (`id`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION,
  CONSTRAINT `fk_Carritos_Envios`
    FOREIGN KEY (`Tipo_envio_id`)
    REFERENCES `wonder_nails`.`Envios` (`id`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION)
ENGINE = InnoDB;


-- -----------------------------------------------------
-- Table `wonder_nails`.`Ordenes`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `wonder_nails`.`Ordenes` (
  `id` INT NOT NULL AUTO_INCREMENT,
  `Fecha_compra` DATE NOT NULL,
  `Carritos_id` INT NOT NULL,
  `Usuarios_id` INT NOT NULL,
  PRIMARY KEY (`id`),
  INDEX `fk_Ordenes_Carritos_idx` (`Carritos_id` ASC) VISIBLE,
  INDEX `fk_Ordenes_Usuarios1_idx` (`Usuarios_id` ASC) VISIBLE,
  CONSTRAINT `fk_Ordenes_Carritos`
    FOREIGN KEY (`Carritos_id`)
    REFERENCES `wonder_nails`.`Carritos` (`id`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION,
  CONSTRAINT `fk_Ordenes_Usuarios1`
    FOREIGN KEY (`Usuarios_id`)
    REFERENCES `wonder_nails`.`Usuarios` (`id`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION)
ENGINE = InnoDB;


-- -----------------------------------------------------
-- Table `wonder_nails`.`Productos_imagenes`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `wonder_nails`.`Productos_imagenes` (
  `id` INT NOT NULL AUTO_INCREMENT,
  `nombre` VARCHAR(100) NOT NULL,
  `Productos_id` INT NOT NULL,
  PRIMARY KEY (`id`),
  INDEX `fk_imagenes_Productos1_idx` (`Productos_id` ASC) VISIBLE,
  CONSTRAINT `fk_imagenes_Productos`
    FOREIGN KEY (`Productos_id`)
    REFERENCES `wonder_nails`.`Productos` (`id`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION)
ENGINE = InnoDB;


SET SQL_MODE=@OLD_SQL_MODE;
SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS;
SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS;
