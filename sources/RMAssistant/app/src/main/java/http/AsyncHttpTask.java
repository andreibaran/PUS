package http;

import java.io.BufferedReader;
import java.io.IOException;
import java.io.InputStream;
import java.io.InputStreamReader;

import android.os.AsyncTask;
import android.util.Log;

import org.apache.http.HttpResponse;
import org.apache.http.client.HttpClient;
import org.apache.http.impl.client.DefaultHttpClient;
import org.json.JSONException;
import org.json.JSONObject;

/**
 * Created by Bogdan-WS on 5/31/2016.
 */

public class AsyncHttpTask extends AsyncTask<String, Void, JSONObject>{

    private HttpHandler httpHandler;
    public AsyncHttpTask(HttpHandler httpHandler){

        this.httpHandler = httpHandler;
    }


    @Override
    protected JSONObject doInBackground(String... arg0) {
        InputStream inputStream = null;
        JSONObject result = null;
        try {

            // create HttpClient
            HttpClient httpclient = new DefaultHttpClient();

            // make the http request
            HttpResponse httpResponse = httpclient.execute(httpHandler.getHttpRequestMethod());

            // receive response as inputStream
            inputStream = httpResponse.getEntity().getContent();

            // convert inputstream to string
            if(inputStream != null)
                result = convertInputStreamToJSON(inputStream);

        } catch (Exception e) {
            Log.d("InputStream", e.getLocalizedMessage());
        }

        return result;
    }
    @Override
    protected void onPostExecute(JSONObject result) {
        httpHandler.onResponse(result);
    }

    //--------------------------------------------------------------------------------------------
    private static String convertInputStreamToString(InputStream inputStream) throws IOException{
        BufferedReader bufferedReader = new BufferedReader( new InputStreamReader(inputStream));
        String line = "";
        String result = "";
        while((line = bufferedReader.readLine()) != null)
            result += line;

        inputStream.close();
        return result;

    }

    private static JSONObject convertInputStreamToJSON(InputStream inputStream) {
        JSONObject jObj = null;
        String json = "";
        try {
            BufferedReader reader = new BufferedReader(new InputStreamReader(inputStream));
            StringBuilder sb = new StringBuilder();
            String line = null;
            while ((line = reader.readLine()) != null) {
                sb.append(line + "n");
            }
            inputStream.close();
            json = sb.toString();
        } catch (Exception e) {
            Log.e("Buffer Error", "Error converting result " + e.toString());
        }

        // try parse the string to a JSON object
        try {
            jObj = new JSONObject(json);
        } catch (JSONException e) {
            Log.e("JSON Parser", "Error parsing data " + e.toString());
        }

        // return JSON String
        return jObj;

    }

}