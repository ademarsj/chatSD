import java.io.*;
import java.net.*;

public class Client {
    
    public static void main(String[] args) throws IOException {
        Integer PORTA = 10008;
        String HOSTNAME = "127.0.0.1";
        String serverHostname = new String (HOSTNAME);

        System.out.println ("Attemping to connect to host " + 
                            serverHostname + " on port 10008.");

        Socket echoSocket = null;
        PrintWriter out = null;
        BufferedReader in = null;

        try {
            echoSocket = new Socket(serverHostname, PORTA);
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
        
        try {
            EscreveSocket T1 = new EscreveSocket(out,echoSocket); 
            EscutaSocket T2 = new EscutaSocket(in,echoSocket);
            T1.join();
            T2.join();
            echoSocket.close();     
        } catch (InterruptedException e) { 
            System.err.println("Problem with Interruption Communication Server");
            System.exit(1); 
        } 
    }
}

