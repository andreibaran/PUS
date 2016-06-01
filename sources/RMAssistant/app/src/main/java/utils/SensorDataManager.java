package utils;

import android.content.Context;
import android.content.Intent;

import services.SensorBackgroundService;
import services.TimerBackgroundService;

/**
 * Created by Bogdan-WS on 6/1/2016.
 */
public class SensorDataManager {
    Context context;
    Intent intentBrightnessAlarm;
    Intent intentBrightnessLightSensor;

    public SensorDataManager(Context context) {
        this.context = context;
        this.intentBrightnessAlarm = new Intent(context, TimerBackgroundService.class);
        this.intentBrightnessLightSensor = new Intent(context, SensorBackgroundService.class);

    }

    public void startBrightnessAlarmService() {
        context.startService(intentBrightnessAlarm);
    }

    public void stopBrightnessAlarmService() {
        context.stopService(intentBrightnessAlarm);
    }

    public void startBrightnessLightSensorService() {
        context.startService(intentBrightnessLightSensor);
    }

    public void stopBrightnessLightSensorService() {
        context.stopService(intentBrightnessLightSensor);
    }


}
