package utils;

import android.app.IntentService;
import android.content.Intent;

/**
 * Created by Bogdan-WS on 5/29/2016.
 */

public class MonitoringService extends IntentService {

    public MonitoringService() {
        super("MonitoringService");
    }

    @Override
    protected void onHandleIntent(Intent workIntent) {
        // Gets data from the incoming Intent
        String dataString = workIntent.getDataString();
    }
}