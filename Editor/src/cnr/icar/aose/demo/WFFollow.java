package cnr.icar.aose.demo;

import java.io.FileReader;
import java.io.IOException;
import java.io.PrintWriter;
import java.sql.Connection;
import java.sql.DriverManager;
import java.sql.ResultSet;
import java.sql.SQLException;
import java.sql.Statement;
import java.util.HashMap;
import java.util.Map;

import javax.servlet.ServletException;
import javax.servlet.annotation.WebServlet;
import javax.servlet.http.HttpServlet;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

import org.apache.http.HttpEntity;
import org.apache.http.HttpResponse;
import org.apache.http.client.HttpClient;
import org.apache.http.client.methods.HttpPost;
import org.apache.http.impl.client.HttpClientBuilder;
import org.apache.http.util.EntityUtils;
import org.json.JSONArray;
import org.json.JSONException;
import org.json.JSONObject;

import cnr.icar.musa.web.config.MusaProperties;

/**
 * Servlet implementation class WFFollow
 */
@WebServlet("/WFFollow")
public class WFFollow extends HttpServlet {
	private static final long serialVersionUID = 1L;
	private Connection dbconn;
	private static Map<String, String> taskState = new HashMap<String, String>();
       
    /**
     * @see HttpServlet#HttpServlet()
     */
    public WFFollow() {
        super();
        // TODO Auto-generated constructor stub
    }

    public void init() throws ServletException
	  {
	      // Do required initialization
//	     System.out.println("INVOCA INIT WFFOLLOWSERVLET");
//	     try {
//			Class.forName("com.mysql.jdbc.Driver");
//			 // apre la connessione con il database "DemoOCCP"
//		      dbconn=DriverManager.getConnection("jdbc:mysql://localhost:3306/DemoOCCP","root","root");
////			 dbconn = DriverManager.getConnection("jdbc:mysql://localhost:3306/DemoOCCP","root","root");
//		} catch (Exception e) {
//			// TODO Auto-generated catch block
//			e.printStackTrace();
//		}
	    
	  }
	/**
	 * @see HttpServlet#doGet(HttpServletRequest request, HttpServletResponse response)
	 */
    
    protected void doGet(HttpServletRequest request, HttpServletResponse response) throws ServletException, IOException {
    	HttpClient httpClient = HttpClientBuilder.create().build(); //Use this instead 
    	 try {
		 String setPath="http://%s:%s/"+"capability_status_request";
		 String host = String.format(setPath, MusaProperties.getIpAdress(), MusaProperties.getPort());
        System.out.println("Sending to "+host);
        HttpPost requesthttp = new HttpPost(host);
        //NB: FARE injection dei goal nella prima della richeista di es
      //  StringEntity params = new StringEntity(goals_json.toString().trim());
        requesthttp.addHeader("content-type", "application/x-www-form-urlencoded");
        
        //requesthttp.setEntity(params);
        
        HttpResponse responsehttp = httpClient.execute(requesthttp);
       
        HttpEntity entity = responsehttp.getEntity();  
        final String content = EntityUtils.toString(entity);

//        
    	//String file="{\"capability_status\":[{\"capability_name\":\"complete_transaction\",\"id_task\":\"4\",\"capability_state\":\"active\"},{\"capability_name\":\"set_user_data\",\"id_task\":\"2\",\"capability_state\":\"active\"},{\"capability_name\":\"place_order\",\"id_task\":\"1\",\"capability_state\":\"active\"},{\"capability_name\":\"check_order_feasibility\",\"id_task\":\"3\",\"capability_state\":\"ready\"},{\"capability_name\":\"deliver_billing\",\"id_task\":\"5\",\"capability_state\":\"ready\"},{\"capability_name\":\"delete_order\",\"id_task\":\"12\",\"capability_state\":\"ready\"},{\"capability_name\":\"fulfill_order\",\"id_task\":\"9\",\"capability_state\":\"ready\"},{\"capability_name\":\"notify_order_unfeasibility\",\"id_task\":\"11\",\"capability_state\":\"ready\"},{\"capability_name\":\"upload_billing_to_dropbox\",\"id_task\":\"8\",\"capability_state\":\"ready\"}]}";

  
//		JSONObject content=new JSONObject(file);
        PrintWriter httpout = response.getWriter();
        System.out.println("response: "+content);
	    httpout.println(content);
	
    	 }
         catch (Exception ex) {} 
         finally 
         {
             httpClient.getConnectionManager().shutdown();
         }
			
    }
    //OLD METODO
//	protected void doGet(HttpServletRequest request, HttpServletResponse response) throws ServletException, IOException {
//		 System.out.println("INVOCA DO GET WFFOLLOWSERVLET");
//		  
//		 PrintWriter httpout = response.getWriter();
////	try {
////		
////		
////		// manda in esecuzione l'istruzione SQL
////		Statement statement = dbconn.createStatement();
////		ResultSet rs = statement.executeQuery("SELECT * FROM TaskExecution");
////		// elabora i risultati
////		String jsonDocument = "{\"taskState\":[";
////		while (rs.next()) 
////		{
////		  // ottiene il dato
////			String taskName = rs.getString("NameTask");
////			String taskStateDB = rs.getString("State");
////		
////			//inserisco il valore degli stati dei task in una mappa che pooi invio nella request 
////			taskState.put(taskName, taskStateDB);
////			jsonDocument +="{\"name\":\""+taskName+"\",\"state\":\""+taskStateDB+"\"";
////		  System.out.println("taskStateDB-->"+taskStateDB);
////		  System.out.println("taskState-->"+taskState);
////		  jsonDocument +="},";
////		  
////		  
////		}
////		jsonDocument=jsonDocument.substring(0,jsonDocument.length()-1);
////		jsonDocument +="]}";
////		
////		System.out.println("jsonDocument"+jsonDocument);
////		//costruisco il file JSON con la seguente struttura
////		//{
////		//		"taskState":{
////		//        "name":"NAME_TASK",
////		//		  "state":"STATO"
////		//
////		//      }
////		//}
////		
////		
//////		for(int i=0;i<taskState.size();i++){
//////		 jsonDocument="{'taskState':{"+"'name:'"+taskState.get(i)+",'state':";
//////		}
//		JSONObject myObject = new JSONObject();
//		JSONArray capabilities= new JSONArray();
//		JSONObject capabilityFirst = new JSONObject();
//		JSONObject capabilitySecond = new JSONObject();
//		try {
//			capabilityFirst.put("id_task", "02");
//			capabilityFirst.put("capability_name", "inviaOrdine");
//			capabilityFirst.put("capability_state", "ready");
//			
//			capabilitySecond.put("id_task", "01");
//			capabilitySecond.put("capability_name", "uploadFattura");
//			capabilitySecond.put("capability_state", "active");
//			capabilities.put(capabilityFirst);
//			capabilities.put(capabilitySecond);
//			myObject.put("capability_status",capabilities);
//		} catch (JSONException e) {
//			// TODO Auto-generated catch block
//			e.printStackTrace();
//		}
//		System.out.println("JSON OBJECT-->"+myObject);
//	
//		//chiude la connessione
//		
//		final String output = myObject.toString();
//		
//		
//		httpout.println(output);
//		
//		
//		
//      // Set response content type
////      response.setContentType("text/html");
////
////      // Actual logic goes here.
////      PrintWriter out = response.getWriter();
////      out.println("<h1>" + message + "</h1>");
////		} catch (Exception e) {
////			// TODO Auto-generated catch block
////			e.printStackTrace();
////		}
//  
//	}

	/**
	 * @see HttpServlet#doPost(HttpServletRequest request, HttpServletResponse response)
	 */
	protected void doPost(HttpServletRequest request, HttpServletResponse response) throws ServletException, IOException {
		// TODO Auto-generated method stub
		try {
			dbconn.close();
		} catch (SQLException e) {
			// TODO Auto-generated catch block
			e.printStackTrace();
		}
	}

}
