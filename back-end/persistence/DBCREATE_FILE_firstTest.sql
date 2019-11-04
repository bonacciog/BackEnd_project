CREATE SCHEMA IF NOT EXISTS `1001db` DEFAULT CHARACTER SET utf8; 

CREATE TABLE IF NOT EXISTS `1001db`.`Users` (
  `ID` INT NOT NULL AUTO_INCREMENT,
  `Firstname` VARCHAR(45) NOT NULL,
  `Lastname` VARCHAR(45) NOT NULL,
  `University` VARCHAR(45) NOT NULL,
  PRIMARY KEY (`ID`))
ENGINE = InnoDB;

CREATE TABLE IF NOT EXISTS `1001db`.`Messages` (
  `SenderUser_ID` INT NOT NULL,
  `ReceiverUser_ID` INT NOT NULL,
  `Text` LONGTEXT NOT NULL,
  `DateTime` DATETIME NOT NULL,
  `IsRead` CHAR(1) NOT NULL,
  PRIMARY KEY (`SenderUser_ID`, `ReceiverUser_ID`),
  INDEX `fk_Users_has_Users_Users1_idx` (`ReceiverUser_ID` ASC) VISIBLE,
  INDEX `fk_Users_has_Users_Users_idx` (`SenderUser_ID` ASC) VISIBLE,
  UNIQUE INDEX `DateTime_UNIQUE` (`DateTime` ASC) VISIBLE,
  CONSTRAINT `fk_Users_has_Users_Users`
    FOREIGN KEY (`SenderUser_ID`)
    REFERENCES `1001db`.`Users` (`ID`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION,
  CONSTRAINT `fk_Users_has_Users_Users1`
    FOREIGN KEY (`ReceiverUser_ID`)
    REFERENCES `1001db`.`Users` (`ID`)
    ON DELETE CASCADE
    ON UPDATE NO ACTION)
ENGINE = InnoDB;

CREATE TABLE IF NOT EXISTS `1001db`.`Topics` (
  `ID` INT NOT NULL AUTO_INCREMENT,
  `FatherCategory` VARCHAR(45) NOT NULL,
  `TopicName` VARCHAR(45) NOT NULL,
  PRIMARY KEY (`ID`),
  UNIQUE INDEX `TopicName_UNIQUE` (`TopicName` ASC) VISIBLE)
ENGINE = InnoDB;

CREATE TABLE IF NOT EXISTS `1001db`.`ChallengeQuestions` (
  `ID` INT NOT NULL AUTO_INCREMENT,
  `QuestionText` LONGTEXT NOT NULL,
  `Answer_A` LONGTEXT NOT NULL,
  `Answer_B` LONGTEXT NOT NULL,
  `Answer_C` LONGTEXT NOT NULL,
  `Answer_D` LONGTEXT NOT NULL,
  `XPValue` INT NULL,
  `Topics_ID` INT NOT NULL,
  `TimeInSec` INT NULL,
  `Type` VARCHAR(45) NULL,
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
    ON DELETE CASCADE
    ON UPDATE CASCADE,
  CONSTRAINT `fk_Users_has_Topics_Topics1`
    FOREIGN KEY (`Topics_ID`)
    REFERENCES `1001db`.`Topics` (`ID`)
    ON DELETE CASCADE
    ON UPDATE CASCADE)
ENGINE = InnoDB;

CREATE TABLE IF NOT EXISTS `1001db`.`ExecutionTable` (
  `KEY` VARCHAR(10) NOT NULL,
  PRIMARY KEY (`KEY`))
ENGINE = InnoDB;

CREATE TABLE IF NOT EXISTS `1001db`.`Challenge` (
  `idChallenge` INT NOT NULL AUTO_INCREMENT,
  `ID_Player1` INT NOT NULL,
  `ID_Player2` INT NOT NULL,
  PRIMARY KEY (`idChallenge`),
  INDEX `Player1_idx` (`ID_Player1` ASC) VISIBLE,
  INDEX `Player2_idx` (`ID_Player2` ASC) VISIBLE,
  UNIQUE INDEX `ID_Player1_UNIQUE` (`ID_Player1` ASC) VISIBLE,
  UNIQUE INDEX `ID_Player2_UNIQUE` (`ID_Player2` ASC) VISIBLE,
  CONSTRAINT `Player1`
    FOREIGN KEY (`ID_Player1`)
    REFERENCES `1001db`.`Users` (`ID`)
    ON DELETE CASCADE
    ON UPDATE CASCADE,
  CONSTRAINT `Player2`
    FOREIGN KEY (`ID_Player2`)
    REFERENCES `1001db`.`Users` (`ID`)
    ON DELETE CASCADE
    ON UPDATE CASCADE)
ENGINE = InnoDB;

-- ALTER TABLE 1001db.users AUTO_INCREMENT=1