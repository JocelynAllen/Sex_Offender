DROP DATABASE IF EXISTS sex_offender;
CREATE DATABASE sex_offender; 
USE sex_offender; 
SELECT * FROM profile; 

SELECT  * FROM profile 
WHERE type = 'work'; 

DELETE  FROM profile 
WHERE type = 'work'; 

SELECT  * FROM profile 
WHERE type = 'school'; 

DELETE  FROM profile 
WHERE type = 'school'; 

SELECT * FROM profile; 
