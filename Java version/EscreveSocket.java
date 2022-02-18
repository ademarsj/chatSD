import java.net.*; 
import java.io.*;

public class EscreveSocket extends Thread implements Runnable {
  public PrintWriter saida; 
  public Socket socket; 

  EscreveSocket(PrintWriter out, Socket meuSocket) {
      saida = out;
      socket = meuSocket;
      start();
  }

  public void run() {

    try { 
      BufferedReader stdIn = new BufferedReader(new InputStreamReader(System.in));
      String userInput;
 
      while ((userInput = stdIn.readLine()) != null && !socket.isClosed()) {
        saida.println(userInput);
        if (userInput.equals("Bye.")) {
          saida.close(); 
          socket.close(); 
          break;              
        }
      }
      stdIn.close();
      System.exit(1);
    }
 catch (IOException e) 
     { 
      System.err.println("Problem with Communication Server(EscreveSocket)");
      System.exit(1); 
     }  
  }
}