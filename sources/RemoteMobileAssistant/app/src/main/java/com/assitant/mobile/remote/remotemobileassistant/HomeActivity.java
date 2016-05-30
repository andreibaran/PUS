package com.assitant.mobile.remote.remotemobileassistant;

import android.content.Intent;
import android.os.Bundle;
import android.util.Log;
import android.view.View;
import android.widget.AdapterView;
import android.widget.ArrayAdapter;
import android.widget.CheckedTextView;
import android.widget.CompoundButton;
import android.widget.ListAdapter;
import android.widget.ListView;
import android.widget.Switch;
import android.widget.TextView;
import android.widget.Toast;

import services.TimerService;

public class HomeActivity extends BaseActvity {

    private ListView sensorsListView;

    String[] sensors = new String[] {
            new String("LIGHT"),
            new String("TEMPERATURE")
    };

    Intent mMonitoringServiceIntent;
    Switch monitoringSwitch;
    @Override
    protected void onCreate(Bundle savedInstanceState) {
        super.onCreate(savedInstanceState);

        getLayoutInflater().inflate(R.layout.activity_home, frameLayout);

        sensorsListView = (ListView) findViewById(R.id.sensorsListView);


        ListAdapter sensorsListAdapter = new ArrayAdapter<>(
                this,
                android.R.layout.simple_list_item_1,
                sensors
        );

        sensorsListView.setAdapter(sensorsListAdapter);

        sensorsListView.setOnItemClickListener(new AdapterView.OnItemClickListener() {
            @Override
            public void onItemClick(AdapterView<?> parent, View view, int position,
                                    long id) {

                String item = ((TextView)view).getText().toString();

                Toast.makeText(getBaseContext(), item, Toast.LENGTH_LONG).show();

            }
        });

        monitoringSwitch = (Switch)  findViewById(R.id.bgMonitoringService);
        monitoringSwitch.setOnCheckedChangeListener(new CompoundButton.OnCheckedChangeListener() {

            @Override
            public void onCheckedChanged(CompoundButton buttonView, boolean isChecked) {

                Intent intent = new Intent(getBaseContext(), TimerService.class);

                Log.i("Switch State=", "" + isChecked);
                String toastMessage = "Monitoring Service is: ";
                if (isChecked) {
                    toastMessage += "ON";
                    startService(intent);

                } else {
                    toastMessage += "OFF";
                    stopService(intent);
                }
                Toast.makeText(getBaseContext(), toastMessage, Toast.LENGTH_SHORT).show();
            }

        });

   }

    public void onListItemClick(ListView parent, View v,int position,long id){
        CheckedTextView item = (CheckedTextView) v;
        Toast.makeText(this, sensors[position] + " checked : " +
                item.isChecked(), Toast.LENGTH_SHORT).show();
    }
}