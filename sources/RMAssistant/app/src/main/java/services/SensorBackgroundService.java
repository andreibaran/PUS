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
import utils.SessionManager;
import utils.Util;

public class SensorBackgroundService extends Service implements SensorEventListener {

    private static final String TAG = SensorBackgroundService.class.getSimpleName();
    private SensorManager mSensorManager = null;
    private SessionManager mSession = null;
    private Util.COMMAND_TYPES mCmdType;
    private static float previousValue;
    private float mThresholdLightValue;
    private int mBrightnessValue;
    private Handler mHandler = new Handler();


    @Override
    public int onStartCommand(Intent intent, int flags, int startId) {

        mSensorManager = (SensorManager) getSystemService(SENSOR_SERVICE);
        mSession = new SessionManager(getApplicationContext());

        int sensorType = Sensor.TYPE_LIGHT;


        mCmdType = mSession.getPrefCommandType();
        mBrightnessValue = mSession.getPrefBrightnessValue();
        mThresholdLightValue =  mSession.getPrefLightSensorValue();

        previousValue = 0;          // measured in lux

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

        // if it's a real real change
        if (Math.abs(previousValue - sensorValue) > 10) {

            BrightnessHelper brightnessHelper = new BrightnessHelper(getApplicationContext().getContentResolver());
            int currentBrightness = brightnessHelper.getCurrentBrightnessLevel();

            final String msg = "NEW brightness: " + currentBrightness + ". Current light sensor value: " + sensorValue;

            if (mCmdType == Util.COMMAND_TYPES.SET_BRIGHTNESS_LIGHT_LOWER) {
                if (sensorValue < mThresholdLightValue) {
                    brightnessHelper.setBrightnessLevel(mBrightnessValue);
                    mHandler.post(new Runnable() {

                        @Override
                        public void run() {
                            Toast.makeText(getApplicationContext(),msg, Toast.LENGTH_SHORT).show();
                        }

                    });
                }
            } else {
                if (sensorValue > mThresholdLightValue) {
                    brightnessHelper.setBrightnessLevel(mBrightnessValue);
                    mHandler.post(new Runnable() {

                        @Override
                        public void run() {
                            Toast.makeText(getApplicationContext(),msg, Toast.LENGTH_SHORT).show();
                        }

                    });
                }
            }

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