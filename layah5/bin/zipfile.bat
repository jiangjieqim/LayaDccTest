echo off
set PROJECT=D:/github/LayaDccTest/layah5/bin/
d:
cd ..\..\..\nodelib
node zipjs.js -i %PROJECT%main2.min/main2.min.js -o %PROJECT%main2.min.jar
node zipjs.js -i %PROJECT%main.min/main.min.js -o %PROJECT%main.min.jar

