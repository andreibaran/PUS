package services;

/**
 * Created by Bogdan-WS on 5/31/2016.
 */
import android.app.Service;
import android.content.Intent;
import android.hardware.Sensor;
import android.hardware.SensorEvent;
import android.hardware.SensorEventListener;
import android.hardware.SensorManager;
import android.os.Bundle;
import android.os.Handler;
import android.os.IBinder;
import android.os.PowerManager;
import android.widget.Toast;

import helpers.BrightnessHelper;

public class SensorBackgroundService extends Service implements SensorEventListener {

    private static final String TAG = SensorBackgroundService.class.getSimpleName();
    private SensorManager mSensorManager = null;
    private static float previousValue;
    private float mThresholdMin, mThresholdMax;
    private int mRuleMinBrightnessLevel, mRuleMaxBrightnessLevel;
    private Handler mHandler = new Handler();


    @Override
    public int onStartCommand(Intent intent, int flags, int startId) {

        mSensorManager = (SensorManager) getSystemService(SENSOR_SERVICE);

        int sensorType = Sensor.TYPE_LIGHT;

        Bundle args = intent.getExtras();

        // get some properties from the intent
        mThresholdMin = 10;         // measured in lux
        mThresholdMax = 1000;       // measured in lux
        previousValue = 0;          // measured in lux

        mRuleMinBrightnessLevel = 100; // [0-255]
        mRuleMaxBrightnessLevel = 200; // [0-255]

        // we need the light sensor
        Sensor sensor = mSensorManager.getDefaultSensor(sensorType);

        mSensorManager.registerListener(this, sensor, SensorManager.SENSOR_DELAY_NORMAL);

        return START_STICKY;
    }

    @Override
    public IBinder onBind(Intent intent) {
        // ignore this since not linked to an activity
        return null;
    }


    @Override
    public void onAccuracyChanged(Sensor sensor, int accuracy) {
        // do nothing
    }

    @Override
    public void onSensorChanged(final SensorEvent event) {

        float sensorValue = event.values[0];

        if ((previousValue != sensorValue &&(sensorValue > mThresholdMax || sensorValue < mThresholdMin))) {

            BrightnessHelper brightnessHelper = new BrightnessHelper(getApplicationContext().getContentResolver());
            int currentBrightness = brightnessHelper.getCurrentBrightnessLevel();

            if(sensorValue > mThresholdMax) {
                brightnessHelper.setBrightnessLevel(mRuleMaxBrightnessLevel);
            } else if ( sensorValue < mThresholdMin) {
                brightnessHelper.setBrightnessLevel(mRuleMinBrightnessLevel);
            }

            final String msg = "NEW brightness: " + currentBrightness + ". Current light sensor value: " + sensorValue;


            // only for showing a toast message
            mHandler.post(new Runnable() {

                @Override
                public void run() {
                    Toast.makeText(getApplicationContext(),msg, Toast.LENGTH_SHORT).show();
                }

            });


            // and a check in between that there should have been a non triggering value before
            // we can mark a given value as trigger. This is to overcome unneeded wakeups during
            // night for instance where the sensor readings for a light sensor would always be below
            // the threshold needed for day time use.

            // wake screen here
            PowerManager pm = (PowerManager) getApplicationContext().getSystemService(getApplicationContext().POWER_SERVICE);
            PowerManager.WakeLock wakeLock = pm.newWakeLock((PowerManager.SCREEN_BRIGHT_WAKE_LOCK | PowerManager.FULL_WAKE_LOCK | PowerManager.ACQUIRE_CAUSES_WAKEUP), TAG);
            wakeLock.acquire();

            //and release again
            wakeLock.release();
        }

        previousValue = sensorValue;
    }


}