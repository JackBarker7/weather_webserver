#!/bin/bash
#Shell script to check whether internet has diconnected, and reconnect it if it has.
#Credit: fireheadman on stackoverflow https://raspberrypi.stackexchange.com/questions/27475/wifi-disconnects-after-period-of-time-on-raspberry-pi-doesnt-reconnect
LOG_PATH="/var/log/network.log"
now=$(date +"%m-%d %r")

# Which Interface do you want to check (wlan = wireless, eth0 = ethernet)
iface='wlan0'
# Which address do you want to ping to see if you can connect
pingip='google.com'

# Perform the network check and reset if necessary
/bin/ping -c 2 -I $iface $pingip > /dev/null 2> /dev/null
if [ $? -ge 1 ] ; then
    echo "$now Network is DOWN. Perform a reset" >> $LOG_PATH
    /sbin/ifdown $iface
    sleep 5
    /sbin/ifup --force $iface
    mail -s "`hostname` $iface recovered" **********@******.com < /dev/null  (send me an email so I know about this)
else
    echo "$now Network is UP. Just exit the program." >> $LOG_PATH
fi
