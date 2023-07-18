package de.realliferpg.app.objects;

import de.realliferpg.app.interfaces.IBuilding;

public class BuildingDTO implements IBuilding {
    public int id;
    public String classname;
    public int stage;
    public String location;
    public int disabled;

    @Override
    public int getId() {
        return id;
    }

    @Override
    public int getPayedForDays() {
        return 0;
    }

    @Override
    public int getPayedForHours() {
        return 0;
    }

    @Override
    public String[] getPlayers() {
        return new String[0];
    }

    @Override
    public int getDisabled() {
        return disabled;
    }

    @Override
    public boolean isDisabled() {
        return disabled == 1;
    }

    @Override
    public boolean isActive() {
        return disabled == 0;
    }

    public Position getPosition() {
        return new Position(location);
    }
}
