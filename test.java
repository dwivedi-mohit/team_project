import java.io.*;
import java.sql.*;
import java.util.*;
import javax.servlet.*;
import javax.servlet.http.*;

public class VulnerableApp extends HttpServlet {

    // Hardcoded credentials
    private static final String DB_URL = "jdbc:mysql://localhost:3306/testdb";
    private static final String DB_USER = "root";
    private static final String DB_PASSWORD = "root123";

    // Hardcoded secret key
    private static final String SECRET_KEY = "mySuperSecretKey";

    // In-memory plaintext password store
    private static Map<String, String> users = new HashMap<>();

    static {
        users.put("admin", "admin123");
        users.put("student", "password");
    }

    @Override
    protected void doPost(HttpServletRequest request, HttpServletResponse response)
            throws ServletException, IOException {
        
        response.setContentType("text/html");
        PrintWriter out = response.getWriter();

        String action = request.getParameter("action");

        try {
            if ("login".equals(action)) {
                insecureLogin(request, out);
            } else if ("search".equals(action)) {
                insecureSearch(request, out);
            } else if ("exec".equals(action)) {
                insecureCommandExecution(request, out);
            } else if ("readFile".equals(action)) {
                insecureFileRead(request, out);
            } else if ("writeFile".equals(action)) {
                insecureFileWrite(request, out);
            } else if ("deserialize".equals(action)) {
                insecureDeserialization(request, out);
            } else {
                out.println("<h3>Unknown action</h3>");
            }
        } catch (Exception e) {
            // Information leakage
            out.println("<h3>Error occurred:</h3>");
            e.printStackTrace(out);
        }
    }

    private void insecureLogin(HttpServletRequest request, PrintWriter out) {
        String username = request.getParameter("username");
        String password = request.getParameter("password");

        // No null check, no validation
        if (users.containsKey(username) && users.get(username).equals(password)) {
            out.println("<h2>Welcome " + username + "</h2>"); // XSS risk
            out.println("<p>Your session token: " + generateWeakToken() + "</p>");
        } else {
            out.println("<h2>Login failed for user: " + username + "</h2>");
        }
    }

    private void insecureSearch(HttpServletRequest request, PrintWriter out) throws Exception {
        String name = request.getParameter("name");

        Connection con = DriverManager.getConnection(DB_URL, DB_USER, DB_PASSWORD);
        Statement stmt = con.createStatement();

        // SQL Injection vulnerability
        String query = "SELECT * FROM employees WHERE name = '" + name + "'";
        ResultSet rs = stmt.executeQuery(query);

        out.println("<h2>Search Results</h2>");
        while (rs.next()) {
            out.println("<p>ID: " + rs.getInt("id") + ", Name: " + rs.getString("name") + "</p>");
        }

        rs.close();
        stmt.close();
        con.close();
    }

    private void insecureCommandExecution(HttpServletRequest request, PrintWriter out) throws Exception {
        String cmd = request.getParameter("cmd");

        // Command Injection vulnerability
        Process process = Runtime.getRuntime().exec(cmd);

        BufferedReader reader = new BufferedReader(
                new InputStreamReader(process.getInputStream()));
        String line;

        out.println("<h2>Command Output</h2><pre>");
        while ((line = reader.readLine()) != null) {
            out.println(line);
        }
        out.println("</pre>");
    }

    private void insecureFileRead(HttpServletRequest request, PrintWriter out) throws Exception {
        String filename = request.getParameter("filename");

        // Path Traversal vulnerability
        File file = new File("C:/training/files/" + filename);

        BufferedReader br = new BufferedReader(new FileReader(file));
        String line;

        out.println("<h2>File Content</h2><pre>");
        while ((line = br.readLine()) != null) {
            out.println(line);
        }
        out.println("</pre>");

        br.close();
    }

    private void insecureFileWrite(HttpServletRequest request, PrintWriter out) throws Exception {
        String filename = request.getParameter("filename");
        String content = request.getParameter("content");

        // Path Traversal + unsafe file write
        FileWriter fw = new FileWriter("C:/training/files/" + filename);
        fw.write(content);
        fw.close();

        out.println("<h2>File written successfully to " + filename + "</h2>");
    }

    private void insecureDeserialization(HttpServletRequest request, PrintWriter out) throws Exception {
        String file = request.getParameter("file");

        // Unsafe deserialization
        ObjectInputStream ois = new ObjectInputStream(new FileInputStream(file));
        Object obj = ois.readObject();
        ois.close();

        out.println("<h2>Deserialized object: " + obj.toString() + "</h2>");
    }

    private String generateWeakToken() {
        // Weak random token generation
        Random random = new Random();
        return "TOKEN-" + random.nextInt(99999);
    }

    // Dead code / useless sensitive function
    private boolean isAdmin(String user, String key) {
        return "admin".equals(user) && SECRET_KEY.equals(key);
    }
}
