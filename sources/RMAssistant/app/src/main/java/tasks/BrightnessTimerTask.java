package tasks;

import android.content.Context;
import android.os.Handler;
import android.widget.Toast;

import java.util.TimerTask;

import helpers.BrightnessHelper;
import utils.SessionManager;
import utils.Util;

/**
 * Created by Bogdan-WS on 5/30/2016.
 */
public class BrightnessTimerTask extends TimerTask {
    Handler mHandler;
    Context mContext;
    SessionManager mSession;
    public BrightnessTimerTask(Handler handler, Context context) {
        mHandler = handler;
        mContext = context;
        mSession = new SessionManager(context);
    }

    @Override
    public void run() {
        // run on another thread
        mHandler.post(new Runnable() {

            @Override
            public void run() {
                BrightnessHelper brightnessHelper = new BrightnessHelper(mContext.getContentResolver());
                int currentBrightness = brightnessHelper.getCurrentBrightnessLevel();

                Util.COMMAND_TYPES cmdType = mSession.getPrefCommandType();
                int ruleMaxBrightnessLevel = mSession.getPrefBrightnessValue(); // [0-255]

                if (cmdType == Util.COMMAND_TYPES.SET_BRIGHTNESS_LOWER) {
                    if (currentBrightness < ruleMaxBrightnessLevel) {
                        brightnessHelper.setBrightnessLevel(ruleMaxBrightnessLevel);
                        String msg = "Current brightness: " + currentBrightness;
                        Toast.makeText(mContext, msg, Toast.LENGTH_SHORT).show();
                    }
                } else {
                    if (currentBrightness > ruleMaxBrightnessLevel) {
                        brightnessHelper.setBrightnessLevel(ruleMaxBrightnessLevel);
                        String msg = "Current brightness: " + currentBrightness;
                        Toast.makeText(mContext, msg, Toast.LENGTH_SHORT).show();
                    }
                }
            }

        });
    }
}
