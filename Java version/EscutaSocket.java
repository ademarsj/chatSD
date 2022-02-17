import java.net.*; 
import java.io.*;

public class EscutaSocket extends Thread implements Runnable {
  public BufferedReader entrada; 
  public PrintWriter saida; 
  public Socket socket; 

  EscutaSocket(BufferedReader in, PrintWriter out, Socket meuSocket) {
      entrada = in;
      saida = out;
      socket = meuSocket;
      start();
  }

  public void run() {

    try { 
      String inputLine; 
      while ((inputLine = entrada.readLine()) != null) 
      { 
          System.out.println ("Me mandou: " + inputLine); 

          if (inputLine.equals("Bye.")) {
            saida.close(); 
            entrada.close(); 
            socket.close(); 
            System.out.print("Opa");
            break; 
          }
      }   
     } 
 catch (IOException e) 
     { 
      System.err.println(e);
      System.err.println("Problem with Communication Server(EscutaSocket)");
      System.exit(1); 
     } 
 }

    

}