import java.applet.Applet;
import java.awt.Color;
import java.awt.Font;
import java.awt.Graphics;

public class NavyaApplet extends Applet {
  @Override
  public void paint(Graphics g) {
    setBackground(new Color(232, 243, 255));
    g.setColor(new Color(12, 32, 78));
    g.setFont(new Font("SansSerif", Font.BOLD, 18));
    g.drawString("Navya Java Applet Example", 18, 40);
    g.setFont(new Font("SansSerif", Font.PLAIN, 14));
    g.drawString("This applet runs with appletviewer, not in most modern browsers.", 18, 70);
  }
}
