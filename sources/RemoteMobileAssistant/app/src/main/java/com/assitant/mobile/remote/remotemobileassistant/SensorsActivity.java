package com.assitant.mobile.remote.remotemobileassistant;

import android.support.v7.app.AppCompatActivity;
import android.os.Bundle;

import com.assitant.mobile.remote.remotemobileassistant.R;

public class SensorsActivity extends BaseActvity  {

    @Override
    protected void onCreate(Bundle savedInstanceState) {
        super.onCreate(savedInstanceState);
        getLayoutInflater().inflate(R.layout.activity_sensors, frameLayout);
    }

}