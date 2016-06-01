package http;

import org.apache.http.client.methods.HttpUriRequest;
import org.json.JSONObject;

/**
 * Created by Bogdan-WS on 5/31/2016.
 */

public abstract class HttpHandler {
    public final String ServerBaseURL = "http://192.168.1.143:8080/api/";
    public abstract HttpUriRequest getHttpRequestMethod();

    public abstract void onResponse(JSONObject result);

    public void execute(){
        new AsyncHttpTask(this).execute();
    }


}