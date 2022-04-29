echo off
set PROJECT=D:/github/LayaDccTest/layah5/bin/
d:
cd ..\..\..\nodelib
node zipjs.js %PROJECT%main2.min/main2.min.js %PROJECT%main2.min.jar
node zipjs.js %PROJECT%main.min/main.min.js %PROJECT%main.min.jar

