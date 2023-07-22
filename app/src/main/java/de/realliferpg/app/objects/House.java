package de.realliferpg.app.objects;

public class House extends HouseDTO {
    public String[] players;

    public House() {
        super();
    }

    public House(int id, int payed_for, int disabled, String location, String[] players) {
        super(id, payed_for, disabled, location);
        this.players = players;
    }

    @Override
    public String[] getPlayers() {
        return players;
    }
}
