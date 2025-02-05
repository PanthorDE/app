package de.realliferpg.app.objects;

import de.realliferpg.app.interfaces.IBuilding;

public class House implements IBuilding {
    public int id;
    public int payed_for;
    public int disabled;
    public String location;
    public String[] players;

    @Override
    public int getId() {
        return id;
    }

    @Override
    public int getPayedForDays() { return (int)(payed_for/24); }

    @Override
    public int getPayedForHours() { return payed_for; }

    @Override
    public String[] getPlayers() { return players; }

    @Override
    public int getDisabled() {
        return disabled;
    }
}
