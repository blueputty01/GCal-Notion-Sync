import java.awt.*;
import java.awt.event.*;

public class DeleteEvents {
    public static void main(String[] args) {
        Robot bot = null;
        try {
            bot = new Robot();
            Thread.sleep(2000);
        } catch (Exception e) {
            System.out.println("failed");
        }

        for (int i = 0; i < 10; i++) {
            bot.mouseMove(1390, 250);
            bot.mousePress(InputEvent.BUTTON1_DOWN_MASK);
            bot.mouseRelease(InputEvent.BUTTON1_DOWN_MASK);

            try {
                Thread.sleep(1000);
            } catch (InterruptedException e) {
                // TODO Auto-generated catch block
                e.printStackTrace();
            }

            bot.mouseMove(1740, 270);
            bot.mousePress(InputEvent.BUTTON1_DOWN_MASK);
            bot.mouseRelease(InputEvent.BUTTON1_DOWN_MASK);

            try {
                Thread.sleep(1000);
            } catch (InterruptedException e) {
                // TODO Auto-generated catch block
                e.printStackTrace();
            }
        }


        PointerInfo a = MouseInfo.getPointerInfo();
        Point b = a.getLocation();
        int x = (int) b.getX();
        int y = (int) b.getY();
        System.out.print(x + ", ");
        System.out.print(y);
    }
}