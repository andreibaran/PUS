package utils;

import android.content.Context;
import android.content.Intent;
import android.content.SharedPreferences;

import com.assitant.mobile.remote.remotemobileassistant.LoginActivity;

import java.util.HashMap;

import models.User;

public class SessionManager {
    // Shared Preferences
    SharedPreferences pref;

    // Editor for Shared preferences
    SharedPreferences.Editor editor;

    // Context
    Context _context;

    // Shared pref mode
    int PRIVATE_MODE = 0;

    // Sharedpref file name
    private static final String PREF_NAME = "RMAPref";

    // All Shared Preferences Keys
    private static final String IS_LOGIN = "IsLoggedIn";

    // User ID
    public static final String KEY_USER_ID = "userId";

    // Email address
    public static final String KEY_USER_EMAIL = "userEmail";

    // Password
    public static final String KEY_USER_PASSWORD = "userPassword";

    // UserId
    public static final String KEY_USER_NAME = "userName";

    // Constructor
    public SessionManager(Context context){
        this._context = context;
        pref = _context.getSharedPreferences(PREF_NAME, PRIVATE_MODE);
        editor = pref.edit();
    }

    /**
     * Create login session
     * */
    public void createLoginSession(int id, String email, String password, String name){
        // Storing login value as TRUE
        editor.putBoolean(IS_LOGIN, true);

        editor.putInt(KEY_USER_ID, id);
        editor.putString(KEY_USER_EMAIL, email);
        editor.putString(KEY_USER_PASSWORD, password);
        editor.putString(KEY_USER_NAME, email);

        // commit changes
        editor.commit();
    }

    /**
     * Check login method wil check user login status
     * If false it will redirect user to login page
     * Else won't do anything
     * */
    public void checkLogin(){
        // Check login status
        if(!this.isLoggedIn()){
            // user is not logged in redirect him to Login Activity
            Intent i = new Intent(_context, LoginActivity.class);
            // Closing all the Activities
            i.addFlags(Intent.FLAG_ACTIVITY_CLEAR_TOP);

            // Add new Flag to start new Activity
            i.setFlags(Intent.FLAG_ACTIVITY_NEW_TASK);

            // Staring Login Activity
            _context.startActivity(i);
        }

    }



    /**
     * Get stored session data
     * */
    public User getUser(){
        if (!this.isLoggedIn()) return null;

        return new User(pref.getInt(KEY_USER_ID, 0), pref.getString(KEY_USER_EMAIL, null), pref.getString(KEY_USER_PASSWORD, null), pref.getString(KEY_USER_NAME, null));
    }


    /**
     * Clear session details
     * */
    public void logoutUser(){
        // Clearing all data from Shared Preferences
        editor.clear();
        editor.commit();

        // After logout redirect user to Loing Activity
        Intent i = new Intent(_context, LoginActivity.class);
        // Closing all the Activities
        i.addFlags(Intent.FLAG_ACTIVITY_CLEAR_TOP);

        // Add new Flag to start new Activity
        i.setFlags(Intent.FLAG_ACTIVITY_NEW_TASK);

        // Staring Login Activity
        _context.startActivity(i);
    }

    /**
     * Quick check for login
     * **/
    // Get Login State
    public boolean isLoggedIn(){
        return pref.getBoolean(IS_LOGIN, false);
    }

    /**
     * Set Preferences
     * */
    public void setPreferences(String commandType, int brightnessValue, float lightSensorValue){
        editor.putString(QuickStartPreferences.COMMAND_TYPE, commandType);
        editor.putInt(QuickStartPreferences.BRIGHTNESS_VALUES, brightnessValue);
        editor.putFloat(QuickStartPreferences.LIGHT_SENSOR_VALUE, lightSensorValue);
        // commit changes
        editor.commit();
    }

    public Util.COMMAND_TYPES getPrefCommandType(){
        return Util.COMMAND_TYPES.valueOf(pref.getString(QuickStartPreferences.COMMAND_TYPE, "SET_BRIGHTNESS"));
    }

    public int getPrefBrightnessValue(){
        return pref.getInt(QuickStartPreferences.BRIGHTNESS_VALUES, 100);
    }

    public float getPrefLightSensorValue(){
        return pref.getFloat(QuickStartPreferences.LIGHT_SENSOR_VALUE, 800);
    }
}