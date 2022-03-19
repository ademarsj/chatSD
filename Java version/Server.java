import java.net.*; 
import java.io.*;

public class Server
{ 
 protected Socket clientSocket;

 public static void main(String[] args) throws IOException  {
    Integer PORTA = 10008;
    ServerSocket serverSocket = null; 

    try { 
        serverSocket = new ServerSocket(PORTA); 
        System.out.println ("Connection Socket Created");
        try { 
            while (true) {
                System.out.println ("Waiting for Connection");
                iniciar(serverSocket.accept()); 
            }
        } catch (IOException e) { 
            System.err.println("Accept failed."); 
            System.exit(1); 
        } 
    } catch (IOException e) { 
        System.err.println("Could not listen on port: 10008."); 
        System.exit(1); 
    } 
    finally {
        try {
            serverSocket.close(); 
        } catch (IOException e) { 
            System.err.println("Could not close port: 10008."); 
            System.exit(1); 
        } 
    }
   }


 public static void iniciar(Socket clientSocket) {
    System.out.println ("New Communication Thread Started");

    try { 
      PrintWriter out = new PrintWriter(clientSocket.getOutputStream(), 
                                  true); 
      BufferedReader in = new BufferedReader( 
              new InputStreamReader( clientSocket.getInputStream())); 

      EscreveSocket T1 = new EscreveSocket(out,clientSocket); 
      EscutaSocket T2 = new EscutaSocket(in,clientSocket);
      T1.join();
      T2.join();
    } catch (IOException e)  { 
      System.err.println("Problem with Communication Server");
      System.exit(1); 
    } 
    catch (InterruptedException e) { 
      System.err.println("Problem with Interruption Communication Server");
      System.exit(1); 
    } 
  }
} 




