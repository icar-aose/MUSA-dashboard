package cnr.icar.aose.demo;

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

import org.json.JSONObject;

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
	     System.out.println("INVOCA INIT WFFOLLOWSERVLET");
	     try {
			Class.forName("com.mysql.jdbc.Driver");
			 // apre la connessione con il database "DemoOCCP"
		      dbconn=DriverManager.getConnection("jdbc:mysql://localhost:3306/DemoOCCP","root","root");
//			 dbconn = DriverManager.getConnection("jdbc:mysql://localhost:3306/DemoOCCP","root","root");
		} catch (Exception e) {
			// TODO Auto-generated catch block
			e.printStackTrace();
		}
	    
	  }
	/**
	 * @see HttpServlet#doGet(HttpServletRequest request, HttpServletResponse response)
	 */
	protected void doGet(HttpServletRequest request, HttpServletResponse response) throws ServletException, IOException {
		 System.out.println("INVOCA DO GET WFFOLLOWSERVLET");
		  
		 PrintWriter httpout = response.getWriter();
	try {
		
		
		// manda in esecuzione l'istruzione SQL
		Statement statement = dbconn.createStatement();
		ResultSet rs = statement.executeQuery("SELECT * FROM TaskExecution");
		// elabora i risultati
		String jsonDocument = "{\"taskState\":[";
		while (rs.next()) 
		{
		  // ottiene il dato
			String taskName = rs.getString("NameTask");
			String taskStateDB = rs.getString("State");
		
			//inserisco il valore degli stati dei task in una mappa che pooi invio nella request 
			taskState.put(taskName, taskStateDB);
			jsonDocument +="{\"name\":\""+taskName+"\",\"state\":\""+taskStateDB+"\"";
		  System.out.println("taskStateDB-->"+taskStateDB);
		  System.out.println("taskState-->"+taskState);
		  jsonDocument +="},";
		  
		  
		}
		jsonDocument=jsonDocument.substring(0,jsonDocument.length()-1);
		jsonDocument +="]}";
		
		System.out.println("jsonDocument"+jsonDocument);
		//costruisco il file JSON con la seguente struttura
		//{
		//		"taskState":{
		//        "name":"NAME_TASK",
		//		  "state":"STATO"
		//
		//      }
		//}
		
		
//		for(int i=0;i<taskState.size();i++){
//		 jsonDocument="{'taskState':{"+"'name:'"+taskState.get(i)+",'state':";
//		}
		JSONObject myObject = new JSONObject(jsonDocument);

		//chiude la connessione
		
		final String output = myObject.toString();
		
		
		httpout.println(output);
		
		
		
      // Set response content type
//      response.setContentType("text/html");
//
//      // Actual logic goes here.
//      PrintWriter out = response.getWriter();
//      out.println("<h1>" + message + "</h1>");
		} catch (Exception e) {
			// TODO Auto-generated catch block
			e.printStackTrace();
		}
  
	}

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
