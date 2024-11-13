#!/bin/bash
here="`dirname $0`"

if [ "${here}" != "" ] ;then
	cd ${here}
fi

mkdir -p build/xpi
cd src
find -not -name 'html2canvas.min*' -not -name 'Thumbs.db' | xargs zip -q ../build/xpi/tgs-firefox.xpi 
