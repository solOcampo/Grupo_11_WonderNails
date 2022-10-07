-- MySQL Workbench Forward Engineering

SET @OLD_UNIQUE_CHECKS=@@UNIQUE_CHECKS, UNIQUE_CHECKS=0;
SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0;
SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='ONLY_FULL_GROUP_BY,STRICT_TRANS_TABLES,NO_ZERO_IN_DATE,NO_ZERO_DATE,ERROR_FOR_DIVISION_BY_ZERO,NO_ENGINE_SUBSTITUTION';

-- -----------------------------------------------------
-- Schema 
-- -----------------------------------------------------

-- -----------------------------------------------------
-- Schema 
-- -----------------------------------------------------
CREATE SCHEMA IF NOT EXISTS `` DEFAULT CHARACTER SET utf8 ;
USE `` ;

-- -----------------------------------------------------
-- Table ``.`Usuarios`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS ``.`Usuarios` (
  `id` INT NOT NULL AUTO_INCREMENT,
  `nombre` VARCHAR(45) NOT NULL,
  `email` VARCHAR(45) NOT NULL,
  `telefono` VARCHAR(45) NOT NULL,
  `apellido` VARCHAR(45) NOT NULL,
  `cuidad` VARCHAR(45) NOT NULL,
  `genero` VARCHAR(45) NOT NULL,
  `codigoPostal` INT NOT NULL,
  `imagen` VARCHAR(45) NOT NULL,
  `rol` VARCHAR(45) NOT NULL,
  `contraseña` VARCHAR(100) NOT NULL,
  PRIMARY KEY (`id`))
ENGINE = InnoDB;


-- -----------------------------------------------------
-- Table ``.`Categorias`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS ``.`Categorias` (
  `id` INT NOT NULL AUTO_INCREMENT,
  `nombre` VARCHAR(45) NOT NULL,
  PRIMARY KEY (`id`))
ENGINE = InnoDB;


-- -----------------------------------------------------
-- Table ``.`Marcas`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS ``.`Marcas` (
  `id` INT NOT NULL AUTO_INCREMENT,
  `nombre` VARCHAR(45) NOT NULL,
  PRIMARY KEY (`id`))
ENGINE = InnoDB;


-- -----------------------------------------------------
-- Table ``.`Productos`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS ``.`Productos` (
  `id` INT NOT NULL AUTO_INCREMENT,
  `nombre` VARCHAR(45) NOT NULL,
  `stock` INT NOT NULL,
  `precio` INT NOT NULL,
  `descuento` INT NOT NULL,
  `descripcion` VARCHAR(500) NOT NULL,
  `Marcas_id` INT NOT NULL,
  `Categorias_id` INT NOT NULL,
  PRIMARY KEY (`id`),
  INDEX `fk_Productos_Marcas_idx` (`Marcas_id` ASC) VISIBLE,
  INDEX `fk_Productos_Categorias1_idx` (`Categorias_id` ASC) VISIBLE,
  CONSTRAINT `fk_Productos_Marcas`
    FOREIGN KEY (`Marcas_id`)
    REFERENCES ``.`Marcas` (`id`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION,
  CONSTRAINT `fk_Productos_Categorias1`
    FOREIGN KEY (`Categorias_id`)
    REFERENCES ``.`Categorias` (`id`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION)
ENGINE = InnoDB;


-- -----------------------------------------------------
-- Table ``.`Imagenes`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS ``.`Imagenes` (
  `id` INT NOT NULL AUTO_INCREMENT,
  `nombre` VARCHAR(45) NOT NULL,
  `id_producto` INT NOT NULL,
  `Productos_id` INT NOT NULL,
  PRIMARY KEY (`id`),
  INDEX `fk_Imagenes_Productos1_idx` (`Productos_id` ASC) VISIBLE,
  CONSTRAINT `fk_Imagenes_Productos1`
    FOREIGN KEY (`Productos_id`)
    REFERENCES ``.`Productos` (`id`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION)
ENGINE = InnoDB;


-- -----------------------------------------------------
-- Table ``.`Carritos`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS ``.`Carritos` (
  `id` INT NOT NULL AUTO_INCREMENT,
  `Productos_id` INT NOT NULL,
  `Usuarios_id` INT NOT NULL,
  PRIMARY KEY (`id`),
  INDEX `fk_Carritos_Productos1_idx` (`Productos_id` ASC) VISIBLE,
  INDEX `fk_Carritos_Usuarios1_idx` (`Usuarios_id` ASC) VISIBLE,
  CONSTRAINT `fk_Carritos_Productos1`
    FOREIGN KEY (`Productos_id`)
    REFERENCES ``.`Productos` (`id`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION,
  CONSTRAINT `fk_Carritos_Usuarios1`
    FOREIGN KEY (`Usuarios_id`)
    REFERENCES ``.`Usuarios` (`id`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION)
ENGINE = InnoDB;


-- -----------------------------------------------------
-- Table ``.`Ordenes`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS ``.`Ordenes` (
  `id` INT NOT NULL AUTO_INCREMENT,
  `Usuarios_id` INT NOT NULL,
  `Carritos_id` INT NOT NULL,
  PRIMARY KEY (`id`),
  INDEX `fk_Ordenes_Usuarios1_idx` (`Usuarios_id` ASC) VISIBLE,
  INDEX `fk_Ordenes_Carritos1_idx` (`Carritos_id` ASC) VISIBLE,
  CONSTRAINT `fk_Ordenes_Usuarios1`
    FOREIGN KEY (`Usuarios_id`)
    REFERENCES ``.`Usuarios` (`id`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION,
  CONSTRAINT `fk_Ordenes_Carritos1`
    FOREIGN KEY (`Carritos_id`)
    REFERENCES ``.`Carritos` (`id`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION)
ENGINE = InnoDB;


SET SQL_MODE=@OLD_SQL_MODE;
SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS;
SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS;
