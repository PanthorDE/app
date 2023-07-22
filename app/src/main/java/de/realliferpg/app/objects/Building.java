package de.realliferpg.app.objects;

public class Building extends BuildingDTO {
    public String[] players;
    public int payed_for;

    @Override
    public String[] getPlayers() {
        return players;
    }

    @Override
    public int getPayedForDays() {
        return payed_for / 24;
    }

    @Override
    public int getPayedForHours() {
        return payed_for;
    }
}
