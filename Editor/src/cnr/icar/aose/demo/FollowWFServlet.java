package cnr.icar.aose.demo;


import java.io.IOException;
import java.io.PrintWriter;
import java.sql.Connection;
import java.sql.DriverManager;
import java.sql.ResultSet;
import java.sql.Statement;

import javax.servlet.ServletException;
import javax.servlet.http.HttpServlet;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;


public class FollowWFServlet extends HttpServlet {
	 
	  /**
	 * 
	 */
	private static final long serialVersionUID = 1L;
	private String message;

	  public void init() throws ServletException
	  {
	      // Do required initialization
	      message = "Hello World";
	  }

	  public void doGet(HttpServletRequest request,
	                    HttpServletResponse response)
	            throws ServletException, IOException
	  {
		  
//			// carica il file di classe del driver 
			// per il collegamento al database con il ponte Odbc
			try {
				Class.forName("com.mysql.jdbc.Driver");
			
			// apre la connessione con il database "DemoOCCP"
			Connection dbconn=DriverManager.getConnection("jdbc:mysql://localhost:3306/DemoOCCP","root","root");
			
			
			//dbconn = DriverManager.getConnection("jdbc:odbc:DemoOCCP","root","root");
			
			// manda in esecuzione l'istruzione SQL
			Statement statement = dbconn.createStatement();
			ResultSet rs = statement.executeQuery("SELECT * FROM TaskExecution");
			// elabora i risultati
			while (rs.next()) 
			{
			  // ottiene il dato
			 int dat = rs.getInt("NameTask");
			 // qui devo prendere il diagrmma pe rintrero e scorrelo in mod da individuare i task che hanno quel nome 
			 //cosi che li evidenzio di colori diversi in base al loro stato
			  // stampa a video
			  System.out.println(dat);
			}
	
			//chiude la connessione
			dbconn.close();
	      // Set response content type
//	      response.setContentType("text/html");
//
//	      // Actual logic goes here.
//	      PrintWriter out = response.getWriter();
//	      out.println("<h1>" + message + "</h1>");
			} catch (Exception e) {
				// TODO Auto-generated catch block
				e.printStackTrace();
			}
	  }
	  
	  public void destroy()
	  {
	      // do nothing.
	  }
	}
