#!/bin/bash

CHROME=/opt/google/chrome/google-chrome
APP=dicbutton

if [ \! -d build ]; then
  mkdir build
fi

git status
echo " "
echo -n "(build.sh) Continue ? (yes/No): "
read ans
if [ "$ans" != 'yes' ]; then
  echo  "abort"
  exit
fi

git archive --format=tar --prefix="build/${APP}/" HEAD | tar xvf -
rm build/adb/.gitignore
rm build/adb/build.sh

echo $CHROME --pack-extension="build/${APP}" --pack-extension-key="../${APP}.pem"
