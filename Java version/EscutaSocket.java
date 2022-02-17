import java.net.*; 
import java.io.*;
import java.time.LocalDateTime;
import java.time.format.DateTimeFormatter;

public class EscutaSocket extends Thread implements Runnable {
  public BufferedReader entrada; ; 
  public Socket socket; 

  EscutaSocket(BufferedReader in, Socket meuSocket) {
      entrada = in;
      socket = meuSocket;
      start();
  }

  public void run() {

    try { 
      String inputLine; 
      while ((inputLine = entrada.readLine()) != null && !socket.isClosed()) 
      { 
  DateTimeFormatter dtf = DateTimeFormatter.ofPattern("HH:mm");
       

          System.out.println (dtf.format(LocalDateTime.now())+ ": " + inputLine); 

          if (inputLine.equals("Bye.")) {
            entrada.close(); 
            socket.close(); 
            break; 
          }
      }
      System.exit(1);   
     } 
 catch (IOException e) 
     { 
      System.err.println(e);
      System.err.println("Problem with Communication Server(EscutaSocket)");
      System.exit(1); 
     } 
 }

    

}