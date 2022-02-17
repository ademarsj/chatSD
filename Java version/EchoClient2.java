import java.io.*;
import java.net.*;

public class EchoClient2 {
    public static void main(String[] args) throws IOException {

        String serverHostname = new String ("127.0.0.1");

              System.out.println ("Attemping to connect to host " +
                serverHostname + " on port 10008.");

        Socket echoSocket = null;
        PrintWriter out = null;
        BufferedReader in = null;

        try {
            echoSocket = new Socket(serverHostname, 10008);
            out = new PrintWriter(echoSocket.getOutputStream(), true);
            in = new BufferedReader(new InputStreamReader(
                                        echoSocket.getInputStream()));
        } catch (UnknownHostException e) {
            System.err.println("Don't know about host: " + serverHostname);
            System.exit(1);
        } catch (IOException e) {
            System.err.println("Couldn't get I/O for "
                               + "the connection to: " + serverHostname);
            System.exit(1);
        }
        // try {
            EscreveSocket teste1 = new EscreveSocket(in,out,echoSocket); 
            EscutaSocket teste2 = new EscutaSocket(in,out,echoSocket); 
        // }  
        // catch (IOException e)
        //     { 
        //     System.err.println("Could not close port: 10008."); 
        //     System.exit(1); 
        //     } 
    
  
        
    }
}

