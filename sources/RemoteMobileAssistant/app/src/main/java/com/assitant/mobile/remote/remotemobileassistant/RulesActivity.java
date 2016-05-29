package com.assitant.mobile.remote.remotemobileassistant;

import android.support.v7.app.AppCompatActivity;
import android.os.Bundle;

public class RulesActivity extends BaseActvity  {

    @Override
    protected void onCreate(Bundle savedInstanceState) {
        super.onCreate(savedInstanceState);
        getLayoutInflater().inflate(R.layout.activity_rules, frameLayout);
    }
}
