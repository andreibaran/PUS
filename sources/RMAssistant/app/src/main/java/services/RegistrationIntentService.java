package services;

/**
 * Created by Bogdan-WS on 5/31/2016.
 */
import android.app.IntentService;
import android.content.Intent;
import android.content.SharedPreferences;
import android.os.AsyncTask;
import android.preference.PreferenceManager;
import android.support.v4.content.LocalBroadcastManager;
import android.util.Log;

import com.assitant.mobile.remote.remotemobileassistant.HomeActivity;
import com.assitant.mobile.remote.remotemobileassistant.R;
import com.google.android.gms.gcm.GcmPubSub;
import com.google.android.gms.gcm.GoogleCloudMessaging;
import com.google.android.gms.iid.InstanceID;

import org.apache.http.NameValuePair;
import org.apache.http.client.entity.UrlEncodedFormEntity;
import org.apache.http.client.methods.HttpPost;
import org.apache.http.client.methods.HttpUriRequest;
import org.apache.http.message.BasicNameValuePair;
import org.json.JSONException;
import org.json.JSONObject;

import java.io.IOException;
import java.io.UnsupportedEncodingException;
import java.util.ArrayList;

import http.HttpHandler;
import models.User;
import utils.QuickStartPreferences;
import utils.SessionManager;
import utils.Util;

public class RegistrationIntentService extends IntentService {

    private static final String TAG = "RegIntentService";
    private static final String[] TOPICS = {"global"};
    private SharedPreferences sharedPreferences;

    public RegistrationIntentService() {
        super(TAG);
    }

    @Override
    protected void onHandleIntent(Intent intent) {
        sharedPreferences = PreferenceManager.getDefaultSharedPreferences(this);

        try {

            InstanceID instanceID = InstanceID.getInstance(this);
            String token = instanceID.getToken(getString(R.string.gcm_defaultSenderId),
                    GoogleCloudMessaging.INSTANCE_ID_SCOPE, null);

            Log.i(TAG, "GCM Registration Token: " + token);

            sendRegistrationToServer(token);

            // Subscribe to topic channels
            subscribeTopics(token);

        } catch (Exception e) {
            Log.d(TAG, "Failed to complete token refresh", e);
            // If an exception happens while fetching the new token or updating our registration data
            // on a third-party server, this ensures that we'll attempt the update at a later time.
            sharedPreferences.edit().putBoolean(QuickStartPreferences.SENT_TOKEN_TO_SERVER, false).apply();
        }
    }

    /**
     * Persist registration to third-party servers.
     *
     * Modify this method to associate the user's GCM registration token with any server-side account
     * maintained by your application.
     *
     * @param token The new token.
     */
    private void sendRegistrationToServer(final String token) {
        // Add custom implementation, as needed.
        final SessionManager session = new SessionManager(getApplicationContext());
        final User user = session.getUser();

        new HttpHandler() {
            @Override
            public HttpUriRequest getHttpRequestMethod() {
                HttpPost request = new HttpPost(ServerBaseURL + "users/" + user.getId() + "/devices" );

                ArrayList<NameValuePair> nameValuePairs = new ArrayList<>();
                nameValuePairs.add(new BasicNameValuePair("device_uuid", Util.getDeviceAndroidId(getApplicationContext())));
                nameValuePairs.add(new BasicNameValuePair("device_name", Util.getDeviceName()));
                nameValuePairs.add(new BasicNameValuePair("device_registration_id", token));
                try {
                    request.setEntity(new UrlEncodedFormEntity(nameValuePairs));
                } catch (UnsupportedEncodingException e) {
                    e.printStackTrace();
                }

                return request;
            }

            @Override
            public void onResponse(JSONObject result) {

                try {
                    int code = result.getInt("code");

                    if (code == 200) {
                        // You should store a boolean that indicates whether the generated token has been
                        // sent to your server. If the boolean is false, send the token to your server,
                        // otherwise your server should have already received the token.
                        sharedPreferences.edit().putBoolean(QuickStartPreferences.SENT_TOKEN_TO_SERVER, true).apply();

                    }

                } catch (JSONException e) {
                    e.printStackTrace();
                }

                // Notify UI that registration has completed, so the progress indicator can be hidden.
                Intent registrationComplete = new Intent(QuickStartPreferences.REGISTRATION_COMPLETE);
                LocalBroadcastManager.getInstance(getApplicationContext()).sendBroadcast(registrationComplete);

            }

        }.execute();
    }

    /**
     * Subscribe to any GCM topics of interest, as defined by the TOPICS constant.
     *
     * @param token GCM token
     * @throws IOException if unable to reach the GCM PubSub service
     */
    private void subscribeTopics(String token) throws IOException {
        GcmPubSub pubSub = GcmPubSub.getInstance(this);
        for (String topic : TOPICS) {
            pubSub.subscribe(token, "/topics/" + topic, null);
        }
    }

}