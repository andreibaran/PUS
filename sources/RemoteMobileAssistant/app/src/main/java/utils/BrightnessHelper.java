package utils;

import android.content.ContentResolver;
import android.provider.Settings;

/**
 * Created by Bogdan-WS on 5/29/2016.
 */
public class BrightnessHelper {
    ContentResolver contentResolver;

    public BrightnessHelper(ContentResolver cntResolver) {
        contentResolver = cntResolver;
    }

    public int getCurrentBrightnessLevel() {
        int curBrightness = 0;
        try {
            curBrightness = android.provider.Settings.System.getInt(
                    contentResolver,
                    android.provider.Settings.System.SCREEN_BRIGHTNESS);
        } catch (Settings.SettingNotFoundException e) {
            e.printStackTrace();
        }

        return curBrightness;
    }

    public void setBrightnessLevel(int newBrightnessLevel) {
        android.provider.Settings.System.putInt(contentResolver,
                android.provider.Settings.System.SCREEN_BRIGHTNESS,
                newBrightnessLevel);
    }
}
