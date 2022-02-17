import java.net.*; 
import java.io.*;

public class EscreveSocket extends Thread implements Runnable {
  public BufferedReader entrada; 
  public PrintWriter saida; 
  public Socket socket; 

  EscreveSocket(BufferedReader in, PrintWriter out, Socket meuSocket) {
      entrada = in;
      saida = out;
      socket = meuSocket;
      start();
  }

  public void run() {

    try { 
    
      BufferedReader stdIn = new BufferedReader(new InputStreamReader(System.in));
      String userInput;
 
      while ((userInput = stdIn.readLine()) != null) {
        saida.println(userInput);
              if (userInput.equals("Bye.")) {
                saida.close(); 
                entrada.close(); 
                socket.close(); 
                break;              
              }
      }
      stdIn.close();
    }
 catch (IOException e) 
     { 
      System.err.println("Problem with Communication Server(EscreveSocket)");
      System.exit(1); 
     }  
  }
}