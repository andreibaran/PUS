package utils;

import android.content.Context;
import android.content.SharedPreferences;
import android.os.Build;
import android.preference.PreferenceManager;
import android.provider.Settings;
import android.text.TextUtils;
import android.util.Log;

import org.json.JSONException;
import org.json.JSONObject;

/**
 * Created by Bogdan-WS on 6/1/2016.
 */
public class Util {

    public enum COMMAND_TYPES {
        SET_BRIGHTNESS,
        SET_BRIGHTNESS_LOWER,
        SET_BRIGHTNESS_GREATER,
        SET_BRIGHTNESS_LIGHT_LOWER,
        SET_BRIGHTNESS_LIGHT_GREATER
    }

    public static String getDeviceName() {
        String manufacturer = Build.MANUFACTURER;
        String model = Build.MODEL;
        if (model.startsWith(manufacturer)) {
            return capitalize(model);
        }
        return capitalize(manufacturer) + " " + model;
    }

    public static String getDeviceAndroidId(Context context) {
        return Settings.Secure.getString(context.getContentResolver(),
                Settings.Secure.ANDROID_ID);
    }

    public static boolean isDeviceRegisterd(Context context) {
        return PreferenceManager.getDefaultSharedPreferences(context)
                .getBoolean(QuickStartPreferences.SENT_TOKEN_TO_SERVER, false);
    }

    public static JSONObject convertStringToJSONObject(String jsonString) {
        JSONObject jObj = null;
        try {
            jObj = new JSONObject(jsonString);
        } catch (JSONException e) {
            Log.e("JSON Parser", "Error parsing data " + e.toString());
        }
        return jObj;
    }

    private static String capitalize(String str) {
        if (TextUtils.isEmpty(str)) {
            return str;
        }
        char[] arr = str.toCharArray();
        boolean capitalizeNext = true;
        String phrase = "";
        for (char c : arr) {
            if (capitalizeNext && Character.isLetter(c)) {
                phrase += Character.toUpperCase(c);
                capitalizeNext = false;
                continue;
            } else if (Character.isWhitespace(c)) {
                capitalizeNext = true;
            }
            phrase += c;
        }
        return phrase;
    }
}
