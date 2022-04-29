echo off
set NODE_PATH=D:/github/nodelib/
set PROJECT=D:/github/LayaDccTest/layah5/bin/
d:
node %NODE_PATH%zipjs.js -i %PROJECT%main2.min/main2.min.js -o %PROJECT%main2.min.jar
node %NODE_PATH%zipjs.js -i %PROJECT%main.min/main.min.js -o %PROJECT%main.min.jar
