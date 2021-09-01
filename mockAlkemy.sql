-- MySQL Script generated by MySQL Workbench
-- Thu Aug 26 15:44:15 2021
-- Model: New Model    Version: 1.0
-- MySQL Workbench Forward Engineering

SET @OLD_UNIQUE_CHECKS=@@UNIQUE_CHECKS, UNIQUE_CHECKS=0;
SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0;
SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='ONLY_FULL_GROUP_BY,STRICT_TRANS_TABLES,NO_ZERO_IN_DATE,NO_ZERO_DATE,ERROR_FOR_DIVISION_BY_ZERO,NO_ENGINE_SUBSTITUTION';

-- -----------------------------------------------------
-- Schema Alkemy
-- -----------------------------------------------------

-- -----------------------------------------------------
-- Schema Alkemy
-- -----------------------------------------------------
CREATE SCHEMA IF NOT EXISTS `Alkemy` DEFAULT CHARACTER SET utf8 ;
USE `Alkemy` ;

-- -----------------------------------------------------
-- Table `Alkemy`.`categorias`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `Alkemy`.`categorias` (
  `id_categoria` INT NOT NULL AUTO_INCREMENT,
  `categ_nombre` VARCHAR(45) NOT NULL,
  PRIMARY KEY (`id_categoria`),
  UNIQUE INDEX `categ_nombre_UNIQUE` (`categ_nombre` ) )
ENGINE = InnoDB;


-- -----------------------------------------------------
-- Table `Alkemy`.`transaccion`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `Alkemy`.`transaccion` (
  `id_transaccion` INT NOT NULL AUTO_INCREMENT,
  `concepto` VARCHAR(45) NOT NULL,
  `fecha_creacion` DATETIME NULL DEFAULT CURRENT_TIMESTAMP,
  `ultima_modificacion` DATETIME ON UPDATE CURRENT_TIMESTAMP,
  `tipo` VARCHAR(7) NOT NULL,
  `fk_categoria` INT NULL,
  PRIMARY KEY (`id_transaccion`),
  INDEX `fk_categoria_idx` (`fk_categoria` ) ,
  CONSTRAINT `fk_categoria`
    FOREIGN KEY (`fk_categoria`)
    REFERENCES `Alkemy`.`categorias` (`id_categoria`)
    ON DELETE NO ACTION
    ON UPDATE CASCADE)
ENGINE = InnoDB;


USE `Alkemy` ;

-- -----------------------------------------------------
-- Placeholder table for view `Alkemy`.`view_transacciones`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `Alkemy`.`view_transacciones` (`Fecha` INT, `Concepto` INT, `Categoria` INT, `Tipo` INT);

-- -----------------------------------------------------
-- View `Alkemy`.`view_transacciones`
-- -----------------------------------------------------
DROP TABLE IF EXISTS `Alkemy`.`view_transacciones`;
USE `Alkemy`;
CREATE  OR REPLACE VIEW `view_transacciones` AS
SELECT a.fecha_creacion as Creado, a.ultima_modificacion as Modificado, a.concepto as Concepto, b.categ_nombre as Categoria, a.tipo as Tipo FROM transaccion a
INNER JOIN categorias b
ON a.fk_categoria = b.id_categoria
ORDER BY a.ultima_modificacion DESC;

SET SQL_MODE=@OLD_SQL_MODE;
SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS;
SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS;