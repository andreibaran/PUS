package services;

import android.app.Service;
import android.content.Intent;
import android.os.Handler;
import android.os.IBinder;

import java.util.Timer;

import tasks.BrightnessTimerTask;

/**
 * Created by Bogdan-WS on 5/30/2016.
 */
public class TimerBackgroundService extends Service {
    // constant
    public static final long BRIGHTNESS_NOTIFY_INTERVAL = 10 * 1000; // 10 seconds

    // run on another Thread to avoid crash
    private Handler mHandler = new Handler();
    // timer handling
    private Timer mTimer = null;

    @Override
    public IBinder onBind(Intent intent) {
        return null;
    }

    @Override
    public void onCreate() {
        // cancel if already existed
        if (mTimer != null) {
            mTimer.cancel();
        } else {
            // recreate new
            mTimer = new Timer();
        }
    }

    @Override
    public void onStart(Intent intent, int startId) {
        handleStart(intent, startId);
    }

    @Override
    public int onStartCommand(Intent intent, int flags, int startId) {
        handleStart(intent, startId);

        // Note: in Android 4.2.2 the service does not restart automatically, it'a a known issue
        return START_STICKY;
    }

    void handleStart(Intent intent, int startId) {
        // schedule all tasks
        mTimer.scheduleAtFixedRate(new BrightnessTimerTask(mHandler, getApplicationContext()), 0, BRIGHTNESS_NOTIFY_INTERVAL);
    }


}