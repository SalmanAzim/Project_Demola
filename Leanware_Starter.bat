@echo off

::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::
::    Requirements validation                                                 ::
::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::

echo Testing ruby...
ruby -v
if errorlevel 1 ( 
	echo Ruby is required, tested on v 2.2.3p173 from 2016-04-18
	echo http://rubyinstaller.org/
	echo Press ANY KEY to close.
	pause >nul
	GOTO:EOF
)

::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::
::    Setting the variables                                                   ::
::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::

echo Configuring...
set parentPath=%~dp0

set lc=localhost
set upd=n

set mockServerPort=3080

set mockServerVersion=0.1.0

::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::
::    Starting the Mock Server                                                ::
::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::

echo Starting Mock Server

start "mock server" cmd /k java -jar -Dserver.host=%lc% -Dserver.port=%mockServerPort% MockServer-%mockServerVersion%.jar

::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::
::    Starting Node.js App                                                    ::
::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::


cd %parentPath%main

echo Once Mock server has been initialised, press ANY KEY to start VIS.
pause >nul
echo Starting VIS...

start "factory_visualization" cmd /k node app.js


