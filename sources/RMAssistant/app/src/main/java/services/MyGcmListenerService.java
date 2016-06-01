package services;

/**
 * Created by Bogdan-WS on 5/31/2016.
 */
import android.app.NotificationManager;
import android.app.PendingIntent;
import android.content.Context;
import android.content.Intent;
import android.media.RingtoneManager;
import android.net.Uri;
import android.os.Bundle;
import android.support.v4.app.NotificationCompat;

import com.assitant.mobile.remote.remotemobileassistant.HomeActivity;
import com.assitant.mobile.remote.remotemobileassistant.R;
import com.google.android.gms.gcm.GcmListenerService;

import org.json.JSONObject;

import helpers.BrightnessHelper;
import utils.SensorDataManager;
import utils.SessionManager;
import utils.Util;



public class MyGcmListenerService extends GcmListenerService {

    private static final String TAG = "MyGcmListenerService";

    SessionManager sessionManager;
    SensorDataManager sensorDataManager;

    @Override
    public void onMessageReceived(String from, Bundle data) {
        sessionManager = new SessionManager(getApplicationContext());
        sensorDataManager = new SensorDataManager(getApplicationContext());

        JSONObject jsObj = Util.convertStringToJSONObject(data.getString("data"));
        int statusCode = data.getInt("code");

        if(statusCode == 200) {
            String message = "New Server Update!";
            sendNotification(message);

            // get values or set the defaults
            String commandType = data.getString("commandType", "SET_BRIGHTNESS");   // SET_BRIGHTNESS
            int brightnessValue = data.getInt("brightnessValue", 100);              // [0-255]
            float lightSensorValue = data.getFloat("lightSensorValue", 800);        // lux
            sessionManager.setPreferences(commandType, brightnessValue, lightSensorValue);

            switch (Util.COMMAND_TYPES.valueOf(commandType)) {
                case SET_BRIGHTNESS: {
                    BrightnessHelper brightnessHelper = new BrightnessHelper(getContentResolver());
                    if (brightnessValue > 0 && brightnessValue < 255) {
                        brightnessHelper.setBrightnessLevel(brightnessValue);
                    }
                } break;
                case SET_BRIGHTNESS_LOWER:
                case SET_BRIGHTNESS_GREATER: {
                    sensorDataManager.stopBrightnessLightSensorService();
                    sensorDataManager.startBrightnessAlarmService();
                } break;
                case SET_BRIGHTNESS_LIGHT_LOWER:
                case SET_BRIGHTNESS_LIGHT_GREATER: {
                    sensorDataManager.stopBrightnessAlarmService();
                    sensorDataManager.startBrightnessLightSensorService();
                } break;
            }
        }

    }

    private void sendNotification(String message) {
        Intent intent = new Intent(this, HomeActivity.class);
        intent.addFlags(Intent.FLAG_ACTIVITY_CLEAR_TOP);
        PendingIntent pendingIntent = PendingIntent.getActivity(this, 0 /* Request code */, intent,
                PendingIntent.FLAG_ONE_SHOT);

        Uri defaultSoundUri = RingtoneManager.getDefaultUri(RingtoneManager.TYPE_NOTIFICATION);
        NotificationCompat.Builder notificationBuilder = new NotificationCompat.Builder(this)
                .setSmallIcon(R.drawable.notification_icon)
                .setContentTitle("GCM Message")
                .setContentText(message)
                .setAutoCancel(true)
                .setSound(defaultSoundUri)
                .setContentIntent(pendingIntent);

        NotificationManager notificationManager =
                (NotificationManager) getSystemService(Context.NOTIFICATION_SERVICE);

        notificationManager.notify(0 /* ID of notification */, notificationBuilder.build());
    }
}