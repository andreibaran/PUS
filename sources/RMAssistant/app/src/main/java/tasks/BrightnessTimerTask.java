package tasks;

import android.content.Context;
import android.os.Handler;
import android.widget.Toast;

import java.util.TimerTask;

import helpers.BrightnessHelper;

/**
 * Created by Bogdan-WS on 5/30/2016.
 */
public class BrightnessTimerTask extends TimerTask {
    Handler mHandler;
    Context mContext;
    public BrightnessTimerTask(Handler handler, Context context) {
        mHandler = handler;
        mContext = context;
    }

    @Override
    public void run() {
        // run on another thread
        mHandler.post(new Runnable() {

            @Override
            public void run() {
                BrightnessHelper brightnessHelper = new BrightnessHelper(mContext.getContentResolver());
                int currentBrightness = brightnessHelper.getCurrentBrightnessLevel();

                int ruleMaxBrightnessLevel = 100; // [0-255]

                if (currentBrightness > ruleMaxBrightnessLevel) {
                    brightnessHelper.setBrightnessLevel(ruleMaxBrightnessLevel);

                    String msg = "Current brightness: " + currentBrightness;
                    Toast.makeText(mContext, msg, Toast.LENGTH_SHORT).show();
                }
            }

        });
    }
}
