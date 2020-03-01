CREATE USER 'express'@'localhost'
  IDENTIFIED BY 'password';
GRANT ALL
  ON autodateselector.*
  TO 'express'@'localhost';