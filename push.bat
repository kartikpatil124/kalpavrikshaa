@echo off
echo Staging changes...
git add -A
set /p commit_msg="Enter commit message (or press enter for default): "
if "%commit_msg%"=="" set commit_msg="Update files"
echo Committing changes...
git commit -m "%commit_msg%"
echo Pushing to GitHub...
git push origin main
echo Done!
pause
