package de.realliferpg.app.objects;

import com.google.gson.Gson;

public class Position {
    private boolean valid;
    private Coordinates pos;

    public Position(String position) {
        if (!receivedValidPositionString(position)) {
            System.out.println("'" + position + "' is not a valid argument for this constructor");
            valid = false;
            pos = new Coordinates(0, 0, 0);
            return;
        }

        Gson gson = new Gson();
        double[] coordinates = gson.fromJson(position, double[].class);
        valid = true;
        pos = new Coordinates(
                (int) coordinates[0],
                (int) coordinates[1],
                (int) coordinates[2]
        );
    }

    private boolean receivedValidPositionString(String positionString) {
        Gson gson = new Gson();
        double[] position = gson.fromJson(positionString, double[].class);
        return position != null && position.length == 3;
    }

    public String getMapUrl() {
        if (!valid) {
            System.out.println("Provided link won't show the actual location");
        }
        return String.format("https://info.panthor.de/map?x=%d&y=%d", pos.getX(), pos.getY());
    }

    private class Coordinates {
        private int x;
        private int y;
        private int z;

        public Coordinates(int x, int y, int z) {
            this.x = x;
            this.y = y;
            this.z = z;
        }

        public int getX() {
            return x;
        }

        public int getY() {
            return y;
        }

        public int getZ() {
            return z;
        }
    }
}
