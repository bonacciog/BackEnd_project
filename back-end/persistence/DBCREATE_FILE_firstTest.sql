CREATE SCHEMA IF NOT EXISTS `1001db` DEFAULT CHARACTER SET utf8; 

CREATE TABLE IF NOT EXISTS `1001db`.`Users` (
  `ID` INT NOT NULL AUTO_INCREMENT,
  `FirstName` VARCHAR(45) NOT NULL,
  `LastName` VARCHAR(45) NOT NULL,
  PRIMARY KEY (`ID`))
ENGINE = InnoDB;

CREATE TABLE IF NOT EXISTS `1001db`.`Messages` (
  `SenderUsers_ID` INT NOT NULL,
  `ReceiverUsers_ID` INT NOT NULL,
  `Text` LONGTEXT NOT NULL,
  `DateTime` DATETIME NOT NULL,
  `IsRead` CHAR(1) NOT NULL,
  PRIMARY KEY (`SenderUsers_ID`, `ReceiverUsers_ID`),
  INDEX `fk_Users_has_Users_Users1_idx` (`ReceiverUsers_ID` ASC) VISIBLE,
  INDEX `fk_Users_has_Users_Users_idx` (`SenderUsers_ID` ASC) VISIBLE,
  UNIQUE INDEX `DateTime_UNIQUE` (`DateTime` ASC) VISIBLE,
  CONSTRAINT `fk_Users_has_Users_Users`
    FOREIGN KEY (`SenderUsers_ID`)
    REFERENCES `1001db`.`Users` (`ID`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION,
  CONSTRAINT `fk_Users_has_Users_Users1`
    FOREIGN KEY (`ReceiverUsers_ID`)
    REFERENCES `1001db`.`Users` (`ID`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION)
ENGINE = InnoDB;

CREATE TABLE IF NOT EXISTS `1001db`.`Topics` (
  `ID` INT NOT NULL AUTO_INCREMENT,
  `FatherCategory` VARCHAR(45) NOT NULL,
  `TopicsName` VARCHAR(45) NOT NULL,
  PRIMARY KEY (`ID`),
  UNIQUE INDEX `TopicsName_UNIQUE` (`TopicsName` ASC) VISIBLE)
ENGINE = InnoDB;

CREATE TABLE IF NOT EXISTS `1001db`.`ChallengeQuestions` (
  `ID` INT NOT NULL AUTO_INCREMENT,
  `QuestionsText` LONGTEXT NOT NULL,
  `Answer_A` LONGTEXT NOT NULL,
  `Answer_B` LONGTEXT NOT NULL,
  `Answer_C` LONGTEXT NOT NULL,
  `Answer_D` LONGTEXT NOT NULL,
  `XPValue` INT NULL,
  `Topics_ID` INT NOT NULL,
  PRIMARY KEY (`ID`, `Topics_ID`),
  INDEX `fk_ChallengeQuestions_Topics1_idx` (`Topics_ID` ASC) VISIBLE,
  CONSTRAINT `fk_ChallengeQuestions_Topics1`
    FOREIGN KEY (`Topics_ID`)
    REFERENCES `1001db`.`Topics` (`ID`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION)
ENGINE = InnoDB;

CREATE TABLE IF NOT EXISTS `1001db`.`AccumulatedPoints` (
  `Users_ID` INT NOT NULL,
  `Topics_ID` INT NOT NULL,
  `XP` INT NOT NULL,
  PRIMARY KEY (`Users_ID`, `Topics_ID`),
  INDEX `fk_Users_has_Topics_Topics1_idx` (`Topics_ID` ASC) VISIBLE,
  INDEX `fk_Users_has_Topics_Users1_idx` (`Users_ID` ASC) VISIBLE,
  CONSTRAINT `fk_Users_has_Topics_Users1`
    FOREIGN KEY (`Users_ID`)
    REFERENCES `1001db`.`Users` (`ID`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION,
  CONSTRAINT `fk_Users_has_Topics_Topics1`
    FOREIGN KEY (`Topics_ID`)
    REFERENCES `1001db`.`Topics` (`ID`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION)
ENGINE = InnoDB;

CREATE TABLE IF NOT EXISTS `1001db`.`ExecutionTable` (
  `KEY` VARCHAR(10) NOT NULL,
  PRIMARY KEY (`KEY`))
ENGINE = InnoDB;