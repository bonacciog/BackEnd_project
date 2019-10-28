CREATE SCHEMA IF NOT EXISTS `1001DB` DEFAULT CHARACTER SET utf8 ;

CREATE TABLE IF NOT EXISTS `1001DB`.`Users` (
  `ID` INT NOT NULL AUTO_INCREMENT,
  `Username` VARCHAR(50) NOT NULL,
  `FirstName` VARCHAR(50) NOT NULL,
  `LastName` VARCHAR(50) NOT NULL,
  `Email` VARCHAR(50) NOT NULL,
  `Password` VARCHAR(50) NOT NULL,
  `FieldOfStudy` VARCHAR(45) NULL,
  `TypeOfDegree` VARCHAR(45) NULL,
  `University` VARCHAR(45) NULL,
  PRIMARY KEY (`Username`),
  UNIQUE INDEX `ID_UNIQUE` (`ID` ASC) VISIBLE)
ENGINE = InnoDB;

CREATE TABLE IF NOT EXISTS `1001DB`.`Messages` (
  `SenderUsername` VARCHAR(50) NOT NULL,
  `ReceiverUsername` VARCHAR(50) NOT NULL,
  `ID` INT NOT NULL AUTO_INCREMENT,
  `Text` LONGTEXT NULL,
  `DateTime` DATETIME NULL,
  `IsRead` CHAR(1) NULL,
  PRIMARY KEY (`ReceiverUsername`, `SenderUsername`),
  INDEX `fk_Users_has_Users_Users1_idx` (`ReceiverUsername` ASC) VISIBLE,
  INDEX `fk_Users_has_Users_Users_idx` (`SenderUsername` ASC) VISIBLE,
  UNIQUE INDEX `ID_UNIQUE` (`ID` ASC) VISIBLE,
  CONSTRAINT `fk_Users_has_Users_Users`
    FOREIGN KEY (`SenderUsername`)
    REFERENCES `1001DB`.`Users` (`Username`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION,
  CONSTRAINT `fk_Users_has_Users_Users1`
    FOREIGN KEY (`ReceiverUsername`)
    REFERENCES `1001DB`.`Users` (`Username`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION)
ENGINE = InnoDB;


